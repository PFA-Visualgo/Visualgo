/* 
    This file implements the main primitives used to draw
    It is inspired by p5.js but it only implements what is used in the project
    Therefore it lower the total size of the project 
    It's purpose is to simplify the creation of drawings, while keeping full controle over the implementation 
*/

// This line is used for the Node.js testing environment
if (typeof window === "undefined") {
    global.CanvasRenderingContext2D = require('canvas').CanvasRenderingContext2D;
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.Option = dom.window.Option;
}


///// Global Variables /////


// context2D of current canvas is a global variables for easy access



const ctx = {
    value: null,
    get: function () {
        if (this.value === null) {
            throw new Error("current context2D is undefined");
        }
        return this.value;
    },
    set: function (newContext) {
        if (newContext instanceof CanvasRenderingContext2D) {
            this.value = newContext;
        }
        else {
            this.value = null;
        }
    }
};

// width and height are references to the width and height of the canvas

if (typeof window !== 'undefined') {
    // Browser environment
    Object.defineProperty(window, 'width', {
        get: function () {
            return ctx.get().canvas.width;
        }
    });

    Object.defineProperty(window, 'height', {
        get: function () {
            return ctx.get().canvas.height;
        }
    });
}


// background color is used when the canvas is resized
let backgroundColor = "#FFFFFF" // white


///// Canvas Setup Functions /////


/**
 * Create a canvas element and adds it inside another element
 * @param {string} place id of the element in which the canvas will be added
 * @param {string} name id of the canvas element
 * @param {number} width width of the canvas
 * @param {number} height height of the canvas
 */

function createCanvas(place, width, height, name) {

    // Get the container element
    let canvasContainer = document.getElementById(place);
    if (canvasContainer === null) {
        throw new Error("Container ${place} does not exists");
    }

    // Initialise canvas
    if (document.getElementById(name) !== null) {
        throw new Error("An element with id : ${name} already exists");
    }

    let canvas = document.createElement("canvas");
    canvas.id = name;
    canvas.width = width;
    canvas.height = height;

    // Add canvas to html page
    canvasContainer.appendChild(canvas);

    // Initialise context
    ctx.set(canvas.getContext("2d"));


}

/**
 * Resize current canvas
 * @param {number} w new width
 * @param {number} h new height
 */
function resizeCanvas(w = width, h = height) {

    if (w != width || h != height) {
        if (w < 0) {
            throw new Error("Canvas width can not be set to negative value")
        }
        if (h < 0) {
            throw new Error("Canvas height can not be set to negative value")
        }

        // Save all used context variables
        let ctxData = ctx.get().getImageData(0, 0, width, height);
        let ctxStrokeStyle = ctx.get().strokeStyle;
        let ctxLineWidth = ctx.get().lineWidth;
        let ctxFillStyle = ctx.get().fillStyle;
        let ctxTextAlign = ctx.get().textAlign;
        let ctxTextBaseline = ctx.get().textBaseline;
        let ctxFont = ctx.get().font;

        let lastWidth = width;
        let lastHeight = height;

        // Changing size reset all context attributes
        ctx.get().canvas.width = w;
        ctx.get().canvas.height = h;

        // Restore all context variable
        ctx.get().putImageData(ctxData, 0, 0);
        ctx.get().strokeStyle = ctxStrokeStyle;
        ctx.get().lineWidth = ctxLineWidth;
        ctx.get().fillStyle = ctxFillStyle;
        ctx.get().textAlign = ctxTextAlign;
        ctx.get().textBaseline = ctxTextBaseline;
        ctx.get().font = ctxFont;

        // Fill new space with background color
        fill(backgroundColor);

        ctx.get().beginPath();
        ctx.get().rect(lastWidth, 0, width - lastWidth, height);
        ctx.get().fill();

        ctx.get().beginPath();
        ctx.get().rect(0, lastHeight, width, height - lastHeight);
        ctx.get().fill();

        fill(ctxFillStyle);
    }
}

///// Parameter Modifiers /////


/**
 * Check if argument is a valid CSS color value
 * @param {string} color 
 * @returns 
 */
function isValidColor(color) {
    const s = new Option().style;
    s.color = color;
    return s.color !== "";
}

/**
 * Change stroke color
 * @param {string} color
 */
function stroke(color) {
    if (!isValidColor(color)) {
        throw new Error("Invalid fill color used");
    }

    ctx.get().strokeStyle = color;
}

/**
 * Disable stroke
 */
function noStroke() {
    // Change the color to a transparent one
    fill("#FFFFFF00");
}

/**
 * Change the width of strokes
 * @param {number} weight 
 */
function strokeWeight(weight) {
    if (weight < 0) {
        throw new Error("Invalid stoke width value")
    }

    ctx.get().lineWidth = weight;
}

/**
 * Change fill color
 * @param {string} color
 */
function fill(color) {
    if (!isValidColor(color)) {
        throw new Error("Invalid fill color used");
    }

    ctx.get().fillStyle = color;
}

/**
 * Disable shape filling
 */
function noFill() {
    // Change the color to a transparent one
    fill("#FFFFFF00");
}


///// Primitive Shapes /////


/**
 * Draw a point at coord (x, y)
 * @param {number} x 
 * @param {number} y 
 */
function point(x, y) {
    // To get a point of a precise size we make a filled circle with no stroke


    if (!isValidColor(tmp_fill_color)) {
        throw new Error("Invalid fill color used");
    }

    // Save color
    let tmp_fill_color = ctx.get().fillStyle

    // Draw circle of size lineWidth
    fill(ctx.get().strokeStyle);
    ctx.get().beginPath();
    ctx.get().arc(x, y, ctx.get().lineWidth / 2, 0, 2 * Math.PI);
    ctx.get().fill();

    // Load back saved colors
    fill(tmp_fill_color);

}

/**
 * Draw a line from coord (x1, y1) to (x2, y2)
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 */
function line(x1, y1, x2, y2) {

    ctx.get().beginPath();
    ctx.get().moveTo(x1, y1);
    ctx.get().lineTo(x2, y2);
    ctx.get().stroke();
}

/**
 * Draw a rectangle
 * @param {number} x x coordinates of top left corner
 * @param {number} y y coordinates of top left corner
 * @param {number} w width of the rectangle
 * @param {number} h height of the rectangle
 */
function rect(x, y, w, h) {

    ctx.get().beginPath();
    ctx.get().rect(x, y, w, h);
    ctx.get().fill();
    ctx.get().stroke();
}

/**
 * Draw a square
 * @param {number} x x coordinates of top left corner
 * @param {number} y y coordinates of top left corner
 * @param {number} s side length of the square
 */
function square(x, y, s) {
    rect(x, y, s, s);
}

/**
 * Draw a circle with center (x,y) and diameter d
 * @param {number} x 
 * @param {number} y 
 * @param {number} d 
 */
function circle(x, y, d) {

    ctx.get().beginPath();
    ctx.get().arc(x, y, d / 2, 0, 2 * Math.PI);
    ctx.get().fill();
    ctx.get().stroke();
}


///// Text Functions /////


/**
 * Change the alignement of the text
 * @param {string} horizontal "left" || "right" || "center" || "start" || "end"
 * @param {string} vertical "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom"
 */
function textAlign(horizontal = "center", vertical = "middle") {

    if (!["left", "right", "center", "start", "end"].includes(horizontal)) {
        throw new Error("Invalid horizontal alignment");
    }
    if (!["top", "hanging", "middle", "alphabetic", "ideographic", "bottom"].includes(vertical)) {
        throw new Error("Invalid vertical alignment");
    }

    ctx.get().textAlign = horizontal;
    ctx.get().textBaseline = vertical;
}

/**
 * Set the font of the text
 * @param {string} font valid CSS font value
 */
function textFont(font) {
    ctx.get().font = font;

    // If the font is not valid, the default CSS behaviour is to not change it
    if (font !== ctx.get().font) {
        throw new Error("Font not valid");
    }

}

/**
 * Draw text at (x, y), color can be changed with fill()
 * @param {string} txt 
 * @param {number} x 
 * @param {number} y 
 */
function text(txt, x, y) {
    ctx.get().fillText(txt, x, y);
}


///// Usefull functions /////


/**
 * Draw the background in a uniform color
 * @param {string} color 
 */
function background(color) {

    if (!isValidColor(color)) {
        throw new Error("Invalid fill color used");
    }

    backgroundColor = color;

    // Save current color
    let tmp = ctx.get().fillStyle
    ctx.get().fillStyle = color;

    // Draw a filled rectangle the size of the canvas
    ctx.get().beginPath();
    ctx.get().rect(0, 0, width, height);
    ctx.get().fill();

    // Load saved color
    ctx.get().fillStyle = tmp;
}

/**
 * Return integer value of x
 * @param {number} x 
 * @returns 
 */
function int(x) {
    if (x >= 0) {
        return Math.floor(x);
    }
    else {
        return Math.floor(x + 1);
    }
}
if (typeof window === 'undefined') {
    module.exports = { ctx, backgroundColor, createCanvas, resizeCanvas, isValidColor, stroke, noStroke, strokeWeight, fill, noFill, point, line, rect, square, circle, textAlign, textFont, text, background, int };
}