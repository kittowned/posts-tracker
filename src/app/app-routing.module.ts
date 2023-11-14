import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostsFormComponent } from './components/posts-form/posts-form.component';

const routes: Routes = [
  {
    path: 'posts/new/:id', component: PostsFormComponent
  },
  {
    path: 'posts/new', component: PostsFormComponent
  },
  {
    path: 'posts/:id', component: PostComponent
  },
  { path: '**', component: PostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
