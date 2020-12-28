import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private router: Router,
    private loginService: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    (this.loginService.authenticate(this.username, this.password).subscribe(
      data => {
        this.loginSuccess = true;
        this.invalidLogin = false;
        this.successMessage = 'Login Successful.';
        this.router.navigate(['/creatives']);
      },
      error => {
        this.invalidLogin = true;

      }
    )
    );

  }
}
