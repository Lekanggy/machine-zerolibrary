class SketchPadObject{
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    constructor(container: HTMLElement, size=400){
        this.canvas = document.createElement("canvas")
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style.backgroundColor = "#fff";
        this.canvas.style.boxShadow = "0 0 10px 2px black";
        container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        console.log("show rd")
    }
}
