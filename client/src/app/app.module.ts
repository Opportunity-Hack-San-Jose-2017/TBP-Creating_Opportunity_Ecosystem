import { UploadService } from './common/services/upload.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobsService } from './common/services/jobs.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CompanyHomeComponent } from './company-home/company-home.component';
import { CompanyLoginComponent } from './company-home/company-login/company-login.component';
import { CompanyRegisterComponent } from './company-home/company-register/company-register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EmployersLandingpageComponent } from './employers-landingpage/employers-landingpage.component';
import { FilterComponent } from './user-landing/filter/filter.component';
import { MaterialModule } from './common/material.module';
import { JobsComponent } from './user-landing/jobs/jobs.component';
import { ApplicationsComponent } from './user-landing/applications/applications.component';
import { ApplicationCellComponent } from './user-landing/applications/application-cell/application-cell.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SavedJobsComponent } from './user-landing/saved-jobs/saved-jobs.component';
import { AuthGuard } from './common/guards/auth.guard';
import { JobsPostedComponent } from './employers-landingpage/jobs-posted/jobs-posted.component';
import { EmployerJobCellComponent } from './employers-landingpage/employer-job-cell/employer-job-cell.component';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './common/interceptors/interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileSetupComponent,
    UserLandingComponent,
    JobCellComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    JobCellComponent,
    JobListingComponent,
    CompanyHomeComponent,
    CompanyLoginComponent,
    CompanyRegisterComponent,
    ProfileComponent,
    EditProfileComponent,
    EmployersLandingpageComponent,
    FilterComponent,
    JobsComponent,
    ApplicationsComponent,
    ApplicationCellComponent,
    SideNavComponent,
    SavedJobsComponent,
    JobsPostedComponent,
    EmployerJobCellComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    SearchService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    CompanyService,
    JobsService,
    AuthGuard,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
