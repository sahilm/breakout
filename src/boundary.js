var Boundary = {
    update: function (state) {
        var ball = state.ball;
        var ballYPosition = ball.y + ball.speedY;
        var boundary = state.boundary;
        var ballXPosition = ball.x + ball.speedX;

        // Reverse the y direction of the ball if it collides with top or bottom boundary
        if (ballYPosition < boundary.originY || ballYPosition > boundary.height) {
            ball.speedY = -ball.speedY;
        }

        // Reverse the x direction of the ball if it collides with right or left boundary
        if (ballXPosition < boundary.originX || ballXPosition > boundary.width) {
            ball.speedX = -ball.speedX;
        }
    }
};
