import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  post$: Observable<Post>;

  constructor(private route: ActivatedRoute, private postService: PostsService) {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.post$ = this.postService.getPost(postId);
  }
}