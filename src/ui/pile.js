let dimension_carre = { y_carre: 380, width: 40, height: 40 };
let widthCanvas = 800;
let heigthCanvas = 800;

let stack1 = {
  type: "stack",
  value: [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23, 22, 20, 14],
};

function setup() {
  createCanvas(widthCanvas, heigthCanvas);
}

function draw() {
  background(220);

  draw_pile(array1);
}

function draw_stack_rect(array, i) {
  //i gère à la fois le numéro du carré , la multiplication pour l'écriture et l'index dans le tableau
  rect(widthCanvas / 4, (heigthCanvas - 2 * dimension_carre.height) - dimension_carre.height * i, widthCanvas / 2, 50);
  text(array.value[i], widthCanvas / 2, (heigthCanvas - dimension_carre.height) - dimension_carre.height * i);
  textAlign(CENTER, CENTER);
  textSize(9);
}

function draw_stack(data) {
  //To add another element we add 40 to the height 
  for (let i = 0; i < data.length; i++) {
    draw_stack_rect(data[i], i)
  }
}
