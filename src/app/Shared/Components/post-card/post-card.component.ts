import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostDTO } from 'src/app/Post/models/post.dto';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() post!: PostDTO;
  @Input() showButtons: boolean = false;

  @Output() like = new EventEmitter<string>();
  @Output() dislike = new EventEmitter<string>();

  onLike(): void {
    this.like.emit(this.post.postId);
  }

  onDislike(): void {
    this.dislike.emit(this.post.postId);
  }
}
