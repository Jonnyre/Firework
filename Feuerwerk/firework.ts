namespace Firework {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvasDiv");
    canvas.addEventListener("dragover", hndDragOver);

    window.addEventListener("load", loadWnd);

    async function loadWnd(): Promise<void> {
        let response: Response = await fetch("http://localhost:5001/getAll");
        let responseString: string =  await response.text();
        
        let firecrackers: Firecracker[] = await JSON.parse(responseString);

        let firecrackersDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        firecrackersDiv.classList.add("firecrackers");
        for (let i: number = 1; i < firecrackers.length + 1; i++) {
            let firecrackerDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
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

    function hndDragStart(event: Event): void {
       let div: HTMLDivElement = <HTMLDivElement> event.target;
       div.classList.add("dragStart");
    }

    function hndDragEnd(event: Event): void {
        let div: HTMLDivElement = <HTMLDivElement> event.target;
        div.classList.add("dragEnd");
    }

    function hndDragOver(event: Event): void {
        if (event.preventDefault) {
            event.preventDefault();
          }
        return;
    }

    function hndDragEnter(event: Event): void {
        let div: HTMLDivElement = <HTMLDivElement> event.target;
        div.classList.add("hover");
    }
    function hndDragLeave(event: Event): void {
        let div: HTMLDivElement = <HTMLDivElement> event.target;
        div.classList.remove("hover");
    }

    function hndDrop(event: Event): void {
        console.log("drop");
        event.dataTra
    }
}