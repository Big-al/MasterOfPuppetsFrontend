import {Component, OnInit} from '@angular/core';
import {AuthService, FeatureToggle} from '../../../services/auth.service';
import {FeaturetogglesService} from '../../../services/featuretoggles.service';
import {Credentials} from '../../Public/login/login.component';
import {FormControl, FormGroup} from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private ftservice: FeaturetogglesService,
    private flashMessage: FlashMessagesService,
  ) {
  }

  FeatureTogglesData: Array<FeatureToggle>;
  EditFeatureToggleOptions = new FormGroup({
    Password: new FormControl()
  });

  ngOnInit() {
    this.getUserData();
  }

  private getUserData() {
    this.authService.getProfile().subscribe(data => {
        this.FeatureTogglesData = data.featureToggles;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  CreateNew() {
    if (this.EditFeatureToggleOptions.get('Password').value === null) {
      this.flashMessage.show('Enter your password.', {cssClass: 'alert-danger', timeout: 5000});
      return;
    }

    const userCredentials: Credentials = {
      email: JSON.parse(localStorage.getItem('user')).email,
      password: this.EditFeatureToggleOptions.get('Password').value,
    };
    this.ftservice.createNew(userCredentials).subscribe(
      (data) => {
        console.log(data);
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        }
      },
      (err) => console.error(err),
      () => this.getUserData()
    );
    this.getUserData();
  }

  onFeatureToggleChangedSubmit() {
  }

  DeleteOne(secretKey: string) {
    if (this.EditFeatureToggleOptions.get('Password').value === null) {
      this.flashMessage.show('Enter your password.', {cssClass: 'alert-danger', timeout: 5000});
      return;
    }

    const userCredentials: Credentials = {
      email: JSON.parse(localStorage.getItem('user')).email,
      password: this.EditFeatureToggleOptions.get('Password').value,
    };
    this.ftservice.deleteOne(userCredentials, secretKey).subscribe(
      (data) => {
        console.log(data);
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        }
      },
      (err) => console.error(err),
      () => this.getUserData()
    );
  }
}
