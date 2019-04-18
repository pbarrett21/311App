import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { PostService } from '../../shared/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private postService: PostService, private router: Router) { }

  model ={
    postTitle: '',
    postText: '',
    postLocation: '',
    postScore: '',
    postStatus: ''
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.postService.newPost(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        this.router.navigateByUrl('/postDashboard')
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    )
  }

}
