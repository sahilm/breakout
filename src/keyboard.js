var Keyboard = {

    setup: function (document, state) {
        Keyboard.state = state;
        document.addEventListener("keydown", Keyboard.keyDownHandler, false);
        document.addEventListener("keyup", Keyboard.keyUpHandler, false);
    },

    keyDownHandler: function (event) {
        var rightArrowKeyCode = 39;
        var leftArrowKeyCode = 37;

        if (event.keyCode === rightArrowKeyCode) {
            Keyboard.state.rightKeyPressed = true;
        }
        if (event.keyCode === leftArrowKeyCode) {
            Keyboard.state.leftKeyPressed = true;
        }
    },

    keyUpHandler: function (event) {
        var rightArrowKeyCode = 39;
        var leftArrowKeyCode = 37;

        if (event.keyCode === rightArrowKeyCode) {
            Keyboard.state.rightKeyPressed = false;
        }

        if (event.keyCode === leftArrowKeyCode) {
            Keyboard.state.leftKeyPressed = false;
        }
    }
};