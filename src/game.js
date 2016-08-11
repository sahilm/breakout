var Game = {
    draw: function (drawingContext, state, width, height) {
        var originX = 0;
        var originY = 0;

        function clearScreen() {
            drawingContext.clearRect(originX, originY, width, height);
        }

        clearScreen();
        if (state.gameOver) {
            alert("GAME OVER!");
            document.location.reload();
        } else if (state.gameWon) {
            alert("Winner!");
            document.location.reload();
        } else {
            Ball.draw(drawingContext, state);
            Paddle.draw(drawingContext, state);
            Bricks.draw(drawingContext, state);
            Score.draw(drawingContext, state);

        }
    },

    update: function (state) {
        Ball.update(state);
        Paddle.update(state);
        Bricks.update(state);
        Score.update(state);
    }
};