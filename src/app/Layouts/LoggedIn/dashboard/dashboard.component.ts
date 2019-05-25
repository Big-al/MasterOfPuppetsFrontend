import {Component, OnInit} from '@angular/core';
import {AuthService, FeatureToggle} from '../../../services/auth.service';
import {FeaturetogglesService} from '../../../services/featuretoggles.service';
import {Credentials} from '../../Public/login/login.component';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private ftservice: FeaturetogglesService) {
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
    const userCredentials: Credentials = {
      email: JSON.parse(localStorage.getItem('user')).email,
      password: this.EditFeatureToggleOptions.get('Password').value,
    };
    this.ftservice.createNew(userCredentials);
  }

  onFeatureToggleChangedSubmit() {

  }

  DeleteOne(secretKey: string) {
    const userCredentials: Credentials = {
      email: JSON.parse(localStorage.getItem('user')).email,
      password: this.EditFeatureToggleOptions.get('Password').value,
    };
    this.ftservice.deleteOne(userCredentials, secretKey);
  }
}
