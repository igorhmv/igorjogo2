import { MenuComponent } from './../menu/menu.component';
import {width, height,phaserGame ,config, GameComponent} from './../game.component';
import { MainScene } from 'src/game/game/MainScene/MainScene';
import { Component, OnInit } from '@angular/core';

import Phaser, { Scenes } from 'phaser';
import {score} from '../MainScene/MainScene';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameoverComponent extends Phaser.Scene implements OnInit {



  tryAgainIcon:Phaser.GameObjects.Image | undefined;
  giveUpIcon:Phaser.GameObjects.Image | undefined;

  constructor() {

    super({ key: 'gameOver' });
   }

  ngOnInit() {
    this.create();
  }

  preload(){
    this.load.image('tryAgain','../../../assets/icon/TryAgainIcon.png');
    this.load.image('giveUp','../../../assets/icon/GiveUpIcon.png');
  }

  create(){
    this.add.text(width/2-200, 10, 'Fim de Jogo', { font: '50px Arial',color:'#000000' });
    this.add.text(width/2-200, 100, 'Pontuação: '+MainScene.getScore().toString(), { font: '30px Arial',color:'#000000' });
    this.tryAgainIcon = this.add.image(width/2,200,'tryAgain').setName("tryAgain").setInteractive();
    this.giveUpIcon = this.add.image(width/2,400,'giveUp').setName("giveUp").setInteractive();

    this.input
  // .setTopOnly(false) // If you want to check if more than the top most hitbox was clicked
  .on('pointerdown', (pointer: Phaser.Input.Pointer, objectsClicked: Phaser.GameObjects.GameObject[]) => {
    for(let o of objectsClicked){
      if(o.name == "tryAgain"){
        MainScene.resetScore();



       this.scene.start('main');


      }else if(o.name == "giveUp"){
        MainScene.resetScore();




         this.scene.stop('gameOver').run('menu');

      }
    }
  })
  }

  override update() {

  }

}
function args(args: any, arg1: string) {
  throw new Error('Function not implemented.');
}

