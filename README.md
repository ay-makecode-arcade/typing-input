# typing-input

A MakeCode Arcade extension that remembers the last keyboard key or mouse button
that was pressed, so a project doesn't have to track inputs itself.

Built on top of the built-in `browser-events` extension.

## Use as Extension

This repository can be added as an **extension** in MakeCode Arcade.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/ay-makecode-arcade/typing-input** and import

## Blocks

### Keyboard

* **last keyboard input** — the text of the last key pressed, like `A`, `7`, `Space` or `Enter`
* **last keyboard key** — the last key pressed, as a `browser-events` key value

### Mouse

* **last mouse input** — the last mouse button pressed, like `left` or `right`
* **last mouse button** — the last mouse button pressed, as a `browser-events` button value

### Input

* **clear last input** — forgets the last keyboard and mouse input

Both input blocks return an empty value until an input has been detected.

## Example

```blocks
let target = "A"
forever(function () {
    if (typingInput.lastKeyboardInput() == target) {
        game.splash("Correct!")
        typingInput.clearLastInput()
        target = "B"
    }
})
```

## Notes

`browser-events` only reports input while the program is running in a browser,
so this extension behaves the same way.

## Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
