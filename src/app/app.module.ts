import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './modules/auth/auth.module';

import { AuthService } from './core/services/auth/auth.service';
import { ArticlesService } from './core/services/article/articles.service';
import { ValidationService } from './core/services/validation/validation.service';
import { TokenInterceptorService } from './core/interceptors/token-interceptor.service';

import { AuthGuard } from './core/guards/auth.guard';

import { AppComponent } from './app.component';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AddArticleComponent } from './modules/dashboard/add-article/add-article.component';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UtilsService } from './core/services/utils/utils.service';
@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    NavbarComponent,
    AddArticleComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    DashboardModule,
  ],
  providers: [
    AuthService,
    ArticlesService,
    AuthGuard,
    ValidationService,
    UtilsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
