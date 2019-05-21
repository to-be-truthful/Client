import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'app',
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
                path: 'login',
                children: [
                    {
                        path: '',
                        loadChildren: '../login/login.module#LoginPageModule'
                    }
                ]
            },
            {
                path: 'logout',
                children: [
                    {
                        path: '',
                        loadChildren: '../logout/logout.module#LogoutPageModule'
                    }
                ],
            },
            {
                path: 'register',
                children: [
                    {
                        path: '',
                        loadChildren: '../register/register.module#RegisterPageModule'
                    }
                ]
            },
            {
                path: 'view/:id',
                children: [
                    {
                        path: '',
                        loadChildren: '../view/view.module#ViewPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/app/home',
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
