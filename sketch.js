let img;
let sorted;
function preload() {
  img = loadImage('./sunflower.jpg')
}
function setup() {
  createCanvas(800,200);
  sorted = createImage(img.width, img.height, RGB);
  sorted.loadPixels();
  img.loadPixels();
  for( let i=0; i < sorted.pixels.length; i++) {
    sorted.pixels[i] = img.pixels[i];
  }
  //sorted.pixels = img.pixels;
  let pixelsToSort = convertPixelArrayTo4Array(sorted.pixels);
  //Sort...
  pixelsToSort.sort(comparisonFunction);
  let sortedPixels = convert4ArrayToPixelArray(pixelsToSort);
  for( let i=0; i < sorted.pixels.length; i++) {
    sorted.pixels[i] = sortedPixels[i];
  }
  sorted.updatePixels();
}

function draw() {
  background(0);
  image(img, 0, 0);
  image(sorted, 400, 0);
}

function convertPixelArrayTo4Array(P) {
  if(P.length %4 !== 0) return;
  let result = [];
  for(let i=0; i<P.length; i+=4) {
    const pix = [
      P[i+0],
      P[i+1],
      P[i+2],
      P[i+3]
    ];
    result.push(pix);
  }
  return result;
}

function convert4ArrayToPixelArray(A) {
  let result = [];
  for(let i=0; i<A.length; i++) {
    const pixel = A[i];
    result.push(pixel[0]);
    result.push(pixel[1]);
    result.push(pixel[2]);
    result.push(pixel[3]);
  }
  return result;
}

function comparisonFunction(pixel1, pixel2) {
  // Sort by sum of r,g and b values
  const val1 = pixel1[0] + pixel1[1] + pixel1[2];
  const val2 = pixel2[0] + pixel2[1] + pixel2[2];
  return val1 > val2 ? 1 : -1;
}