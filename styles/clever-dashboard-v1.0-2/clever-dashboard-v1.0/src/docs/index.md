---
layout: docs
title: Getting Started
permalink: 'docs/'
---

## Installation

For easier asset management we've chosen [Parcel](https://parceljs.org/). If you want to see all the npm scripts included for this starter kit, open the `package.json` file.

Next, navigate to the root folder of the site and run:

```
npm install
```

To run a local server and watch for changes:

```
npm start
```

To build for production:

```
npm run build
```

To build for development:

```
npm run dev
```

There is also a tutorial available on our website that explains the most important steps for the setup process. Read more about thow to [build JAMstack-ready sites with Bootstrap and 11ty (Eleventy)](https://webpixels.io/blog/how-to-get-started-with-bootstrap-and-eleventy).

---

## HTML starter template

Be sure to have your pages set up with the latest design and development standards. That means using an HTML5 doctype and including a viewport meta tag for proper responsive behaviors. Put it all together and your pages should look like this:


```html
<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Your CSS -->
        <link href="/path/to/styles.css" rel="stylesheet">

        <title>Hello, world!</title>
    </head>
    <body>
        <!-- Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>
    </body>
</html>
```

### HTML5 doctype

Bootstrap requires the use of the HTML5 doctype. Without it, you’ll see some funky incomplete styling, but including it shouldn’t cause any considerable hiccups.

```html
<!doctype html>
<html lang="en">
    <!-- ... -->
</html>
```

### Responsive meta tag

Bootstrap is developed mobile first, a strategy in which we optimize code for mobile devices first and then scale up components as necessary using CSS media queries. To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your <head>.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## Folder structure

Webpixels CSS was built to be as modular as possible. That means you can control the file size by using only what you need. The library has 35+ Sass component files, 50+ utility files, and form styles that you can import individually.

Remember that our CSS toolkit doesn't include any JavaScript on its own. But, since it is based on Bootstrap, you can use its modules and plugins to bring some of the components to life.

### Paths

Here's what you need to know about how the files are structured in both git and in the published npm module:

In git, all of the SCSS source files live in the `src/` folder.

When published, all of the files in `src/` are "hoisted" to the package root so that you can import files like this:

```scss
@import '@webpixels/css/utilities';
```

All bundle interdependencies within the framework are defined as relative imports (e.g. with ../), so everything should work fine as long as the `@webpixels/css` directory is in one of your Sass include paths (i.e. node_modules).

### Base

When you `@import` the base module you include the files that take care of the variables, styleguide, typography system, and functions. The base module is required on each project, and must be included before anything else, as follows:

```scss
@import "@webpixels/css/base";
```

### Components

The CSS components can be loaded all at once:

```scss
@import "@webpixels/css/components";
```

### Forms

You can import the form styles like this:

```scss
@import "@webpixels/css/forms";
```

### Utilities

Make use of utility classes by importing a single line of code:

```scss
@import "@webpixels/css/utilities";
```

---

## Optimizing CSS

Using the default configuration, Webpixels CSS comes in at **83.6kb** minified and gzipped.

### Including components individually

Before you start to use tools that remove unused classee like PurgeCSS, you can make some broad optimizations by only including the component styles you think you'll need.

Instead of including components with `@import "@webpixels/css/components"` you can include them one by one. This way you can comment or remove entirely specific lines as needed, then recompile to use them.

```scss
@import "@webpixels/css/components/accordions";
@import "@webpixels/css/components/alerts";
@import "@webpixels/css/components/avatars";
@import "@webpixels/css/components/badges";
@import "@webpixels/css/components/breadcrumbs";
@import "@webpixels/css/components/buttons";
@import "@webpixels/css/components/cards";
@import "@webpixels/css/components/carousels";
@import "@webpixels/css/components/dropdowns";
@import "@webpixels/css/components/frames";
@import "@webpixels/css/components/icons";
@import "@webpixels/css/components/list-groups";
@import "@webpixels/css/components/modals";
@import "@webpixels/css/components/navbars";
@import "@webpixels/css/components/navs";
@import "@webpixels/css/components/omnisearches";
@import "@webpixels/css/components/paginations";
@import "@webpixels/css/components/popovers";
@import "@webpixels/css/components/progress";
@import "@webpixels/css/components/shapes";
@import "@webpixels/css/components/spinners";
@import "@webpixels/css/components/tables";
@import "@webpixels/css/components/toasts";
@import "@webpixels/css/components/tooltips";
```

### Remove unused CSS

Removing the unused CSS is an important aspect we need to take care of. Since Webpixels CSS includes pre-built CSS component modules and an extended utilities library, the file size of the file becomes a little too heavy to leave it this way in production mode.

To solve this, we'll use Purge CSS to remove the unused CSS and decrease the file size considerably. Here's an example from a Laravel Mix configuration.

```js
let mix = require('laravel-mix');
let purgeCss = require('laravel-mix-purgecss');

mix.sass('resources/sass/app.scss', 'public/css',  {
    sassOptions: {
      	includePaths: ['node_modules'],
    }
});

if (mix.inProduction()) {
	mix.purgeCss({
       	enabled: true,
	   	extend: {
		   	safelist: {
	      		deep: [
					// Bootstrap
					/data-bs-.*/, // data attributes used by bootstrap for js plugins
					/bs-.*/, // classes used by bootstrap for JS components
					/fade$/,
					/show$/,
					/modal-backdrop$/,
					/modal-open$/,
					/collapse$/,
					/collapsing$/,
					/tooltip.*/,
					/popover.*/,
				],
	    	}
       	},
    });
}
```

As you can see, a safelist has to be defined in order to let know Purge CSS to skip those class names, since these are injected dynamically by the Bootstrap's JS plugins. If you use any other third-party library and you `@import` its styles in the main CSS file, make sure to [add the related class names to the safelist](https://purgecss.com/safelisting.html).
