import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Credentials} from '../Layouts/Public/login/login.component';
import {FeatureToggle, Toggle} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturetogglesService {

  constructor(private http: HttpClient) {
  }

  Headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  // get one feature toggle from user, by secretKey
  getStatusOne(loginInformation: Credentials, secretKey: string) {
    const getStatusOneObject = {
      email: loginInformation.email,
      password: loginInformation.password,
      secretKey: secretKey
    };
    return this.http.post<GetStatusOneFeatureToggleStatus>(environment.connectionString + 'featuretoggles/getStatusOne', getStatusOneObject, this.Headers);
  }

  // create new feature toggle on user
  createNew(loginInformation: Credentials) {
    const createNewObject = {
      email: loginInformation.email.toString(),
      password: loginInformation.password.toString()
    };

    return this.http.post<CreateNewFeatureToggleStatus>(environment.connectionString + 'featuretoggles/createNew', createNewObject, this.Headers);
  }

  // update a feature toggle on user by secretKey (Also used for single toggle deletion. Separate endpoint for that could be added later..)
  updateOne(loginInformation: Credentials, secretKey: string, newToggles: Toggle[]) {
    const updateOneObject = {
      email: loginInformation.email,
      password: loginInformation.password,
      secretKey: secretKey,
      toggles: newToggles
    };
    return this.http.post<UpdateOneFeatureToggleStatus>(environment.connectionString + 'featuretoggles/updateOne', updateOneObject, this.Headers);
  }


// remove a feature toggle on user by secretKey
  deleteOne(loginInformation: Credentials, secretKey: string) {
    const deleteOneObject = {
      email: loginInformation.email,
      password: loginInformation.password,
      secretKey: secretKey
    };
    return this.http.post<DeleteOneFeatureToggleStatus>(environment.connectionString + 'featuretoggles/deleteOne', deleteOneObject, this.Headers);
  }
}

interface GetStatusOneFeatureToggleStatus {
  success: boolean;
  msg: string;
  featureToggle: FeatureToggle;
  lastUpdated: Date;
  secretKey: string;
}

export interface CreateNewFeatureToggleStatus {
  success: boolean;
  msg: string;
  secretKey: string;
}

interface UpdateOneFeatureToggleStatus {
  success: boolean;
  msg: string;
  featureToggle: FeatureToggle;
  lastUpdated: Date;
  secretKey: string;
}

interface DeleteOneFeatureToggleStatus {
  success: boolean;
  msg: string;
}
