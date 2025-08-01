import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import {phaserGame,width, height } from './../game.component';
@Component({
  selector: 'app-covidBook',
  templateUrl: './covidBook.component.html',
  styleUrls: ['./covidBook.component.css']
})
export class CovidBookComponent extends Phaser.Scene implements OnInit {

  backIcon:Phaser.GameObjects.Image | undefined;

  constructor() {

    super({ key: 'covidBook' });
   }

  ngOnInit() {
  }

  preload(){
    this.load.image('back','../../../assets/icon/BackIcon.png');
    this.load.image('alpha','../../../assets/alphaVariant.png');
    this.load.image('beta','../../../assets/betaVariant.png');
    this.load.image('gamma','../../../assets/gammaVariant.png');
    this.load.image('delta','../../../assets/deltaVariant.png');

    this.scale.setGameSize(width,height);
  }

  create(){

    if(phaserGame.scale.width > 500){

      this.add.text(phaserGame.scale.width/2-200, 10, 'Livro COVID', { font: '50px Arial',color:'#000000' });

    this.add.text(width/2-400,80,'Confira abaixo pequenos detalhes sobre as variantes do COVID-19:', { font: '25px Arial',color:'#000000' });
    this.add.image(width/4-230,200,'alpha');

    let infoAlpha="Alfa B.1.1.7\nDescoberta em: Reino Unido.\nEfeitos: Até 50% de aumento da transmissão e potencialmente maior gravidade";

    this.add.text(width/4-190,150,infoAlpha.toString(),{ font: '25px Arial',color:'#000000' });

    let infoBeta="Beta B.1.351\nDescoberta em: África do Sul.\nEfeitos: Pensa-se que seja até 50% de aumento da transmissão.";

    this.add.image(width/4-230,300,'beta');
    this.add.text(width/4-190,250,infoBeta.toString(),{ font: '25px Arial',color:'#000000' });

    let infoGamma = "Gamma P.1\nDescoberta em: Brasil e Japão.\nEfeitos: Estudos sugerem que o P1 é 1,7 a 2,4 vezes mais transmissível do que a anterior.";
    this.add.image(width/4-230,400,'gamma');
    this.add.text(width/4-190,350,infoGamma.toString(),{ font: '25px Arial',color:'#000000' });


    let infoDelta = "Delta P.1\nDescoberta em: Índia.\nEfeitos: Mais transmissível do que a deformação original em estudos preliminares.";
    this.add.image(width/4-230,500,'delta');
    this.add.text(width/4-190,450,infoDelta.toString(),{ font: '25px Arial',color:'#000000' });

    this.backIcon = this.add.image(width/2,600,'back').setName("back").setInteractive();
    }else{

      this.add.text(phaserGame.scale.width/2-150, 10, 'Livro COVID', { font: '50px Arial',color:'#000000' });

    this.add.text(phaserGame.scale.width/2-200,phaserGame.scale.height/8-20,'Confira abaixo pequenos detalhes\nsobre as variantes do COVID-19:', { font: '20px Arial',color:'#000000' });
    this.add.image(phaserGame.scale.width/2-170,200,'alpha');

    let infoAlpha="Alfa B.1.1.7\nDescoberta em: Reino Unido.\nEfeitos: Até 50% de aumento da\ntransmissão e potencialmente maior\ngravidade";

    this.add.text(phaserGame.scale.width/2-130,150,infoAlpha.toString(),{ font: '20px Arial',color:'#000000' });

    let infoBeta="Beta B.1.351\nDescoberta em: África do Sul.\nEfeitos: Pensa-se que seja\naté 50% de aumento da transmissão.";

    this.add.image(phaserGame.scale.width/2-170,300,'beta');
    this.add.text(phaserGame.scale.width/2-130,270,infoBeta.toString(),{ font: '20px Arial',color:'#000000' });

    let infoGamma = "Gamma P.1\nDescoberta em: Brasil e Japão.\nEfeitos: Estudos sugerem que o P1\né 1,7 a 2,4 vezes mais transmissível\ndo que a anterior.";
    this.add.image(phaserGame.scale.width/2-170,400,'gamma');
    this.add.text(phaserGame.scale.width/2-130,370,infoGamma.toString(),{ font: '20px Arial',color:'#000000' });


    let infoDelta = "Delta P.1\nDescoberta em: Índia.\nEfeitos: Mais transmissível do que\na deformação original em estudos\npreliminares.";
    this.add.image(phaserGame.scale.width/2-170,520,'delta');
    this.add.text(phaserGame.scale.width/2-130,490,infoDelta.toString(),{ font: '20px Arial',color:'#000000' });

    this.backIcon = this.add.image(phaserGame.scale.width/2,650,'back').setName("back").setInteractive();

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
