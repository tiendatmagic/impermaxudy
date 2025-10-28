import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ContactComponent } from './page/contact/contact.component';
import { TutorialComponent } from './page/tutorial/tutorial.component';
import { AccountComponent } from './page/account/account.component';
import { RewardHistoryComponent } from './page/reward-history/reward-history.component';
import { ViewHistoryComponent } from './page/view-history/view-history.component';
import { RewardComponent } from './page/reward/reward.component';
import { HistoryComponent } from './page/history/history.component';
import { WhitepaperComponent } from './page/whitepaper/whitepaper.component';
import { HelpComponent } from './page/help/help.component';
import { LanguageComponent } from './page/language/language.component';
import { AdminComponent } from './page/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'view-history',
    component: ViewHistoryComponent,
  },
  {
    path: 'reward-history',
    component: RewardHistoryComponent,
  },
  {
    path: 'reward',
    component: RewardComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'whitepaper',
    component: WhitepaperComponent,
  },
  {
    path: 'help/:id',
    component: HelpComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'language',
    component: LanguageComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'tutorial',
    component: TutorialComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
