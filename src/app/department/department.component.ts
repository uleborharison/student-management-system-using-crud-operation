import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  showAdd: boolean = false;
  showUpdate: boolean = false;

  formValue!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  add() {
    this.showAdd = true;
    this.showUpdate = false;
  }

  update() {
    this.showAdd = false;
    this.showUpdate = true;
  }
}
