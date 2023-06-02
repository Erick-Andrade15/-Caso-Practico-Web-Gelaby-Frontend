import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseGuard } from './guards/auth.guards';


import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { HomeComponent } from './views/home/home.component';

/*Subjects*/
import { SubjectsComponent } from './views/subjects/subjects.component';
import { CreateSubjectsComponent } from './views/subjects/create-subjects/create-subjects.component';
import { EditSubjectsComponent } from './views/subjects/edit-subjects/edit-subjects.component';

/*Careers*/
import { CareersComponent } from './views/careers/careers.component';
import { CreateCareersComponent } from './views/careers/create-careers/create-careers.component'; 
import { EditCareersComponent } from './views/careers/edit-careers/edit-careers.component'; 

/*Courses*/
import { CoursesComponent } from './views/courses/courses.component'; 
import { CreateCoursesComponent } from './views/courses/create-courses/create-courses.component';  
import { EditCoursesComponent } from './views/courses/edit-courses/edit-courses.component'; 


const routes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{path: 'home', component: HomeComponent, canActivate:[ExpenseGuard]},
{path: 'login', component: LoginComponent},
{path: 'logout', component: LogoutComponent},
{path: 'forgotPassword', component: ForgotPasswordComponent},
{path: 'register', component: RegisterComponent},

/*Subjects*/
{path: 'subjects', component: SubjectsComponent, canActivate:[ExpenseGuard]},
{path: 'subjects/create-subject', component: CreateSubjectsComponent, canActivate:[ExpenseGuard]},
{path: 'subjects/edit-subject/:id', component: EditSubjectsComponent, canActivate:[ExpenseGuard]},

/*Careers*/
{path: 'careers', component: CareersComponent, canActivate:[ExpenseGuard]},
{path: 'careers/create-career', component: CreateCareersComponent, canActivate:[ExpenseGuard]},
{path: 'careers/edit-career/:id', component: EditCareersComponent, canActivate:[ExpenseGuard]},

/*Courses*/
{path: 'courses', component: CoursesComponent, canActivate:[ExpenseGuard]},
{path: 'courses/create-course', component: CreateCoursesComponent, canActivate:[ExpenseGuard]},
{path: 'courses/edit-course/:id', component: EditCoursesComponent, canActivate:[ExpenseGuard]},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
