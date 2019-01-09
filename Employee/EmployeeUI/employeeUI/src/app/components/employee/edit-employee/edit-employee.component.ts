import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {  numberValidator} from '../../../helpers/validation';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService} from '../../../services/employee.service';
import {MessageService} from '../../../services/message.service';
import {Employee} from '../../../models/employee';

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  createEmployeeForm : FormGroup
  employee : Employee;
  private sub: Subscription;

  constructor(private builder: FormBuilder,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) { }

   

  ngOnInit() {
    this.buildForm();
     // Read the product Id from the route parameter
     this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getEmployee(id);
      }
    );
  }

  
  getEmployee(id: number): void {
    this.employeeService.getSingleEmployee(id)
      .subscribe((data)=>{
      this.employee =data;

      this.createEmployeeForm.patchValue({
        EmployeeId: this.employee.EmployeeId,
        FirstName: this.employee.FirstName,
        LastName: this.employee.LastName,
        Salary: this.employee.Salary
      });
      });
  }
   
buildForm()
{
  this.createEmployeeForm = this.builder.group({
    EmployeeId: ['', Validators.required],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Salary: [0, Validators.compose([Validators.required, numberValidator])],
  },
{
  //validator: passwordMatch
});
}

saveEmployee(): void {
  if (this.createEmployeeForm.valid) {
    if (this.createEmployeeForm.dirty) {
      const e = { ...this.employee, ...this.createEmployeeForm.value };
  
      console.log(e);
      this.employeeService.updateEmployee(e.Id,e.EmployeeId,e.FirstName,e.LastName,e.Salary).subscribe((data)=> {
        // this.task = data;
        this.onSaveComplete()
         this.messageService.setMessage('Employee Added');
       });
    
    } 
  } 
}

onSaveComplete(): void {
  // Reset the form to clear the flags
  this.createEmployeeForm.reset();
  this.router.navigate(['/employees']);
}

}
