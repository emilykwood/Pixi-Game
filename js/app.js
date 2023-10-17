let pressedKeys = {};
let currentFrameIndex = 0;
let speed = 2;

const app = new PIXI.Application({
    width: 1000,
    height: 700,
});
document.body.appendChild(app.view);

app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = 'absolute';

    const globalAssets = {
        background: "assets/bg.png",
        cat: "assets/cat.png",
        clouds: "assets/cloud.png",
        mushroom: "assets/mushroom.png",
        idle1: "assets/png/Idle (1).png",
        jump1:"assets/png/Jump (1).png",
        jump2:"assets/png/Jump (2).png",
        jump3:"assets/png/Jump (3).png",
        jump4:"assets/png/Jump (4).png",
        jump5:"assets/png/Jump (5).png",
        jump6:"assets/png/Jump (6).png",
        jump7:"assets/png/Jump (7).png",
        jump8: "assets/png/Jump (8).png",
        jump9: "assets/png/Jump (9).png",
        jump10: "assets/png/Jump (10).png",
        jump11: "assets/png/Jump (11).png",
        jump12: "assets/png/Jump (12).png",
        jump13: "assets/png/Jump (13).png",
        jump14: "assets/png/Jump (14).png",
        jump15: "assets/png/Jump (15).png",
        jump16: "assets/png/Jump (16).png",
        jump17: "assets/png/Jump (17).png",
        jump18: "assets/png/Jump (18).png",
        jump19: "assets/png/Jump (19).png",
        jump20: "assets/png/Jump (20).png",
        jump21: "assets/png/Jump (21).png",
        jump22: "assets/png/Jump (22).png",
        jump23: "assets/png/Jump (23).png",
        jump24: "assets/png/Jump (24).png",
        jump25: "assets/png/Jump (25).png",
        jump26: "assets/png/Jump (26).png",
        jump27: "assets/png/Jump (27).png",
        jump28: "assets/png/Jump (28).png",
        jump29: "assets/png/Jump (29).png",
        jump30: "assets/png/Jump (30).png",
        run1: "assets/png/Run (1).png",
        run2: "assets/png/Run (2).png",
        run3: "assets/png/Run (3).png",
        run4: "assets/png/Run (4).png",
        run5: "assets/png/Run (5).png",
        run6: "assets/png/Run (6).png",
        run7: "assets/png/Run (7).png",
        run8: "assets/png/Run (8).png",
        run9: "assets/png/Run (9).png",
        run10: "assets/png/Run (10).png",
        run11: "assets/png/Run (11).png",
        run12: "assets/png/Run (12).png",
        run13: "assets/png/Run (13).png",
        run14: "assets/png/Run (14).png",
        run15: "assets/png/Run (15).png",
        run16: "assets/png/Run (16).png",
        run17: "assets/png/Run (17).png",
        run18: "assets/png/Run (18).png",
        run19: "assets/png/Run (19).png",
        run20: "assets/png/Run (20).png"
        };

async function loadAssets() {
    await PIXI.Assets.loadBundle('assets');
}

async function startGame() {
    try {
        // Load assets
        await loadAssets();
        // Create and add a background sprite
        let backgroundTexture = PIXI.Texture.from(globalAssets.background); 
        let background = new PIXI.TilingSprite(
            backgroundTexture, 
            app.screen.width, 
            app.screen.width
          );

        app.stage.addChild(background);


        // Create and add clouds sprite
        const cloudsTexture = PIXI.Texture.from(globalAssets.clouds);  
        const appHeight = app.screen.height;
        const appWidth = app.screen.width;       
        const cloudsSprite = new PIXI.TilingSprite(cloudsTexture, appWidth*2, appHeight);
        cloudsSprite.scale.set(0.5, 0.4);
        app.stage.addChild(cloudsSprite);

        // const mushroomTextue = PIXI.Texture.from(globalAssets.mushroom);
        // const mushroomSprite = new PIXI.Sprite(mushroomTextue);
        // mushroomSprite.y = 500
        // app.stage.addChild(mushroomSprite);
        app.ticker.add(function () {
            cloudsSprite.tilePosition.x += 0.75;
        });

        // Initialize character sprite
        const characterSprite = new PIXI.Container();
        characterSprite.scale.set(0.6);
        characterSprite.x = 200;
        characterSprite.y = 650;
        app.stage.addChild(characterSprite);

        // Load jump and run textures
        const jumpTextures = [];
        for (let i = 1; i <= 30; i++) {
            jumpTextures.push(PIXI.Texture.from(globalAssets['jump' + i]));
        }

        const runTextures = [];
        for (let i = 1; i <= 20; i++) {
            runTextures.push(PIXI.Texture.from(globalAssets['run' + i]));
        }

        // Create jump and run animations
        const jumpAnimation = new PIXI.AnimatedSprite(jumpTextures);
        jumpAnimation.scale.set(0.6);
        jumpAnimation.anchor.set(0.6);
        jumpAnimation.speed = 0.5;
        jumpAnimation.loop = false;
        characterSprite.addChild(jumpAnimation);

        const runAnimation = new PIXI.AnimatedSprite(runTextures);
        runAnimation.scale.set(0.6);
        runAnimation.anchor.set(0.6);
        runAnimation.speed = 0.4;
        runAnimation.loop = false;
        characterSprite.addChild(runAnimation);

        const idleTexture = PIXI.Texture.from(globalAssets.idle1);
        const idleSprite = new PIXI.Sprite(idleTexture);
        idleSprite.scale.set(0.6);
        idleSprite.anchor.set(0.6);
        characterSprite.addChild(idleSprite);


        // Event listeners to make character jump
        window.addEventListener("keydown", keyDown);
        window.addEventListener("keyup", keyUp);

        function keyDown(e) {
            console.log(e.keyCode);
            pressedKeys[e.keyCode] = true;
        }

        function keyUp(e) {
            pressedKeys[e.keyCode] = false;
        }

        function gameLoop() {
            // space
            if (pressedKeys['32']) {
                // Play jump animation if not already playing
                if (!jumpAnimation.playing) {
                    hideSpritesExcept(jumpAnimation);
                    jumpAnimation.gotoAndPlay(0);
                }
                 // Loop through frames and adjust y position
        for (let frame = 0; frame < jumpAnimation.totalFrames; frame++) {
            if (frame < jumpAnimation.totalFrames / 2) {
                // Before halfway point, move character up
                characterSprite.y -= 2; // Adjust the jump speed if needed
            } else {
                // After halfway point, move character down
                characterSprite.y += 2; // Adjust the descent speed if needed
        }
    }
}
            // right key
            else if (pressedKeys['39']) {
                // Play run animation if not already playing
                if (!runAnimation.playing) {
                    hideSpritesExcept(runAnimation);
                    runAnimation.gotoAndPlay(0);
                }
                characterSprite.scale.x = 0.6;
                characterSprite.x += 5;
                background.tilePosition.x -= 3;
            }
            //  left key
            else if (pressedKeys['37']) {
                // Play run animation if not already playing
                if (!runAnimation.playing) {
                    hideSpritesExcept(runAnimation);
                    runAnimation.gotoAndPlay(0);
                }

                characterSprite.scale.x = -0.6; // faces sprite left
                background.tilePosition.x += 3;
                characterSprite.x -= 5; 
            }
            // If no keys are pressed, stop all animations
            else {
                stopAllAnimations();
            }
        }

        function hideSpritesExcept(currentSprite) {
            jumpAnimation.visible = false;
            runAnimation.visible = false;
            idleSprite.visible = false;
            currentSprite.visible = true;
        }

        function stopAllAnimations() {
            jumpAnimation.visible = false;
            runAnimation.visible = false;
            idleSprite.visible = true;
        }

        app.ticker.add(gameLoop); // Start the game loop after assets are loaded
    } catch (error) {
        console.error("Error loading assets:", error);
    }
}

startGame();