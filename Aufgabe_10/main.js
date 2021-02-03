"use strict";
var L08_winterwonderland;
(function (L08_winterwonderland) {
    window.addEventListener("load", handleLoad);
    let crc2;
    //let quarter: number = 0.25;
    let half = 0.5;
    //let horizon: number;
    //let posMountains: number;
    let center;
    let container = [];
    //let ratio: number; 
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        center = { x: crc2.canvas.width / 2, y: crc2.canvas.height / 2 };
        //let ratio = crc2.canvas.height / crc2.canvas.height;
        let horizon = crc2.canvas.height;
        let posMountains = { x: 0, y: horizon };
        drawBackground();
        drawSun({ x: crc2.canvas.width * 0.8, y: crc2.canvas.height * 0.15 });
        drawMountainsBig(posMountains, 80, 120, "grey", "white");
        drawMountainsSmall(posMountains, 50, 70, "lightgrey", "white");
        drawCloud({ x: crc2.canvas.width * 0.2, y: crc2.canvas.height * 0.15 }, { x: crc2.canvas.width * 0.18, y: crc2.canvas.height * 0.5 });
        drawCloud({ x: crc2.canvas.width * 0.4, y: crc2.canvas.height * 0.13 }, { x: crc2.canvas.width * 0.08, y: crc2.canvas.height * 0.9 });
        drawPiste({ x: 0, y: horizon }, { x: crc2.canvas.width / 2, y: crc2.canvas.height / 2 });
        hndDrawTrees({ x: crc2.canvas.width * 0.1, y: crc2.canvas.height * 0.8 }, { x: crc2.canvas.width * 0.2, y: crc2.canvas.height * 0.1 });
        hndDrawBoarder({ x: crc2.canvas.width * 0.5, y: crc2.canvas.height * 1 }, { x: crc2.canvas.width * 0.2, y: crc2.canvas.height * 0.1 });
        //drawBoarder();
        drawLift();
        //drawSkier
        hndDrawSnow(crc2.canvas.width, crc2.canvas.height);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "blue");
        /* gradient.addColorStop(quarter, "lightblue"); */
        gradient.addColorStop(half, "white");
        //half = (crc2.canvas.height / 2 );
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = crc2.canvas.height * 0.05;
        let r2 = crc2.canvas.height * 0.15;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(40, 70%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function drawCloud(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 99;
        let radiusParticle = 11;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawMountainsBig(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("MountainsBig", _position, _min, _max);
        let stepMin = 12;
        let stepMax = 17;
        let x = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function drawMountainsSmall(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("MountainsSmall", _position, _min, _max);
        let stepMin = 20;
        let stepMax = 50;
        let x = 0;
        let y;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        do {
            if (x > center.x - 50 && x < center.x + 50) {
                console.log("est");
                x += 10;
                y = -center.y / 2;
                crc2.lineTo(x, y);
                container.push(x);
            }
            else {
                x += stepMin + Math.random() * (stepMax - stepMin);
                y = -_min - Math.random() * (_max - _min);
                crc2.lineTo(x, y);
            }
            /* x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y); */
        } while (x < crc2.canvas.width);
        console.log(container);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -crc2.canvas.height);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.2, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function drawPiste(_position, _center) {
        console.log("Piste", _position);
        crc2.beginPath();
        crc2.moveTo(0, crc2.canvas.height);
        //crc2.lineTo(center.x - 20, posMountains);
        crc2.lineTo(container[0], center.y + (center.y / 2));
        let containerLength = container.length;
        crc2.moveTo(crc2.canvas.width, crc2.canvas.height);
        crc2.lineTo(container[containerLength - 1], center.y + (center.y / 2));
        crc2.strokeStyle = "lightgrey";
        crc2.stroke();
    }
    function hndDrawTrees(_position, _size) {
        console.log("Trees", _position, _size);
        //let tree: Path2D = new Path2D();
        /* crc2.beginPath();
        crc2.moveTo(crc2.canvas.width * 0.2, crc2.canvas.height * 0.7);
        crc2.lineTo(crc2.canvas.width * 0.22, crc2.canvas.height * 0.6);
        crc2.lineTo(crc2.canvas.width * 0.24, crc2.canvas.height * 0.7);
        crc2.lineTo(crc2.canvas.width * 0.2, crc2.canvas.height * 0.7);
        crc2.fillStyle = "#003300";
        crc2.fill(); */
        let nTrees = 5;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < nTrees; drawn++) {
            /* crc2.save(); */
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            //crc2.translate(x, y);
            drawTrees(x, y);
            //crc2.restore();
        }
        crc2.restore();
    }
    function drawTrees(_x, _y) {
        console.log("drawing a tree...");
        crc2.save();
        crc2.translate(_x, _y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(crc2.canvas.width * 0.025, 0 - crc2.canvas.height * 0.1);
        crc2.lineTo(crc2.canvas.width * 0.05, 0);
        crc2.lineTo(0, 0);
        crc2.fillStyle = "#003300";
        crc2.fill();
        crc2.restore();
    }
    /*  for (let i: number = 0; i < 5; i++) {
          let x: number = Math.random() * crc2.canvas.width + 50;
          let y: number = Math.random() * 140 + 350;
          drawTrees(x, y);
      } */
    function hndDrawBoarder(_position, _size) {
        console.log("HndBoarder", _position, _size);
        let nBoarder = 5;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < nBoarder; drawn++) {
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            drawBoarder(x, y);
        }
        crc2.restore();
    }
    function drawBoarder(_x, _y) {
        console.log("Boarder");
        crc2.save();
        crc2.translate(_x, _y);
        crc2.beginPath();
        crc2.ellipse(_x, _y, 2, 11, Math.PI / 2, 0, 2 * Math.PI);
        crc2.fillStyle = "yellow";
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.moveTo(_x - 4, _y);
        crc2.lineTo(_x, _y - 4);
        crc2.lineTo(_x + 4, _y);
        crc2.lineTo(_x - 4, _y);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(_x, _y - 5, Math.PI / 2, 0, 2 * Math.PI);
        //crc2.strokeStyle = "ffff80";
        crc2.fillStyle = "yellow";
        crc2.fill();
        crc2.closePath();
        /* crc2.beginPath();
        crc2.ellipse(crc2.canvas.width * 0.3, crc2.canvas.height * 0.89, 2, 11, Math.PI / 2, 0, 2 * Math.PI);
        crc2.fillStyle = "#ffff80";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.moveTo(crc2.canvas.width * 0.28, crc2.canvas.height * 0.89);
        crc2.lineTo(crc2.canvas.width * 0.3, crc2.canvas.height * 0.84);
        crc2.lineTo(crc2.canvas.width * 0.32, crc2.canvas.height * 0.89);
        crc2.lineTo(crc2.canvas.width * 0.28, crc2.canvas.height * 0.89);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        
        
        crc2.arc(crc2.canvas.width * 0.3, crc2.canvas.height * 0.85, Math.PI / 0.95, 0, 2 * Math.PI);
        crc2.strokeStyle = "ffff80";
        crc2.fillStyle = "ffff80";
        crc2.fill();
        crc2.closePath(); */
        crc2.restore();
        //crc2.moveTo(crc2.canvas.width * 0.3, crc2.canvas.height * 0.85);
    }
    function drawLift() {
        console.log("Lift");
        //Heads
        crc2.beginPath();
        crc2.arc(crc2.canvas.width * 0.69, crc2.canvas.height * 0.55, Math.PI / 2, 0, 2 * Math.PI);
        crc2.fillStyle = "red";
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(crc2.canvas.width * 0.71, crc2.canvas.height * 0.545, Math.PI / 2, 0, 2 * Math.PI);
        crc2.fillStyle = "green";
        crc2.fill();
        crc2.closePath();
        //Lift-Box
        crc2.beginPath();
        crc2.ellipse(crc2.canvas.width * 0.7, crc2.canvas.height * 0.55, 7, 12, Math.PI / 2, 0, 2 * Math.PI);
        crc2.strokeStyle = "black";
        crc2.lineWidth = 0.1;
        crc2.fillStyle = "rgba(198, 226, 255, 0.5)";
        crc2.stroke();
        crc2.fill();
        crc2.closePath();
        //Wire
        crc2.beginPath();
        crc2.moveTo(crc2.canvas.width, crc2.canvas.height * 0.8);
        crc2.lineTo(crc2.canvas.width * 0.7, crc2.canvas.height * 0.5);
        crc2.strokeStyle = "grey";
        crc2.lineWidth = 0.3;
        crc2.stroke();
        crc2.closePath();
    }
    function hndDrawSnow(_x, _y) {
        console.log("Snow");
        drawSnow(_x, _y);
        /* let nParticles: number = 50;
        let particle: Path2D = new Path2D();
        particle.arc(_x, _y, 1.5, 0, 2 * Math.PI);
        
        crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
        crc2.fill();
        for (let i: number = 0; i < nParticles; i++) {
            let x: number = (Math.random() - 0.5) * crc2.canvas.width;
            let y: number = - (Math.random() * crc2.canvas.height);
            drawSnow(x, y);
            console.log("lel");
        } */
    }
    /* function drawSnow(_x: number, _y: number): void {
         crc2.beginPath();
         crc2.arc(_x, _y, 1.5, 0, 2 * Math.PI);
         crc2.fillStyle = "#FFFFFF";
         crc2.fill();
     } */
    function drawSnow(_x, _y) {
        for (let i = 0; i < 200; i++) {
            let x = Math.random() * _x;
            let y = Math.random() * _y;
            /* drawSnow(x, y); */
            crc2.beginPath();
            crc2.arc(x, y, 1, 0, 2 * Math.PI);
            crc2.fillStyle = "#FFFFFF";
            crc2.fill();
        }
    }
})(L08_winterwonderland || (L08_winterwonderland = {}));
//# sourceMappingURL=main.js.map