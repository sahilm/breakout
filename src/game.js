var Game = {
    draw: function (drawingContext, state, width, height) {
        var originX = 0;
        var originY = 0;

        function clearScreen() {
            drawingContext.clearRect(originX, originY, width, height);
        }

        clearScreen();
        Ball.draw(drawingContext, state);
        Paddle.draw(drawingContext, state);
    },

    update: function (state) {
        Ball.update(state);
        Boundary.update(state);
        Paddle.update(state);
    }
};