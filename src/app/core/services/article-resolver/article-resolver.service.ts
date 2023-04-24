import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../../models/article.model';
import { ArticlesService } from '../article/articles.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolverService implements Resolve<{ article: Article }> {
  constructor(private articles: ArticlesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ article: Article }> {
    return this.articles.getArticle(route.params['slug']);
  }
}
