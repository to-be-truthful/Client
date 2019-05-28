import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

console.log("To Be Truthful is a final for the AP Computer Science course. Made by Alec Dusheck and Sam Martin (wut?)");
console.log("Good luck debugging lmao! (ur gonna need it)");
console.log("I added an easter egg, find it.");

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
