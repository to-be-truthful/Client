import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PlayPage} from './play.page';
import {AngularFittextModule} from "angular-fittext";

const routes: Routes = [
    {
        path: '',
        component: PlayPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        AngularFittextModule
    ],
    declarations: [PlayPage]
})
export class PlayPageModule {
}
