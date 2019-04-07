import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  posts;
  user;
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.postService.getPostDashboard().subscribe(
      res => { 
        console.log(res)
        this.posts = res['post'];
      },
      err => { 
        console.log(err);
        
      }
    )
  }

}
