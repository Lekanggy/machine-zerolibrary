
type Point = [number, number]
type Path = Array<Point>
type Events = MouseEvent | TouchEvent

class SketchPadObject{
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    //private point: Array<number>;

    private paths: Array<Path>
    private isDrawing: boolean
    constructor(container: HTMLElement, size=400){
        this.canvas = document.createElement("canvas")
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style.backgroundColor = "#fff";
        this.canvas.style.boxShadow = "0 0 10px 2px black";
        container.appendChild(this.canvas);

        this.paths = [];

        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.isDrawing = false;

        this.#addEventListeners();
    }

    #addEventListeners(){
        this.canvas.onmousedown = (e)=>{
           this.#handleMouseDown(e)
        }

        this.canvas.onmousemove = (e)=>{
           this.#handleMouseMove(e)
        }

        this.canvas.onmouseup = ()=>{
            this.isDrawing = false;
        }

        this.canvas.ontouchstart = (e: TouchEvent)=>{
            const loc = e.touches[0]
            this.#handleMouseDown(loc as any)
        }

        this.canvas.ontouchmove = (e: TouchEvent)=>{
            const loc = e.touches[0]
          this.#handleMouseMove(loc as any)
        }

        this.canvas.ontouchend = (e: TouchEvent)=>{
            const loc = e.touches[0]
            this.#handleMouseUp()
        }
    }

    private getMouse(e: any){
        const rect = this.canvas.getBoundingClientRect()

        return [
            Math.round(e.clientX - rect.left),
            Math.round(e.clientY - rect.top)
        ] as Point
    }

    #redraw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        draw.paths(this.ctx, this.paths);
    }

    #handleMouseDown(e: Events){
        const mouse = this.getMouse(e)
        this.paths.push([mouse])
        this.isDrawing = true;
    }

    #handleMouseMove(e: Events){
        if(this.isDrawing){
            const mouse = this.getMouse(e)
            const lastPath = this.paths[this.paths.length-1]
            lastPath.push(mouse)
            this.#redraw();
        }
    }

    #handleMouseUp(){
        this.isDrawing = false
    }

    
}
