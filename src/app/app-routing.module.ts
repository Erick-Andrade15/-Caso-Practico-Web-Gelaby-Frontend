import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseGuard } from './guards/auth.guards';

/*Subjects*/
import { SubjectsComponent } from './views/subjects/subjects.component';
import { CreateSubjectsComponent } from './views/subjects/create-subjects/create-subjects.component';
import { EditSubjectsComponent } from './views/subjects/edit-subjects/edit-subjects.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
/*Subjects*/
{path: 'subjects', component: SubjectsComponent, canActivate:[ExpenseGuard]},
{path: 'subjects/create-subject', component: CreateSubjectsComponent, canActivate:[ExpenseGuard]},
{path: 'subjects/edit-subject/:id', component: EditSubjectsComponent, canActivate:[ExpenseGuard]},];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
