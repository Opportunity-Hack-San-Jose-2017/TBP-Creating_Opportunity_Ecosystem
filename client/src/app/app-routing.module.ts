import { JobsPostedComponent } from './employers-landingpage/jobs-posted/jobs-posted.component';
import { ApplicantsComponent } from './employers-landingpage/applicants/applicants.component';
import { ApplicationsComponent } from './user-landing/applications/applications.component';
import { JobsComponent } from './user-landing/jobs/jobs.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { JobListingComponent } from './job-listing/job-listing.component'
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { HomeComponent } from './home/home.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { EmployersLandingpageComponent } from './employers-landingpage/employers-landingpage.component'
import { ProfileComponent } from './profile/profile.component'
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CandidatesComponent } from './employers-landingpage/candidates/candidates.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'setup', component: ProfileSetupComponent },
    { path: 'co', component: CompanyHomeComponent },
    { path: 'company', component: EmployersLandingpageComponent, children: [
		{ path: 'jobs', component: JobsPostedComponent, pathMatch: 'full' },
		{ path: 'candidates', component: CandidatesComponent },
		{ path: 'jobs/:id', component: ApplicantsComponent },
		{ path: '', redirectTo: 'jobs', pathMatch: 'full' },
	]},
    { path: 'company/opening/create', component: JobListingComponent},
	{ path: 'profile/edit', component: EditProfileComponent, pathMatch: 'full' },
	{ path: 'profile/:id', component: ProfilePageComponent },
    { path: 'applicant', component: UserLandingComponent, children: [
		{ path: '', component: JobsComponent, pathMatch: 'full' },
		{ path: 'jobs/applied', component: ApplicationsComponent, pathMatch: 'full' }
	] },
	{ path: 'applicant/profile', component: ProfileComponent },
	{ path: '**',   redirectTo: '', pathMatch: 'full' },
	// { path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			appRoutes,
			{
				enableTracing: true, // <-- debugging purposes only
				// preloadingStrategy: SelectivePreloadingStrategy,
			}
		)
	],
	exports: [
		RouterModule
	],
	providers: [
	]
})
export class AppRoutingModule { }