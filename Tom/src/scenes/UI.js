class UI extends Phaser.Scene{
    constructor(){
        super({
            key: "UI",
        });
        this.actualPoints = 0;
    }

    init(){
        console.log("UI initialized");
        this.scene.moveUp();
    }

    create(){
        // creamos las vidas que se mostraran
        this.groupLife = this.add.group({
            key: "life",
            repeat: 2,
            setXY: {
                x: 50,
                y: 20,
                stepX: 25,
            }
        });

        // pintamos el puntaje en la derecha
        this.points = this.add.bitmapText(
            this.scale.width - 40,
            20,
            "pixelFont",
            Phaser.Utils.String.Pad("0", 6, "0", 1) // esto es para rellenar los 000001 algo asi
        )
        .setOrigin(1, 0)
        .setTint(0x000);

        // Aqui recuperamos los eventos
        this.registry.events.on("remove_life", () => {
            const children = this.groupLife.getChildren();
            children[children.length - 1].destroy();

        });

        // cuando el juego se termina primero se deben limpiar la lista de eventos porque sino se acumulan
        this.registry.events.on("game_over", () =>{
            this.registry.events.removeAllListeners();
            this.scene.start("Menu", this.actualPoints);
            this.actualPoints = 0;
        });

        // actualizar puntos
        this.registry.events.on("update_points", () => {
            this.actualPoints += 10;
            this.points.setText(Phaser.Utils.String.Pad(this.actualPoints, 6, "0", 1))
        })
    }
}

export default UI;