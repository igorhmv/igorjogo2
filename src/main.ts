import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import { GameModule } from './game/game/game.module';



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GameModule)
  .catch(err => console.log(err));
  defineIonPhaser(window);


