const PADDING = 50;

let shouldDraw = true;
let step = 1;
let ANGLE = 90.;

let minLength = 1000000000;

let huffmanText;
let stepText;
let angleText;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    ui();
}

function draw() {
    if (!shouldDraw) return;

    stroke(255);
    strokeWeight(1);
    noFill();

    background(0);
    koch(step);
    shouldDraw = false;

    huffmanText.html(`Hausdorff dimension: ${hausdorffDimension()}`);
    stepText.html(`Step: ${step}`);
    angleText.html(`Angle: ${ANGLE}`);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    shouldDraw = true;
}

function koch(n) {
    translate(PADDING, 8 * windowHeight / 9);
    kochRecursion(windowWidth - PADDING * 2, 0, n, 0, 0);
}

function kochRecursion(length, depht, maxDeph, index, angle) {
    const construction = [
        0, -1, 1, 1, -1
    ];

    rotate(angle);

    if (depht === maxDeph) {
        stroke(map(index, 0, 4, 100, 255), map(index, 0, 4, 255, 255), map(index, 0, 4, 255, 100));
        line(0, 0, length, 0);
        minLength = length;
        return;
    }

    for (let i = 0; i < 5; i++) {
        kochRecursion(length / 3, depht + 1, maxDeph, i, construction[i] * degreeToRadian(ANGLE));
        translate(length / 3, 0);
    }

    translate(-length, 0);
}

function degreeToRadian(deg) {
    return deg * (PI / 180);
}

function hausdorffDimension() {
    const L = windowWidth - PADDING * 2;
    const mL = minLength;

    const n = L / mL;
    const sides = pow(5, step);

    if (n === 1 && sides === 1) return 1;

    return log(sides) / log(n);
}

function ui() {
    const container = createDiv();
    container.class('controller-container');

    const title = createP('Koch curve');
    title.id('title');
    container.child(title);

    const stepContainer = createDiv();
    stepContainer.id('step-container');
    container.child(stepContainer);

    // const stepLabel = createP('Step');
    // stepLabel.id('step-label');
    // stepContainer.child(stepLabel);

    const slider = createSlider(0, 7, 1, 1);
    slider.id('step-slider');
    stepContainer.child(slider);

    slider.input(() => {
        step = slider.value();
        shouldDraw = true;
    });

    stepText = createP(`Step: ${step}`);
    stepText.id('step-text');
    stepContainer.child(stepText);

    const angleContainer = createDiv();
    angleContainer.id('angle-container');
    container.child(angleContainer);

    // const angleLabel = createP('Angle');
    // angleLabel.id('angle-label');
    // angleContainer.child(angleLabel);

    const angleSlider = createSlider(0, 180, 90, 1);
    angleSlider.id('angle-slider');
    angleContainer.child(angleSlider);

    angleSlider.input(() => {
        ANGLE = angleSlider.value();
        shouldDraw = true;
    });

    angleText = createP(`Angle: ${ANGLE}`);
    angleText.id('angle-text');
    angleContainer.child(angleText);

    huffmanText = createP(`Hausdorff dimension: ${hausdorffDimension()}`);
    huffmanText.id('huffman-text');
    container.child(huffmanText);
}