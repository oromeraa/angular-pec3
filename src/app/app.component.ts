import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'blog-uoc-project-front';

  loadingAuth: boolean = false;
  loadingPosts: boolean = false;
  loadingUser: boolean = false;
  loadingCategories: boolean = false;

  isLoading(): boolean {
    return (
      this.loadingAuth ||
      this.loadingPosts ||
      this.loadingUser ||
      this.loadingCategories
    );
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select('auth').subscribe((auth) => {
      this.loadingAuth = auth.loading;
    });

    this.store.select('posts').subscribe((posts) => {
      this.loadingPosts = posts.loading;
    });

    this.store.select('user').subscribe((user) => {
      this.loadingUser = user.loading;
    });

    this.store.select('categories').subscribe((categories) => {
      this.loadingCategories = categories.loading;
    });
  }
}
