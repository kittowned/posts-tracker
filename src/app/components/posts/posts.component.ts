import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, shareReplay, startWith, switchMap } from 'rxjs';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  postsReplay$!: Observable<Post[]>;
  filteredPosts$!: Observable<Post[]>;
  filter = new FormControl('');

  constructor(private postsService: PostsService) {
    this.postsReplay$ = this.postsService.getPosts().pipe(shareReplay(1));

    this.filteredPosts$ = this.filter.valueChanges.pipe(
      startWith(''),
      switchMap(text => {
        return this.postsReplay$
          .pipe(
            map(posts => this.search(posts, text)));
      })
    )
  }

  search(posts: Post[], text: string): Post[] {
    return posts.filter(post => {
      const term = text.toLowerCase();
      return post.title.toLowerCase().includes(term);
    });
  }
}
