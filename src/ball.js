var Ball = {
    init: function (state) {
        var ball = state.ball;
        var paddle = state.paddle;
        var boundary = state.boundary;
        var minSpeedY = 2;

        ball.x = paddle.x + (paddle.width / 2);
        ball.y = boundary.height - paddle.height;
        ball.speedY = -(Math.random() * (ball.speedX - minSpeedY) + minSpeedY);
    },

    draw: function (drawingContext, state) {
        var ball = state.ball;
        drawingContext.beginPath();
        var startAngle = 0;
        drawingContext.arc(ball.x, ball.y, ball.radius, startAngle, Math.PI * 2);
        drawingContext.fillStyle = ball.color;
        drawingContext.fill();
        drawingContext.closePath();
    },

    update: function (state) {
        var ball = state.ball;
        var paddle = state.paddle;
        var boundary = state.boundary;
        var ballXPosition = ball.x + ball.speedX;
        var ballYPosition = ball.y + ball.speedY;

        ball.x = ballXPosition;
        ball.y = ballYPosition;

        // Reverse the y direction of the ball if it collides with top boundary
        if (ball.y < boundary.originY) {
            ball.speedY = -ball.speedY;
        }

        // Reverse the x direction of the ball if it collides with right or left boundary
        if (ball.x < boundary.originX || ball.x > (boundary.width - ball.radius)) {
            ball.speedX = -ball.speedX;
        }

        // If the ball has collided with the paddle
        if (ball.y >= (boundary.height - paddle.height) && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            // Reverse its direction
            ball.speedY = -ball.speedY * paddle.hitMultiplier;
        }

        // Take a life if the ball goes below the bottom boundary
        if (ball.y > (boundary.height + ball.radius)) {
            state.lives--;
            // Reset the paddle and ball
            Paddle.init(state);
            Ball.init(state);
        }


    }
};
