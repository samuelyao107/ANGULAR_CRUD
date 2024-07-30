import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    })}
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  education: string[] = [
     'Bachelor',
     'Master',
     'Phd'
  ]

 onFormSubmit(): void{
  if(this.data){
    console.log(this.empForm.value)
       if(this.empForm.valid){
        console.log(this.empForm.value)
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val:any) =>{
             this._coreService.openSnackBar('Employee updated successfully!','done');
             this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.log(err)
          }
        })
       }
  }else{
    console.log(this.empForm.value)
       if(this.empForm.valid){
        console.log(this.empForm.value)
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val:any) =>{
             this._coreService.openSnackBar('Employee added successfully!','done');
             this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.log(err)
          }
        })
       }
  }
  
  }  
}
