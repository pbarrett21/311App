import { Routes } from '@angular/router';
import { UserComponent} from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard'
import { CreatePostComponent } from './post/create-post/create-post.component';
import { PostDashboardComponent } from './post/post-dashboard/post-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{path: '', component: SignUpComponent}]
    },
    {
        path: 'login', component: UserComponent,
        children: [{path: '', component: SignInComponent}]
    },
    {
        path: 'userprofile', component: UserProfileComponent, canActivate:[AuthGuard]
    },
    {
        path: 'newPost', component: CreatePostComponent, canActivate:[AuthGuard]
    },
    {
        path: 'deletePost', component: PostDashboardComponent, canActivate:[AuthGuard]
    },
    {
        path: 'completePost', component: PostDashboardComponent, canActivate:[AuthGuard]
    },
    {
        path: 'postDashboard', component: PostDashboardComponent, canActivate:[AuthGuard]
    },
    {
        path: 'adminDashboard', component: AdminDashboardComponent, canActivate:[AuthGuard]
    },
    {
        path: 'toggleAdmin', component: AdminDashboardComponent, canActivate:[AuthGuard]
    },
    {
        path: 'deleteUser', component: AdminDashboardComponent, canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];