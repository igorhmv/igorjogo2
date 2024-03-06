import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';

import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonPhaser } from '@ion-phaser/core';

/*
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GameComponent]
})
export class GameModule { }
*/


@NgModule({
  declarations: [GameComponent],
  imports: [BrowserModule],
  bootstrap: [GameComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class GameModule {




}
