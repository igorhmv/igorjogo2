import { PreventHintsComponent } from './preventHints/preventHints.component';
import { CovidBookComponent } from './covidBook/covidBook.component';
import { GameoverComponent } from './gameover/gameover.component';
import { CreditsComponent } from './credits/credits.component';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './../../app/app.component';
import { Component, input, OnInit } from '@angular/core';
import { MainScene } from 'src/game/game/MainScene/MainScene';

import Phaser, { NONE, Scene } from 'phaser';
import { RulesComponent } from './rules/rules.component';
import { DOCUMENT } from '@angular/common';


import { ScreenOrientation } from '@capacitor/screen-orientation';




// Aspect Ratio 16:9 - Portrait
const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 1080
const MIN_SIZE_WIDTH_SCREEN =270
const MIN_SIZE_HEIGHT_SCREEN = 480
const SIZE_WIDTH_SCREEN = 540
const SIZE_HEIGHT_SCREEN = 960

export var config: Phaser.Types.Core.GameConfig



export var width=window.innerWidth*window.devicePixelRatio;
export var height=window.innerHeight* window.devicePixelRatio;

export var scaleRatio = window.devicePixelRatio / 3;




config= {

  type: Phaser.CANVAS,
 height: SIZE_HEIGHT_SCREEN,//window.innerHeight* window.devicePixelRatio,
  width:SIZE_WIDTH_SCREEN,//window.innerWidth* window.devicePixelRatio,

  scene: [MenuComponent,RulesComponent,CreditsComponent,CovidBookComponent,PreventHintsComponent,MainScene,GameoverComponent],
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    },

  },
  backgroundColor: '#FFFFFF',

  scale: {
    mode: Phaser.Scale.FIT,//Phaser.Scale.FIT,
    parent: 'game',
    height: SIZE_HEIGHT_SCREEN,//SIZE_HEIGHT_SCREEN,
    width: SIZE_WIDTH_SCREEN,//SIZE_WIDTH_SCREEN,


    min: {
        width: MIN_SIZE_WIDTH_SCREEN,
        height: MIN_SIZE_HEIGHT_SCREEN
    },
    max: {
        width: MAX_SIZE_WIDTH_SCREEN,
        height: MAX_SIZE_HEIGHT_SCREEN
    },
    autoCenter: Phaser.Scale.CENTER_BOTH

},

};

export var phaserGame:Phaser.Game//= new Phaser.Game(config);

export function resize() {
  let game_ratio = 540 / 960
  let window_ratio = window.innerWidth / window.innerHeight
  let container = phaserGame.canvas;
  console.log(screen.width + ' x '+screen.height);
  if(container != null){

  if (window_ratio > game_ratio) {
    //container.style.width = window.innerWidth* window.devicePixelRatio + 'px'
  container.style.height = window.innerHeight* window.devicePixelRatio + 'px'

  } else if (window_ratio < game_ratio) {

  container.style.width = window.innerWidth* window.devicePixelRatio + 'px'
  //container.style.height = window.innerHeight* window.devicePixelRatio + 'px'

  }else{
    //container.style.height = window.innerHeight + 'px'

    //container.style.width = window.innerWidth + 'px'
    //container.style.height = window.innerHeight + 'px'
  }
  /*
  if(phaserGame.scale.isGamePortrait){
    console.log('portrait'+ phaserGame.renderer.width.toString()+'x'+phaserGame.renderer.height.toString());
    //phaserGame.canvas.style.width=screen.width.toString()//screen.width + 'px'
    //phaserGame.canvas.style.height=screen.height.toString()//screen.height + 'px'
    //phaserGame.scale.resize(1,1);


    //phaserGame.renderer.resize(window.innerWidth* window.devicePixelRatio,window.innerHeight* window.devicePixelRatio);
phaserGame.renderer.resize(screen.width,screen.height);

    console.log('portrait'+ phaserGame.renderer.width.toString()+'x'+phaserGame.renderer.height.toString());
  }else{
    console.log('no portrait'+ phaserGame.renderer.width.toString()+'x'+phaserGame.renderer.height.toString());
    //phaserGame.canvas.style.width=screen.width.toString()//screen.width + 'px'
    //phaserGame.canvas.style.height=screen.height.toString()//screen.height + 'px'
    //phaserGame.scale.resize(1,1);
    //phaserGame.renderer.resize(window.innerWidth* window.devicePixelRatio,window.innerHeight* window.devicePixelRatio);
   phaserGame.renderer.resize(screen.width,screen.height);

   console.log('no portrait'+ phaserGame.renderer.width.toString()+'x'+phaserGame.renderer.height.toString());
  }
*/
  }
}



window.addEventListener('resize', resize)

let context;
window.onload = function() {
    context = new AudioContext();

}



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent extends Phaser.Scene implements OnInit {

  music:any = null;

  public phaserGame:Phaser.Game =new Phaser.Game(config);

  static worldWidth = 0

  override update() {
    this.lockOrientation();
    //resize();


    //width=window.innerHeight* window.devicePixelRatio;
  //height=window.innerHeight* window.devicePixelRatio;

    //scaleRatio = window.devicePixelRatio / 3;
    //phaserGame.scale.displaySize.setAspectRatio( width/height );
    //phaserGame.scale.refresh();

  }

  preload(){
    width=window.innerWidth*window.devicePixelRatio;
  height=window.innerHeight* window.devicePixelRatio;
  scaleRatio = window.devicePixelRatio / 3;
    //this.scale.setGameSize(width,height);
    //phaserGame.scale.setGameSize(screen.width,screen.height);
    //resize();
  }


  async lockOrientation(){
    await ScreenOrientation.lock({ orientation: 'portrait' });
  }


  ngOnInit() {
    //width=window.innerHeight* window.devicePixelRatio;
    //height=window.innerHeight* window.devicePixelRatio;
    //width=window.innerHeight* window.devicePixelRatio;
  //height=window.innerHeight* window.devicePixelRatio;
    this.lockOrientation();
  }

  initialize: boolean = true;

  constructor(){
    super('app-game');
    //phaserGame= new Phaser.Game(config);



    this.game = phaserGame;
    phaserGame = this.phaserGame;

    //resize();

    //phaserGame.canvas.onresize=resize;

    //width=window.innerHeight* window.devicePixelRatio;
    //height=window.innerHeight* window.devicePixelRatio;

      //scaleRatio = window.devicePixelRatio / 3;
      //phaserGame.scale.displaySize.setAspectRatio( width/height );
      //phaserGame.scale.refresh();

  }

  create() {


    //width=window.innerHeight* window.devicePixelRatio;
    //height=window.innerHeight* window.devicePixelRatio;
    //width=window.innerHeight* window.devicePixelRatio;
  //height=window.innerHeight* window.devicePixelRatio;
  }


   getGame(): Phaser.Game
  {return this.phaserGame;}


}


