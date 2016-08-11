var GameState = {
    create: function (width, height) {
        var state = {
            ball: {
                x: undefined,
                y: undefined,
                speedX: 4,
                speedY: undefined,
                radius: 10,
                color: "#FFACAC"
            },
            boundary: {
                width: width,
                height: height,
                originX: 0,
                originY: 0
            },
            paddle: {
                height: 10,
                width: 75,
                x: undefined,
                color: "#0095DD",
                speed: 5,
                hitMultiplier: 1.03
            },
            brickConfiguration: {
                rows: 3,
                columns: 5,
                width: 75,
                height: 20,
                padding: 10,
                offsetTop: 30,
                offsetLeft: 30,
                color: "#0095DD",
                hitMultiplier: 1.03
            },
            bricks: [],
            rightKeyPressed: false,
            leftKeyPressed: false,
            gameOver: false,
            score: 0,
            gameWon: false,
            lives: 3,
        };

        Paddle.init(state);
        Ball.init(state);
        return state;
    }
};