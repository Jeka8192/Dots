class Circles {
constructor(x, y, k, j, color){
this.color = color;
this.x = x;
this.y = y;
this.cir = arrBitmapData[k][j];
this.cir.circle(cell_size/4, cell_size/4, point_size, this.color);
this.cirSprite = game.add.sprite(this.x, this.y, this.cir);
game.physics.arcade.enable(this.cirSprite);
this.anim = game.add.tween(this.cirSprite)
}
down(_this, y, speed){
_this.anim.to( { y: y }, speed, Phaser.Easing.Linear.None, true);
}
del(){
this.cirSprite.destroy();
}
}
