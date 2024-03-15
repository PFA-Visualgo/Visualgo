const { createCanvas } = require('canvas');
const { ctx, contextCheck, resizeCanvas, isValidColor, stroke, noStroke, strokeWeight, fill, noFill, point, line, rect, square, circle, textAlign, textFont, text, background, int } = require("../../src/ui/primitives.js");
let { backgroundColor } = require("../../src/ui/primitives.js");


let countTests = 0;
let countPass = 0;
let countFail = 0;


function reset() {
    countTests = 0;
    countPass = 0;
    countFail = 0;
}

function pass() {
    countTests++;
    countPass++;
}

function fail() {
    countTests++;
    countFail++;
}

function test(condition) {
    if (condition) {
        pass();
    }
    else {
        fail();
    }
}

function result(funName) {
    console.log(funName + " :\n\tPass : " + countPass.toString() + "/" + countTests.toString() + "\n\tFail : " + countFail.toString() + "/" + countTests.toString())
}


function resizeCanvasTest() {
    let canvas = createCanvas(100, 100);
    ctx.set(canvas.getContext("2d"));

    try {
        resizeCanvas(-100, 100);
        fail();
    } catch (e) {
        pass();
    }

    try {
        resizeCanvas(100, -100);
        fail();
    } catch (e) {
        pass();
    }
}

function isValidColorTest() {

    // Random word
    test(!isValidColor("mslfnlmqksf"));

    // French color
    test(!isValidColor("rouge"));

    // Hex color
    test(isValidColor("#FFAA11"));

    // Hex color with alpha
    test(isValidColor("#8855AA56"));

}



function strokeTest() {
    let canvas = createCanvas(100, 100);
    ctx.set(canvas.getContext("2d"));

    // Invelid color value
    try {
        stroke("Hello");
        fail();
    } catch (e) {
        pass();
    }

    // Hex color
    stroke("#00FF33");
    test(ctx.get().strokeStyle == "#00ff33");

    // CSS valid color
    stroke("green");
    test(ctx.get().strokeStyle == "#008000");

}









function intTest() {
    // Negative number
    test(int(-3.5) == -3);

    // Positive number
    test(int(8.1415) == 8);

    // Zero
    test(int(0) == 0);

}


function mainTest() {

    let testFunctions = [
        //"createCanvas",
        resizeCanvasTest,
        isValidColorTest,
        strokeTest,
        /*noStrokeTest,
        strokeWeightTest,
        fillTest,
        "noFill",
        "point",
        "line",
        "rect",
        "square",
        "circle",
        "textAlign",
        "textFont",
        "text",
        "background",*/
        intTest
    ];

    // Loop over every function and launch tests
    for (let fun of testFunctions) {
        reset();
        fun();
        result(fun.name);
    }

}


// Launch tests

mainTest();