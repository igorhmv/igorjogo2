import { phaserGame, width, height, scaleRatio } from './../game.component';

import { booleanAttribute, destroyPlatform, numberAttribute } from '@angular/core';
import { Collision } from 'matter';
import Phaser, { GameObjects,Sound } from 'phaser';
import { GameComponent } from '../game.component';

var music:any = null;

export var score = 0;
export var bottles:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];
export var remedies:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];
export var covidVariants:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];
const  down = 0,up =1, right=2,left = 3;

var covids: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]=[];

var isDown = false;
var isUp = false;
var isLeft = false;
var isRight=false;
var isAction=false;

var upArrow:Phaser.GameObjects.Image;
var downArrow:Phaser.GameObjects.Image;
var rightArrow:Phaser.GameObjects.Image;
var leftArrow:Phaser.GameObjects.Image;
var actionButton:Phaser.GameObjects.Image;

var alcoolSprays:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]=[];

export var wave = 0;
var timer;

export var player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
export var textScore:any;
var textAmmo:any;
var playerStatus = {

  attacking: false,
  side: 0,
  health:100,
  alcoolAmmo: 10
}

var virusSpd = 50;

const createControls = (
  scene: Phaser.Scene
): Phaser.Types.Input.Keyboard.CursorKeys => {

  var controls = scene.input.keyboard.createCursorKeys();

  return controls;
};



const loadFirstViruses = (
  scene: Phaser.Scene
) => {

  var covids:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];
  let a=scene.physics.add.sprite(200,200, "covid").setScale(0.5,0.5);
  covids.push(a);
  a=scene.physics.add.sprite((width-200),200, "covid").setScale(0.5,0.5);
  covids.push(a);
  a=scene.physics.add.sprite(200,(height-200), "covid").setScale(0.5,0.5)
  covids.push(a);
  a=scene.physics.add.sprite((width-200),(height-200), "covid").setScale(0.5,0.5)
  covids.push(a);

  return covids;
};

var restartPlayer = (scene:Phaser.Scene)=> {
  playerStatus.health = 100;
    playerStatus.alcoolAmmo = 10;
    score = 0;
    wave = 0;

}



var createPlayer = (scene: Phaser.Scene) => {
  var player = scene.physics.add.sprite(width/2,height/2, "medic");//.setScale(2,2);
  return player;
}

const configControls = (
  player:any,
  controls: Phaser.Types.Input.Keyboard.CursorKeys,
  scene: Phaser.Scene,
  speed:any,
  covids:any,
  alcoolSprays:any[]
): void => {
  player.setVelocity(0);
  if ((controls.down.isDown || ( isDown)) && player.y < height) {

    player.setVelocityY(speed);
    playerStatus.side=down;
    //isDown=false;
    //return;
  }
  else if ((controls.up.isDown || isUp) && player.y > 0) {
    player.setVelocityY(-speed);
    playerStatus.side=up;
    //isUp=false;
    //return;
  }

  if ((controls.right.isDown || isRight) && player.x < width) {
    player.setVelocityX(speed);
    playerStatus.side=right;
    //isRight=false;
    //return;
  }
  else if ((controls.left.isDown || isLeft) && player.x > 0) {
    player.setVelocityX(-speed);
    playerStatus.side=left;
    //isLeft=false;
    //return;
  }
  if((controls.space.isDown || isAction)){

    attackA(scene,player,covids,alcoolSprays);
    //return;
  }else{
    playerStatus.attacking=false;
  }
};

const attackA = (game:Phaser.Scene,player:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  covids:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[],
  alcoolSprays:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]): void => {
  if( !playerStatus.attacking && playerStatus.alcoolAmmo > 0){
    playerStatus.attacking=true;
    isAction=false;
    var x = game.physics.add.sprite(player.x,player.y,"spray");



    alcoolSprays.push(x)
    playerStatus.alcoolAmmo -= 1;

    if(playerStatus.alcoolAmmo <= 0){

      var deltaX = 0;
      var deltaY = 0;
      if(player.x < width/2){
        deltaX = 100;

      }else{
        deltaX = -100;
      }
      if(player.y < height/2){
        deltaY = 100;

      }else{
        deltaY = -100;
      }
      var a = game.physics.add.sprite(player.x+deltaX,player.y+deltaY, "bottle")
      bottles.push(a);
    }
  }

}

function updatePlayer(scene: Phaser.Scene,player:any,covids:any, a:any){

  for(let i = 0; i < bottles.length; i++){
    if(scene.physics.collide(player,bottles[i])){

          playerStatus.alcoolAmmo = 10;
          bottles[i].destroy();
          bottles.splice(i);


    }
  }

  for(let i = 0; i < remedies.length; i++){
    if(scene.physics.collide(player,remedies[i])){
      if(playerStatus.health + 10 < 100){
          playerStatus.health += 10;

      }else{
        playerStatus.health = 100;
      }
      remedies[i].destroy();
      remedies.splice(i);
    }
  }

  for(let i=0;i < covidVariants.length;i++){

    if(scene.physics.collide(player,covidVariants[i])){

      if(playerStatus.health > 0){
        if(Math.random() > 0.75){
          playerStatus.health -= 1;
        }
      }else{
        music.stop();
        scene.scene.stop('main').run('gameOver');


      }

  }
}

  for(let i=0;i < covids.length;i++){

      if(scene.physics.collide(player,covids[i])){

        if(playerStatus.health > 0){
          if(Math.random() > 0.75){
            playerStatus.health -= 1;
          }
        }else{
          music.stop();
          scene.scene.stop('main').run('gameOver');


        }

    }
  }

  if(playerStatus.health <= 50 && remedies.length == 0){

    var deltaX = 0;
      var deltaY = 0;
      if(player.x < width/2){
        deltaX = 200;

      }else{
        deltaX = -200;
      }
      if(player.y < height/2){
        deltaY = 200;

      }else{
        deltaY = -200;
      }
      var r = scene.physics.add.sprite(player.x+deltaX,player.y+deltaY, "remedy")
      remedies.push(r);
  }
}

function updateVariants(scene: Phaser.Scene,player:any,variants:any, a:any){
  for(let i=0;i < variants.length;i++){

    variants[i].setVelocity(0);
    let spdx = 0;
    let spdy = 0;
    if(variants[i].x > player.x){
      spdx = -virusSpd;
    }else if(variants[i].x < player.x){
      spdx = virusSpd;
    }
    if(variants[i].y > player.y){
      spdy = -virusSpd;
    }else if(variants[i].y < player.y){
      spdy = virusSpd;
    }
    variants[i].setVelocityX(spdx);
    variants[i].setVelocityY(spdy);

    for(let j = 0; j < a.length; j++){
      if(scene.physics.collide(variants[i],a[j])){
        if(variants[i].texture == scene.scene.scene.textures.get('alpha')){
          score+=2;
        }
        if(variants[i].texture == scene.scene.scene.textures.get('beta')){
          score+=3;
        }
        if(variants[i].texture == scene.scene.scene.textures.get('gamma')){
          score+=4;
        }
        if(variants[i].texture == scene.scene.scene.textures.get('delta')){
          score+=5;
        }
        variants[i].destroy();
        variants=variants.splice(i,1);
        a[j].destroy();
        a=a.splice(j,1);

      }
    }
  }
}

function updateViruses(scene: Phaser.Scene,player:any,covids:any, a:any){

  for(let i=0;i < covids.length;i++){

    covids[i].setVelocity(0);
    let spdx = 0;
    let spdy = 0;
    if(covids[i].x > player.x){
      spdx = -virusSpd;
    }else if(covids[i].x < player.x){
      spdx = virusSpd;
    }
    if(covids[i].y > player.y){
      spdy = -virusSpd;
    }else if(covids[i].y < player.y){
      spdy = virusSpd;
    }
    covids[i].setVelocityX(spdx);
    covids[i].setVelocityY(spdy);

    for(let j = 0; j < a.length; j++){
      if(scene.physics.collide(covids[i],a[j])){
        covids[i].destroy();
        covids=covids.splice(i,1);
        a[j].destroy();
        a=a.splice(j,1);
        score += 1;
      }
    }
  }
}

function UpdateAlcool(alcoolSprays:any[]){


}



function drawUI(scene: Phaser.Scene,player:any,healthBarBorder:Phaser.GameObjects.Graphics,healthBar:Phaser.GameObjects.Graphics,
  AlcoolBarBorder:Phaser.GameObjects.Graphics,AlcoolBar:Phaser.GameObjects.Graphics){



    healthBarBorder.clear();
  healthBar.clear();

  AlcoolBarBorder.clear();
  AlcoolBar.clear();

  //health

  healthBarBorder.fillStyle(0xFFFFFF);
  healthBarBorder.fillRect(healthBarBorder.x, healthBarBorder.y + 2, 110, 40 );

  healthBar.fillStyle(0xFF0000);
  healthBar.fillRect(healthBar.x, healthBar.y + 2, playerStatus.health, 30 );

  //score

  textScore.setText('Pontuação:\n'+score.toString(), { font: '100px Arial',color:'#FFFFFF' });

  //alcool ammo
  //textAmmo.setText('Álcool:\n'+playerStatus.alcoolAmmo.toString(), { font: '100px Arial',color:'#000000' });
  AlcoolBarBorder.fillStyle(0xFFFFFF);
  AlcoolBarBorder.fillRect(AlcoolBarBorder.x, AlcoolBarBorder.y + 2, 108, 40 );

  AlcoolBar.fillStyle(0xD3D3D3);
  AlcoolBar.fillRect(AlcoolBar.x, AlcoolBar.y + 2, playerStatus.alcoolAmmo*10, 30 );
}

export class MainScene extends Phaser.Scene {

  playerSpeed = 100;




  healthBarBorder:Phaser.GameObjects.Graphics = null;
  healthBar:Phaser.GameObjects.Graphics = null;//new Phaser.GameObjects.Graphics(this);
  AlcoolBarBorder:Phaser.GameObjects.Graphics = null;
  AlcoolBar:Phaser.GameObjects.Graphics = null;

  controls: any | undefined | null;
  constructor() {
    super({ key: 'main' });
  }




  create() {

    // *true* param enables looping
    music =this.sound.add('music');

    //console.log(this.music);
    music.loop = true;


    music.play();

    console.log(music);



    isDown = false;
    isUp = false;
    isLeft = false;
    isRight=false;
    isAction=false;

    upArrow = this.add.image(200,height - 300,'up').setName("up").setInteractive().setScale(2,2);
    downArrow = this.add.image(200,height - 100,'down').setName("down").setInteractive().setScale(2,2);
    leftArrow = this.add.image(100,height - 200,'left').setName("left").setInteractive().setScale(2,2);
    rightArrow = this.add.image(300,height - 200,'right').setName("right").setInteractive().setScale(2,2);
    actionButton = this.add.image(width-150,height - 200,'action').setName("action").setInteractive().setScale(2,2);


    downArrow.on('pointerdown', () => { isDown = true; });
    downArrow.on('pointerup', () => { isDown = false; });

    upArrow.on('pointerdown', () => { isUp = true; });
    upArrow.on('pointerup', () => { isUp = false; });

    leftArrow.on('pointerdown', () => { isLeft = true; });
    leftArrow.on('pointerup', () => { isLeft = false; });

    rightArrow.on('pointerdown', () => { isRight = true; });
    rightArrow.on('pointerup', () => { isRight = false; });

    actionButton.on('pointerdown', () => { isAction = true; });
    actionButton.on('pointerup', () => { isAction = false; });




    downArrow.depth=1;
    upArrow.depth=1;
    leftArrow.depth=1;
    rightArrow.depth=1;
    actionButton.depth=1;
    /*
    this.input
   //.setTopOnly(false) // If you want to check if more than the top most hitbox was clicked
  .on('pointerdown', (pointer: Phaser.Input.Pointer, objectsClicked: Phaser.GameObjects.GameObject[]) => {
    for(let o of objectsClicked){
      if(o.name == "up"){
        isUp=true;
        return;
      }else{
        isUp=false;
      }
      if(o.name == "down"){
        isDown=true;
        return;
      }else{
        isDown=false;
      }
      if(o.name == "left"){
        isLeft=true;
        return;
      }else{
        isLeft=false;
      }

      if(o.name == "right"){
        isRight=true;
        return;
      }else{
       isRight=false;
      }

     // if(o.name == "action"){
      //  isAction=true;
      //  return;
     // }//else{
        //isAction=false;
      //}
    }
    })*/

  // .setTopOnly(false) // If you want to check if more than the top most hitbox was clicked
    /*
  .on('pointerup', (pointer: Phaser.Input.Pointer, objectsClicked: Phaser.GameObjects.GameObject[]) => {
    for(let o of objectsClicked){
      if(o.name == "up"){
        isUp=false;

      }
      if(o.name == "down"){
        isDown=false;
      }
      if(o.name == "left"){
        isLeft=false;
      }

      if(o.name == "right"){
        isRight=false;
      }

      if(o.name == "action"){
        isAction=false;
      }
    }
    })*/

    this.healthBarBorder= new Phaser.GameObjects.Graphics(this);
    this.healthBarBorder.x = 8;
    this.healthBarBorder.y = 23;
    this.healthBarBorder.depth = 1;
    this.add.existing(this.healthBarBorder);

    this.healthBar = new Phaser.GameObjects.Graphics(this);
    this.healthBar.x = 10;
    this.healthBar.y = 25;
    this.healthBar.depth = 1;
    this.add.existing(this.healthBar);

    this.AlcoolBarBorder= new Phaser.GameObjects.Graphics(this);
    this.AlcoolBarBorder.x = 100;
    this.AlcoolBarBorder.y = 23;
    this.AlcoolBarBorder.depth = 1;
    this.add.existing(this.AlcoolBarBorder);

    this.AlcoolBar = new Phaser.GameObjects.Graphics(this);
    this.AlcoolBar.x = 102;
    this.AlcoolBar.y = 25;
    this.AlcoolBar.depth = 1;
    this.add.existing(this.AlcoolBar);


    let hpText = this.add.text(20, 10, 'Saúde: ', { font: '30px Arial',color: '#FFFFFF' });
    hpText.depth = 1;
    textAmmo = this.add.text(200, 10, 'Álcool: ', { font: '30px Arial',color: '#FFFFFF'  });
    textScore = this.add.text(350, 10, 'Pontuação: ', { font: '30px Arial',color: '#FFFFFF'  });

    textAmmo.depth = 1;
    textScore.depth=1;

    player = createPlayer(this);
    this.controls = createControls(this);
    covids = loadFirstViruses(this);


    playerStatus.health = 100;
    playerStatus.alcoolAmmo = 10;
    score = 0;
    wave = 0;

    timer = this.time.delayedCall(3000, this.addVariant, [], this);
  }
  preload() {
    this.load.image('up','../../../assets/actionbuttons/upArrow.png');
    this.load.image('down','../../../assets/actionbuttons/downArrow.png');
    this.load.image('left','../../../assets/actionbuttons/leftArrow.png');
    this.load.image('right','../../../assets/actionbuttons/rightArrow.png');
    this.load.image('action','../../../assets/actionbuttons/action.png');


    this.load.image('medic','../../assets/medico.png');
    this.load.image('alcool','../../assets/alcoolgel.png')
    this.load.image('spray','../../assets/alcoolspray.png')
    this.load.image('bottle','../../assets/alcoolgel.png')



    this.load.image('covid','../../assets/covid.png')

    this.load.image('alpha','../../../assets/alphaVariant.png');
    this.load.image('beta','../../../assets/betaVariant.png');
    this.load.image('gamma','../../../assets/gammaVariant.png');
    this.load.image('delta','../../../assets/deltaVariant.png');

    this.load.image('remedy','../../assets/remedio.png')
    this.cameras.main.setBackgroundColor('#114E94');
    this.scale.setGameSize(width,height);





    this.load.audio('music','../../../assets/audio/medical.mp3');


  }
  override update() {

    //phaserGame.scale.gameSize.resize(window.innerWidth,window.innerHeight);

    configControls(player, this.controls, this, this.playerSpeed,covids,alcoolSprays);
    updatePlayer(this,player,covids,alcoolSprays);
    updateViruses(this,player,covids,alcoolSprays);
    if(covids.length == 0){
      /*
      wave++;

      if(wave == 5){
        wave = 0
        this.addVariant();
      }*/
      covids = loadFirstViruses(this);
    }
    updateVariants(this,player,covidVariants,alcoolSprays);
    drawUI(this,player,this.healthBarBorder,this.healthBar,this.AlcoolBarBorder,this.AlcoolBar);
  }

  addVariant(){
    var nextPosX;
    var nextPosY;
    var nextPosRand = (Math.random());
    if(nextPosRand <= 0.25){
      nextPosX = 200;
      nextPosY=height/2;
    }else if(nextPosRand <= 0.5){
      nextPosX = width/2;
      nextPosY=200;
    }else if(nextPosRand <= 0.75){
      nextPosX = width-200;
      nextPosY=height/2;
    }else{
      nextPosX = width/2;
      nextPosY=height-200;
    }


    var nextVariant = Math.random();
    var variant;
    if(nextVariant <= 0.25){
      variant = this.physics.add.sprite(nextPosX,nextPosY, "alpha").setScale(0.5,0.5);

    }else if(nextVariant <= 0.5){
      variant = this.physics.add.sprite(nextPosX,nextPosY, "beta").setScale(0.5,0.5);
    }else if(nextVariant <= 0.75){
      variant = this.physics.add.sprite(nextPosX,nextPosY, "gamma").setScale(0.5,0.5);
    }else{
      variant = this.physics.add.sprite(nextPosX,nextPosY, "delta").setScale(0.5,0.5);
    }
    covidVariants.push(variant);
    timer = this.time.delayedCall(5000, this.addVariant, [], this);
  }

  static getScore(){
    return score;
  }

  static resetScore(){
    playerStatus.health = 100;
    playerStatus.alcoolAmmo = 10;
    score = 0;
    wave = 0;
    covidVariants=[];
    covids = [];
    alcoolSprays=[];

  }




}
