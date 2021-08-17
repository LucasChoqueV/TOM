// podemos crear una clase para un objeto en particular
class Tomato extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene, config.x, config.y, "tomato");
        this.scene = config.scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setSize(10, 20);
        this.body.setOffset(3, 6);
        this.body.setBounce(0.2);
        this.jumping = false;
        this.anims.play("tomato_idle");
        this.prevMov = "tomato_idle";
        this.life = 3;
        // un delay cuando te golplea algo.
        this.hitDelay = false;

        this.cursor = this.scene.input.keyboard.createCursorKeys();
    }

    update(){
        if (this.cursor.left.isDown){ // mover a la izquierda
            this.body.setVelocityX(-200);
            this.flipX = true;
            if (this.prevMov !== "left" && !this.jumping){
                this.prevMov = "left";
                this.anims.play("tomato_walk");
            }
        } else if (this.cursor.right.isDown){ // mover a la derecha
            this.flipX = false;
            this.body.setVelocityX(200);
            if (this.prevMov !== "right" && !this.jumping){
                this.prevMov = "right";
                this.anims.play("tomato_walk");
            }
        } else if (this.cursor.down.isDown && !this.jumping){
            this.body.setVelocityX(0);
            // modificamos el colider
            this.body.setSize(14, 15);
            this.body.setOffset(2, 10);
            if (this.prevMov !== "down" && !this.jumping){
                this.prevMov = "down";
                this.anims.play("tomato_down");
            }
        } 
        else { // detener el movimiento
            this.body.setVelocityX(0);
            this.body.setSize(10, 20);
            this.body.setOffset(3, 6);
            if (this.prevMov !== "tomato_idle" && !this.jumping){
                this.prevMov = "tomato_idle";
                this.anims.play("tomato_idle");
            }
        }

        // JustDown solo permite apretar la tecla una sola vez
        if (Phaser.Input.Keyboard.JustDown(this.cursor.up) && !this.jumping){
            this.jumping = true;
            this.body.setVelocityY(-800);
            if (this.prevMov !== "jump"){
                this.prevMov = "jump";
                this.anims.play("tomato_jump");
            }
        } else if (this.body.blocked.down){ // aqui se pregunta si el cuerpo esta tocando el piso
            this.jumping = false;
        }
    }

    bombCollision(){
        if(!this.hitDelay){
            
        }
    }

}

export default Tomato;