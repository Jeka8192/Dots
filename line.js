class Line {
constructor(x, y, x1, y1){
this.x = x;
this.y = y;
this.x1 = x1;
this.y1 = y1;
this.cir = cirBitmapData;
this.cir.circle(0, 0, 0);
this.cirSprite = game.add.sprite(this.x1, this.y1, this.cir);
game.physics.arcade.enable(this.cirSprite);
this.lin = game.add.bitmapData(W, H);
this.lin.line(this.x, this.y, this.x1, this.y1, color, line_thickness);
this.linSprite = game.add.sprite(0, 0, this.lin);
game.physics.arcade.enable(this.linSprite);
}
mov(){
let x = game.input.mousePointer.x;
let y = game.input.mousePointer.y;
this.cirSprite.x = x;
this.cirSprite.y = y;
this.lin.cls();
this.lin.line(this.x, this.y, x, y, color, line_thickness);
}
del(){
this.cirSprite.destroy();
this.cir.cls();
this.linSprite.destroy();
this.lin.cls();
this.lin.destroy();
}
}
