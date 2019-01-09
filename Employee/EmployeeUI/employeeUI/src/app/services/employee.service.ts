import { Injectable } from '@angular/core';
import {Employee} from '../models/employee';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { TaskItemComponent } from '../components/task-manager/task-list/task-item/task-item.component';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee[] =  [];
   apiUrl:string ="http://localhost:1620/api/employee";

   constructor(private http: HttpClient) { }

   getEmployees(): Observable<Employee[]>
   {
     return this.http.get<Employee[]>(this.apiUrl);
   }
 
   getSingleEmployee(id: number): Observable<Employee>
   {
     return this.http.get<Employee>(this.apiUrl + "/" + id);
   }
 
   addEmployee(EmployeeId:string,  FirstName:string,  LastName:Date, Salary:number) : Observable<Employee>
   {
    
     const objTask ={
         //id: this.tasks.length + 1,
         EmployeeId,
         FirstName,
         LastName,
         Salary
     }
   // this.tasks.push(objTask);
   console.log(objTask);
    return  this.http.post<Employee>(this.apiUrl,objTask);
   }

   updateEmployee(Id:number,EmployeeId:string,  FirstName:string,  LastName:Date, Salary:number) : Observable<Employee>
   {
    
     const objTask ={
         Id,
         EmployeeId,
         FirstName,
         LastName,
         Salary
     }
   // this.tasks.push(objTask);
   console.log(objTask);
    return  this.http.put<Employee>(this.apiUrl,objTask);
   }
 
 
   removeEmployee(id: number): Observable<any>
   {
     // this.tasks.forEach((task, index)=>{
     //     if(task.id === id)        
     //     {
     //       this.tasks.splice(index,1);
     //     }
     // });
     console.log(id);
     console.log(this.apiUrl+ '/' +id);
    return this.http.delete(this.apiUrl+ '/' +id);
   }
   
}
