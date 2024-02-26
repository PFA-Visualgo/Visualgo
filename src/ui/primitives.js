
// current context2D, it's width and height are global variables for easy access
let ctx = null;
let width = 0;
let height = 0;

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
        throw new Error("Container ${place} does not exist");
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
