class TomatoItem extends Phaser.Physics.Arcade.StaticGroup{
    constructor(config){
        super(config.physicsWorld, config.scene);
        
        this.addTomatoItem();
    }

    addTomatoItem(){
        this.create(
            Phaser.Math.Between(50, this.scene.scale.width - 50),
            Phaser.Math.Between(150, this.scene.scale.height - 70),
            "tomato_item"
        );

    }

    destroy(){
        this.children.entries[0].destroy();
        this.scene.sound.play("pop");
        this.scene.registry.events.emit("update_points");
        this.addTomatoItem();
    }
}

export default TomatoItem