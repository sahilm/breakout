var Ball = {
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

        // End the game if the ball reaches the bottom boundary
        var padding = 7;
        if (ball.y > (boundary.height + ball.radius + padding)) {
            state.gameOver = true;
        }
    }
};
