import {width, height } from './../game.component';
import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';



@Component({
  selector: 'app-preventHints',
  templateUrl: './preventHints.component.html',
  styleUrls: ['./preventHints.component.css']
})
export class PreventHintsComponent extends Phaser.Scene implements OnInit {



  backIcon:Phaser.GameObjects.Image | undefined;

  hintsText:Phaser.GameObjects.Text[] = [];

  constructor() {
    super({ key: 'preventHints' });
  }

  ngOnInit() {
  }

  preload(){
    this.load.image('back','../../../assets/icon/BackIcon.png');
  }

  create(){


    this.add.text(width/2-200, 10, 'Dicas para prevenção', { font: '50px Arial',color:'#000000' });
    this.hintsText=[
    this.add.text(width/2-400, 100, '1.Lavar as mãos;', { font: 'Arial',color:'#000000' }),
   this.add.text(width/2-400, 125, '2.Evitar contato próximo com pessoas doentes;', { font: 'Arial',color:'#000000' }),
   this.add.text(width/2-400, 150, '3.Ficar em casa quando estiver doente;', { font: 'Arial',color:'#000000' }),
    this.add.text(width/2-400, 175, '4.Cobrir boca e nariz ao tossir ou espirrar com um lenço de papel e jogar no lixo;', { font: 'Arial',color:'#000000' }),
   this.add.text(width/2-400, 200, '5.Evitar tocar olhos, boca e nariz;', { font: 'Arial',color:'#000000' }),
    this.add.text(width/2-400, 225, '6.Cuidado em ambientes com aglomeração de pessoas;', { font: 'Arial',color:'#000000' }),
   this.add.text(width/2-400, 250, '7.Uso de máscara e álcool gel;', { font: 'Arial',color:'#000000' }),

    ]

    this.backIcon = this.add.image(width/2,600,'back').setName("back").setInteractive();

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

  override update(){


    for(let i=0;i < this.hintsText.length;i++){
      this.hintsText[i].setFontFamily('Arial');
      this.hintsText[i].setFontSize("20px");
      console.log(this.scale.gameSize)
    }

  }
}
