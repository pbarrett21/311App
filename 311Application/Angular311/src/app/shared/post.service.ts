import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import { environment } from '../../environments/environment'
import { Post }  from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  selectedPost : Post = {
    postTitle: '',
    postText: '',
    postLocation: '',
    postScore: null,
    postStatus: null
  }

  noAuthHeader = {headers: new HttpHeaders({ 'NoAuth': 'True'}) };

  constructor(private http: HttpClient) { }

  //HttpMethods
  newPost(post: Post){
    return this.http.post(environment.apiBaseUrl+'/newPost', post)
  }

  removePost(postId){
    return this.http.post(environment.apiBaseUrl + '/deletePost', {postId})
  }

  getPostDashboard(){
    return this.http.get(environment.apiBaseUrl + '/postDashboard')
  }
}
