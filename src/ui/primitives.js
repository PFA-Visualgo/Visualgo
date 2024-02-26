/* 
    This file implements the main primitives used to draw
    It is inspired by p5.js but it only implements what is used in the project
    Therefore it lower the total size of the project 
    It's purpose is to simplify the creation of drawings, while keeping full controle over the implementation 
*/



// current context2D, it's width and height are global variables for easy access
let ctx = null;
let width = 0;
let height = 0;


///// Canvas Setup Functions /////


/**
 * Set the current canvas
 * @param {string} name id of the canvas
 */
function changeCurrentCanvas(name) {

    let canvas = document.getElementById(name)
    if (canvas === null || canvas.nodeName !== "CANVAS") {
        throw new Error("No canvas element with id : ${name} exists");
    }

    // Update global variables
    width = canvas.width;
    height = canvas.height;
    ctx = canvas.getContext("2d");
}

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
    changeCurrentCanvas(name);
    ctx.fillStyle = "#FFFFFF";
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
    ctx.strokeStyle = color;
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
    ctx.lineWidth = weight;
}

/**
 * Change fill color
 * @param {string} color
 */
function fill(color) {
    if (!isValidColor(color)) {
        throw new Error("Invalid fill color used");
    }
    ctx.fillStyle = color;
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

    // Save color
    let tmp_fill_color = ctx.fillStyle
    if (!isValidColor(tmp_fill_color)) {
        throw new Error("Invalid fill color used");
    }
    fill(ctx.strokeStyle);

    // Draw circle of size lineWidth
    ctx.beginPath();
    ctx.arc(x, y, ctx.lineWidth / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    // Load back saved colors
    fill(tmp_fill_color)

}

/**
 * Draw a line from coord (x1, y1) to (x2, y2)
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 */
function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

/**
 * Draw a rectangle
 * @param {number} x x coordinates of top left corner
 * @param {number} y y coordinates of top left corner
 * @param {number} w width of the rectangle
 * @param {number} h height of the rectangle
 */
function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(10, 20, 150, 100);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
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
    ctx.beginPath();
    ctx.arc(x, y, d / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
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

    // Save current color
    let tmp = ctx.fillStyle
    ctx.fillStyle = color;

    // Draw a filled rectangle the size of the canvas
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();
    ctx.closePath();

    // Load saved color
    ctx.fillStyle = tmp;
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

/**
 * Draw text at (x, y), color can be changed with fill()
 * @param {string} txt 
 * @param {number} x 
 * @param {number} y 
 */
function text(txt, x, y) {
    ctx.fillText(txt, x, y);
}