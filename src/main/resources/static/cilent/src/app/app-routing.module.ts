import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLandingComponent } from './user-landing/user-landing.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'setup', component: HomeComponent },
	{ path: '**',   redirectTo: '', pathMatch: 'full' },
	{ path: 'jobs', component: UserLandingComponent },
	// { path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			appRoutes,
			{
				// enableTracing: true, // <-- debugging purposes only
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