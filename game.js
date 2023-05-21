"use strict";

function indexObj(child){
let flag = false;
for (let k = 0; k < arr.length; k++){
 for(let j = 0; j < arr[k].length; j++){
  flag = (arr[k][j].cirSprite === child);
   if (flag) {
    return [k, j, arr[k][j].color, arr[k][j]];
   }
  }
 }
}

function emptyCells(){
let speed = 150;
let x = game.world.centerX-cell_size*row/2;
let y = game.world.centerY+cell_size*column/2-cell_size-cell_size;
let time = 0;
let c = 1;
for(let i=0, k=column-1; i<column; ++i, --k){
 for(let j=0; j<row; ++j){
  if(!arr[k][j].cirSprite.alive&&k!=0){
    if(arr[k-c][j].cirSprite.alive){
    arr[k][j].cir.cls();
     arr[k][j] = new Circles(x, y, k, j, arr[k-c][j].color);
     arr[k-c][j].del();
     arr[k][j].down(arr[k][j], arr[k][j].y+cell_size, speed);
     }
   }
   x += cell_size;
  }
   x = game.world.centerX-cell_size*row/2;
   y -= cell_size;
  }
}
 
function emptyCells2(){
let time = 50;
let speed = 400;
let x = game.world.centerX-cell_size*row/2;
let y = game.world.centerY+cell_size*column/2-cell_size;
for(let i=0, k=column-1; i<column; ++i, --k){
for(let j=0; j<row; ++j){
 if(!arr[k][j].cirSprite.alive){
  count++;
  let color = game.rnd.pick(arr_color);
  arr[k][j].cir.cls();
  arr[k][j] = new Circles(x, -cell_size, k, j, color);
  setTimeout(arr[k][j].down, time, arr[k][j], y, speed);
  time += dt+30;
  }
  x += cell_size;
 }
 x = game.world.centerX-cell_size*row/2;
 y -= cell_size;
 }
 t.text = "POINTS: "+count;
}

function filling(){
let time = 50;
let speed = 400;
let x = game.world.centerX-cell_size*row/2;
let y = game.world.centerY+cell_size*column/2-cell_size;
for(let i=0, k=column-1; i<column; ++i, --k){
 for(let j=0; j<row; ++j){
  let color = game.rnd.pick(arr_color);
  arr[k][j] = new Circles(x, -cell_size, k, j, color);
  setTimeout(arr[k][j].down, time, arr[k][j], y, speed);
  x += cell_size;
  time += dt;
  }
 x = game.world.centerX-cell_size*row/2;
 y -= cell_size;
 }
}

function overDown(obj1, obj2){
flDown = true;
flMove = true;
let objColor = indexObj(obj2);
color = objColor[2];
objDown = obj2;
arr_line[iter_line].x = obj2.x+point_size;
arr_line[iter_line].y = obj2.y+point_size;
}

function overMove(obj1, obj2){
if((obj2 != objDown) && flMove){
 let index = indexObj(obj2);
 let indexDown = indexObj(objDown);
 if(indexDown[2]==index[2]){
  if(indexDown[0]==index[0]+1&&indexDown[1]==index[1]||indexDown[0]==index[0]-1&&indexDown[1]==index[1]||
   indexDown[0]==index[0]&&indexDown[1]==index[1]+1||indexDown[0]==index[0]&&indexDown[1]==index[1]-1){
   flMove = false;
   arr_line[iter_line].lin.cls();
   arr_line[iter_line].lin.line(arr_line[iter_line].x,arr_line[iter_line].y,obj2.x+point_size,obj2.y+point_size,color,    line_thickness);
   arr_del[iter_del] = index[3];
   iter_del++;
   arr_del[iter_del] = indexDown[3];
   iter_del++;
   clicDown();
  }
  }
 }
}

function clicDown(){
let x = game.input.mousePointer.x;
let y = game.input.mousePointer.y;
iter_line++;
arr_line[iter_line] = new Line(x, y, x, y);
for(let obj of arr){
 for(let elem of obj) {
  game.physics.arcade.overlap(arr_line[iter_line].cirSprite, elem.cirSprite, overDown, null, this);
  }
 }
}

function mMove(){
if(flDown&&flMove){
 arr_line[iter_line].mov();
 for(let obj of arr){
  for(let elem of obj){
   game.physics.arcade.overlap(arr_line[iter_line].cirSprite, elem.cirSprite, overMove, null, this);
   }
  } 
 }
}

function clicUp(){
flDown = false;
for(let obj of arr_line){
 obj.del();
 obj = null;
}
for(let obj of arr_del){
 obj.del();
 obj = null;
}
objDown = null;
iter_line = -1;
iter_del = 0;
let time = 0;
for(let i=0; i<column; ++i){
setTimeout(emptyCells, time);
time += 120;
}
time = 500;
setTimeout(emptyCells2, time);
}


const W = window.innerWidth;
const H = window.innerHeight;

let game = new Phaser.Game(W, H, Phaser.CANVAS, 'phaser-example', {create: create});

const column = 6;
const row = 6;
const cell_size = 72;
const point_size = 18;
const line_thickness = 5;
const dt = 50;
const arr = [[], [], [], [], [], []];
const arrBitmapData = [[], [], [], [], [], []];
let cirBitmapData = null;
const arr_color = ['rgb(255,215,0)', 'rgb(0,191,255)', 'rgb(200,0,0)', 'rgb(0,200,0)', 'rgb(49,0,98)'];
const arr_line = [];
const arr_del = [];
let color = null;
let objDown = null;
let iter_line = -1;
let iter_del = 0;
let flDown = false;
let flMove = false;
let count = 0;
let text = null;
let t = null;
const style = { font: "36px Arial", fill: "#ff0044", align: "center" };

function create() {
game.stage.backgroundColor = '#124184';
game.input.onDown.add(clicDown);
game.input.onUp.add(clicUp);
game.input.addMoveCallback(mMove);
t = game.add.text(game.world.centerX+300, 50, text, style);
t.text = "POINTS: "+count;
cirBitmapData = game.add.bitmapData(1, 1);
for(let k=0; k<column; ++k){
 for(let j=0; j<row; ++j){
  arrBitmapData[k][j] = game.add.bitmapData(cell_size/2, cell_size/2);
 }
}
filling();
}
