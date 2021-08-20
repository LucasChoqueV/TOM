class Menu extends Phaser.Scene{
    constructor(){
        super({
            key: "Menu",
        });

    }

    init(points){
        this.points = points;
        console.log("Menu initialized");
    }

    create(){

        this.add.image(0, 0, "background")
        .setOrigin(0);
        this.add.image(0 , 0, "wall")
        .setOrigin(0);

        // creamos la pared de la derecha, con estos 2 atributos podemos obtener el alto y ancho del canvas
        // console.log(this.scale.width);
        // console.log(this.scale.height);
        this.add.image(this.scale.width, 0, "wall")
        .setOrigin(1, 0)
        .setFlipX(true);

        // craemos el piso
        this.add.image(0, this.scale.height, "floor")
        .setOrigin(0, 1);

        this.logoMenu = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            "logo",
        ).setScale(2).setInteractive();

        this.logoMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.logoMenu,
                ease: "Bounce.easeIn",
                y: -200,
                duration: 1000,
                onComplete: () => {
                    this.scene.start("Play");
                }
            });
            this.add.tween({
                targets: [this.pointsText, this.bestPointsText],
                ease: "Bounce.easeIn",
                y: 400,
                duration: 1000,
            });

        })

        if (this.points > this.bestPoints){
            localStorage.setItem("best_points", this.points);
        }

        const pointsDB = localStorage.getItem("best_points");
        this.bestPoints = (pointsDB !== null) ? pointsDB : 0;

        this.pointsText = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height - 100,
            "pixelFont",
            "POINTS: " + this.points,
        ).setDepth(2).setOrigin(0.5);

        this.bestPointsText = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height - 80,
            "pixelFont",
            "BEST POINTS: " + this.bestPoints,
        ).setDepth(2).setOrigin(0.5);
    }
}

export default Menu;