/**
 * Remembers the most recent keyboard key or mouse button that was pressed,
 * so projects don't have to track inputs themselves.
 */
//% color="#9c1355" icon="\uf245" block="Typing Input"
namespace typingInput {
    // browser-events raises these events from the simulator. The package doesn't
    // export the constants, so the values are mirrored here. They are the same
    // ones used by browserEvents.KeyButton and must not change.
    const INTERNAL_KEY_DOWN = 6870;
    const INTERNAL_POINTER_DOWN = 6868;

    // Every value of browserEvents.Key. One listener per key is required: the
    // event bus does not tell a wildcard listener which value triggered it.
    const KEY_CODES = [
        48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // 0-9
        192, 189, 187,                          // ` - =
        65, 83, 68, 70, 71, 72, 74, 75, 76,     // A S D F G H J K L
        81, 87, 69, 82, 84, 89, 85, 73, 79, 80, // Q W E R T Y U I O P
        219, 221, 220,                          // [ ] \
        90, 88, 67, 86, 66, 78, 77,             // Z X C V B N M
        188, 190, 191,                          // , . /
        186, 222, 32,                           // ; ' space
        8, 9, 13, 16, 17, 18, 20, 91,           // backspace tab enter shift ctrl alt caps meta
        33, 34, 35, 36, 37, 38, 39, 40,         // page up/down end home arrows
        1016, 1017, 1018, 1019,                 // left/right shift, left/right ctrl
        46                                     // delete
    ];

    // browserEvents.MouseButtonId values, paired with the text shown by the block.
    const MOUSE_BUTTONS = [
        { id: browserEvents.MouseButtonId.Left, name: "left" },
        { id: browserEvents.MouseButtonId.Right, name: "right" },
        { id: browserEvents.MouseButtonId.Wheel, name: "wheel" },
        { id: browserEvents.MouseButtonId.Back, name: "back" },
        { id: browserEvents.MouseButtonId.Forward, name: "forward" }
    ];

    let lastKey = 0;
    let lastMouseButton = 0;
    let lastMouseName = "";

    function bindKey(code: number) {
        control.internalOnEvent(INTERNAL_KEY_DOWN, code, function () {
            lastKey = code;
        }, 16);
    }

    function bindMouseButton(id: number, name: string) {
        control.internalOnEvent(INTERNAL_POINTER_DOWN, id, function () {
            lastMouseButton = id;
            lastMouseName = name;
        }, 16);
    }

    function init() {
        for (let i = 0; i < KEY_CODES.length; i++) {
            bindKey(KEY_CODES[i]);
        }
        for (let i = 0; i < MOUSE_BUTTONS.length; i++) {
            bindMouseButton(MOUSE_BUTTONS[i].id, MOUSE_BUTTONS[i].name);
        }
    }
    init();

    /**
     * The text of the last key that was pressed, like "A", "7" or "Enter".
     * Returns an empty string until a key is pressed.
     */
    //% blockId=typingInput_lastKeyboardInput
    //% block="last keyboard input"
    //% group="Keyboard"
    //% weight=100
    export function lastKeyboardInput(): string {
        return browserEvents.keyToString(lastKey as browserEvents.Key) || "";
    }

    /**
     * The last key that was pressed, as a browser events key.
     * Returns 0 until a key is pressed.
     */
    //% blockId=typingInput_lastKeyboardKey
    //% block="last keyboard key"
    //% group="Keyboard"
    //% weight=90
    export function lastKeyboardKey(): browserEvents.Key {
        return lastKey as browserEvents.Key;
    }

    /**
     * The last mouse button that was pressed, like "left" or "right".
     * Returns an empty string until a mouse button is pressed.
     */
    //% blockId=typingInput_lastMouseInput
    //% block="last mouse input"
    //% group="Mouse"
    //% weight=100
    export function lastMouseInput(): string {
        return lastMouseName;
    }

    /**
     * The last mouse button that was pressed, as a browser events button.
     * Returns 0 until a mouse button is pressed.
     */
    //% blockId=typingInput_lastMouseButton
    //% block="last mouse button"
    //% group="Mouse"
    //% weight=90
    export function lastMouseButtonPressed(): browserEvents.MouseButtonId {
        return lastMouseButton as browserEvents.MouseButtonId;
    }

    /**
     * Forgets the last keyboard and mouse input.
     */
    //% blockId=typingInput_clear
    //% block="clear last input"
    //% group="Input"
    //% weight=10
    export function clearLastInput() {
        lastKey = 0;
        lastMouseButton = 0;
        lastMouseName = "";
    }
}
