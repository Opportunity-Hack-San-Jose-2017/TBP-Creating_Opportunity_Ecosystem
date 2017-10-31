import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { JobListingComponent } from './job-listing/job-listing.component'
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { HomeComponent } from './home/home.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { EmployersLandingpageComponent } from './employers-landingpage/employers-landingpage.component'

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'setup', component: ProfileSetupComponent },
    { path: 'company/login', component: CompanyHomeComponent },
    { path: 'company/home', component: EmployersLandingpageComponent},
    { path: 'applicant/home', component: UserLandingComponent },
    { path: 'profile/edit', component: EditProfileComponent },
    { path: 'company/opening/create', component: JobListingComponent},
	{ path: '**',   redirectTo: '', pathMatch: 'full' },
	// { path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	],
	providers: [
	]
})
export class AppRoutingModule { }