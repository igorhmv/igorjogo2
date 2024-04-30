import { GameComponent,width,height,scaleRatio } from './../game.component';

import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { MainScene } from '../MainScene/MainScene';

import {config,phaserGame,resize} from '../game.component'
import { initialize } from '@ionic/core';
import { sanitizeIdentifier } from '@angular/compiler';

const configControls = (

  controls: Phaser.Types.Input.Keyboard.CursorKeys,
  scene: Phaser.Scene,

): void => {
  if (controls.space.isDown ){

    scene.scene.start('main');

  }
}

const createControls = (
  scene: Phaser.Scene
): Phaser.Types.Input.Keyboard.CursorKeys => {

  return scene.input.keyboard.createCursorKeys();

};




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})


export class MenuComponent extends Phaser.Scene implements OnInit  {

  initialize = () => {
    Phaser.Scene.call(this, { "key": "menu" });
  }

  controls: any | undefined | null;
  constructor() {
    super({ key: 'menu' });



  }
  playIcon:Phaser.GameObjects.Image | undefined;
  rulesIcon:Phaser.GameObjects.Image | undefined;
  creditsIcon:Phaser.GameObjects.Image | undefined;
  covidBookIcon:Phaser.GameObjects.Image | undefined;
  preventHintsIcon:Phaser.GameObjects.Image | undefined;

  ngOnInit() {

  }
  preload(){
    this.load.image('play','../../../assets/icon/PlayIcon.png');
    this.load.image('rules','../../../assets/icon/RulesIcon.png');
    this.load.image('credits','../../../assets/icon/CreditsIcon.png');
    this.load.image('covidBook','../../../assets/icon/CovidBookIcon.png');
    this.load.image('preventHints','../../../assets/icon/PreventHintsIcon.png');

   //var widthX=window.innerWidth*window.devicePixelRatio;
//var heightX=window.innerHeight* window.devicePixelRatio;
    this.scale.setGameSize(width,height);
  }

  create(){


    this.controls = createControls(this);
    /*
    this.time.addEvent({
      delay: 3000,
      loop: false,

  });*/
  this.add.text((width/2-250), 50, 'Ataque do COVID no\nHospital dos Moinhos', { font: '50px Arial',color:'#000000',align:'center', });
  this.playIcon = this.add.image((width/2),200,'play').setName("play").setInteractive();
  this.rulesIcon = this.add.image((width/2),300,'rules').setName("rules").setInteractive();
  this.creditsIcon = this.add.image((width/2),400,'credits').setName("credits").setInteractive();
  this.covidBookIcon = this.add.image((width/2),500,'covidBook').setName("covidBook").setInteractive();
  this.preventHintsIcon = this.add.image((width/2),600,'preventHints').setName("preventHints").setInteractive();

  this.playIcon.setScale(scaleRatio*2,scaleRatio*2);
  this.rulesIcon.setScale(scaleRatio*2,scaleRatio*2);
  this.creditsIcon.setScale(scaleRatio*2,scaleRatio*2);
  this.covidBookIcon.setScale(scaleRatio*2,scaleRatio*2);
  this.preventHintsIcon.setScale(scaleRatio*2,scaleRatio*2);


  this.input
  // .setTopOnly(false) // If you want to check if more than the top most hitbox was clicked
  .on('pointerdown', (pointer: Phaser.Input.Pointer, objectsClicked: Phaser.GameObjects.GameObject[]) => {
    for(let o of objectsClicked){
      if(o.name == "play"){

        this.scene.start('main');
        //resize();
        //this.scene.start('main');


      }else if(o.name == "rules"){
        this.scene.start('rules');
      }else if(o.name == "credits"){
        this.scene.start('credits');
      }else if(o.name == "covidBook"){
        this.scene.start('covidBook');
      }else if(o.name == "preventHints"){
        this.scene.start('preventHints');
      }
    }


  });



  }



  override update(){

    //console.log(phaserGame.scale.width + " x "+phaserGame.scale.height );


    //phaserGame.scale.gameSize.resize(window.innerWidth,window.innerHeight);



    configControls(this.controls,this);


  }
}
