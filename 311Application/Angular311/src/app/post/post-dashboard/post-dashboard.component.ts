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
  userType;
  isAdmin = false;
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.postService.getPostDashboard().subscribe(
      res => { 
        this.posts = res['post'];
        this.userType = res['userType']
        if(this.userType == 0) {
          this.isAdmin = true;
        }
      },
      err => { 
        console.log(err);
        
	    }
	  )
  }

  upvotePost(num) {
    var postId = this.posts[num]._id;
    
    //Insert upvote code
  }

  downvotePost(num) {
    var postId = this.posts[num]._id;

    //Insert downvote code
  }

  deletePost(num) {
    var postId = this.posts[num]._id;
    this.postService.removePost(postId).subscribe(
      res => {
        location.reload()
      },
      err => {
        console.log(err)
      }
    )
  }

  completePost(num) {
    var postId = this.posts[num]._id;
    this.postService.completePost(postId).subscribe(
      res => {
        location.reload()
      },
      err => {
        console.log(err)
      }
    )
  }

  isCompleted(num) {
    return (this.posts[num].postStatus == 0)
  }

}
