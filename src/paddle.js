var Paddle = {
    init: function (state) {
        var paddle = state.paddle;
        var boundary = state.boundary;
        paddle.x = Math.random() * (boundary.width - paddle.width);
    },

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

        if (state.rightKeyPressed && paddle.x < (boundary.width - paddle.width)) {
            paddle.x += paddle.speed;
        }

        if (state.leftKeyPressed && paddle.x > 0) {
            paddle.x -= paddle.speed;
        }
    }
};
