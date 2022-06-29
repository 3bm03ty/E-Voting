import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminControlComponent } from './components/admin-control/admin-control.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { EditVoterComponent } from './components/edit-voter/edit-voter.component';
import { FoundProfileComponent } from './components/found-profile/found-profile.component';
import { FoundProfileForDeleteComponent } from './components/found-profile-for-delete/found-profile-for-delete.component';
import { AddVoterComponent } from './components/add-voter/add-voter.component';
import { SearchComponent } from './components/search/search.component';
import { SearchForDeleteComponent } from './components/search-for-delete/search-for-delete.component';
import { VotingComponent } from './components/voting/voting.component';
import { SearchForEditComponent } from './components/search-for-edit/search-for-edit.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsComponent } from './components/charts/charts.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { VotersComponent } from './components/voters/voters.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { UploadVotersComponent } from './components/upload-voters/upload-voters.component';
import { OverviewComponent } from './components/overview/overview.component';
import { GeneralComponent } from './components/general/general.component';
import { DatesComponent } from './components/dates/dates.component';
import { DeleteComponent } from './components/delete/delete.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DataTablesModule } from "angular-datatables";
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminControlComponent,
    AdminLoginComponent,
    AuthenticationComponent,
    EditVoterComponent,
    FoundProfileComponent,
    FoundProfileForDeleteComponent,
    AddVoterComponent,
    SearchComponent,
    SearchForDeleteComponent,
    VotingComponent,
    SearchForEditComponent,
    NotFoundComponent,
    NavbarComponent,
    ChartsComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    VotersComponent,
    CandidatesComponent,
    UploadVotersComponent,
    OverviewComponent,
    GeneralComponent,
    DatesComponent,
    DeleteComponent,
    SettingsComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}