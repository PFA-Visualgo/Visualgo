let dimension_carre = { y_carre: 380, width: 40, height: 40 };

let array1 = {
  type: "array",
  value: [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23, 22, 20, 14],
};

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);

  draw_array(array1);
}


function draw_array_rect(data, i) {
  //i gère à la fois le numéro du carré , la multiplication pour l'écriture et l'index dans le tableau 
  rect(1 + i * 40, dimension_carre.y_carre, dimension_carre.width, dimension_carre.height);
  text(data[i], 20 + i * dimension_carre.width, 400);
  textAlign(CENTER, CENTER);
  textSize(9);
}

function draw_array(data) {
  //To add another element we add 40 to the height 
  for (let i = 0; i < data.length; i++) {
    draw_array_rect(data, i)
  }
}