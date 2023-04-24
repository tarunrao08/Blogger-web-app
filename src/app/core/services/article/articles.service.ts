import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Article, Articles } from '../../models/article.model';

import { AUTH_STORAGE } from 'src/constants/app-constants';
import { ARTICLES_PATH, BASE_URL } from 'src/constants/url-constants';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private username: string | null = localStorage.getItem(AUTH_STORAGE.username);

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Articles> {
    /*
     * Get all the articles of the user
     */
    return this.http.get<Articles>(
      `${BASE_URL}/${ARTICLES_PATH}?author=${this.username}`
    );
  }

  getFilteredArticle(query: string): Observable<Articles> {
    return this.http.get<Articles>(`${BASE_URL}/${ARTICLES_PATH}${query}`);
  }

  getArticle(slug: string): Observable<{ article: Article }> {
    /*
     * Get particular article by Slug/ID
     */
    return this.http.get<{ article: Article }>(
      `${BASE_URL}/${ARTICLES_PATH}/${slug}`
    );
  }

  deleteArticle(slug?: string) {
    return this.http.delete(`${BASE_URL}/${ARTICLES_PATH}/${slug}`);
  }

  addArticle(article: Article): Observable<{ article: Article }> {
    return this.http.post<{ article: Article }>(
      `${BASE_URL}/${ARTICLES_PATH}`,
      {
        article,
      }
    );
  }

  editArticle(
    article: Article,
    slug?: string
  ): Observable<{ article: Article }> {
    return this.http.put<{ article: Article }>(
      `${BASE_URL}/${ARTICLES_PATH}/${slug}`,
      {
        article,
      }
    );
  }
}
