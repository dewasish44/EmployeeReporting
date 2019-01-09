import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {  numberValidator} from '../../../helpers/validation';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService} from '../../../services/employee.service';
import {MessageService} from '../../../services/message.service';
import {Employee} from '../../../models/employee';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  createEmployeeForm : FormGroup
  employee : Employee;
  constructor(private builder: FormBuilder,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private router: Router) { }

 

  ngOnInit() {
    this.buildForm();
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
      this.employeeService.addEmployee(e.EmployeeId,e.FirstName,e.LastName,e.Salary).subscribe((data)=> {
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
