var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('colorDisplay');
var message = document.getElementById('message');
var h1 = document.querySelector('h1');
var resetButton = document.getElementById('buttonNew');
var modeButtons = document.querySelectorAll('.mode');

init();

function init() {
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons() {
    //mode buttons event listeners
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            numSquares = this.textContent === 'Easy' ? 3 : 6;
            reset();
        });
    }
}

function setUpSquares() {
    //setup squares
    for (var i = 0; i < squares.length; i++) {
        //add click listeners to square
        squares[i].addEventListener('click', function () {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to picked color
            if (clickedColor === pickedColor) {
                message.textContent = 'CORRECT!';
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = 'Play Again ?';
                changeColor(clickedColor);
            } else {
                message.textContent = 'TRY AGAIN!';
                this.style.backgroundColor = '#232323';
            }
        });
    }
}

function reset() {
    //generate all new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color from an array
    pickedColor = pickColor();
    //change colorDisplay to match new picked color
    colorDisplay.textContent = pickedColor;
    message.textContent = '';

    resetButton.textContent = 'NEW COLORS';
    //similar as resetButton.textContent = 'NEW COLORS';

    //change colors of the squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
    //set the background of h1 back to default
    h1.style.background = 'steelblue';
}

resetButton.addEventListener('click', function () {
    reset();
});

function changeColor(color) {
    //loop through all squares
    for (var i = 0; i <= squares.length; i++) {
        //change the color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = [];
    //add num random colors to array
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick red, green and blue from (0 - 255)
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}
