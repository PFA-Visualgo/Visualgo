
let tree1 = {
    description: {
        name: "tree1",
        depth: 0,
    },
    type: "tree",
    // Test value for now TODO remove it
    value: { 'data': 94, 'children': [{ 'data': 28, 'children': [{ 'data': 58, 'children': [{ 'data': 57, 'children': [{ 'data': 30, 'children': [{ 'data': 90, 'children': [] }, { 'data': 19, 'children': [] }, { 'data': 43, 'children': [] }] }, { 'data': 62, 'children': [] }, { 'data': 49, 'children': [{ 'data': 3, 'children': [] }, { 'data': 17, 'children': [] }] }] }, { 'data': 56, 'children': [{ 'data': 47, 'children': [{ 'data': 88, 'children': [] }] }, { 'data': 100, 'children': [{ 'data': 83, 'children': [] }, { 'data': 89, 'children': [] }, { 'data': 38, 'children': [] }] }, { 'data': 64, 'children': [{ 'data': 21, 'children': [] }, { 'data': 67, 'children': [] }, { 'data': 62, 'children': [] }] }] }, { 'data': 25, 'children': [{ 'data': 11, 'children': [] }, { 'data': 19, 'children': [{ 'data': 74, 'children': [] }] }] }] }] }, { 'data': 100, 'children': [{ 'data': 22, 'children': [{ 'data': 56, 'children': [{ 'data': 34, 'children': [{ 'data': 42, 'children': [] }] }] }, { 'data': 15, 'children': [{ 'data': 45, 'children': [{ 'data': 28, 'children': [] }] }, { 'data': 27, 'children': [{ 'data': 21, 'children': [] }] }, { 'data': 58, 'children': [{ 'data': 84, 'children': [] }, { 'data': 42, 'children': [] }, { 'data': 3, 'children': [] }] }] }] }, { 'data': 17, 'children': [{ 'data': 79, 'children': [{ 'data': 15, 'children': [{ 'data': 5, 'children': [] }] }, { 'data': 21, 'children': [{ 'data': 1, 'children': [] }, { 'data': 79, 'children': [] }, { 'data': 51, 'children': [] }] }, { 'data': 95, 'children': [] }] }] }] }, { 'data': 52, 'children': [] }] }
};

function setup() {
    textAlign("center", "middle");
    textFont("14px sans-serif");

}

function draw() {
    background("#EEEEEE");
    draw_tree(tree1);
}



function draw_tree(tree) {
    const root = tree.value;

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

    let offset = 50 + r / 2 + int(sequence[sequence.length - 1].length - 1) * 25;

    resizeCanvas(2 * offset, Math.max(y, height));
    x = -int(sequence[sequence.length - 1].length - 1) * 25;
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
                    line(offset + sequence[i + 1][count + subcount][2], y + 50, offset + sequence[i][j][2], y);
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
                circle(offset + sequence[i][j][2], y, r)
                fill("#000000")
                text(sequence[i][j][0], offset + sequence[i][j][2], y);
            }
        }
    }
}

function get_sequence(tree) {
    return [[tree.data], ...tree.children.map(get_sequence)]
}