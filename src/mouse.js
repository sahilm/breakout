var Mouse = {

    setup: function (document, state, canvas) {
        Mouse.state = state;
        Mouse.canvas = canvas;
        document.addEventListener("mousemove", Mouse.moveHandler, false);
    },


    moveHandler: function (event) {
        var relativeX = event.clientX - Mouse.canvas.offsetLeft;
        if (relativeX > (state.paddle.width / 2) && relativeX < (state.boundary.width - (state.paddle.width / 2))) {
            state.paddle.x = relativeX - state.paddle.width / 2;
        }
    }
};