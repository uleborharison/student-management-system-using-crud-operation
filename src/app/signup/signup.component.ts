import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupform!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  //creation of user
  signup() {
    this._http
      .post('http://localhost:3000/signup', this.signupform.value)
      .subscribe(
        (res) => {
          alert('student registered successfully');
          this.signupform.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          alert('something went wrong');
        }
      );
  }
}
