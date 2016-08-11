var GameState = {
    create: function (width, height) {
        return {
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
            }
        }
    }
};