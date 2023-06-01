# Minidenticons

Super lightweight SVG identicon generator. No dependencies.

![minified + brotlied size](https://badgen.net/badgesize/brotli/laurentpayot/minidenticons/main/no-custom-element.min.js)
![minified + zipped size](https://badgen.net/badgesize/gzip/laurentpayot/minidenticons/main/no-custom-element.min.js)
<sup>(using the `minidenticon()` function only)</sup>

![minified + brotlied size](https://badgen.net/badgesize/brotli/laurentpayot/minidenticons/main/minidenticons.min.js)
![minified + zipped size](https://badgen.net/badgesize/gzip/laurentpayot/minidenticons/main/minidenticons.min.js)
<sup>(using the included custom element)</sup>

[![dependencies](https://badgen.net/bundlephobia/dependency-count/minidenticons)](https://bundlephobia.com/package/minidenticons)
[![types](https://badgen.net/npm/types/minidenticons)](https://github.com/laurentpayot/minidenticons/blob/main/index.d.ts)
[![npm](https://badgen.net/npm/v/minidenticons)](https://www.npmjs.com/package/minidenticons)
[![license](https://badgen.net/github/license/laurentpayot/minidenticons)](https://github.com/laurentpayot/minidenticons/blob/main/LICENSE)

[![Minidenticons](img/minidenticons.png)](https://laurentpayot.github.io/minidenticons/)

## Why

- Generate identicons (pixelated avatars) on the client from usernames instead of fetching images from a server. Much faster, saves bandwidth and [GDPR compliant](https://gdpr.eu/eu-gdpr-personal-data/)!
- Replace dull "initials" avatars by an easily remembered graphical avatar
- Give a visual representation of hashes or any ID string

## Live Demo :video_game:

Play with it [here](https://laurentpayot.github.io/minidenticons/).

## Basic usage with the included custom element

Minidenticons uses [ES modules](https://jakearchibald.com/2017/es-modules-in-browsers/), now [widely supported](https://caniuse.com/es6-module) in browsers. Import the `minidenticonSvg` custom element from the `minidenticons.min.js` file. This file can be located in a CDN (example below) or copied in any directory of your website (for better performance and to be GDPR compliant, since you don’t have to connect to a third party server).

```html
<script type="module">
  import { minidenticonSvg } from 'https://cdn.jsdelivr.net/npm/minidenticons@4.0.0/minidenticons.min.js'
</script>
```

Then simply use `minidenticon-svg` tags with a `username` attribute :joy:

```html
<minidenticon-svg username="alienHead66"></minidenticon-svg>
```

For instance with the `alienHead66` username you will get the following identicon (without the border):
<table><tr><td>
<img src="img/alienHead66.svg" alt="alienHead66 identicon" width="150" height="150">
</td></tr></table>

- Note that the picture above is resized. By default custom elements identicons will take [all the space available.](https://raw.githubusercontent.com/laurentpayot/minidenticons/main/img/alienHead66.svg)

- The white space around the colored squares is here to allow uncropped circle avatars like the ones you can see in [the demo](https://laurentpayot.github.io/minidenticons/).

- Custom element identicons are [memoized](https://en.wikipedia.org/wiki/Memoization) (stored in memory so that it does not need to be recalculated).

- Like for all elements except [void elements](https://html.spec.whatwg.org/multipage/syntax.html#void-elements), the closing tag `</minidenticon-svg>` is required.

By default the color saturation is set to 95% and the lightness is set to 45%. But you can change these values with the `saturation` and/or `lightness` attributes, for instance:

```html
<minidenticon-svg username="alienHead66" saturation="60" lightness="50"></minidenticon-svg>
```

Play with [the demo](https://laurentpayot.github.io/minidenticons/) to find a combination of saturation and lightness that matches your website theme colors: light, dark, pastel or whatever :sunglasses:

![Minidenticons light](img/minidenticons_light.png)
![Minidenticons dark](img/minidenticons_dark.png)
![Minidenticons pastel](img/minidenticons_pastel.png)

## Advanced usage with the `minidenticon()` function

Instead of using the custom element, you can also use the `minidenticon()` function to generate SVG strings in your client (or your server).

```typescript
minidenticon(seed: string, saturation?: number|string, lightness?: number|string): string
```

The `minidenticon()` function will return a SVG string generated from its seed string argument. The seed argument can be a username, but actually any string used as an identifier. That is why the argument name `seed` was preferred to `username`.
Optional saturation and lightness arguments should be percentages; that is, numbers (or strings) between 0 and 100.

Note that the `minidenticon()` function itself is *not* memoized.

### NodeJS

Be sure to use a NodeJS version greater or equal to **15.14.0**.

#### Installation

```bash
npm install minidenticons
```

#### Import

```javascript
import { minidenticon } from 'minidenticons'
```

The `minidenticonSvg` custom element should be tree-shaken from your bundle, for an even smaller size of minidenticons :grin:

### React

The following [React component example](https://codepen.io/laurentpayot/pen/RweNNQR) inserts the identicon into an `img` tag `src` attribute. It also uses React `useMemo` to memoize the identicon.

```jsx
import { minidenticon } from 'minidenticons'
import { useMemo } from 'react'

const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  )
  return (<img src={svgURI} alt={username} {...props} />)
}
```
You can then use this component with `img` props such as `width` and `height` along with minidenticons ones. All props except `username` are optional.

```html
<MinidenticonImg username="alienHead66" saturation="90" width="150" height="150" />
```
For a TypeScript version of this example see the [original issue comment](https://github.com/laurentpayot/minidenticons/issues/2#issuecomment-1485545388) by [Dan Yishai](https://github.com/danyi1212).

### Workbox

In this example using [Workbox](https://developer.chrome.com/docs/workbox/), images with a path ending with `identicons/<username>.svg` are generated by the service worker and cached for one year.

```javascript
import { minidenticon } from 'minidenticons'
import { registerRoute } from 'workbox-routing'

registerRoute(
  /identicons\/[^\/]+\.svg$/,
  async ({ url }) => {
    const username = url.pathname.match(/([^\/]+)\.svg$/)[1]
    return new Response(
      identicon(username),
      { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "max-age=31536000" } }
    )
  }
)
```

## Elm

For [Elm](https://elm-lang.org/) enthusiasts there is a Minidenticons package on the Elm package repository: [`minidenticons-elm`](https://package.elm-lang.org/packages/laurentpayot/minidenticons-elm/latest).

## Collisions

You will always get the same identicon for a given username. But it is not impossible to have different usernames with the same identicon. That's a [collision](https://en.wikipedia.org/wiki/Hash_collision).

Generated identicons are 5×5 pixels large with vertical symmetry, and can have 12 different hues for the same saturation and lightness.
This means there are 2<sup>(3×5)</sup> × 12 = 393,216 different identicons possible, but duplicate identicons are inevitable when using a lot of them. It shouldn’t matter as identicons should not be used solely to identify an user, and should always be coupled to a *unique* username :wink:

The `npm test` command results below show that you have roughly a 5% chance to generate a duplicate identicon when already using 10,000 of them.

```text
0 collisions out of 100 (0.00%)
0 collisions out of 200 (0.00%)
1 collisions out of 300 (0.33%)
1 collisions out of 400 (0.25%)
1 collisions out of 500 (0.20%)
2 collisions out of 600 (0.33%)
3 collisions out of 700 (0.43%)
3 collisions out of 800 (0.38%)
5 collisions out of 900 (0.56%)
5 collisions out of 1000 (0.50%)
24 collisions out of 2000 (1.20%)
54 collisions out of 3000 (1.80%)
91 collisions out of 4000 (2.27%)
133 collisions out of 5000 (2.66%)
180 collisions out of 6000 (3.00%)
245 collisions out of 7000 (3.50%)
313 collisions out of 8000 (3.91%)
397 collisions out of 9000 (4.41%)
493 collisions out of 10000 (4.93%)
```

## Performance

Minidenticons are *fast*.

### Custom element benchmark

To see how long it takes for your browser to generate 100 identicon custom elements (for a big page) try out the [online browser benchmark](https://laurentpayot.github.io/minidenticons/benchmark/browser.html).

### NodeJS benchmark

Simply run `node benchmark/node` at the root of a Minidenticons git clone.

On my machine I get the following result:

```
Time to generate 5000 identicon SVG strings for 15 characters random usernames:
7 milliseconds (10 runs average)
```

## License

[MIT](https://github.com/laurentpayot/minidenticons/blob/main/LICENSE)

## Stargazers :heart:

[![Stargazers repo roster for @laurentpayot/minidenticons](https://reporoster.com/stars/laurentpayot/minidenticons)](https://github.com/laurentpayot/minidenticons/stargazers)
