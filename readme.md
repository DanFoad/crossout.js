# Crossout

Diagonally crosses out words using data attribute

## Usage

`npm install crossout`

`var Crossout = require('crossout');`

```
<span data-crossedout>consectetur adipisicing</span>
```

```
<script>
    new Crossout();
</script>
```

## Settings

 - thickness (default: 2): How thick the line will be
 - color (default: #000000): The colour of the line
 - rounded (default: false): Whether to round the edges of the line
 - extension (default: 0): How far out to extend the line past text width
 - reverseDirection (default: false): Whether to go bottom left to top right or top left to bottom right

### Global

Global settings are configured when making a new Crossout object, example:

`new Crossout({thickness: 4, color: '#ab6789'});`

If not specified, the defaults above will be used

### Local

Local settings are configured in the data attribute of the spans, example:

`<span data-crossedout='{rounded: true, extension: 16, reverseDirection: true}'>...</span>`

Local settings will override global settings