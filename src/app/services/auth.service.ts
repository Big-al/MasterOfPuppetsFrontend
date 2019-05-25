import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {Credentials} from '../Layouts/Public/login/login.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {
  }

  // Calls the API defined in users.js with the register function, adding a user to our mongo db instance
  registerUser(user) {
    const Headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<RegisterStatus>(environment.connectionString + 'users/register', user, Headers);
  }

  // Calls the API defined in users.js with the authenticate function, using findOne to find an instance of the object in our mongo db instance
  authenticateUser(credentials: Credentials) {
    const Headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<AuthenticationStatus>(environment.connectionString + 'users/authenticate', credentials, Headers);
  }

  getProfile() {
    const Headers = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('id_token'), // Get Token containing unique identifier for /getStatus request
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<User>(environment.connectionString + 'users/profile', Headers);
  }

  // locally saves the user data and token
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    if (localStorage.id_token === undefined) {
      return false;
    } else {
      const helper = new JwtHelperService();
      return !helper.isTokenExpired(localStorage.id_token);
    }
  }

  logout() {
    // Clear all stored login values. Clear token.
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

// Interfaces
export interface RegisterStatus {
  success: boolean;
  msg: string;
}

export interface AuthenticationStatus {
  success: boolean;
  msg: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Toggle {
  id: string;
  state: boolean;
}

export interface FeatureToggle {
  toggles?: [Toggle];
  secretKey: string;
}

export interface User {
  name: string;
  email: string;
  pwHash: string;
  featureToggles: FeatureToggle[];
}
