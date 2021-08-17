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
        this.add.bitmapText(100, 100, "pixelFont", "TEST");
    }
}

export default Play;