import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) {
  }

  email: string;
  password: string;

  ngOnInit() {
  }

  onLogInSubmit() {
    const loginCredentials: Credentials = {
      email: this.email,
      password: this.password
    };

    // Validate fields
    if (!ValidateService.validateLogin(loginCredentials)) {
      this.flashMessage.show('Please fill out all the fields', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    // Validate email
    if (!ValidateService.validateEmail(loginCredentials.email)) {
      this.flashMessage.show('Your email, ' + loginCredentials.email + ', is not properly formatted', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    this.authService.authenticateUser(loginCredentials).subscribe(data => {
      console.log(data);
      if (data.success === true) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }

}

export interface Credentials {
  email: string;
  password: string;
}
