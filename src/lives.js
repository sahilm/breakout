var Lives = {
    draw: function (drawingContext, state) {
        drawingContext.font = "16px Arial";
        drawingContext.fillStyle = "#0095DD";
        drawingContext.fillText("Lives: " + state.lives, state.boundary.width - 65, 20);
    },

    update: function (state) {
        if (state.lives == 0) {
            state.gameOver = true;
        }
    }
};