var Bricks = {
    draw: function (drawingContext, state) {
        var brickConfiguration = state.brickConfiguration;
        var bricks = state.bricks;

        for (var column = 0; column < brickConfiguration.columns; column++) {
            if (!bricks[column]) {
                bricks[column] = []
            }
            for (var row = 0; row < brickConfiguration.rows; row++) {
                if (!bricks[column][row]) {
                    bricks[column][row] = {x: 0, y: 0, hit: false};
                }
                var brick = bricks[column][row];

                // Draw the brick only it it hasn't been hit
                if (!brick.hit) {
                    var brickX = (column * (brickConfiguration.width + brickConfiguration.padding)) + brickConfiguration.offsetLeft;
                    var brickY = (row * (brickConfiguration.height + brickConfiguration.padding)) + brickConfiguration.offsetTop;
                    brick.x = brickX;
                    brick.y = brickY;
                    drawingContext.beginPath();
                    drawingContext.rect(brickX, brickY, brickConfiguration.width, brickConfiguration.height);
                    drawingContext.fillStyle = brickConfiguration.color;
                    drawingContext.fill();
                    drawingContext.closePath();
                }
            }
        }
    },

    update: function (state) {
        var brickConfiguration = state.brickConfiguration;
        var brickWidth = brickConfiguration.width;
        var brickHeight = brickConfiguration.height;
        var bricks = state.bricks;
        var ball = state.ball;

        for (var column = 0; column < brickConfiguration.columns; column++) {
            for (var row = 0; row < brickConfiguration.rows; row++) {
                if (bricks[column] && bricks[column][row]) {
                    var brick = bricks[column][row];
                    // If the ball has collided with a brick and the brick hasn't been hit already
                    if (!brick.hit && ball.x > brick.x && ball.x < brick.x + brickWidth && ball.y > brick.y && ball.y < brick.y + brickHeight) {
                        // Mark it as hit
                        brick.hit = true;
                        // Reverse the direction of the ball
                        ball.speedY = -ball.speedY * brickConfiguration.hitMultiplier;
                        state.score++;
                    }
                }
            }
        }
    }
};