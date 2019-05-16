import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../home/home.module#HomePageModule'
                    }
                ]
            },
            {
                path: 'play',
                children: [
                    {
                        path: '',
                        loadChildren: '../play/play.module#PlayPageModule'
                    }
                ]
            },
            {
                path: 'friends',
                children: [
                    {
                        path: '',
                        loadChildren: '../friends/friends.module#FriendsPageModule'
                    }
                ]
            },
            {
                path: 'account',
                children: [
                    {
                        path: '',
                        loadChildren: '../account/account.module#AccountPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
