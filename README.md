[![Minidenticons](minidenticons.png)](https://laurentpayot.github.io/minidenticons/)

# Minidenticons

[![npm bundle size](https://badgen.net/bundlephobia/minzip/minidenticons)](https://bundlephobia.com/result?p=minidenticons)
[![npm dependencies](https://badgen.net/david/dep/laurentpayot/minidenticons)](https://david-dm.org/laurentpayot/minidenticons)
[![npm version](https://badgen.net/npm/v/minidenticons)](https://www.npmjs.com/package/minidenticons)

Minimalist ([20 lines of code](https://github.com/laurentpayot/minidenticons/blob/main/minidenticons.js)) svg identicon generator.

## Why

Generate identicons (pixelated avatars) on the client from usernames instead of fetching images from a server!

## Demo :video_game:

Play with it [here](https://laurentpayot.github.io/minidenticons/).

## Usage

```typescript
identicon(username: string): string
```

The `identicon` function will return a svg string generated from its username string argument.

### Browser

Minidenticons uses [ES modules](https://jakearchibald.com/2017/es-modules-in-browsers/), now [widely supported](https://caniuse.com/es6-module) in browsers.
So you can directly import the `identicon` function from your CDN of choice, for instance:

```html
<script type="module">
  import { identicon } from 'https://cdn.jsdelivr.net/npm/minidenticons'

  const figure = document.createElement('figure')
  figure.innerHTML = identicon("foobarbuz")
  document.body.appendChild(figure)
</script>
```

Of course you can also import it from a local install on your website directory:

```javascript
import { identicon } from '/lib/minidenticons.js'
```

### NodeJS

Be sure to use a NodeJS version greater or equal to **13.2.0** to support [ES modules](https://nodejs.org/api/esm.html).

#### Installation

```bash
npm install minidenticons
```

#### Import

```javascript
import { identicon } from 'minidenticons'
```

## Collisions

Generated identicons are 5 pixels by 5 pixels with vertical symmetry, and are of one of the 16 colors available.
This means there are 2<sup>15</sup>×16 = 524288 different identicons possible, but much less because of the modulo-based algorithm used to get more colored pixels at the center of the identicon instead of having them scattered. So duplicate identicons are inevitable when using a lot of them. It shouldn’t matter as identicons should not be used solely to identify an user, and should always be coupled to a *unique* username :wink:

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
