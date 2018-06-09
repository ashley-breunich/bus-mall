'use strict';

//declare global variables
Product.all = [];
Product.container = document.getElementById('image_container');
Product.justViewed = [];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');
Product.totalClicks = 0;
Product.finalViews = [];
Product.percentage = [];

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
  new Product('img/bag.jpg', 'R2-D2 Suitcase');
  new Product('img/banana.jpg', 'Banana Slicer');
  new Product('img/bathroom.jpg', 'iPad Toilet Paper Stand');
  new Product('img/boots.jpg', 'Toeless Rain Boots');
  new Product('img/breakfast.jpg', 'Breakfast Oven');
  new Product('img/bubblegum.jpg', 'Meatball Bubble Gum');
  new Product('img/chair.jpg', 'Red Rounded Chair');
  new Product('img/cthulhu.jpg', 'Cthulhu');
  new Product('img/dog-duck.jpg', 'Dog Duckbill');
  new Product('img/dragon.jpg', 'Dragon Meat Can');
  new Product('img/pen.jpg', 'Utensil Pen Cap');
  new Product('img/pet-sweep.jpg', 'Pet Sweep');
  new Product('img/scissors.jpg', 'Pizza Scissors');
  new Product('img/shark.jpg', 'Shark Sleeping Bag');
  new Product('img/sweep.png', 'Sweep Onesie');
  new Product('img/tauntaun.jpg', 'Tauntaun Sleeping Bag');
  new Product('img/unicorn.jpg', 'Unicorn Meat Can');
  new Product('img/usb.gif', 'Tentacle USB');
  new Product('img/water-can.jpg', 'Watering Can');
  new Product('img/wine-glass.jpg', 'Wine Glass');
}
createProducts();

//make random function
function randomIndex() {
  return Math.floor(Math.random() * Product.all.length);
}

// Set up no repeat guidelines for three images
function displayPics() {
  var currentlyShowing = [];

  //make the left image unique
  currentlyShowing[0] = randomIndex();
  while(currentlyShowing[0] === Product.justViewed[0] || currentlyShowing[0] === Product.justViewed[1] || currentlyShowing[0] === Product.justViewed[2]) {
    console.error('Duplicate in prior view. Get new image!');
    currentlyShowing[0] = randomIndex();
  }

  //make the center image unique
  currentlyShowing[1] = randomIndex();
  while(currentlyShowing[1] === currentlyShowing[0] || currentlyShowing[1] === Product.justViewed[0] || currentlyShowing[1] === Product.justViewed[1] || currentlyShowing[1] === Product.justViewed[2]) {
    console.error('Duplicate at center or in prior view! Get new image!');
    currentlyShowing[1] = randomIndex();
  }

  //make the right image unique
  currentlyShowing[2] = randomIndex();
  while(currentlyShowing[2] === currentlyShowing[0] || currentlyShowing[2] === currentlyShowing[1] || currentlyShowing[2] === Product.justViewed[0] || currentlyShowing[2] === Product.justViewed[1] || currentlyShowing[2] === Product.justViewed[2]) {
    console.error('Duplicate at right or in prior view! Get new image!');
    currentlyShowing[2] = randomIndex();
  }

  //Write it to the page
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
    var remove = document.getElementById('image_container');
    remove.innerHTML = '';
    pushFinalTally();
    pushPercentage();
    console.log(Product.finalViews);
    console.log(Product.percentage);
    renderChart();
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
displayPics();

function pushFinalTally() {
  for(var i = 0; i < Product.all.length; i++){
    Product.finalViews.push(Product.all[i].votes);
  }
}

function pushPercentage() {
  for (var i = 0; i < Product.all.length; i++){
    var percentage = ((Product.all[i].votes / Product.all[i].views) * 100);
    Product.percentage.push(percentage);
  }
}

//add the chart to the code
function renderChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['R2-D2 Suitcase', 'Banana Slicer', 'iPad TP Stand', 'Rain Boots', 'Breakfast Oven', 'Meatball Bubble Gum', 'Red Chair', 'Cthulhu', 'Dog Duckbill', 'Dragon Meat', 'Utensil Pen Cap', 'Pet Sweep', 'Pizza Scissors', 'Shark Blanket', 'Sweep Onesie', 'Tauntaun Blanket', 'Unicorn Meat', 'Tentacle USB', 'Watering Can', 'Wine Glass'],
      datasets: [{
        label: '# of Votes',
        data: Product.finalViews,
        backgroundColor: [
          'rgba(187, 190, 255, .8)',
          'rgba(255, 241, 184, .8)',
          'rgba(187, 190, 255, .8)',
          'rgba(255, 241, 184, .8)',
          'rgba(187, 190, 255, .8)',
          'rgba(255, 241, 184, .8)',
          'rgba(187, 190, 255, .8)',
          'rgba(255, 241, 184, .8)',
          'rgba(187, 190, 255, .8)',
          'rgba(255, 241, 184, .8)',
          'rgba(187, 190, 255, .8)',
          'rgba(255, 241, 184, .8)',
          'rgba(187, 190, 255, .8)',
          'rgba(255, 241, 184, .8)',
          'rgba(187, 190, 255, .8)',
          'rgba(255, 241, 184, .8)',
          'rgba(187, 190, 255, .8)',
          'rgba(255, 241, 184, .8)',
          'rgba(187, 190, 255, .8)',
          'rgba(255, 241, 184, .8)',
        ],
      }]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            stepSize: 1,
            min: 0,
            autoSkip: false
          }
        }],
        yAxes: [{
          ticks: {
            stepSize: 1,
            min: 0,
            beginAtZero: true,
          }
        }]
      }
    }
  });
}

//create Event handler
Product.container.addEventListener('click', handleClick);
