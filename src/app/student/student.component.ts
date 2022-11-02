import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Studentdata } from './student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  showAdd: boolean = false;
  showUpdate: boolean = false;
  studentmodelobj: Studentdata = new Studentdata();
  allstudentdata: any;

  formValue!: FormGroup;

  constructor(private formBuuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.getdata();
  }
  add() {
    this.showAdd = true;
    this.showUpdate = false;
  }

  edit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentmodelobj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['city'].setValue(data.city);
  }

  //update on edit
  update() {
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;
    this.api
      .updatestudent(this.studentmodelobj, this.studentmodelobj.id)
      .subscribe(
        (res) => {
          this.formValue.reset();
          this.getdata();
          alert('Record updated successfully');
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }

  //add student

  addstudent() {
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;
    this.api.poststudent(this.studentmodelobj).subscribe(
      (res) => {
        console.log(res);
        this.formValue.reset();
        this.getdata();
        alert('Record added successfully');
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  //get
  getdata() {
    this.api.getstudent().subscribe((res) => {
      this.allstudentdata = res;
    });
  }

  //delete
  deletestud(data: any) {
    if (confirm('Are you sure to delete?'))
      this.api.deletestudent(data.id).subscribe((res) => {
        alert('Record deleted successfully');
        this.getdata();
      });
  }
}
