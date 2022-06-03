import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { EditVoterComponent } from './edit-voter/edit-voter.component';
import { FoundProfileForDeleteComponent } from './found-profile-for-delete/found-profile-for-delete.component';
import { FoundProfileComponent } from './found-profile/found-profile.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SearchForDeleteComponent } from './search-for-delete/search-for-delete.component';
import { SearchForEditComponent } from './search-for-edit/search-for-edit.component';
import { SearchComponent } from './search/search.component';
import { VotersComponent } from './voters/voters.component';
import { VotingComponent } from './voting/voting.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'voting', component: VotingComponent },
  { path: 'search', component: SearchComponent },
  { path: 'searchforedit', component: SearchForEditComponent },
  { path: 'searchfordelete', component: SearchForDeleteComponent },
  { path: 'foundprofile', component: FoundProfileComponent },
  { path: 'foundprofilefordelete', component: FoundProfileForDeleteComponent },
  { path: 'editvoter', component: EditVoterComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'admincontrol', component: AdminControlComponent},
  { path: 'candidates', component: CandidatesComponent},
  { path: 'admindashboard', component: AdminDashboardComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
