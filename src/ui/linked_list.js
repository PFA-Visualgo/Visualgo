let dimension_carre = {y_carre: 380, width:40, height:40};
let widthCanvas = 1500;
let heigthCanvas = 1500;

let array1 = {
  type: "array",
  value: [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23,22,20,14],
};

function setup() {
  createCanvas(widthCanvas,heigthCanvas);
}

function draw() {
  background(220);

  draw_linked_list(array1);
}

function draw_rect(array, i) {
    // Dessine le rectangle
    square(2 * dimension_carre.width * i, widthCanvas / 2, dimension_carre.height);

    if(i < array.value.length -1) {
      draw_fleche(i);
    }
  
    text(array.value[i], dimension_carre.height/2 + 2*i*dimension_carre.height, widthCanvas/2 + dimension_carre.height/2);
    textAlign(CENTER,CENTER);
    textSize(9);
}

function draw_fleche(i) {
  
    // Ligne horizontale
    line(dimension_carre.height + 2 * dimension_carre.width * i, 
         widthCanvas / 2 + dimension_carre.height / 2,
         dimension_carre.height + 2 * dimension_carre.width * (i + 1), 
         widthCanvas / 2 + dimension_carre.height / 2);

    // Première partie de la flèche (haut)
    line((dimension_carre.height + dimension_carre.height * 0.75) + 2 * dimension_carre.height * i, 
         widthCanvas / 2 + dimension_carre.height * 0.40,
         dimension_carre.height * 2 + 2 * dimension_carre.width * i, 
         widthCanvas / 2 + dimension_carre.height / 2);

    // Deuxième partie de la flèche (bas)
    line((dimension_carre.height + dimension_carre.height * 0.75) + 2 * dimension_carre.height * i, 
         widthCanvas / 2 + dimension_carre.height * 0.60,
         dimension_carre.height * 2 + 2 * dimension_carre.width * i, 
         widthCanvas / 2 + dimension_carre.height / 2);
  
}

function draw_linked_list(array) {
  let data = array.value;
  //To add another element we add 40 to the height 
  for(let i = 0 ; i < array.value.length; i ++) {
    draw_rect(array,i)
  }
}

