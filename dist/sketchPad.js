"use strict";
class SketchPadObject {
    constructor(container, size = 400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style.backgroundColor = "#fff";
        this.canvas.style.boxShadow = "0 0 10px 2px black";
        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        console.log("show rd");
    }
}
