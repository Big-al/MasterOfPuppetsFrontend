import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService, User} from '../../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {HelpersService} from '../../../services/helpers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterOptions = new FormGroup({
    Name: new FormControl(),
    Email: new FormControl(),
    Password: new FormControl(),
  });

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private helpers: HelpersService
  ) {
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const newUser: User = {
      name: this.RegisterOptions.get('Name').value,
      email: this.RegisterOptions.get('Email').value,
      pwHash: this.RegisterOptions.get('Password').value,
      featureToggles: [{
        secretKey: this.helpers.newGuid(),
      }] // {toggles: []}
    };
    // console.log(user);

    // Validate all fields
    if (!ValidateService.validateRegister(newUser)) {
      this.flashMessage.show('Please fill out all the fields', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    // Validate email
    if (!ValidateService.validateEmail(newUser.email)) {
      this.flashMessage.show('Your email, ' + newUser.email + ', is not properly formatted', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    console.log(newUser);

    // Register User
    this.authService.registerUser(newUser).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/register']);
      }
    });
  }
  }
