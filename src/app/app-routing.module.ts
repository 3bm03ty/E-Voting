import { ChartsComponent } from './components/charts/charts.component';
import { ResultsComponent } from './components/results/results.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlComponent } from './components/admin-control/admin-control.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { EditVoterComponent } from './components/edit-voter/edit-voter.component';
import { FoundProfileForDeleteComponent } from './components/found-profile-for-delete/found-profile-for-delete.component';
import { FoundProfileComponent } from './components/found-profile/found-profile.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddVoterComponent } from './components/add-voter/add-voter.component';
import { SearchForDeleteComponent } from './components/search-for-delete/search-for-delete.component';
import { SearchForEditComponent } from './components/search-for-edit/search-for-edit.component';
import { SearchComponent } from './components/search/search.component';
import { VotersComponent } from './components/voters/voters.component';
import { VotingComponent } from './components/voting/voting.component';
import { UploadVotersComponent } from './components/upload-voters/upload-voters.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SettingsComponent } from './components/settings/settings.component';
import { GeneralComponent } from './components/general/general.component';
import { DatesComponent } from './components/dates/dates.component';
import { DeleteComponent } from './components/delete/delete.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'addvoter', component: AddVoterComponent },
  { path: 'voting', component: VotingComponent },
  { path: 'search', component: SearchComponent },
  { path: 'searchforedit', component: SearchForEditComponent },
  { path: 'searchfordelete', component: SearchForDeleteComponent },
  { path: 'foundprofile', component: FoundProfileComponent },
  { path: 'foundprofilefordelete', component: FoundProfileForDeleteComponent },
  { path: 'editvoter', component: EditVoterComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  {
    path: 'admincontrol',
    component: AdminControlComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'overview', component: OverviewComponent },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: '', component: GeneralComponent },
          { path: 'general', component: GeneralComponent },
          { path: 'dates', component: DatesComponent },
          { path: 'delete', component: DeleteComponent },
        ],
      },
      { path: 'candidates', component: CandidatesComponent },
      { path: 'voters', component: VotersComponent },
      { path: 'results', component: ChartsComponent },
      { path: 'charts', component: ChartsComponent },
    ],
  },
  
  { path: 'admindashboard', component: AdminDashboardComponent },
  { path: 'uploadvoter', component: UploadVotersComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
