# :space_invader: Minidenticons

[20 LOC](https://github.com/laurentpayot/minidenticons/blob/main/minidenticons.js) svg identicon generator. Play with it [here](https://laurentpayot.github.io/minidenticons/) :smiley:

## Usage

```typescript
identicon(username: string): string
```

The `identicon` function will return a svg string generated from its username string argument.

### Browser

You can simply generate identicons on the client instead of fetching images from a server!

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

If you want to generate svg images on a server, be sure to use a NodeJS version greater or equal to **13.2.0** to support [ES modules](https://nodejs.org/api/esm.html).

#### Installation

```bash
npm install minidenticons
```

#### Import

```javascript
import { identicon } from 'minidenticons'

const svgStr = identicon("foobarbuz")
```

## TODO

- [] more tests
