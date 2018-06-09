'use strict';

//declare global variables
Product.all = [];
Product.container = document.getElementById('image_container');
Product.justViewed = [];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');
Product.totalClicks = 0;
Product.FinalViews = [];

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
function makeRandom() {
  return Math.floor(Math.random() * Product.all.length);
}

// Set up no repeat guidelines for three images
function displayPics() {
  var currentlyShowing = [];

  //make the left image unique
  currentlyShowing[0] = makeRandom();
  while(currentlyShowing[0] === Product.justViewed[0] || currentlyShowing[0] === Product.justViewed[1] || currentlyShowing[0] === Product.justViewed[2]) {
    console.error('Duplicate in prior view. Re run it!');
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
    console.error('Duplicate at right or in prior view! Re run it.');
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
    pushFinalTally();
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
    Product.FinalViews.push(Product.all[i].votes);
  }
}

//show the tally using the list in the DOM once the event listener has been removed
// function showTally() {
//   for(var i = 0; i < Product.all.length; i++) {
//     var liEl = document.createElement('li');
//     liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes and was viewed ' + Product.all[i].views + ' times.';
//     //append the list item to the Product.tally created above globally for the ul
//     Product.tally.appendChild(liEl);
//   }
// }

//add the chart to the code
function renderChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['R2-D2 Suitcase', 'Banana Slicer', 'iPad Toilet Paper Stand', 'Toeless Rain Boots', 'Breakfast Oven', 'Meatball Bubble Gum', 'Red Rounded Chair', 'Cthulhu', 'Dog Duckbill', 'Dragon Meat Can', 'Utensil Pen Cap', 'Pet Sweep', 'Pizza Scissors', 'Shark Sleeping Bag', 'Sweep Onesie', 'Tauntaun Sleeping Bag', 'Unicorn Meat Can', 'Tentacle USB', 'Watering Can', 'Wine Glass'],
      datasets: [{
        label: '# of Votes',
        data: [Product.FinalViews],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//create Event handler
Product.container.addEventListener('click', handleClick);