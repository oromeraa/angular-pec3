import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts: PostDTO[];
  numLikes: number;
  numDislikes: number;

  doughnutChartType: ChartType = 'doughnut';
  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Likes', 'Dislikes'],
    datasets: [{ data: [0, 0] }],
  };

  constructor(private store: Store<AppState>) {
    this.posts = new Array<PostDTO>();
    this.numLikes = 0;
    this.numDislikes = 0;

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
      this.numLikes = 0;
      this.numDislikes = 0;

      this.posts.forEach((post) => {
        this.numLikes += post.num_likes;
        this.numDislikes += post.num_dislikes;
      });

      this.doughnutChartData = {
        labels: ['Likes', 'Dislikes'],
        datasets: [{ data: [this.numLikes, this.numDislikes] }],
      };
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }
}
