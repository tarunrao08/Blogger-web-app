import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Article, Articles } from 'src/app/core/models/article.model';
import { ArticlesService } from 'src/app/core/services/article/articles.service';
import { NotifierService } from 'src/app/core/services/notifier/notifier.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { AUTH_STORAGE } from 'src/constants/app-constants';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  filterOpen = false;
  filtersApplied = 0;
  searchAuthor = '';
  searchTag = '';
  selectedTag = '';
  isLoading = true;
  articles: Articles = { articlesCount: 0, articles: [] };
  filteredArticle: Article[] = [];
  tags = ['first', 'second', 'third'];
  username: string = '';
  isFiltered = false;
  queryParams: { [key: string]: string | number } = {};
  nonQueryFields = ['limit', 'page', 'offset'];
  query = '';

  length = 0;
  pageEvent = new PageEvent();
  pageIndex = 0;
  pageSize = 5;

  constructor(
    private article: ArticlesService,
    private notifier: NotifierService,
    private route: ActivatedRoute,
    private router: Router,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    let currentUsername = localStorage.getItem(AUTH_STORAGE.username);
    if (currentUsername) {
      this.username = currentUsername;
    }

    this.route.queryParams.subscribe((params: any) => {
      this.queryParams = params;
    });

    if (Object.keys(this.queryParams).length > 0) {
      this.isFiltered = true;
    }

    if (!this.isFiltered) {
      this.getUserArticles();
    } else {
      this.cleanQueryParam();
      this.setFilters();
      this.getFilteredArticles();
      console.log(this.pageIndex, this.pageSize);
    }
  }

  cleanQueryParam() {
    this.pageIndex = (this.queryParams['page'] as number) - 1 || 0;
    this.pageSize = (this.queryParams['limit'] as number) || 5;

    let params: { [key: string]: string } = {};
    let paramsKeys = Object.keys(this.queryParams).filter(
      (key) => !this.nonQueryFields.includes(key)
    );
    for (let key of paramsKeys) {
      params[key] = this.queryParams[key] as string;
    }
    this.queryParams = params;
    if (this.pageSize < 5 || this.pageSize > 100) {
      this.pageSize = 5;
    }
    if (this.pageIndex < 0) {
      this.pageIndex = 0;
    }
  }

  openFilter() {
    this.filterOpen = !this.filterOpen;
  }

  setFilters() {
    this.searchAuthor = this.queryParams['author'] as string;
    this.searchTag = this.queryParams['tag'] as string;
  }

  resetFilters() {
    if (this.isFiltered) {
      this.isFiltered = false;
      this.filtersApplied = 0;
      this.filterOpen = false;
      this.queryParams = {};
      this.pageSize = 5;
      this.pageIndex = 0;
      this.setFilters();
      this.createQuery();
      this.router.navigate(['/']);
      this.getUserArticles();
    } else {
      return;
    }
  }

  createQuery() {
    let params = this.queryParams;
    this.query = '';
    let i = 0;
    for (let param in params) {
      this.query +=
        i === 0 ? `?${param}=${params[param]}` : `&${param}=${params[param]}`;
      i += 1;
    }
  }

  setPagination(currentPage: number) {
    if (this.length - currentPage * this.pageSize > 0) {
      this.pageIndex = currentPage;
    } else {
      this.pageIndex = 0;
      this.pageSize = 10;
      this.queryParams = {
        ...this.queryParams,
        page: (this.pageIndex + 1) as number,
        limit: this.pageSize as number,
      };
      this.router.navigate(['/'], {
        queryParams: this.queryParams,
      });
    }
    this.filteredArticle = this.articles.articles.slice(
      this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize
    );
  }

  handleResult(res: Articles) {
    this.articles = res;
    this.isLoading = false;
    this.length = res.articles.length;
    this.setPagination(this.pageIndex);
  }

  getUserArticles() {
    this.isLoading = true;
    this.article
      .getArticles()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Articles) => {
          this.handleResult(res);
        },
        error: (e) => {
          this.utils.checkOnLine(e);
          this.isLoading = false;
        },
      });
  }

  getFilteredArticles() {
    this.filtersApplied = Object.keys(this.queryParams).length;
    this.isLoading = true;
    this.createQuery();
    this.article.getFilteredArticle(this.query).subscribe({
      next: (res) => {
        this.handleResult(res);
      },
      error: (e) => {
        this.utils.checkOnLine(e);
        this.isLoading = false;
      },
    });
  }

  searchWithParams() {
    let tempParams: { [key: string]: string } = {};

    if (this.searchAuthor) {
      tempParams['author'] = this.searchAuthor;
    }
    if (this.searchTag) {
      tempParams['tag'] = this.searchTag;
    }
    this.queryParams = tempParams;
    this.router.navigate(['/'], {
      queryParams: this.queryParams,
    });
    this.getFilteredArticles();
  }

  searchWithFilters() {
    if (this.searchAuthor === '' && this.searchTag === '') {
      return;
    }
    this.isFiltered = true;
    this.searchWithParams();
  }

  deleteArticle(slug?: string) {
    this.article
      .deleteArticle(slug)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.notifier.showNotifcation('Deleted');
          const remainingArticles = this.articles.articles.filter(
            (article) => article.slug != slug
          );
          const remainingCount = this.articles.articlesCount;
          this.articles = {
            articlesCount: remainingCount,
            articles: remainingArticles,
          };
          if (this.isFiltered) {
            this.filteredArticle = this.filteredArticle.filter(
              (article) => article.slug != slug
            );
          }
        },
        error: (e) => {
          this.utils.checkOnLine(e);
        },
      });
  }

  openArticle(slug?: string) {
    this.navigateTo(`article/${slug}`);
  }

  editArticle(slug?: string) {
    this.navigateTo(`edit-article/${slug}`);
  }

  navigateTo(place: string) {
    this.router.navigate([`/${place}`]);
  }

  getServerData(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPagination(this.pageIndex);
    this.router.navigate(['/'], {
      queryParams: {
        ...this.queryParams,
        page: this.pageIndex + 1,
        limit: this.pageSize,
      },
    });
    return event;
  }
}
