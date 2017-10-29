import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SearchService } from './search.service'; 
import { CompanyService } from './company.service';
import { HttpModule } from '@angular/http';
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
>>>>>>> ce7d4331076a6e4796e388e4b1cae357be835117

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileSetupComponent,
<<<<<<< HEAD
    UserLandingComponent
=======
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent
>>>>>>> ce7d4331076a6e4796e388e4b1cae357be835117
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpModule
  ],
  providers: [UserService, SearchService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
