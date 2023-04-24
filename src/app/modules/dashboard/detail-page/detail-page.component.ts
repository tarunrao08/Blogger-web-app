import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Article } from 'src/app/core/models/article.model';
import { ArticlesService } from 'src/app/core/services/article/articles.service';
import { NotifierService } from 'src/app/core/services/notifier/notifier.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  article: Article = {
    title: '',
    body: '',
    description: '',
    tagList: [],
    author: {},
  };
  isLoading = true;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articles: ArticlesService,
    private notifier: NotifierService,
    public utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    let { article } = this.route.snapshot.data['article'];
    this.article = article;
    this.isLoading = false;
  }

  editArticle(slug?: string) {
    this.router.navigate([`/edit-article/${slug}`]);
  }

  onDelete(slug?: string) {
    this.isDeleting = true;

    return this.articles
      .deleteArticle(slug)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.notifier.showNotifcation('Deleted');
          this.router.navigate(['/']);
          this.isDeleting = false;
        },
        error: (e) => {
          this.utils.checkOnLine(e);
          this.isDeleting = false;
        },
      });
  }
  moreOfAuthor(author?: string) {
    if (!author) {
      return;
    }

    this.router.navigate(['/'], {
      queryParams: {
        author,
      },
    });
  }
}
