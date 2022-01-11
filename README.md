# Minidenticons

Super lightweight SVG identicon generator. No dependencies.

![minified + brotlied size](https://badgen.net/badgesize/brotli/laurentpayot/minidenticons/main/minidenticons.min.js)
![minified + zipped size](https://badgen.net/badgesize/gzip/laurentpayot/minidenticons/main/minidenticons.min.js)
[![dependencies](https://badgen.net/bundlephobia/dependency-count/minidenticons)](https://bundlephobia.com/package/minidenticons)
[![types](https://badgen.net/npm/types/minidenticons)](https://github.com/laurentpayot/minidenticons/blob/main/index.d.ts)
[![npm](https://badgen.net/npm/v/minidenticons)](https://www.npmjs.com/package/minidenticons)
[![license](https://badgen.net/github/license/laurentpayot/minidenticons)](https://github.com/laurentpayot/minidenticons/blob/main/LICENSE)

[![Minidenticons](minidenticons.png)](https://laurentpayot.github.io/minidenticons/)

## Why

Generate identicons (pixelated avatars) on the client from usernames instead of fetching images from a server!

## Live Demo :video_game:

Play with it [here](https://laurentpayot.github.io/minidenticons/).

## On Browser

Minidenticons uses [ES modules](https://jakearchibald.com/2017/es-modules-in-browsers/), now [widely supported](https://caniuse.com/es6-module) in browsers.

Import the `identicon-svg` custom element from the `minidenticons.min.js` file. This file can be located in a CDN (example below) or copied in any directory of your website (for better performance, since you don’t have to connect to the CDN).

```html
<script type="module">
  import { identiconSvg } from 'https://unpkg.com/minidenticons@0.1.11/minidenticons.min.js'
</script>
```

Then simply use `identicon-svg` tags with an `username` attribute :joy:

```html
<identicon-svg username="Johnny5">
```

For instance with the `Johnny5` username you will get the following identicon (without the border):
<table><tr><td>
<img src="Johnny5.svg" alt="Johnny5 identicon" width="150" height="150">
</td></tr></table>

- Note that the picture above is resized. [By default identicons will take all the space available.](https://raw.githubusercontent.com/laurentpayot/minidenticons/main/Johnny5.svg)

- The white space around the colored squares is here to allow uncropped circle avatars like the ones you can see in the [demo](https://laurentpayot.github.io/minidenticons/).

Alternatively, instead of `identiconSvg`, you can also import the `identicon` function described in the NodeJS section below and use it to generate SVG strings in your browser.

## On NodeJS

Be sure to use a NodeJS version greater or equal to **13.2.0** to support [ES modules](https://nodejs.org/api/esm.html).

### Installation

```bash
npm install minidenticons
```

### Import

```javascript
import { identicon } from 'minidenticons'
```

### Usage

```typescript
identicon(username: string): string
```

The `identicon` function will return a SVG string generated from its username string argument.

## Collisions

You will always get the same identicon for a given username. But it is not impossible to have different usernames with the same identicon. That's a [collision](https://en.wikipedia.org/wiki/Hash_collision).

Generated identicons are 5×5 pixels large with vertical symmetry, and are of one of the 16 colors available.
This means there are 2<sup>(3×5)</sup>×16 = 524288 different identicons possible, but much less because of the modulo-based algorithm used to get more colored pixels at the center of the identicon instead of having them scattered. So duplicate identicons are inevitable when using a lot of them. It shouldn’t matter as identicons should not be used solely to identify an user, and should always be coupled to a *unique* username :wink:

The `npm test` command results below show that you have roughly a 10% chance to generate a duplicate identicon when already using 1000 of them.

```bash
0 collisions out of 100 (0.00%)
3 collisions out of 200 (1.50%)
7 collisions out of 300 (2.33%)
12 collisions out of 400 (3.00%)
18 collisions out of 500 (3.60%)
32 collisions out of 600 (5.33%)
48 collisions out of 700 (6.86%)
68 collisions out of 800 (8.50%)
81 collisions out of 900 (9.00%)
96 collisions out of 1000 (9.60%)
340 collisions out of 2000 (17.00%)
732 collisions out of 3000 (24.40%)
1214 collisions out of 4000 (30.35%)
1765 collisions out of 5000 (35.30%)
2335 collisions out of 6000 (38.92%)
2993 collisions out of 7000 (42.76%)
3676 collisions out of 8000 (45.95%)
4406 collisions out of 9000 (48.96%)
5189 collisions out of 10000 (51.89%)
```

## License

[MIT](https://github.com/laurentpayot/minidenticons/blob/main/LICENSE)
