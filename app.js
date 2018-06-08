'use strict';

//we need an array of images - DONE
//we need a constructor function for products - DONE
//we need an event listener to click on the image
//we need an image repository
//we need to randomize the images
//we need a vote counter
//we need a view counter
//we need to know total clicks
//we need an event handler function
//we need to display the list with DOM manipulation
//we need to make sure the images do not repeat
//all the DOM appending

Product.all = [];
Product.container = document.getElementById('image_container');
Product.justViewed = [];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');
Product.totalClicks = 0;

//constructor function - template for Product creation
function Product(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}

//each of the product names is now an object
function createProducts() {
  new Product('img/bag.jpg', 'Bag');
  new Product('img/banana.jpg', 'Banana');
  new Product('img/bathroom.jpg', 'Bathroom');
  new Product('img/boots.jpg', 'Boots');
  new Product('img/breakfast.jpg', 'Breakfast');
  new Product('img/bubblegum.jpg', 'Bubble Gum');
  new Product('img/chair.jpg', 'Chair');
  new Product('img/cthulhu.jpg', 'Cthulhu');
  new Product('img/dog-duck.jpg', 'Dog & Duch');
  new Product('img/dragon.jpg', 'Dragon');
  new Product('img/pen.jpg', 'Pen');
  new Product('img/pet-sweep.jpg', 'Pet Sweep');
  new Product('img/scissors.jpg', 'Scissors');
  new Product('img/shark.jpg', 'Shark');
  new Product('img/sweep.png', 'Sweep');
  new Product('img/tauntaun.jpg', 'Tauntaun');
  new Product('img/unicorn.jpg', 'Unicorn');
  new Product('img/usb.gif', 'USB');
  new Product('img/water-can.jpg', 'Water Can');
  new Product('img/wine-glass.jpg', 'Wine Glass');
}
createProducts();

//create make random function
function makeRandom() {
  return Math.floor(Math.random() * Product.all.length);
}

function displayPics() {
  var currentlyShowing = [];
  //make the left image unique
  currentlyShowing[0] = makeRandom();
  while(currentlyShowing[0] === Product.justViewed[0] || currentlyShowing[0] === Product.justViewed[1] || currentlyShowing[0] === Product.justViewed[2]) {
    console.error('Duplicate, rerun!');
    currentlyShowing[0] = makeRandom();
  }
  //make the center image unique
  currentlyShowing[1] = makeRandom();
  while(currentlyShowing[1] === currentlyShowing[0] || currentlyShowing[1] === Product.justViewed[0] || currentlyShowing[1] === Product.justViewed[1] || currentlyShowing[1] === Product.justViewed[2]) {
    console.error('Duplicate at center or in prior view! Re run!');
    currentlyShowing[1] = makeRandom();
  }
  //make the right image unique
  currentlyShowing[2] = makeRandom();
  while(currentlyShowing[2] === currentlyShowing[0] || currentlyShowing[2] === currentlyShowing[1] || currentlyShowing[2] === Product.justViewed[0] || currentlyShowing[2] === Product.justViewed[1] || currentlyShowing[2] === Product.justViewed[2]) {
    console.error('Duplicate at right! Re run it.');
    currentlyShowing[2] = makeRandom();
  }
  //take it to the DOM
  for(var i = 0; i < 3; i++) {
    Product.pics[i].src = Product.all[currentlyShowing[i]].filepath;
    Product.pics[i].id = Product.all[currentlyShowing[i]].name;
    Product.all[currentlyShowing[i]].views += 1;
    Product.justViewed[i] = currentlyShowing[i];
  }
}

//event listener for keeping track of total clicks on images
function handleClick(event) {
  //make the click stop at 25
  if(Product.totalClicks > 24) {
    Product.container.removeEventListener('click', handleClick);
    //show the list after the last click
    showTally();
  }
  //start to add up the total clicks
  for (var i = 0; i < Product.all.length; i++) {
    if(event.target.id === Product.all[i].name) {
      Product.all[i].votes += 1;
      console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes and has been viewed ' + Product.all[i].views + ' times.');
    }
  }
  Product.totalClicks += 1;
  console.log('The user has clicked on ' + Product.totalClicks + ' photos.');
  displayPics();
}

//show the tally using the list in the DOM once the event listener has been removed
function showTally() {
  for(var i = 0; i < Product.all.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views.';
    //append the list item to the Product.tally created above globally for the ul
    Product.tally.appendChild(liEl);
  }
}

Product.container.addEventListener('click', handleClick);
displayPics();