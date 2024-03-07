import { PreventHintsComponent } from './preventHints/preventHints.component';
import { CovidBookComponent } from './covidBook/covidBook.component';
import { GameoverComponent } from './gameover/gameover.component';
import { CreditsComponent } from './credits/credits.component';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './../../app/app.component';
import { Component, OnInit } from '@angular/core';
import { MainScene } from 'src/game/game/MainScene/MainScene';

import Phaser, { NONE, Scene } from 'phaser';
import { RulesComponent } from './rules/rules.component';

// Aspect Ratio 16:9 - Portrait
const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 1080
const MIN_SIZE_WIDTH_SCREEN =270
const MIN_SIZE_HEIGHT_SCREEN = 480
const SIZE_WIDTH_SCREEN = 540
const SIZE_HEIGHT_SCREEN = 960

export var config: Phaser.Types.Core.GameConfig



export var width=screen.width//window.innerHeight* window.devicePixelRatio;
export var height=screen.height//window.innerHeight* window.devicePixelRatio;

export var scaleRatio = window.devicePixelRatio / 3;


config= {

  type: Phaser.CANVAS,
  height: height,//window.innerHeight* window.devicePixelRatio,
  width: width,//window.innerWidth* window.devicePixelRatio,

  scene: [MenuComponent,RulesComponent,CreditsComponent,CovidBookComponent,PreventHintsComponent,MainScene,GameoverComponent],
  parent: 'gameContainer',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    },

  },
  backgroundColor: '#FFFFFF',

  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game',
    height: height,
    width: width,


    min: {
        width: MIN_SIZE_WIDTH_SCREEN,
        height: MIN_SIZE_HEIGHT_SCREEN
    },
    max: {
        width: MAX_SIZE_WIDTH_SCREEN,
        height: MAX_SIZE_HEIGHT_SCREEN
    },
    autoCenter: Phaser.Scale.CENTER_BOTH,

},
};

export var phaserGame:Phaser.Game//= new Phaser.Game(config);





@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent extends Phaser.Scene implements OnInit {

  public phaserGame:Phaser.Game =new Phaser.Game(config);

  static worldWidth = 0

  override update() {
    width=screen.width//window.innerHeight* window.devicePixelRatio;
  height=screen.height//window.innerHeight* window.devicePixelRatio;

    scaleRatio = window.devicePixelRatio / 3;


  }







  ngOnInit() {
    //width=window.innerHeight* window.devicePixelRatio;
    //height=window.innerHeight* window.devicePixelRatio;
    width=screen.width//window.innerHeight* window.devicePixelRatio;
  height=screen.height//window.innerHeight* window.devicePixelRatio;
  }

  initialize: boolean = true;

  constructor(){
    super('app-game');
    //phaserGame= new Phaser.Game(config);
    this.game = phaserGame;

  }

  create() {
    //width=window.innerHeight* window.devicePixelRatio;
    //height=window.innerHeight* window.devicePixelRatio;
    width=screen.width//window.innerHeight* window.devicePixelRatio;
  height=screen.height//window.innerHeight* window.devicePixelRatio;
  }

  getGame(){

    return phaserGame;
  }



}


