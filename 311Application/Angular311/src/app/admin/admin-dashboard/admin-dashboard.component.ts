import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/post.service';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users;
  userType;
  isAdmin = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getAdminDashboard().subscribe(
      res => { 
        this.users = res['users'];
        this.userType = res['userType']
        if(this.userType == 0) {
          this.isAdmin = true;
        }
        else {
          this.router.navigate(['/postDashboard'])
        }
      },
      err => { 
        console.log(err);
        
	    }
	  )
  }

  deleteUser(num) {
    var userId = this.users[num]._id;

    this.userService.deleteUser(userId).subscribe(
      res => {
        location.reload()
      },
      err => {
        console.log(err)
      }
    )
  }

  toggleAdmin(num) {
    var userId = this.users[num]._id;

    this.userService.toggleAdmin(userId).subscribe(
      res => {
        location.reload()
      },
      err => {
        console.log(err)
      }
    )
  }

  hasAdmin(num) {
    if(this.users[num].userType == 0) {
      return true;
    }
    else {
      return false;
    }
  }
}
