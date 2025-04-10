//type Point1 = [number, number]
const draw:{[k: string]: any} = {}

draw.path = (ctx: CanvasRenderingContext2D, path:Array<Point>, color="black")=>{
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    ctx.moveTo(...path[0]);

    for(let i = 1; i < path.length; i++){
        ctx.lineTo(...path[i]);
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
}


draw.paths = (ctx: CanvasRenderingContext2D, paths:Array<Path>, color="black")=>{
    for(const path of paths){
        draw.path(ctx, path, color)
    }
}