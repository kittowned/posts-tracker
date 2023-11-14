import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { NewPost } from '../../models/new-post';
import { PostsService } from '../../services/posts.service';

const ERROR_MSG = 'An error has occurred, please try again';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.css']
})

export class PostsFormComponent {

  post: any = {};
  id: number | null = null;

  constructor(private postsService: PostsService, private router: Router, private route: ActivatedRoute) {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = Number(idParam);

      this.postsService.getPost(this.id)
        .pipe(take(1))
        .subscribe(post => this.post = post);
    }
  }

  save(post: NewPost) {
    if (!this.id) {
      this.postsService.createPost(post)
        .pipe(take(1))
        .subscribe(
          {
            next: post => {
              alert(`Post created!\r\n\r\nID: ${post.id}\r\nUser ID: ${post.userId}\r\nTitle: ${post.title} \r\nBody: ${post.body}`);
              this.navigateHome();
            },
            error: error => {
              console.error(error)
              alert(ERROR_MSG);
            }
          },
        );
    } else {
      this.postsService.updatePost({ id: this.id, ...post })
        .pipe(take(1))
        .subscribe(
          {
            next: post => {
              alert(`Post updated!\r\n\r\nID: ${post.id}\r\nUser ID: ${post.userId}\r\nTitle: ${post.title} \r\nBody: ${post.body}`);
              this.navigateHome();
            },
            error: error => {
              console.error(error)
              alert(ERROR_MSG);
            }
          }
        );
    }
  }

  delete(id: number) {
    if (!confirm(`Are you sure you want to delete post ${id}?`)) return;

    this.postsService.deletePost(id)
      .pipe(take(1))
      .subscribe(
        {
          next: response => {
            alert(`Post ${this.id} deleted!`);
            this.navigateHome();
          },
          error: error => {
            console.error(error);
            alert(ERROR_MSG);
          }
        }
      );
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
