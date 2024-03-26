
let rect_size = { width: 40, height: 40 };
let stack_rect_size = { width: 80, height: 40 };
let margin = 40;
let offset = { x: margin, y: margin };
///// Set /////

function draw_set(data) {

    // Numbers are spread along concentric "virtual" circles

    let count = -1;
    let circle_number = 0;
    let repartition = [[]];

    for (let t = data.length - 1; t >= 0; t--) {
        count++;

        // If there are more numbers than what can be packed inside the current disc
        // Another, larger virtual circle, is added
        if (count == 5 * circle_number + 1) {
            count = 0;
            circle_number++;
            repartition.push([]);
        }

        repartition[circle_number].push(data[t]);
    }

    // Draw the outer circle
    const radius = (2 * circle_number + 1) * 3 * textSize();
    resizeCanvas(offset.x + radius + margin, offset.y + radius + margin);
    circle(offset.x + radius / 2, offset.y + radius / 2, radius);

    //Write numbers

    let theta = 0;
    let r = 0;

    for (let i = 0; i < repartition.length; i++) {
        for (let j = 0; j < repartition[i].length; j++) {
            theta = (2 * Math.PI * j) / repartition[i].length;
            text(
                repartition[i][j],
                offset.x + radius / 2 + r * Math.cos(theta),
                offset.y + radius / 2 + r * Math.sin(theta)
            );
        }
        r += 3 * textSize();
    }
    offset.y += radius + margin;
}

///// Linked List /////

function draw_rect(data, i) {
    // Dessine le rectangle
    rect(offset.x + 2 * rect_size.width * i, offset.y, rect_size.width, rect_size.height);
    text(data[i], offset.x + (2 * i + 1 / 2) * rect_size.width, offset.y + rect_size.height / 2);
}

function draw_arrow(i) {

    // Ligne horizontale
    line(offset.x + (2 * i + 1) * rect_size.width,
        offset.y + rect_size.height / 2,
        offset.x + 2 * (i + 1) * rect_size.width,
        offset.y + rect_size.height / 2);

    // Première partie de la flèche (haut)
    line(offset.x + 2 * rect_size.width * (i + 7 / 8),
        offset.y + rect_size.height * 0.30,
        offset.x + 2 * rect_size.width * (i + 1),
        offset.y + rect_size.height / 2);

    // Deuxième partie de la flèche (bas)
    line(offset.x + 2 * rect_size.width * (i + 7 / 8),
        offset.y + rect_size.height * 0.70,
        offset.x + 2 * rect_size.width * (i + 1),
        offset.y + rect_size.height / 2);

}

function draw_linked_list(data) {
    resizeCanvas(offset.x + 2 * data.length * rect_size.width + margin, offset.y + margin + rect_size.height);
    for (let i = 0; i < data.length; i++) {
        draw_rect(data, i);
        // Dessine la flèche
        if (i < data.length - 1) {
            draw_arrow(i);
        }
    }
    offset.y += margin + rect_size.height;
}


///// Double Linked List /////

function draw_arrow_double(i) {

    //Premier Len 
    // Ligne horizontale
    line(offset.x + (2 * i + 1) * rect_size.width,
        offset.y + rect_size.height / 4,
        offset.x + 2 * (i + 1) * rect_size.width,
        offset.y + rect_size.height / 4);

    // Première partie de la flèche (haut)
    line(offset.x + 2 * rect_size.width * (i + 7 / 8),
        offset.y + rect_size.height * 0.05,
        offset.x + 2 * rect_size.width * (i + 1),
        offset.y + rect_size.height / 4);

    // Deuxième partie de la flèche (bas)
    line(offset.x + 2 * rect_size.width * (i + 7 / 8),
        offset.y + rect_size.height * 0.45,
        offset.x + 2 * rect_size.width * (i + 1),
        offset.y + rect_size.height / 4);


    //Second Len 
    // Ligne horizontale
    line(offset.x + (2 * i + 1) * rect_size.width,
        offset.y + rect_size.height * 3 / 4,
        offset.x + 2 * (i + 1) * rect_size.width,
        offset.y + rect_size.height * 3 / 4);

    // Première partie de la flèche (haut)
    line(offset.x + 2 * rect_size.width * (i + 5 / 8),
        offset.y + rect_size.height * 0.55,
        offset.x + 2 * rect_size.width * (i + 1 / 2),
        offset.y + rect_size.height * 3 / 4);

    // Deuxième partie de la flèche (bas)
    line(offset.x + 2 * rect_size.width * (i + 5 / 8),
        offset.y + rect_size.height * 0.95,
        offset.x + 2 * rect_size.width * (i + 1 / 2),
        offset.y + rect_size.height * 3 / 4);

}

function draw_double_linked_list(data) {
    resizeCanvas(offset.x + 2 * data.length * rect_size.width + margin, offset.y + margin + rect_size.height);
    for (let i = 0; i < data.length; i++) {
        draw_rect(data, i)
        if (i < data.length - 1) {
            draw_arrow_double(i);
        }
    }
    offset.y += margin + rect_size.height;
}


///// Array /////

function draw_array_rect(data, i) {
    //i gère à la fois le numéro du carré , la multiplication pour l'écriture et l'index dans le tableau 
    rect(offset.x + i * rect_size.width, offset.y, rect_size.width, rect_size.height);
    text(data[i], offset.x + (i + 1 / 2) * rect_size.width, offset.y + rect_size.height / 2);
}

function draw_array(data) {
    resizeCanvas(offset.x + data.length * rect_size.width + margin, offset.y + margin + rect_size.height);
    //To add another element we add 40 to the height 
    for (let i = 0; i < data.length; i++) {
        draw_array_rect(data, i)
    }
    offset.y += margin + rect_size.height;
}

///// Stack /////

function draw_stack_rect(data, i) {
    //i gère à la fois le numéro du carré , la multiplication pour l'écriture et l'index dans le tableau
    rect(offset.x, offset.y + (data.length - i - 1) * stack_rect_size.height, stack_rect_size.width, stack_rect_size.height);
    text(data[i], offset.x + stack_rect_size.width / 2, offset.y + (data.length - i - 1 / 2) * stack_rect_size.height);
}

function draw_stack(data) {
    resizeCanvas(offset.x + stack_rect_size.width + margin, offset.y + margin + data.length * stack_rect_size.height);
    for (let i = 0; i < data.length; i++) {
        draw_stack_rect(data, i)
    }
    offset.y += margin + data.length * stack_rect_size.height;
}

///// Queue /////
function draw_queue(data) {
    draw_array(data);
}

///// Tree /////

let tree1 = {
    description: {
        name: "tree1",
        depth: 0,
    },
    type: "tree",
    // Test value for now TODO remove it
    value: { 'data': 94, 'children': [{ 'data': 28, 'children': [{ 'data': 58, 'children': [{ 'data': 57, 'children': [{ 'data': 30, 'children': [{ 'data': 90, 'children': [] }, { 'data': 19, 'children': [] }, { 'data': 43, 'children': [] }] }, { 'data': 62, 'children': [] }, { 'data': 49, 'children': [{ 'data': 3, 'children': [] }, { 'data': 17, 'children': [] }] }] }, { 'data': 56, 'children': [{ 'data': 47, 'children': [{ 'data': 88, 'children': [] }] }, { 'data': 100, 'children': [{ 'data': 83, 'children': [] }, { 'data': 89, 'children': [] }, { 'data': 38, 'children': [] }] }, { 'data': 64, 'children': [{ 'data': 21, 'children': [] }, { 'data': 67, 'children': [] }, { 'data': 62, 'children': [] }] }] }, { 'data': 25, 'children': [{ 'data': 11, 'children': [] }, { 'data': 19, 'children': [{ 'data': 74, 'children': [] }] }] }] }] }, { 'data': 100, 'children': [{ 'data': 22, 'children': [{ 'data': 56, 'children': [{ 'data': 34, 'children': [{ 'data': 42, 'children': [] }] }] }, { 'data': 15, 'children': [{ 'data': 45, 'children': [{ 'data': 28, 'children': [] }] }, { 'data': 27, 'children': [{ 'data': 21, 'children': [] }] }, { 'data': 58, 'children': [{ 'data': 84, 'children': [] }, { 'data': 42, 'children': [] }, { 'data': 3, 'children': [] }] }] }] }, { 'data': 17, 'children': [{ 'data': 79, 'children': [{ 'data': 15, 'children': [{ 'data': 5, 'children': [] }] }, { 'data': 21, 'children': [{ 'data': 1, 'children': [] }, { 'data': 79, 'children': [] }, { 'data': 51, 'children': [] }] }, { 'data': 95, 'children': [] }] }] }] }, { 'data': 52, 'children': [] }] }
};


function draw_tree(root) {

    // Array of array of all children on the "depth-th" layer
    let sequence = [];

    // Breadth-first search

    let children = [root];
    let depth = 0;
    let any_children = true //Boolean that check if they are any children at current depth

    while (any_children) {
        sequence.push([]);
        depth++;
        any_children = false;
        let new_children = [];

        // Enumerate every children of the current layer
        for (let child of children) {

            // We fill the tree with "null" nodes so that every leaf has the same depth

            if (child.data == "null") {
                sequence[depth].push(["null", 0, 0]);
            }
            else {
                any_children = true;
                sequence[depth].push([child.data, child.children.length, 0]);
            }

            if (child.children.length > 0) {
                new_children.push(...child.children);
            }
            else {
                new_children.push({ 'data': "null", 'children': [] });
            }
        }
        children = [...new_children];
    }

    // y coordinates of the root node
    let y = 100 + 50 * sequence.length;
    let r = 30; // radius of circles
    let x = 0; // x coordinates of node

    let node_offset = 50 + r / 2 + (sequence[sequence.length - 1].length - 1) * 25;

    resizeCanvas(offset.x + 2 * node_offset, offset.y + y + margin);
    x = -(sequence[sequence.length - 1].length - 1) * 25;
    for (let j = 0; j < sequence[sequence.length - 1].length; j++) {
        sequence[sequence.length - 1][j][2] = x;
        x += 50;
    }



    for (let i = sequence.length - 2; i >= 0; i--) {

        y -= 50;

        let count = 0;
        for (let j = 0; j < sequence[i].length; j++) {

            x = 0;

            if (sequence[i][j][1] == 0) {
                sequence[i][j][2] = sequence[i + 1][count][2];
                count++;
            }
            else {
                let sum = 0;
                let subcount = 0;
                for (let k = 0; k < sequence[i][j][1]; k++) {
                    sum += sequence[i + 1][count + subcount][2];
                    subcount++;
                }

                sequence[i][j][2] = sum / subcount;

                subcount = 0;
                for (let k = 0; k < sequence[i][j][1]; k++) {
                    line(offset.x + node_offset + sequence[i + 1][count + subcount][2], offset.y + y + 50, offset.x + node_offset + sequence[i][j][2], offset.y + y);
                    subcount++;
                }

                count += subcount;

            }
        }
    }
    // The max y value, we begin to draw the nodes with the highest depth value
    y = 100 + 50 * sequence.length;
    for (let i = sequence.length - 2; i >= 0; i--) {
        y -= 50;
        for (let j = 0; j < sequence[i].length; j++) {
            // Draw a circle for the node
            if (sequence[i][j][0] != "null") {
                fill("#FFFFFF")
                circle(offset.x + node_offset + sequence[i][j][2], offset.y + y, r)
                fill("#000000")
                text(sequence[i][j][0], offset.x + node_offset + sequence[i][j][2], offset.y + y);
            }
        }
    }
    offset.y += y + margin;
}

function get_sequence(tree) {
    return [[tree.data], ...tree.children.map(get_sequence)]
}


///// Visualisation /////

/*
function setup() {
    textAlign("center", "middle");
    textFont("14px sans-serif");

}

function draw() {
    background("#EEEEEE");
    draw_tree(tree1);
}*/


///// Test Values /////

let set1 = {
    description: {
        name: "set1",
        depth: 0,
    },
    type: "set",
    value: [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23],
};

let linkedList1 = {
    description: {
        name: "linkedList1",
        depth: 0,
    },
    type: "linked_list",
    value: [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23, 22, 20, 14],
};

let doubleLinkedList1 = {
    description: {
        name: "doubleLinkedList1",
        depth: 0,
    },
    type: "double_linked_list",
    value: [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23, 22, 20, 14],
};

let array1 = {
    description: {
        name: "array1",
        depth: 0,
    },
    type: "array",
    value: [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23, 22, 20, 14],
};

let stack1 = {
    description: {
        name: "stack1",
        depth: 0,
    },
    type: "stack",
    value: [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23, 22, 20, 14],
};

let queue1 = {
    description: {
        name: "queue1",
        depth: 0,
    },
    type: "queue",
    value: [8, 6, 5, 7, 15, 94, 26, 31, 48, 52, 4, 7, 95, 23, 22, 20, 14],
};

function draw_visualisation(variables) {
    resizeCanvas(0);
    background("#EEEEEE");
    textAlign();

    stroke("black");
    strokeWeight(4);
    fill("white");
    textFont("15px Arial");
    textColor("black");

    //Zoom x 2 
    // strokeWeight(8);
    // textFont("15px Arial");
    // margin *= 2;
    // rect_size.height *= 2;
    // rect_size.width *= 2;
    // stack_rect_size.height *= 2;
    // stack_rect_size.width *= 2;

    variables = [set1, linkedList1, doubleLinkedList1, array1, stack1, queue1];

    for (let v of variables) {

        resizeCanvas(width, offset.y + textSize());
        offset.x = 40;
        text(v.description.name + " :", offset.x + textWidth(v.description.name) / 2, offset.y);
        offset.x += textWidth(v.description.name) + margin;

        eval("draw_" + v.type + "(v.value);");
    }
}
