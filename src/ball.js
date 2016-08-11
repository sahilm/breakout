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
        ball.x = ball.x + ball.speedX;
        ball.y = ball.y + ball.speedY;
    }
};
