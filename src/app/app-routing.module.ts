import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RouterModule, Routes } from '@angular/router';
import { DiaryEditComponent } from './diary/diary-edit/diary-edit.component';
import { HomeComponent } from './diary/home/home.component';
import { DailyReportsComponent } from './diary/daily-reports/daily-reports.component';
import {DailyCreateComponent} from './diary/daily-create/daily-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  { path: 'diary/edit', component: DiaryEditComponent },
  { path: 'diary', component: HomeComponent },
  { path: 'diary/:id', component: DailyReportsComponent },
  { path: 'diary/:id/create', component: DailyCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
