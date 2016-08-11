var Paddle = {
    draw: function (drawingContext, state) {
        var paddle = state.paddle;
        var boundary = state.boundary;

        drawingContext.beginPath();
        drawingContext.rect(paddle.x, boundary.height - paddle.height, paddle.width, paddle.height);
        drawingContext.fillStyle = paddle.color;
        drawingContext.fill();
        drawingContext.closePath();
    },

    update: function (state) {
        var paddle = state.paddle;
        var boundary = state.boundary;
        var ball = state.ball;

        if (state.rightKeyPressed && paddle.x < (boundary.width - paddle.width)) {
            paddle.x += paddle.speed;
        }

        if (state.leftKeyPressed && paddle.x > 0) {
            paddle.x -= paddle.speed;
        }


        // If the ball has collided with the paddle
        if (ball.y >= (boundary.height - paddle.height) && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            // Reverse its direction
            ball.speedY = -ball.speedY * paddle.hitMultiplier;
        }
    }
};
