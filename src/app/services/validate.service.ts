import {Injectable} from '@angular/core';
import {User} from './auth.service';
import {Credentials} from '../Layouts/Public/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() {
  }

  static validateRegister(user: User) {
    return !(user.name === undefined || user.email === undefined || user.pwHash === undefined);
  }

  static validateLogin(user: Credentials) {
    return !(user.email === undefined || user.password === undefined);
  }

  static validateEmail(email: string) {
    // tslint:disable-next-line:max-line-length
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
  }
}
