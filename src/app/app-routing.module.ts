import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './components/tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: './components/home/home.module#HomePageModule' },
  { path: 'friends', loadChildren: './components/friends/friends.module#FriendsPageModule' },
  { path: 'play', loadChildren: './components/play/play.module#PlayPageModule' },
  { path: 'account', loadChildren: './components/account/account.module#AccountPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
