import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { JobListingComponent } from './job-listing/job-listing.component'
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { HomeComponent } from './home/home.component';
import { UserLandingComponent } from './user-landing/user-landing.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'setup', component: ProfileSetupComponent },
    { path: 'company', component: CompanyHomeComponent },
    { path: 'jobs', component: UserLandingComponent },
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