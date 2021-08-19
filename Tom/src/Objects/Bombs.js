// creamos un grupo de fisicas para las bombas
class Bombs extends Phaser.Physics.Arcade.Group{
    constructor(config){
        super(config.physicsWorld, config.scene);
        this.addBomb();
    }

    addBomb(){
        // usamos el metodo create que viene en Group para agregar 1 bomba
        this.create(Phaser.Math.Between(40, this.scene.scale.width - 40), -10, "bomb")
        .setDepth(2)
        .setBounce(1)
        .setCircle(18)
        .setVelocityX(
            (Phaser.Math.Between(0, 1) ? 100 : -100)
        )
        .setGravityY(-1800);
    }

    update(){
        this.children.iterate(x => {
            // si el velociity.x es menor a cera es porque va a la izquierda
            if (x.body.velocity.x < 0){
                x.setAngularVelocity(-300);
            }else{
                x.setAngularVelocity(300);
            }
        })
    }
}

export default Bombs;