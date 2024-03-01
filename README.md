# Minidenticons

Super lightweight SVG identicon generator. No dependencies.

![minified + brotlied size](https://badgen.net/badgesize/brotli/laurentpayot/minidenticons/main/no-custom-element.min.js)
![minified + zipped size](https://badgen.net/badgesize/gzip/laurentpayot/minidenticons/main/no-custom-element.min.js)
<sup>(using the `minidenticon()` function only)</sup>

![minified + brotlied size](https://badgen.net/badgesize/brotli/laurentpayot/minidenticons/main/minidenticons.min.js)
![minified + zipped size](https://badgen.net/badgesize/gzip/laurentpayot/minidenticons/main/minidenticons.min.js)
<sup>(using the included custom element)</sup>

<!--
[![dependencies](https://badgen.net/bundlephobia/dependency-count/minidenticons)](https://bundlephobia.com/package/minidenticons)
-->
[![dependencies](https://badgen.net/static/dependencies/None/green)](https://github.com/laurentpayot/minidenticons/blob/main/package.json#L60)
[![types](https://badgen.net/npm/types/minidenticons)](https://github.com/laurentpayot/minidenticons/blob/main/index.d.ts)
[![npm](https://badgen.net/npm/v/minidenticons)](https://www.npmjs.com/package/minidenticons)
[![license](https://badgen.net/github/license/laurentpayot/minidenticons)](https://github.com/laurentpayot/minidenticons/blob/main/LICENSE)

[<img src="img/minidenticons.svg" style="width:100%" alt="Minidenticons">](https://laurentpayot.github.io/minidenticons/)

## Why

- Generate identicons (pixelated avatars) on the client from usernames instead of fetching images from a server. Much faster, saves bandwidth and [GDPR compliant](https://gdpr.eu/eu-gdpr-personal-data/).
- Replace dull initial avatars like <sub><img src="img/initials.svg" alt="laurent identicon" width="24" height="24"></sub> by easily remembered graphical avatars.
- Give a visual representation of hashes or any ID string.

## Live Demo :video_game:

Play with it [here](https://laurentpayot.github.io/minidenticons/).

## Basic usage with the included custom element

Minidenticons uses [ES modules](https://jakearchibald.com/2017/es-modules-in-browsers/), now [widely supported](https://caniuse.com/es6-module) in browsers. Import the `minidenticonSvg` custom element from the `minidenticons.min.js` file. This file can be located in a CDN (example below) or copied in any directory of your website (for better performance and to be GDPR compliant, since you don’t have to connect to a third party server).

```html
<script type="module">
  import { minidenticonSvg } from 'https://cdn.jsdelivr.net/npm/minidenticons@4.2.1/minidenticons.min.js'
</script>
```

Then simply use `minidenticon-svg` tags with a `username` attribute :joy:

```html
<minidenticon-svg username="laurent"></minidenticon-svg>
```
<sup>(Note that like for all elements except [void elements](https://html.spec.whatwg.org/multipage/syntax.html#void-elements), the closing tag `</minidenticon-svg>` is required)</sup>

For instance with the `laurent` username you will get the following identicon (without the border):
<table><tr><td>
<img src="img/laurent.svg" alt="laurent identicon" width="120" height="120">
</td></tr></table>

### Styling

For easy CSS styling:

- Minidenticons are [SVG](https://en.wikipedia.org/wiki/SVG) images that will take [all the space available.](https://raw.githubusercontent.com/laurentpayot/minidenticons/main/img/laurent.svg) The picture above is resized.

- The background is transparent.
- There is white space around the colored square matrix to allow uncropped circle avatars.

So with the following CSS:
```css
minidenticon-svg svg {
  border-radius: 50%;
  background-color: grey;
  height: 48px;
  width: 48px;
};
```
You will get:

![Styled minidenticon](img/laurent-round.svg)


By default the color saturation is set to 95% and the lightness is set to 45%. But you can change these values with the `saturation` and/or `lightness` attributes, for instance:

```html
<minidenticon-svg username="laurent" saturation="60" lightness="50"></minidenticon-svg>
```

Play with [the demo](https://laurentpayot.github.io/minidenticons/) to find a combination of saturation and lightness that matches your website theme colors: light, dark or whatever :sunglasses:

![Minidenticons light](img/smileys-white.svg)
![Minidenticons dark](img/smileys-black.svg)
![Minidenticons weird](img/smileys-yellow.svg)

### Performance

- *Custom element* identicons are [memoized](https://en.wikipedia.org/wiki/Memoization) (stored in memory so that it does not need to be recalculated).
- To see how long it takes for your browser to generate 100 identicon custom elements (for a big page) try out the [online browser benchmark](https://laurentpayot.github.io/minidenticons/benchmark/browser.html).

## Advanced usage with the `minidenticon()` function

Instead of using the custom element, you can also use the `minidenticon()` function to generate SVG strings in your client (or your server).

```typescript
minidenticon(seed: string, saturation?: number|string, lightness?: number|string, hashFn?: (str: string) => number): string
```

The `minidenticon()` function will return a SVG string generated from its seed string argument. The seed argument can be a username, but actually any string used as an identifier.

Optional saturation and lightness arguments should be percentages; that is, numbers (or strings) between 0 and 100.

If you need to, you can use your own hash function as argument of the fourth parameter (optional). Your custom hash function must take a string and return a number. The last 15 bits of the integer part of the hash will be used to draw the squares. The included custom element does not use this last parameter.

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

#### Performance

The `minidenticon()` function is *fast*. You can see by yourself if you run `node benchmark/node` at the root of a Minidenticons git clone. On my machine I get the following result:

```
Time to generate 10000 minidenticon SVG strings for 15 characters random seeds:
8 milliseconds (10 runs average)
```
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
<MinidenticonImg username="laurent" saturation="90" width="150" height="150" />
```
For a TypeScript version of this example see the [original issue comment](https://github.com/laurentpayot/minidenticons/issues/2#issuecomment-1485545388) by [Dan Yishai](https://github.com/danyi1212).

### Workbox

In this example using [Workbox](https://developer.chrome.com/docs/workbox/), images with a path ending with `minidenticons/<username>.svg` are generated by the service worker and cached for one year.

```javascript
import { minidenticon } from 'minidenticons'
import { registerRoute } from 'workbox-routing'

registerRoute(
  /minidenticons\/[^\/]+\.svg$/,
  async ({ url }) => {
    const username = url.pathname.match(/([^\/]+)\.svg$/)[1]
    return new Response(
      minidenticon(username),
      { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "max-age=31536000" } }
    )
  }
)
```

## Rust

A [Rust](https://www.rust-lang.org/) port of Minidenticons was made by Théo Battrel: [`minidenticons-rs`](https://gitlab.com/Emplis/minidenticons-rs).

## Elm

For [Elm](https://elm-lang.org/) enthusiasts there is a Minidenticons package on the Elm package repository: [`minidenticons-elm`](https://package.elm-lang.org/packages/laurentpayot/minidenticons-elm/latest).

## Collisions

You will always get the same identicon for a given username. But it is not impossible to have different usernames with the same identicon. That's a [collision](https://en.wikipedia.org/wiki/Hash_collision).

Generated identicons are 5×5 matrices with vertical symmetry, and can have 9 different hues for the same saturation and lightness.
This means there are 2<sup>(3×5)</sup> × 9 = 294,912 different identicons possible, but duplicate identicons are inevitable when using a lot of them. It shouldn’t matter as identicons should not be used solely to identify an user, and should always be coupled to a *unique* username :wink:

The `npm test` command results below show that you have less than a 2 percent chance to generate a duplicate identicon when already using 10,000 of them.

```text
0 collisions out of 100 (0.00%)
0 collisions out of 200 (0.00%)
0 collisions out of 300 (0.00%)
0 collisions out of 400 (0.00%)
0 collisions out of 500 (0.00%)
0 collisions out of 600 (0.00%)
0 collisions out of 700 (0.00%)
0 collisions out of 800 (0.00%)
1 collisions out of 900 (0.11%)
1 collisions out of 1000 (0.10%)
8 collisions out of 2000 (0.40%)
14 collisions out of 3000 (0.47%)
22 collisions out of 4000 (0.55%)
37 collisions out of 5000 (0.74%)
58 collisions out of 6000 (0.97%)
75 collisions out of 7000 (1.07%)
99 collisions out of 8000 (1.24%)
129 collisions out of 9000 (1.43%)
163 collisions out of 10000 (1.63%)
```

## License

[MIT](https://github.com/laurentpayot/minidenticons/blob/main/LICENSE)

## Stargazers :heart:

[![Stargazers repo roster for @laurentpayot/minidenticons](http://reporoster.com/stars/laurentpayot/minidenticons)](https://github.com/laurentpayot/minidenticons/stargazers)
