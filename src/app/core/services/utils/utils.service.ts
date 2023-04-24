import { Injectable } from '@angular/core';
import { AUTH_STORAGE } from 'src/constants/app-constants';
import { Article } from '../../models/article.model';
import { NotifierService } from '../notifier/notifier.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private notifer: NotifierService) {}

  checkOnLine(e: { statusCode: number; statusText: '' }) {
    if (
      !window.navigator.onLine ||
      e.statusCode === 0 ||
      e.statusCode === 408
    ) {
      this.notifer.showNotifcation('Please Check your internet connection.');
    } else if (e.statusCode > 499) {
      this.notifer.showNotifcation('There is some issue with the server.');
    } else {
      this.notifer.showNotifcation(e.statusText);
    }
  }

  isEditable(article: Article) {
    let currentUsername = localStorage.getItem(AUTH_STORAGE.username);
    let articleUsername = article.author?.['username'];
    return currentUsername === articleUsername;
  }
}
