# `jquery-plugin-xclick`

`jquery-plugin-xclick` is a jQuery plugin that allows you to setup an onclick event handler that triggers every x times that the element is clicked. It is useful to detect triple clicks.

## Usage

```js
$('button').xclick(5, () => {
  alert('Clicked 5 times in a row!');
});
```
