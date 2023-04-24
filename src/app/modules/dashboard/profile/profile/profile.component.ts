import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ArticlesService } from 'src/app/core/services/article/articles.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  host: {
    class: 'flex-expand',
  },
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isLoading = true;
  user: User = { username: '', bio: '', email: '', image: '' };
  articlesCount = 0;

  constructor(
    private auth: AuthService,
    private utils: UtilsService,
    private article: ArticlesService
  ) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe({
      next: (res) => {
        this.user = res.user;
      },
      error: (e) => {
        this.utils.checkOnLine(e);
      },
    });
    this.article.getArticles().subscribe({
      next: (res) => {
        this.articlesCount = res.articlesCount;
        this.isLoading = false;
      },
      error: (e) => {
        this.utils.checkOnLine(e);
        this.isLoading = false;
      },
    });
  }
}
