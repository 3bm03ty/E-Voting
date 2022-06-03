import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { EditVoterComponent } from './edit-voter/edit-voter.component';
import { FoundProfileComponent } from './found-profile/found-profile.component';
import { FoundProfileForDeleteComponent } from './found-profile-for-delete/found-profile-for-delete.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { SearchForDeleteComponent } from './search-for-delete/search-for-delete.component';
import { VotingComponent } from './voting/voting.component';
import { SearchForEditComponent } from './search-for-edit/search-for-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsComponent } from './charts/charts.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { VotersComponent } from './voters/voters.component';
import { CandidatesComponent } from './candidates/candidates.component';




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
    RegisterComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
