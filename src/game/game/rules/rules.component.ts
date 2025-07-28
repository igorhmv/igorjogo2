import { Component, OnInit } from '@angular/core';

import Phaser from 'phaser';

import {phaserGame,width, height } from './../game.component';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent extends Phaser.Scene implements OnInit {

  backIcon:Phaser.GameObjects.Image | undefined;
  titleText:Phaser.GameObjects.Text | undefined;
  rulesText:Phaser.GameObjects.Text | undefined;

  constructor() {
    super({ key: 'rules' });

   }

  ngOnInit() {
  }

  preload(){
    this.load.image('back','../../../assets/icon/BackIcon.png');
    this.scale.setGameSize(width,height);
  }

  create(){

    if(phaserGame.scale.width > 500){
    this.titleText=this.add.text(phaserGame.scale.width/2-100, 10, 'Regras', { font: '50px Arial',color:'#000000',align:'center' });


    this.rulesText=this.add.text(phaserGame.scale.width/2-500,100,'Coloque álcool gel no caminho dos COVIDs para eliminá-los.\nPegue remédio para aumentar saúde e sprays de álcool gel para usá-lo mais.\nPressione os botões de setas para andar e pressione o botão "A" para despejar álcool gel.',{ font: '25px Arial',color:'#000000' });

    this.backIcon = this.add.image(phaserGame.scale.width/2,600,'back').setName("back").setInteractive();

    }else{
      this.titleText=this.add.text(phaserGame.scale.width/2-100, phaserGame.scale.height/8, 'Regras', { font: '50px Arial',color:'#000000',align:'center' });


      this.rulesText=this.add.text(phaserGame.scale.width/2-150,phaserGame.scale.height/4,'Coloque álcool gel \nno caminho dos COVIDs \npara eliminá-los.\nPegue remédio para aumentar \nsaúde e sprays de \nálcool gel para usá-lo mais.\nPressione os botões de setas \npara andar e pressione\no botão "A" para despejar \nálcool gel.',{ font: '25px Arial',color:'#000000' });

      this.backIcon = this.add.image(phaserGame.scale.width/2,600,'back').setName("back").setInteractive();
    }

    this.input
  // .setTopOnly(false) // If you want to check if more than the top most hitbox was clicked
  .on('pointerdown', (pointer: Phaser.Input.Pointer, objectsClicked: Phaser.GameObjects.GameObject[]) => {
    for(let o of objectsClicked){
      if(o.name == "back"){
        this.scene.start('menu');
      }
    }
  })}

  override update() {
    this.titleText?.setFontSize("50px")
    this.rulesText?.setFontSize("25px")
  }

}
