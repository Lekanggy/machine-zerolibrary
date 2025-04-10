"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SketchPadObject_instances, _SketchPadObject_addEventListeners, _SketchPadObject_redraw, _SketchPadObject_handleMouseDown, _SketchPadObject_handleMouseMove, _SketchPadObject_handleMouseUp;
class SketchPadObject {
    constructor(container, size = 400) {
        _SketchPadObject_instances.add(this);
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style.backgroundColor = "#fff";
        this.canvas.style.boxShadow = "0 0 10px 2px black";
        container.appendChild(this.canvas);
        this.paths = [];
        this.ctx = this.canvas.getContext("2d");
        //Create undo btn
        this.undoBtn = document.createElement("button");
        this.undoBtn.innerText = "Undo";
        container.appendChild(this.undoBtn);
        this.isDrawing = false;
        __classPrivateFieldGet(this, _SketchPadObject_instances, "m", _SketchPadObject_addEventListeners).call(this);
        __classPrivateFieldGet(this, _SketchPadObject_instances, "m", _SketchPadObject_redraw).call(this);
    }
    getMouse(e) {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(e.clientX - rect.left),
            Math.round(e.clientY - rect.top)
        ];
    }
}
_SketchPadObject_instances = new WeakSet(), _SketchPadObject_addEventListeners = function _SketchPadObject_addEventListeners() {
    this.canvas.onmousedown = (e) => {
        __classPrivateFieldGet(this, _SketchPadObject_instances, "m", _SketchPadObject_handleMouseDown).call(this, e);
    };
    this.canvas.onmousemove = (e) => {
        __classPrivateFieldGet(this, _SketchPadObject_instances, "m", _SketchPadObject_handleMouseMove).call(this, e);
    };
    this.canvas.onmouseup = () => {
        this.isDrawing = false;
    };
    this.canvas.ontouchstart = (e) => {
        const loc = e.touches[0];
        __classPrivateFieldGet(this, _SketchPadObject_instances, "m", _SketchPadObject_handleMouseDown).call(this, loc);
    };
    this.canvas.ontouchmove = (e) => {
        const loc = e.touches[0];
        __classPrivateFieldGet(this, _SketchPadObject_instances, "m", _SketchPadObject_handleMouseMove).call(this, loc);
    };
    this.canvas.ontouchend = (e) => {
        const loc = e.touches[0];
        __classPrivateFieldGet(this, _SketchPadObject_instances, "m", _SketchPadObject_handleMouseUp).call(this);
    };
    this.undoBtn.onclick = () => {
        this.paths.pop();
        __classPrivateFieldGet(this, _SketchPadObject_instances, "m", _SketchPadObject_redraw).call(this);
    };
}, _SketchPadObject_redraw = function _SketchPadObject_redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);
    if (this.paths.length > 0) {
        this.undoBtn.disabled = false;
    }
    else {
        this.undoBtn.disabled = true;
    }
}, _SketchPadObject_handleMouseDown = function _SketchPadObject_handleMouseDown(e) {
    const mouse = this.getMouse(e);
    this.paths.push([mouse]);
    this.isDrawing = true;
}, _SketchPadObject_handleMouseMove = function _SketchPadObject_handleMouseMove(e) {
    if (this.isDrawing) {
        const mouse = this.getMouse(e);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        __classPrivateFieldGet(this, _SketchPadObject_instances, "m", _SketchPadObject_redraw).call(this);
    }
}, _SketchPadObject_handleMouseUp = function _SketchPadObject_handleMouseUp() {
    this.isDrawing = false;
};
