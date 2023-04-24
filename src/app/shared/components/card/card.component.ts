import { Component, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/core/models/article.model';
import { EventEmitter } from '@angular/core';
import { filter } from 'rxjs';
import { AUTH_STORAGE } from 'src/constants/app-constants';
import { UtilsService } from 'src/app/core/services/utils/utils.service';

@Component({
  selector: 'app-card',
  host: {
    class: 'expand',
  },
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  isDeleting = false;
  @Input() article: Article = {
    title: '',
    description: '',
    body: '',
    tagList: [],
    author: {},
  };
  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Output() open: EventEmitter<string> = new EventEmitter();
  @Output() edit: EventEmitter<string> = new EventEmitter();

  constructor(public utils: UtilsService) {}

  ngOnInit(): void {}

  deletePost() {
    this.isDeleting = true;
    this.delete.emit();
  }

  openArticle() {
    this.open.emit();
  }

  editArticle() {
    this.edit.emit();
  }
}
