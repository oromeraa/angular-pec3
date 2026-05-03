import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blog-uoc-project-front';
  isLoading: boolean = false;

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.store.select('auth').subscribe((auth) => {
      if (auth.loading) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    });

    this.store.select('posts').subscribe((posts) => {
      if (posts.loading) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    });

    this.store.select('user').subscribe((user) => {
      if (user.loading) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    });

    this.store.select('categories').subscribe((category) => {
      if (category.loading) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    });
  }
}
