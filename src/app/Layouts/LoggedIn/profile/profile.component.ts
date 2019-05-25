import {Component, OnInit} from '@angular/core';
import {AuthService, User} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  UserData: User;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.getUserData();
  }

  private getUserData() {
    this.authService.getProfile().subscribe(data => {
        this.UserData = data;
      },
      err => {
        console.log(err);
        return false;
      });
  }
}
