import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {NavbarComponent} from './Layouts/CommonModules/navbar/navbar.component';
import {LoginComponent} from './Layouts/Public/login/login.component';
import {RegisterComponent} from './Layouts/Public/register/register.component';
import {HomeComponent} from './Layouts/home/home.component';
import {DashboardComponent} from './Layouts/LoggedIn/dashboard/dashboard.component';
import {ProfileComponent} from './Layouts/LoggedIn/profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FeaturetogglesService} from './services/featuretoggles.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './guards/auth.guards';
import {DocumentationComponent} from './Layouts/Public/documentation/documentation.component';
import {FeatureToggleComponent } from './Layouts/LoggedIn/dashboard/Components/feature-toggle/feature-toggle.component';
import { NotfoundComponent } from './Layouts/Public/notfound/notfound.component';

// Routing should be separated.
const appRoutes: Routes = [
  {path: '', component: HomeComponent}, // default
  {path: '404', component: NotfoundComponent}, // 404 Not Found
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'documentation', component: DocumentationComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/:secretKey', component: FeatureToggleComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '404'}, // Wildcard
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    DocumentationComponent,
    FeatureToggleComponent,
    NotfoundComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, AuthService, FeaturetogglesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
