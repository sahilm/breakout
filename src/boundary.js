var Boundary = {
    update: function (state) {
        var ball = state.ball;
        var ballYPosition = ball.y + ball.speedY;
        var boundary = state.boundary;
        var ballXPosition = ball.x + ball.speedX;

        // Reverse the y direction of the ball if it collides with top boundary
        if (ballYPosition < boundary.originY) {
            ball.speedY = -ball.speedY;
        }

        // Reverse the x direction of the ball if it collides with right or left boundary
        if (ballXPosition < boundary.originX || ballXPosition > (boundary.width - ball.radius)) {
            ball.speedX = -ball.speedX;
        }

        // End the game if the ball reaches the bottom boundary
        var padding = 7;
        if (ballYPosition > (boundary.height + ball.radius + padding)) {
            state.gameOver = true;
        }

    }
};
