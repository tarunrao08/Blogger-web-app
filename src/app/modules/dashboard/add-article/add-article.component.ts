import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validation/validation.service';
import { ArticlesService } from 'src/app/core/services/article/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Article } from 'src/app/core/models/article.model';
import { NotifierService } from 'src/app/core/services/notifier/notifier.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  readonly separatorKeyCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  isLoading = false;
  articleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    tagList: new FormControl([]),
  });
  article: Article = { title: '', body: '', description: '', tagList: [] };
  toEdit = false;
  headingPrefix = 'Add New';

  constructor(
    private validator: ValidationService,
    private articles: ArticlesService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService
  ) {
    if (this.route.snapshot.params['slug']) {
      this.toEdit = true;
      this.article = this.route.snapshot.data['article'].article;
    }
    this.headingPrefix = this.toEdit ? 'Edit' : 'Add New';
  }

  ngOnInit(): void {
    if (this.toEdit) {
      this.articleForm.get('title')?.setValue(this.article.title);
      this.articleForm.get('description')?.setValue(this.article.description);
      this.articleForm.get('body')?.setValue(this.article.body);
      this.tags = this.article.tagList;
      this.articleForm.get('tagList')?.setValue(this.article.tagList);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const idx = this.tags.indexOf(tag);

    if (idx !== undefined && idx >= 0) {
      this.tags.splice(idx, 1);
    }
  }

  getTitleErrorMessage() {
    return this.validator.getAuthErrors(this.articleForm.get('title'), 'Title');
  }

  getDescriptionErrorMessage() {
    return this.validator.getAuthErrors(
      this.articleForm.get('description'),
      'Description'
    );
  }

  getBodyErrorMessage() {
    return this.validator.getAuthErrors(this.articleForm.get('body'), 'Body ');
  }

  onSubmit() {
    this.isLoading = true;
    this.articleForm.get('tagList')?.setValue(this.tags);
    if (!this.toEdit) {
      this.articles
        .addArticle(this.articleForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.router.navigate([`article/${res.article.slug}`]);
            this.isLoading = false;
          },
          error: (e) => {
            let errors = e.error.errors;
            if (errors && errors['title']) {
              this.articleForm
                .get('title')
                ?.setErrors({ taken: true }, { emitEvent: true });
            } else {
              this.utils.checkOnLine(e);
            }
            this.isLoading = false;
          },
        });
    } else {
      this.articles
        .editArticle(this.articleForm.value, this.article.slug)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.router.navigate([`/article/${res.article.slug}`]);
            this.isLoading = false;
          },
          error: (e) => {
            this.utils.checkOnLine(e);
          },
        });
    }
  }
}
