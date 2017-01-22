# Typewriter

Typewriter is an easy-to-use and powerful automatic typer. It's written to be working without any dependencies. It's inspired and built on a frame-based timeline. This allows the Typewriter object to create events and fire them on specific frames in the timeline.

Each phrase will get turned into frames. For example the phrase "Hello", would turn into 9 frames, consisting out of "H", "He", "Hel", "Hell", "Hello", "Hell", "Hel", "He" and "H". These will later be placed on a timeline, with all the other phrases that you put into the typewriter object.

You could for example pause the typewriter at any given frame, change the background-color at each frame or show different types of backgrounds depending on what phrase is currently being written out.

## Demonstration
A simple demonstration has been set up. It and it's source code can be found [here](http://inmomentum.io/typewriter/index.html).

## Installation

### Set up the JavaScript

Download [typewriter.js](https://raw.githubusercontent.com/InMomentum/Typewriter/master/dist/js/typewriter.js) or the minified version [typewriter.min.js](https://raw.githubusercontent.com/InMomentum/Typewriter/master/dist/js/typerwriter.min.js). Include the javascript file after the ending </body> tag.

```html
<script type="text/javascript" src="path/to/typewriter.min.js"></script>
```

### Set up the CSS

Download [typewriter.css](https://raw.githubusercontent.com/InMomentum/Typewriter/master/dist/css/typewriter.css) or the minified version [typewriter.min.css](https://raw.githubusercontent.com/InMomentum/Typewriter/master/dist/css/typerwriter.min.css). Include the css file within the <head> and </head> tag.

```html
<link rel="stylesheet" type="text/css" href="path/to/typewriter.min.css">
```

### Add the HTML markup

Both in the demonstration and in the usage example shown below, Typewriter will use the first span element with "typewriter" as id, to type out the phrases. You are however free to use any kind of element as long as it has an id. The second span is used for creating the blinking cursor.

```html
<h1>
    <span id="typewriter"></span>
    <span class="typewriter-cursor"></span>
</h1>
```

## Usage

It's easy to use Typewriter. Initiate an object and set it's required configuration values. Then initiate Typewriter with the object's typewrite() method.

```javascript
const typewriter = new Typewriter({
    elementId: 'typewriter',
    phrases: ['Easy to use', 'Powerful', 'Automatic typer'],
});

typewriter.typewrite();
```

## Configuration

You are free to override any of the default values before initiating Typewriter.

```javascript
const typewriter = new Typewriter({
    elementId: 'typewriter',
    phrases: ['Easy to use', 'Powerful', 'Automatic typer'],
    speed: 100,
    delay: 1500,
    loop: true
});

typewriter.typewrite();
```

### Events

By default, Typewriter will add an event with a pause() method, at each fully written-out phrase. If the Typewriter is configured to loop, it will also automatically add an event at the end of the timeline, using the typewriter.reset() method.

There are 4 main methods available: pause(time), refresh(), stop() and reset().

You are free to create your own events. An event consist of a target frame, and a callback function. Below follows a couple of examples.

#### Example events

##### Add a pause before writing the first phrase

This example will add an event, with the pause() method, before writing out the first phrase.

```javascript
const typewriter = new Typewriter({
    elementId: 'typewriter',
    phrases: ['Easy to use', 'Powerful', 'Automatic typer'],
});

typewriter.addEventAt(0, function(){
    typewriter.pause(2000);
});

typewriter.typewrite();
```

##### Turn up the speed at a given frame

This example, would after writing out the first phrase, at the 12th frame, turn up the speed of the typewriter. To do so, it would first need to change the value of speed variable and then use the refresh() method to refresh the typewriter to use the newly updated speed variable.


```javascript
const typewriter = new Typewriter({
    elementId: 'typewriter',
    phrases: ['Easy to use', 'Powerful', 'Automatic typer'],
});

typewriter.addEventAt(8, function(){
    typewriter.speed = 50;
    typewriter.refresh();
});

typewriter.typewrite();
```

## Build

Typewriter is built with gulp. Typewriter source lives in src, which gets compiled, bundled and minified into dist/js/typewriter.js, dist/js/typewriter.min.js, dist/css/typewriter.css and dist/css/typewriter.min.css with the help of gulp, gulp-babel, gulp-uglify, gulp-uglifycss and gulp-rename.

```bash
npm run build
```

## License

Typewriter is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
