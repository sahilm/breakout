var Game = {
    draw: function (drawingContext, state, width, height) {
        var originX = 0;
        var originY = 0;
        drawingContext.clearRect(originX, originY, width, height);
        Ball.draw(drawingContext, state);
    },

    update: function (state) {
        Ball.update(state);
        Boundary.update(state);
    }
};