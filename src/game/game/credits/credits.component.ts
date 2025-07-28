import { Component, OnInit } from '@angular/core';

import Phaser from 'phaser';

import {phaserGame,width, height } from './../game.component';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent extends Phaser.Scene implements OnInit {

  backIcon:Phaser.GameObjects.Image | undefined;

  constructor() {
    super({ key: 'credits' });
  }

  ngOnInit() {
  }

  preload(){
    this.load.image('back','../../../assets/icon/BackIcon.png');
  }

  create(){

    if(phaserGame.scale.width > 500){

    this.add.text(phaserGame.scale.width/2-100, 10, 'Créditos', { font: '50px Arial',color:'#000000' });
    this.add.text(phaserGame.scale.width/2-400, 100, 'Criado por Igor Giusti Cardona Alves no Hospital Moinhos de Vento', { font: '25px Arial',color:'#000000' });
    this.backIcon = this.add.image(phaserGame.scale.width/2,200,'back').setName("back").setInteractive();

    }else{
      this.add.text(phaserGame.scale.width/2-100, phaserGame.scale.height/8, 'Créditos', { font: '50px Arial',color:'#000000' });
      this.add.text(phaserGame.scale.width/2-150, phaserGame.scale.height/4, 'Criado por Igor Giusti\nCardona Alves no Hospital\nMoinhos de Vento', { font: '25px Arial',color:'#000000' });
      this.backIcon = this.add.image(phaserGame.scale.width/2,phaserGame.scale.height/2,'back').setName("back").setInteractive();
    }

    this.input
  // .setTopOnly(false) // If you want to check if more than the top most hitbox was clicked
  .on('pointerdown', (pointer: Phaser.Input.Pointer, objectsClicked: Phaser.GameObjects.GameObject[]) => {
    for(let o of objectsClicked){
      if(o.name == "back"){
        this.scene.start('menu');
      }
    }
  })
  }

  override update() {

  }

}
