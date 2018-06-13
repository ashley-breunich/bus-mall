'use strict';

//declare global variables
Product.all = [];
Product.container = document.getElementById('image_container');
Product.justViewed = [];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');
Product.totalClicks = 0;
Product.names = [];
Product.finalClicks = [];
Product.finalViews = [];
Product.percentage = [];

//constructor function - template for Product creation
function Product(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
  Product.names.push(this.name);
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

function roundTicker() {
  var ticker = document.getElementById('ticker');
  ticker.textContent = 'You have completed ' + Product.totalClicks + ' of 25 rounds.';
}

//event listener for keeping track of total clicks on images
function handleClick(event) {

  //make the click stop at 25
  if(Product.totalClicks === 24) {
    Product.container.removeEventListener('click', handleClick);
    //show the list after the last click
    var remove = document.getElementById('image_container');
    remove.textContent = '';
    pushFinalTally();
    pushPercentage();
    console.log(Product.finalViews);
    console.log(Product.percentage);
    renderFirstChart();
    renderSectionChart();
  }

  //start to add up the total clicks
  for (var i = 0; i < Product.all.length; i++) {
    if(event.target.id === Product.all[i].name) {
      Product.all[i].votes += 1;
      console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes and has been viewed ' + Product.all[i].views + ' times.');
    }
  }
  Product.totalClicks += 1;
  roundTicker();
  console.log('The user has clicked on ' + Product.totalClicks + ' photos.');
  displayPics();
}
displayPics();

function pushFinalTally() {
  for(var i = 0; i < Product.all.length; i++){
    Product.finalClicks.push(Product.all[i].votes);
    Product.finalViews.push(Product.all[i].views);
  }
}

function pushPercentage() {
  for (var i = 0; i < Product.all.length; i++){
    var percentage = (Math.floor((Product.all[i].votes / Product.all[i].views) * 100));
    Product.percentage.push(percentage);
  }
}

//add the first chart to the code
function renderFirstChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.names,
      datasets: [{
        label: '# of Votes',
        data: Product.finalClicks,
        backgroundColor: 'rgba(187, 190, 255, .9)',
      },
      {
        label: '# of Views',
        data: Product.finalViews,
        backgroundColor: 'rgba(255, 241, 184, .9)',
      }],
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

//add the second chart to the code
function renderSectionChart() {
  var ctx = document.getElementById('secondChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.names,
      datasets: [{
        label: '% of Times Clicked When Viewed',
        data: Product.percentage,
        backgroundColor: 'rgba(178, 144, 0, .7)',
      }],
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
            stepSize: 10,
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

var clearLS = document.getElementById('clearStorage');

clearLS.addEventListener('click', function(){
  localStorage.clear();
});
