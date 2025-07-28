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


  textTitle: Phaser.GameObjects.Text | undefined
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
    //this.scale.setGameSize(width,height);
  }

  create(){
    //this.scene.start("MenuComponent");
    //this.scene.remove("LoadingScene");

    this.controls = createControls(this);
    /*
    this.time.addEvent({
      delay: 3000,
      loop: false,

  });*/
  console.log(phaserGame.scale.width);
  const fontSize = Math.round(phaserGame.scale.height * 0.025);

  this.textTitle = this.add.text((phaserGame.scale.width-125)/2, (phaserGame.scale.height)/8, 'Ataque do COVID no\nHospital dos Moinhos', { font: `${fontSize}px`,color:'#000000',align:'center', });

  this.textTitle.setStyle( { font: `${fontSize}px`,color:'#000000',align:'center', })
    .setFontSize(`${fontSize}px Arial`)
    //.setScale(scaleRatio*0.05,scaleRatio*0.05)
    .setPosition((phaserGame.scale.width)/2-this.textTitle.width/2, (phaserGame.scale.height/8-this.textTitle.height/2))
    //.setSize(phaserGame.scale.width/3,phaserGame.scale.height/3)


  this.playIcon = this.add.image((phaserGame.scale.width/2),phaserGame.scale.height/4,'play').setName("play").setInteractive();
  this.rulesIcon = this.add.image((phaserGame.scale.width/2),phaserGame.scale.height*3/8,'rules').setName("rules").setInteractive();
  this.creditsIcon = this.add.image((phaserGame.scale.width/2),phaserGame.scale.height/2,'credits').setName("credits").setInteractive();
  this.covidBookIcon = this.add.image((phaserGame.scale.width/2),phaserGame.scale.height*5/8,'covidBook').setName("covidBook").setInteractive();
  this.preventHintsIcon = this.add.image((phaserGame.scale.width/2),phaserGame.scale.height*6/8,'preventHints').setName("preventHints").setInteractive();


  //this.textTitle.setScale(scaleRatio*0.05,scaleRatio*0.05)

  if(phaserGame.scale.width > 500){



  this.playIcon.setScale(scaleRatio*2,scaleRatio*2);
  this.rulesIcon.setScale(scaleRatio*2,scaleRatio*2);
  this.creditsIcon.setScale(scaleRatio*2,scaleRatio*2);
  this.covidBookIcon.setScale(scaleRatio*2,scaleRatio*2);
  this.preventHintsIcon.setScale(scaleRatio*2,scaleRatio*2);
  }else{
    this.playIcon.setScale(scaleRatio,scaleRatio);
  this.rulesIcon.setScale(scaleRatio,scaleRatio);
  this.creditsIcon.setScale(scaleRatio,scaleRatio);
  this.covidBookIcon.setScale(scaleRatio,scaleRatio);
  this.preventHintsIcon.setScale(scaleRatio,scaleRatio);
  }

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

    console.log(this.textTitle);
  });



  }



  override update(){

    //console.log(phaserGame.scale.width + " x "+phaserGame.scale.height );


    //phaserGame.scale.gameSize.resize(window.innerWidth,window.innerHeight);

    const fontSize = Math.round(phaserGame.scale.height * 0.025);

    this.textTitle?.setText('Ataque do COVID no\nHospital dos Moinhos').setStyle( { font: `${fontSize}px`,color:'#000000',align:'center', })
    .setFontSize(`${fontSize}px Arial`)
    //.setScale(scaleRatio*2,scaleRatio*2)
    .setPosition((phaserGame.scale.width)/2-this.textTitle.width/2, (phaserGame.scale.height/8-this.textTitle.height/2))
    //.setSize(phaserGame.scale.width,phaserGame.scale.height)
    ;

    configControls(this.controls,this);


  }



  resize(){
    //this.textTitle?.setPosition(phaserGame.scale.width/2-250 * scaleRatio, this.getTitleTextY());
    //this.textTitle?.setFontSize(this.getScaleY());
    //this.playIcon;
    //this.rulesIcon;
    //this.creditsIcon;
    //this.covidBookIcon;
    //this.preventHintsIcon;
  }

}
