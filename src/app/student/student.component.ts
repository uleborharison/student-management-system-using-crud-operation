import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  showAdd: boolean= false;
  showUpdate: boolean = false;

  formValue!: FormGroup;

    constructor(private formBuuilder: FormBuilder) { }

    ngOnInit(): void {
      this.formValue = this.formBuuilder.group({
        name:['', Validators.required],
        email:['', Validators.required],
        mobile:['', Validators.required],
        city:['', Validators.required]
      })
    }
    add(){
      this.showAdd=true;
      this.showUpdate = false
    }

    update(){
      this.showAdd=false;
      this.showUpdate = true
    }

}
