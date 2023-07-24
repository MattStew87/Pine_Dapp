---
layout: docs
title: Customize
permalink: 'docs/customize/'
---

Sky is the limit when it comes to customizing our templates. Themes are a powerful feature that support extending or adding new styles to your project.

## Creating themes

Working with source files showcases how powerful themes can be. You can use smart features like Sass variables to change anything in terms of colors, typography, component properties, and more.

And no worries. You don't need to be a Sass/CSS expert to do this.

### Main Sass file

When including a theme, the main Sass file will look a little bit different. You will have to import your theme's variables. Here's how:

```scss
// Import the default variables and function
@import "@webpixels/css/core/functions";

// Your theme's variables
@import "./variables";

// Webpixels CSS
@import "@webpixels/css/base";
@import "@webpixels/css/forms";
@import "@webpixels/css/components";
@import "@webpixels/css/utilities";

// Your custom styles (optional)
@import "./custom-styles";
```

The newly created variables file will store the values you want to override.

We suggest adding additional Sass files to extend and override our CSS with your own custom styles. The major benefit of keeping a theme’s source files separate from your own additions is a simpler upgrade path when Webpixels CSS is updated.

### Theme's variables

Every Sass variable in our CSS includes the `!default` flag allowing you to override the variable’s default value in your own Sass without modifying the source code. Copy and paste variables as needed, modify their values, and remove the `!default` flag.

```scss
// Your variable overrides
$primary: #000;
$body-bg: #FFF;
```

Create a new file for storing the new Sass variables and import it as shown in the example above.

### Default theme

We provide a default theme which contains all the variables you need to change the site's appearance inside a Sass map. This makes it much easier to extend or override existing values used for components styles or utility classes. You will be able to use the `$theme` object with a specific key which will enable you to change almost anything.

[See it on Github](https://github.com/webpixels/css/blob/master/stubs/_theme-variables.scss)
