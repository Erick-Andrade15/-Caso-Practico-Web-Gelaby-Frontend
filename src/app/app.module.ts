import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';

import { SubjectsComponent } from './views/subjects/subjects.component';
import { CreateSubjectsComponent } from './views/subjects/create-subjects/create-subjects.component';
import { EditSubjectsComponent } from './views/subjects/edit-subjects/edit-subjects.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SubjectsComponent,
    CreateSubjectsComponent,
    EditSubjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
