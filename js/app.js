let pressedKeys = {};
let currentFrameIndex = 0;
let speed = 2;
let isMovingRight = false; 
let isTitleScreenVisible = true; 
let titleScreen;

const app = new PIXI.Application({
    width: 1920,
    height: 1080,
});
document.body.appendChild(app.view);
app.renderer.view.style.position = 'absolute';

const globalAssets = {
    background: "assets/bg.png",
    clouds: "assets/cloud.png",
    ground: "assets/ground.png",
    middleGround: "assets/middleGround.png",
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

class Character {
    constructor() {
        this.sprite = new PIXI.Container();
        this.sprite.scale.set(0.6);
        this.sprite.x = 200;
        this.sprite.y = 855;
        this.jumpPower = 10;
        this.isJumping = false;

        const jumpTextures = [];
        for (let i = 1; i <= 30; i++) {
            jumpTextures.push(PIXI.Texture.from(globalAssets['jump' + i]));
        }

        const runTextures = [];
        for (let i = 1; i <= 20; i++) {
            runTextures.push(PIXI.Texture.from(globalAssets['run' + i]));
        }

        this.jumpAnimation = new PIXI.AnimatedSprite(jumpTextures);
        this.jumpAnimation.scale.set(0.6);
        this.jumpAnimation.anchor.set(0.6);
        this.jumpAnimation.speed = 0.5;
        this.jumpAnimation.loop = false;
        this.sprite.addChild(this.jumpAnimation);

        this.runAnimation = new PIXI.AnimatedSprite(runTextures);
        this.runAnimation.scale.set(0.6);
        this.runAnimation.anchor.set(0.6);
        this.runAnimation.speed = 0.4;
        this.runAnimation.loop = false;
        this.sprite.addChild(this.runAnimation);

        this.idleTexture = PIXI.Texture.from(globalAssets.idle1);
        this.idleSprite = new PIXI.Sprite(this.idleTexture);
        this.idleSprite.scale.set(0.6);
        this.idleSprite.anchor.set(0.6);
        this.sprite.addChild(this.idleSprite);
    }
    playJumpAnimation() {
        if(!this.jumpAnimationPlaying) {
            this.jumpAnimationPlaying = true;
            this.idleSprite.visible = false;
            this.jumpAnimation.visible = true;
            this.jumpAnimation.gotoAndPlay(0)

            let totalFrames = this.jumpAnimation.totalFrames;
            let halfwayFrame = Math.floor(totalFrames / 2);
            let currentFrame = 0;
            let goingUp = true; //
            let jumpAnimationLoop = () => {
                if (goingUp) {
                    if (currentFrame < halfwayFrame) {
                        this.sprite.y -= 3; // start ascent
                    } else {
                        goingUp = false; 
                    }
                } else {
                    if (currentFrame < totalFrames) {
                        this.sprite.y += 3; // start descent
                    } else {
                        this.sprite.y = 855;
                        this.jumpAnimationPlaying = false;
                        this.jumpAnimation.visible = false;
                        this.idleSprite.visible = true;
                        return; 
                    }
                }
    
                currentFrame++;
                requestAnimationFrame(jumpAnimationLoop);
            };
    
            jumpAnimationLoop(); 
            }
        }
    
        playRunAnimation() {
            if (!this.runAnimationPlaying) {
                this.runAnimationPlaying = true;
                this.idleSprite.visible = false;
                this.runAnimation.visible = true;
                this.runAnimation.gotoAndPlay(0);
    
                let totalFrames = this.runAnimation.totalFrames;
                let currentFrame = 0;
    
                let runAnimationLoop = () => {
                    if (currentFrame < totalFrames) {
                        requestAnimationFrame(runAnimationLoop);
                    } else {
                        this.runAnimationPlaying = false;
                        this.runAnimation.gotoAndStop(0);
                        this.runAnimation.visible = false;
                        this.idleSprite.visible = true;
                        return;
                    }
    
                    currentFrame++;
                };
    
                runAnimationLoop();
            }
        }

    moveRight() {
        this.sprite.x += 5;
        this.sprite.scale.x = 0.6;
    }
    moveLeft() {
        this.sprite.scale.x = -0.6;
        this.sprite.x -= 5;
    }

    stopAllAnimations() {
        this.runAnimation.visible = false;
        this.jumpAnimation.visible = false;
        this.idleSprite.visible = true;
    }
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
            app.screen.height
        );
        app.stage.addChild(background);

        // Create and add clouds sprite
        function createClouds() {
        const cloudsTexture = PIXI.Texture.from(globalAssets.clouds);
        const cloudsSprite = new PIXI.Sprite(cloudsTexture);
        cloudsSprite.x = Math.random() * app.screen.width; // Random X position
        cloudsSprite.y = Math.random() * app.screen.height;
        app.stage.addChild(cloudsSprite);
        return cloudsSprite;
        }

        const numClouds = 10; // Change this to the number of clouds you want
        const cloudArr = [];

        for (let i = 0; i < numClouds; i++) {
        const cloud = createClouds();
        app.stage.addChild(cloud);
        cloudArr.push(cloud);
        }


        // setInterval(createClouds, 8000); 

        const middleGroundTexture = PIXI.Texture.from(globalAssets.middleGround);
        const middleGroundSprite = new PIXI.TilingSprite(middleGroundTexture, app.screen.width, app.screen.height);
        middleGroundSprite.scale.set(2, 2);
        middleGroundSprite.y = app.screen.height - 900;
        app.stage.addChild(middleGroundSprite);

        const groundTexture = PIXI.Texture.from(globalAssets.ground);
        const groundSprite = new PIXI.TilingSprite(groundTexture, app.screen.width, app.screen.height);
        groundSprite.scale.set(2,2)
        groundSprite.y = app.screen.height - 750;
        app.stage.addChild(groundSprite);

        // Create a character
        const character = new Character();
        app.stage.addChild(character.sprite);

        app.ticker.add(function () {
            for (const cloud of cloudArr) {
            cloud.x -= 0.5; 
            }
            gameLoop()
        }); 


        // Event listeners to make character jump
        window.addEventListener("keydown", keyDown);
        window.addEventListener("keyup", keyUp);

        function keyDown(e) {
            pressedKeys[e.keyCode] = true;
            if (e.keyCode === 39) {
                isMovingRight = true;
            }
        }
        
        function keyUp(e) {
            pressedKeys[e.keyCode] = false;
            if (e.keyCode === 39) {
                isMovingRight = false;
                character.stopAllAnimations();
            }
        }

        function gameLoop() {
            if (pressedKeys["32"] && !character.isJumping) {
                character.playJumpAnimation();
            } else if (isMovingRight) {
                character.playRunAnimation();
                character.moveRight();
                groundSprite.tilePosition.x -= 3;
            } else if (pressedKeys['37']) {
                character.playRunAnimation();
                character.moveLeft();
                groundSprite.tilePosition.x += 3;
            } else {
                character.stopAllAnimations();
            }
        }
    } catch (error) {
        console.error("Error loading assets:", error);
    }
}

startGame();


//next steps detect collision logic  and then call gameCanvas.stop();