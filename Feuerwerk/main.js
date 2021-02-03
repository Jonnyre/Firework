"use strict";
var Firework;
(function (Firework) {
    let serverURL = "http://localhost:5001";
    let deleteButton = document.getElementById("deleteAll");
    deleteButton.addEventListener("click", deleteAll);
    async function deleteAll() {
        let serverURLDelete = serverURL + "/removeAll";
        await fetch(serverURLDelete);
    }
    let color1 = document.getElementById("colorpicker1");
    color1.addEventListener("change", drawExplosion);
    let color2 = document.getElementById("colorpicker2");
    color2.addEventListener("change", drawExplosion);
    let radius = document.getElementById("radius");
    radius.addEventListener("change", drawExplosion);
    let particles = document.getElementById("particles");
    particles.addEventListener("change", drawExplosion);
    let fireCrackerDiv1 = document.getElementById("firecracker1");
    fireCrackerDiv1.addEventListener("click", function () {
        chooseFirecracker(this);
    });
    let fireCrackerDiv2 = document.getElementById("firecracker2");
    fireCrackerDiv2.addEventListener("click", function () {
        chooseFirecracker(this);
    });
    let fireCrackerDiv3 = document.getElementById("firecracker3");
    fireCrackerDiv3.addEventListener("click", function () {
        chooseFirecracker(this);
    });
    async function chooseFirecracker(div) {
        removeColor();
        div.classList.add("selected");
        let response = await fetch("http://localhost:5001/getAll");
        let responseString = await response.text();
        // let responseString: string = JSON.stringify(response);
        console.log(responseString);
        let firecrackers = await JSON.parse(responseString);
        console.log(div.getAttribute("firecrackerId"));
        for (let i = 0; i < firecrackers.length; i++) {
            if (Number(div.getAttribute("firecrackerId")) == firecrackers[i].firecrackerId) {
                color1.value = "#" + firecrackers[i].color1;
                color2.value = "#" + firecrackers[i].color2;
                particles.value = firecrackers[i].particles.toString();
                radius.value = firecrackers[i].radius.toString();
            }
        }
        drawExplosion();
    }
    function removeColor() {
        fireCrackerDiv1.classList.remove("selected");
        fireCrackerDiv2.classList.remove("selected");
        fireCrackerDiv3.classList.remove("selected");
    }
    let saveButton = document.getElementById("save");
    saveButton.addEventListener("click", hndSave);
    async function hndSave() {
        let firecrackerId = 0;
        if (fireCrackerDiv1.classList.contains("selected")) {
            firecrackerId = 1;
        }
        if (fireCrackerDiv2.classList.contains("selected")) {
            firecrackerId = 2;
        }
        if (fireCrackerDiv3.classList.contains("selected")) {
            firecrackerId = 3;
        }
        let url = "http://localhost:5001/save?firecrackerId=" + firecrackerId + "&color1=" + color1.value.replace("#", "") + "&color2=" + color2.value.replace("#", "") + "&particles=" + particles.value + "&radius=" + radius.value;
        console.log(url);
        let response = await fetch(url);
        console.log(response);
    }
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    function drawExplosion() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        // ctx.beginPath();
        // ctx.arc(centerX, centerY, Number(radius.value), 0, 2 * Math.PI);
        // ctx.stroke();
        let circleSteps = Math.PI * 2 / Number(particles.value);
        for (let i = 0; i < Math.PI * 2; i += circleSteps) {
            drawParticle(i, 2);
        }
        ctx.restore();
    }
    function drawParticle(radiusParticle, lineWidth) {
        ctx.setTransform(1, 0, 0, 1, centerX, centerY);
        ctx.rotate(radiusParticle);
        ctx.translate(0, radiusParticle);
        let gradient = ctx.createLinearGradient(-lineWidth / 2, 0, lineWidth, Number(radius.value));
        gradient.addColorStop(0, color1.value);
        gradient.addColorStop(1, color2.value);
        ctx.fillStyle = gradient;
        ctx.fillRect(-lineWidth / 2, 0, lineWidth, Number(radius.value));
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=main.js.map