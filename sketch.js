let scene;

function setup() {
    createCanvas(windowWidth, windowHeight);

    scene = new Scene({});
    scene.setup()

    angleMode(DEGREES);
}

function draw() {
    background(0);

    scene.run();
    scene.draw();

    // console.log(keyCode);
}


function keyPressed() {
    scene.players.forEach(p => {
        if (!scene.isWall(p.getNextGrid(keyCode).x, p.getNextGrid(keyCode).y)) {
            p.setDirection(keyCode);
        }
    });
}