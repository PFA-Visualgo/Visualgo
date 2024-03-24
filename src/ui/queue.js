let dimension_carre = {y_carre: 380, width:40, height:8*40};
let widthCanvas = 1500;
let heigthCanvas = 1500;

let array1 = {
  type: "array",
  value: [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23,22,20,14],
};

function setup() {
  createCanvas(widthCanvas, heigthCanvas);
}

function draw() {
  background(220);

  draw_array(array1);
}


function draw_rec(array,i){
  //i gère à la fois le numéro du carré , la multiplication pour l'écriture et l'index dans le tableau 
  rect(1+i*dimension_carre.width, widthCanvas/2-dimension_carre.height/2,dimension_carre.width,dimension_carre.height);
  text(array.value[i], dimension_carre.width/2 + i*dimension_carre.width , widthCanvas/2);
  textAlign(CENTER,CENTER);
  textSize(9);
}

function draw_array(array) {
  let data = array.value;
  //To add another element we add 40 to the height 
  for(let i = 0 ; i < array.value.length; i ++) {
    draw_rec(array,i)
  }
}