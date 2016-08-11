var Score = {
    draw: function (drawingContext, state) {
        drawingContext.font = "16px Arial";
        drawingContext.fillStyle = "#0095DD";
        drawingContext.fillText("Score: " + state.score, 8, 20);
    },

    update: function (state) {
        var brickConfiguration = state.brickConfiguration;
        if (state.score == (brickConfiguration.columns * brickConfiguration.rows)) {
            state.gameWon = true;
        }
    }
};
