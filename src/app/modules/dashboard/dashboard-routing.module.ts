import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from 'src/app/core/components/notfound/notfound.component';
import { ArticleResolverService } from 'src/app/core/services/article-resolver/article-resolver.service';
import { AddArticleComponent } from './add-article/add-article.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardComponent } from './dashboard.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ProfileComponent } from './profile/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardPageComponent },
      { path: 'add-article', component: AddArticleComponent },
      {
        path: 'edit-article/:slug',
        component: AddArticleComponent,
        resolve: {
          article: ArticleResolverService,
        },
      },
      {
        path: 'article/:slug',
        component: DetailPageComponent,
        resolve: { article: ArticleResolverService },
      },
      {
        path: 'myprofile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
