var Bricks = {
    draw: function (drawingContext, state) {
        var brickConfiguration = state.brickConfiguration;
        var bricks = state.bricks;

        for (var column = 0; column < brickConfiguration.columns; column++) {
            if (!bricks[column]) {
                bricks[column] = []
            }
            for (var row = 0; row < brickConfiguration.rows; row++) {
                if (!bricks[column][row]) {
                    bricks[column][row] = {x: 0, y: 0};
                }
                var brick = bricks[column][row];
                var brickX = (column * (brickConfiguration.width + brickConfiguration.padding)) + brickConfiguration.offsetLeft;
                var brickY = (row * (brickConfiguration.height + brickConfiguration.padding)) + brickConfiguration.offsetTop;
                brick.x = brickX;
                brick.y = brickY;
                drawingContext.beginPath();
                drawingContext.rect(brickX, brickY, brickConfiguration.width, brickConfiguration.height);
                drawingContext.fillStyle = brickConfiguration.color;
                drawingContext.fill();
                drawingContext.closePath();
            }
        }
    },

    update: function (state) {

    }
};