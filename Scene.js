class Scene {
    constructor(args) {
        this.mapCenter = args.mapCenter || createVector(width / 2, height / 2);
        this.map = [];
        this.mapSetting =
            `--oooooo------------
        --o3333o------------
        --o3333o------------
        --o3333o------------
        --o3333o---oooooooo-
        -ooooo-ooooo222222o-
        -o444o-----o222222o-
        -o444------o222222o-
        -o444o-----o222222o-
        -o444o-----oo-ooooo-
        -o444o----------o---
        oooooooo--------o---
        o555555---------o---
        o555555oooo-ooo-oooo
        o555555o------o1111o
        o555555o------o1111o
        o555555o------o1111o
        o555555o------o1111o
        o555555o------oooooo
        oooooooo------------
        `;
        this.mapArr;
        this.mapSize = 20;
        // player
        this.players = [];
        this.currentTime = 0;
        this.preTime = 0;
    }

    setup() {
        let gridsize = 20;
        this.initMap(this.mapSize, this.mapSize, gridsize);
        let gridWidth = this.mapSize * gridsize;
        let gridHeight = this.mapSize * gridsize;
        let p = new Player({
            pid: createVector(int(this.mapSize / 2), int(this.mapSize / 2)),
            name: "yclee",
            r: 20,
            mapOrigin: createVector(this.mapCenter.x - gridWidth / 2, this.mapCenter.y - gridHeight / 2)
        })
        p.setup();
        this.players.push(p);
    }

    run() {
        this.players.forEach(p => {
            p.run();
        })

        this.currentTime = int(millis() / 1000);
        if (this.currentTime != this.preTime) {
            this.preTime = this.currentTime;
            this.players.forEach(p => {
                console.log(this.getGridInMap(p.pid.x, p.pid.y));
            })
        }
    }

    draw() {
        this.drawMap();

        this.players.forEach(p => {
            p.draw();
        })
    }

    initMap(rownum, colnum, size) {

        this.mapArr = this.mapSetting.split("\n");
        this.mapArr = this.mapArr.map(s => s.replace(/(^[\s]*)|([\s]*$)/g, ""));

        let gridWidth = rownum * size;
        let gridHeight = colnum * size;
        let origin = createVector(this.mapCenter.x - gridWidth / 2, this.mapCenter.y - gridHeight / 2);
        for (let j = 0; j < colnum; j++) {
            for (let i = 0; i < rownum; i++) {
                let g = new Grid({
                    p: createVector(origin.x + i * size, origin.y + j * size),
                    r: size,
                    pid: createVector(i, j),
                    wallType: this.checkGridType(i, j)
                })
                this.map.push(g);
            }
        }
    }

    drawMap() {
        this.map.forEach(g => {
            g.draw();
        })
    }

    checkGridType(i, j) {
        let type = this.getGridInMap(i, j);

        if (this.isWall(i, j)) {
            let l = this.isWall(i - 1, j);
            let r = this.isWall(i + 1, j);
            let u = this.isWall(i, j - 1);
            let d = this.isWall(i, j + 1);

            if (!u && !d && !l && !r) type = "dot";
            else if (u && d && !l && !r) type = "col";
            else if (!u && !d && l && r) type = "row";
            else if (u && r && !d && !l) type = "ld-corner";
            else if (u && l && !d && !r) type = "rd-corner";
            else if (d && r && !u && !l) type = "lt-corner";
            else if (d && l && !u && !r) type = "rt-corner";
            else if (u && r && l && !d) type = "u-tupe";
            else if (d && l && r && !u) type = "d-tupe";
            else if (l && u && d && !r) type = "l-tupe";
            else if (r && u && d && !l) type = "r-tupe";
            else if (!r && u && !d && !l) type = "u-end";
            else if (!r && !u && d && !l) type = "d-end";
            else if (r && !u && !d && !l) type = "r-end";
            else if (!r && !u && !d && l) type = "l-end";




        }
        return type;
    }

    getGridInMap(i, j) {
        let result = null;
        if (i >= 0 && i < this.mapSize && j >= 0 && j < this.mapSize) {
            result = this.mapArr[j][i];
        }
        return result;
    }

    isWall(i, j) {
        let iswall = false;
        if (this.getGridInMap(i, j) == 'o') iswall = true;
        return iswall;
    }

    // createPlayer(pid, name, size) {

    // }
}