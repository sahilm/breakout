var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballX = canvas.width / 2;
var ballY = canvas.height - 30;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleSpeed = 5;
var rightKeyPressed = false;
var leftKeyPressed = false;
var ballSpeedX = 4;
var ballSpeedY = -4;
var ballSpeedMultiplier = 1.07;
var ballRadius = 10;
var ballColors = ["#FFACAC", "#0095DD", "red", "green", "blue"];
var ballColor = ballColors[0];
var rightArrowKeyCode = 39;
var leftArrowKeyCode = 37;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];

var score = 0;

var lives = 3;

var gameFinished = false;

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function atWinningScore() {
    return score == brickRowCount * brickColumnCount;
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
    if (atWinningScore()) {
        gameFinished = true;
    }
}

function createBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {
                x: 0,
                y: 0,
                hit: false
            };
        }
    }
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var brick = bricks[c][r];
            if (!brick.hit) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                brick.x = brickX;
                brick.y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function detectCollisionWithWalls() {
    if (ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballSpeedY < ballRadius) {
        ballSpeedY = -ballSpeedY;
    }
    else if (ballY + ballSpeedY > canvas.height - ballRadius) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY * ballSpeedMultiplier;
        }
        else {
            lives--;
            if (!lives) {
                gameFinished = true;
            }
            else {
                ballX = canvas.width / 2;
                ballY = canvas.height - 30;
                ballSpeedX = 3;
                ballSpeedY = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
}

function detectCollisionWithBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var brick = bricks[c][r];
            if (!brick.hit) {
                if (ballX > brick.x && ballX < brick.x + brickWidth && ballY > brick.y && ballY < brick.y + brickHeight) {
                    ballSpeedY = -ballSpeedY * ballSpeedMultiplier;
                    brick.hit = true;
                    flipBallColor();
                    score++;
                }
            }
        }
    }
}


function flipBallColor() {
    // Returns a random integer between min (included) and max (excluded)
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var min = 1;
    var nextColor = (ballColors.indexOf(ballColor) + getRandomInt(min, ballColors.length)) % ballColors.length;
    ballColor = ballColors[nextColor];
}

function drawBall() {
    ctx.beginPath();
    detectCollisionWithWalls();
    detectCollisionWithBricks();
    var startAngle = 0;
    ctx.arc(ballX, ballY, ballRadius, startAngle, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    if (rightKeyPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    }

    if (leftKeyPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    if (gameFinished) {
        if (atWinningScore()) {
            alert("YOU WIN!")
        } else {
            alert("GAME OVER");
        }
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawBricks();
        drawScore();
        drawLives();
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        window.requestAnimationFrame(draw);
    }
}

function keyDownHandler(e) {
    if (e.keyCode == rightArrowKeyCode) {
        rightKeyPressed = true;
    }
    if (e.keyCode === leftArrowKeyCode) {
        leftKeyPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == rightArrowKeyCode) {
        rightKeyPressed = false;
    }
    else if (e.keyCode == leftArrowKeyCode) {
        leftKeyPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var paddleCenter = paddleWidth / 2;
    if (relativeX > (paddleCenter) && relativeX < canvas.width - (paddleCenter)) {
        paddleX = relativeX - paddleCenter;
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

createBricks();
draw();

