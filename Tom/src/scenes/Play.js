import Tomato from "../Player/Tomato.js";
import Bombs from "../Objects/Bombs.js";

class Play extends Phaser.Scene{
    constructor(){
        super({
            key: "Play",
        });
    }

    init(){
        console.log("Play initialized");
    }

    create(){
        // agregando el fondo
        this.add.image(0, 0, "background")
        .setOrigin(0);

        //creamos un grupo estatico, le agregamos fisicas para que el personaje pueda colosionar y estatico porque solo tiene que ser una plataforma, esto seria como una plantilla y apartir de ahi podemos crear varios con create
        this.wall_floor = this.physics.add.staticGroup();

        // creamos la pared de la izquierda
        this.wall_floor.create(0 , 0, "wall")
        .setOrigin(0);

        // creamos la pared de la derecha, con estos 2 atributos podemos obtener el alto y ancho del canvas
        // console.log(this.scale.width);
        // console.log(this.scale.height);
        this.wall_floor.create(this.scale.width, 0, "wall")
        .setOrigin(1, 0)
        .setFlipX(true);

        // craemos el piso
        this.wall_floor.create(0, this.scale.height, "floor")
        .setOrigin(0, 1);

        this.wall_floor.refresh();

        this.wall_floor.getChildren()[2].setOffset(0, 15);

        // Bombs
        this.bombsGroup = new Bombs({
            physicsWorld: this.physics.world,
            scene: this,
        });

        // agregando al personaje
        // this.tomate = this.physics.add.sprite(100, 100, "tomato")
        // .setScale(2);
        this.tomato = new Tomato({
            scene: this,
            x: 100,
            y: 100,
        });
        this.tomato.setScale(2);

        // agregamos collider para que el personaje rebote con los bordes del mundo, tambien lo hacemos para las bombas
        this.physics.add.collider([this.tomato, this.bombsGroup], this.wall_floor);
    }

    update(){
        this.tomato.update();
        this.bombsGroup.update();
    }
}

export default Play;