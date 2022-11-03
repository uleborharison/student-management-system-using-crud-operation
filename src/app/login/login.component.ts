import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //login function
  login() {
    this._http.get<any>('http://localhost:3000/signup').subscribe(
      (res) => {
        //match email and password
        const user = res.find((a: any) => {
          return (
            a.email === this.loginform.value.email &&
            a.password === this.loginform.value.password
          );
        });
        //condition for login
        if (user) {
          alert('successfully logged in');
          this.loginform.reset();
          this.router.navigate(['student']);
        } else {
          alert('user not found with these credentials');
        }
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }
}
