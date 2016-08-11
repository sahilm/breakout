var GameState = {
    create: function (width, height) {
        var state = {
            ball: {
                x: width / 2,
                y: height / 2,
                speedX: 4,
                speedY: -4,
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
                x: (width - 75) / 2,
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
                hitMultiplier: 1.03,
            },
            bricks: [],
            rightKeyPressed: false,
            leftKeyPressed: false,
            gameOver: false
        };

        Paddle.init(state);
        return state;
    }
};