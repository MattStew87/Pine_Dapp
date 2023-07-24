---
layout: docs
title: Style Guide
permalink: 'docs/styleguide/'
---

## Colors

All the colors are available as Sass variables and a Sass map in the variables file. We use them to create a subset of these colors for a theme palette for easier usage. It
allows you to remain consistent.

### Available colors

We manually created variables for every tint and shade ourselves. We specify the midpoint value (e.g., `$indigo-500`) and use custom color functions to tint (lighten) or shade (darken) our colors via Sass’s mix() color function.

<div class="vstack gap-6">
    {%- for group in colors.global -%}
    <div class="d-flex align-items-center flex-wrap">
        <div class="w-20 flex-shrink-0">
            <h6>{{ group.name | capitalize }}</h6>
        </div>
        <div class="d-flex gap-2">
            {%- for i in range(1, 10) -%}
            <div class="h-12 w-16 d-inline-flex flex-column align-items-center justify-content-center rounded-2 bg-{{ group.name }}-{{ [i, '00'] | join }}">
                <span class="d-block mt-1 text-xs font-bold text-white text-opacity-90">{{ [i, '00'] | join }}</span>
            </div>
            {%- endfor -%}
        </div>
    </div>
    {%- endfor -%}
</div>

### Changing default values

When you do need to customize your palette, you can configure your base colors which will automatically create a complete suite of colors. Be sure to monitor contrast ratios as you customize colors.

All variables in the `$colors` map are defined as standalone variables. To modify an existing color in our `$colors` map, add the following to your custom Sass file:

```scss
$blue:    #3b6eff;
$indigo:  #6366F1;
$purple:  #5F1F7A;
$pink:    #FF92AE;
$red:     #F16063;
$orange:  #F7936F;
$yellow:  #fdb813;
$green:   #66CB9F;
$teal:    #4DD9CB;
$cyan:    #68DBF2;
```

---

## Theme colors

We use a subset of all colors to create a smaller color palette for generating color schemes, also available as Sass variables. This enables more comprehensive customization and extension for any project.

### Available theme colors

<div class="d-flex gap-2 flex-wrap">
    {%- for item in colors.theme -%}
    <div class="my-2">
        <div class="h-20 w-40 d-inline-flex flex-column align-items-center justify-content-center rounded-2 bg-{{ item.name }}">
            <span class="d-block mt-1 text-xs font-bold text-uppercase text-white text-opacity-90">{{ item.hex }}</span>
        </div>
        <div class="pt-1">
            <span class="d-block text-sm font-semibold font-code">${{ item.name }}</span>
        </div>
    </div>
    {%- endfor -%}
</div>

### Changing theme colors

Since now we have a pre-defined color palette it is easy to change the default theme colors just by swaping the default value. You can use the variable below for customization.

```scss
$primary:       $indigo;
$secondary:     $gray-300;
$tertiary:      $pink;
$neutral:       $white;
$success:       $green;
$info:          $cyan;
$warning:       $orange;
$danger:        $red;
$light:         $gray-200;
$dark:          $gray-900;
```

---

## Gray colors

### Available gray colors

Each gray color has a specific use in our themes. Some of them are used for backgrounds, some of them are used for component properties or text colors.

<div class="vstack gap-6">
    {%- for group in colors.grays -%}
    <div class="d-flex align-items-center">
        <div class="d-flex gap-2 flex-wrap">
            {%- for i in range(1, 10) -%}
            <div>
                <div class="h-20 w-40 d-inline-flex flex-column align-items-center justify-content-center rounded-2 bg-{{ group.name }}-{{ [i, '00'] | join }}">
                    <span class="d-block mt-1 text-xs font-bold {{ 'text-dark' if i < 4 else 'text-white' }} text-opacity-90">{{ [i, '00'] | join }}</span>
                </div>
            </div>
            {%- endfor -%}
        </div>
    </div>
    {%- endfor -%}
</div>

### Changing gray colors

Inside the variables file you will find the pre-defined gray colors and Sass map. Here’s an example of the variables used:

```scss
$gray-50:  #FAFAFA;
$gray-100: #F7FAFC;
$gray-200: #EDF2F7;
$gray-300: #E2E8F0;
$gray-400: #CBD5E0;
$gray-500: #A0AEC0;
$gray-600: #718096;
$gray-700: #425466;
$gray-800: #2D3748;
$gray-900: #1A202C;
```

---

## Typography

### Headings

All HTML headings, `<h1>` through `<h6>`, are available.

<div class="docs-example bg-surface-secondary rounded p-7">
    <h1 class="py-3">h1. This is a heading</h1>
    <h2 class="py-3">h2. This is a heading</h2>
    <h3 class="py-3">h3. This is a heading</h3>
    <h4 class="py-3">h4. This is a heading</h4>
    <h5 class="py-3">h5. This is a heading</h5>
    <h6 class="py-3">h6. This is a heading</h6>
</div>

```html
<h1>h1. This is a heading</h1>
<h2>h2. This is a heading</h2>
<h3>h3. This is a heading</h3>
<h4>h4. This is a heading</h4>
<h5>h5. This is a heading</h5>
<h6>h6. This is a heading</h6>
```

`.h1` through `.h6` classes are also available, for when you want to match the font styling of a heading but cannot use the associated HTML element.

<div class="docs-example bg-surface-secondary rounded p-7">
    <p class="h1 py-3">h1. This is a heading</p>
    <p class="h2 py-3">h2. This is a heading</p>
    <p class="h3 py-3">h3. This is a heading</p>
    <p class="h4 py-3">h4. This is a heading</p>
    <p class="h5 py-3">h5. This is a heading</p>
    <p class="h6 py-3">h6. This is a heading</p>
</div>

```html
<p class="h1">h1. This is a heading</p>
<p class="h2">h2. This is a heading</p>
<p class="h3">h3. This is a heading</p>
<p class="h4">h4. This is a heading</p>
<p class="h5">h5. This is a heading</p>
<p class="h6">h6. This is a heading</p>
```

### Display headings

Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to stand out, consider using a display heading—a larger, slightly more opinionated heading style.

<div class="docs-example bg-surface-secondary rounded p-7">
    <h1 class="display-1 py-3">Display 1</h1>
    <h2 class="display-2 py-3">Display 2</h2>
    <h3 class="display-3 py-3">Display 3</h3>
    <h4 class="display-4 py-3">Display 4</h4>
    <h5 class="display-5 py-3">Display 5</h5>
    <h6 class="display-6 py-3">Display 6</h6>
</div>

```html
<h1 class="display-1">Display heading</h1>
<h1 class="display-2">Display heading</h1>
<h1 class="display-3">Display heading</h1>
<h1 class="display-4">Display heading</h1>
<h1 class="display-5">Display heading</h1>
<h1 class="display-6">Display heading</h1>
```

### Lead

Make a paragraph stand out by adding `.lead`.

<div class="docs-example bg-surface-secondary rounded p-7">
    <p class="lead">
        This is a lead paragraph. It stands out from regular paragraphs.
    </p>
</div>

```html
<p class="lead">
    This is a lead paragraph. It stands out from regular paragraphs.
</p>
```
