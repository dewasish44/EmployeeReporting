import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './guards/auth.guard'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';

import {Routes, RouterModule} from '@angular/router';

import {EmployeeService} from './services/employee.service';
import { MessageService } from './services/message.service';

import { HighlightDirective } from './directive/highilite.directive';



const routes : Routes =[
{path :'', redirectTo : '/PageNotFoundComponent', pathMatch :'full'},
{path :'employees', component : EmployeeListComponent},
{path :'createEmployee', component : CreateEmployeeComponent},
{path :'employees/edit/:id', component : EditEmployeeComponent},
{path :'**', component:PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PageNotFoundComponent,
    EmployeeListComponent,
    HighlightDirective,
    CreateEmployeeComponent,
    EditEmployeeComponent
    
    
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [EmployeeService,  MessageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
