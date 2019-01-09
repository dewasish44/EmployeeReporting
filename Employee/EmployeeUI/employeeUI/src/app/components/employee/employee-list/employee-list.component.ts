import { Component, OnInit, Input } from '@angular/core';
import {EmployeeService} from '../../../services/employee.service';
import {Employee} from '../../../models/employee';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {

 
  query : string ="";
  employees: Employee[] = [];
 
   constructor(private employeeService: EmployeeService,
    private messageService: MessageService) {
 
    }
 
   ngOnInit() {
    this.getEmployee();
 
     this.messageService.getMessage().subscribe((data)=> {
       this.getEmployee();
     });
    
   }
 
   getEmployee(){
     this.employeeService.getEmployees().subscribe((data)=> {
       this.employees = data;
       console.log(this.employees);
       
   });
   }

  }
