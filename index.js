var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var ballColors = ["#FFACAC", "#0095DD", "red", "green", "blue"];
var ballSpeedMultiplier = 1.05;
var ballColor = ballColors[0];
var paddleSpeed = 5;
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

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
    if (score == brickRowCount * brickColumnCount) {
        alert("YOU WIN, CONGRATULATIONS!");
        document.location.reload();
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
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy * ballSpeedMultiplier;
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
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
                if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
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
    ctx.arc(x, y, ballRadius, startAngle, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    }

    if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    x += dx;
    y += dy;
    window.requestAnimationFrame(draw);
}

function keyDownHandler(e) {
    if (e.keyCode == rightArrowKeyCode) {
        rightPressed = true;
    }
    if (e.keyCode === leftArrowKeyCode) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == rightArrowKeyCode) {
        rightPressed = false;
    }
    else if (e.keyCode == leftArrowKeyCode) {
        leftPressed = false;
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

