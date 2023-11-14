import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewPost } from '../models/new-post';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${environment.apiUrl}`);
  }

  getPost(postId: number): Observable<Post> {
    return this.httpClient.get<Post>(`${environment.apiUrl}/${postId}`);
  }

  createPost(post: NewPost): Observable<Post> {
    const sanitizedPost = this.sanitizePost(post);
    return this.httpClient.post<Post>(`${environment.apiUrl}`, sanitizedPost);
  }

  updatePost(post: Post): Observable<Post> {
    const sanitizedPost = this.sanitizePost(post);
    return this.httpClient.put<Post>(`${environment.apiUrl}/${post.id}`, sanitizedPost);
  }

  deletePost(postId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/${postId}`);
  }

  sanitizePost(post: Post | NewPost) {
    // do some sanitizing
    return post;
  }
}
