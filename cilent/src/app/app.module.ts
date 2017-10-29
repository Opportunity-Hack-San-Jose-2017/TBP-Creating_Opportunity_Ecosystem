import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserService } from './common/services/user.service';
import { StepOneComponent } from './profile-setup/step-one/step-one.component';
import { StepTwoComponent } from './profile-setup/step-two/step-two.component';
import { StepThreeComponent } from './profile-setup/step-three/step-three.component';
import { SearchService } from './common/services/search.service';
import { CompanyService } from './common/services/company.service';
import { JobCellComponent } from './user-landing/job-cell/job-cell.component';
import { JobListingComponent } from './job-listing/job-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileSetupComponent,
    UserLandingComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    JobCellComponent,
    JobListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    SearchService,
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
