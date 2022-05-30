class Player {
    constructor(args) {
        this.p = args.p || createVector(width / 2, height / 2);
        this.pid = args.pid;
        this.r = args.r;
        this.name = args.name || "default";
        this.v = createVector(0, 0);
        this.step = 0;
        this.maxStep = 20;
        this.mapOrigin = args.mapOrigin;
    }

    setup() {
        this.p.x = this.mapOrigin.x + this.pid.x * this.r;
        this.p.y = this.mapOrigin.y + this.pid.y * this.r;
    }

    run() {
        this.move();
        // console.log(this.step)
    }

    draw() {
        push();
        translate(this.p.x, this.p.y);
        noStroke();
        fill(255);
        rectMode(CENTER);
        rect(0, 0, 12, 7);
        push();
        translate(0, -7 / 2);
        arc(0, 0, 12, 12, 180, 0);
        pop();
        textAlign(CENTER, CENTER);
        text(this.name, 0, -18);
        pop();
    }

    setDirection(key) {
        if (this.step == 0) {
            this.step = this.maxStep;
            this.v = this.getVector(key);
            this.pid = p5.Vector.add(this.pid, this.v);
        }

    }

    getNextGrid(key) {
        let v = this.getVector(key);
        return p5.Vector.add(this.pid, v);
    }

    move() {
        if (this.step > 0) {
            let s = this.r / this.maxStep;
            this.p.x = this.p.x + this.v.x * s;
            this.p.y = this.p.y + this.v.y * s;
            this.step = this.step - 1;
        }
        // if (this.step == 0 && keyIsPressed) {
        //     this.setDirection(keyCode);
        // }
    }

    getVector(key) {
        let v;
        if (key == UP_ARROW) {
            v = createVector(0, -1);
        } else if (key == DOWN_ARROW) {
            v = createVector(0, 1);
        } else if (key == LEFT_ARROW) {
            v = createVector(-1, 0);
        } else if (key == RIGHT_ARROW) {
            v = createVector(1, 0);
        }
        return v;
    }
}