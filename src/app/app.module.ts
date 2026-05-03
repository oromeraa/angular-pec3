import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers, EffectsArray } from './app.reducers';
import { AuthModule } from './Auth/auth.module';
import { CategoryModule } from './Category/category.module';
import { PostModule } from './Post/post.module';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { HeaderComponent } from './Shared/Components/header/header.component';
import { AuthInterceptorService } from './Shared/Services/auth-interceptor.service';
import { UserModule } from './User/user.module';

import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    UserModule,
    CategoryModule,
    PostModule,
    MatButton,
    MatIcon,
    MatToolbar,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot(EffectsArray),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
})
export class AppModule {}
