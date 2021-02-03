"use strict";
var Firework;
(function (Firework) {
    let canvas = document.getElementById("canvasDiv");
    canvas.addEventListener("dragover", hndDragOver);
    window.addEventListener("load", loadWnd);
    async function loadWnd() {
        let response = await fetch("http://localhost:5001/getAll");
        let responseString = await response.text();
        let firecrackers = await JSON.parse(responseString);
        let firecrackersDiv = document.createElement("div");
        firecrackersDiv.classList.add("firecrackers");
        for (let i = 1; i < firecrackers.length + 1; i++) {
            let firecrackerDiv = document.createElement("div");
            firecrackerDiv.classList.add("firecracker");
            firecrackerDiv.id = "firecracker" + i;
            firecrackerDiv.setAttribute("draggable", "true");
            firecrackerDiv.addEventListener("dragstart", hndDragStart);
            firecrackerDiv.addEventListener("dragstart", hndDragEnd);
            firecrackerDiv.addEventListener("dragover", hndDragOver);
            firecrackerDiv.addEventListener("dragenter", hndDragEnter);
            firecrackerDiv.addEventListener("dragleave", hndDragLeave);
            firecrackerDiv.addEventListener("drop", hndDrop);
            firecrackersDiv.append(firecrackerDiv);
        }
        canvas.after(firecrackersDiv);
    }
    function hndDragStart(event) {
        let div = event.target;
        div.classList.add("dragStart");
    }
    function hndDragEnd(event) {
        let div = event.target;
        div.classList.add("dragEnd");
    }
    function hndDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        return;
    }
    function hndDragEnter(event) {
        let div = event.target;
        div.classList.add("hover");
    }
    function hndDragLeave(event) {
        let div = event.target;
        div.classList.remove("hover");
    }
    function hndDrop(event) {
        console.log("drop");
        event.dataTra;
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=firework.js.map