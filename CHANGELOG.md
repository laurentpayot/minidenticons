# Minidenticons changelog

# 4.2.0

_2023-06-12_

### New features

- Added a custom hash function optional parameter to the `minidenticon()` function. The included custom element does not use this parameter.

# 4.1.0

_2023-06-03_

### New features

- Slightly decreased minified and compressed sizes

### Breaking Changes

- New smaller and simpler custom hash algorithm working just as good as the previous FNV-1a based one. The shape and color for a given seed have changed. Not bumping version to 5 as the version 4 was only released the day before.

# 4.0.0

_2023-06-02_

### New features

- 10 times less collisions
- SVG string generation is almost twice faster
- Slightly decreased minified and compressed sizes

### Breaking Changes

- New algorithm to get a lot more different identicons. For the same ~~username~~ *seed* the shape and color will change compared to previous versions.

- More vivid default colors. The default saturation is now 95%, and the default lightness is now 45%. The number of different colors was also reduced from 12 to 9 for easier distinction.

- Identicon function
  - call `minidenticon()` instead of  `identicon()`

- Custom element
  - import `minidenticonSvg` instead of `minidenticonSvg`
  - use tag `minidenticon-svg` instead of `identicon-svg`

## 3.1.2

_2023-04-14_

Reverted to v3.1.0 (custom element size optimization was canceling v3 performance gain)

## 3.1.1

_2023-04-14_

### New features

- Slightly decreased custom element size

### Documentation update

- Note about the `identicon()` function itself not being memoized

## 3.1.0

_2023-04-11_

### New features

- 12 hue colors instead of 18 for easier distinction and better looking but at the cost of more collisions.
- [Online custom element benchmark](https://laurentpayot.github.io/minidenticons/benchmark/browser.html)

### Breaking Changes

- The color for a given username has changed. But the shape inside the identicon stays the same. Not bumping version to 4 as the version 3 was only released the day before.

### Documentation update

- Custom element closing tag notice

## 3.0.0

_2023-04-10_

### New features

- Custom element performance
  - Fixed `attributeChangedCallback()` being called 3 times after `connectedCallback()`: 4 times faster!
  - identicon memoization (previous identicons are not recalculated)

### Breaking Changes

- NodeJS versions below 15.14.0 are not supported

### Documentation update

- Basic and advanced usage sections
- React example with SVG identicon inside `img` tag `src` attribute and React `useMemo` for memoization. See the [original issue comment](https://github.com/laurentpayot/minidenticons/issues/2#issuecomment-1485545388) by [Dan Yishai](https://github.com/danyi1212).

### Development

- Sticking to Terser version 5.16.2 for better minification results

## 2.0.2

_2023-03-22_

### Bug Fixes

- New exports syntax to calm TypeScript down when using `--moduleResolution bundler`

## 2.0.1

_2023-03-21_

### New features

- Built using the latest Terser version

### Documentation update

- GDPR notice
- Workbox example fix

## 2.0.0

_2022-11-27_

### Breaking change

- NodeJS versions below 14.0.0 are not supported

### New features

- Slightly reduced custom element size

## 1.0.4

_2022-11-25_

### New features

- Faster and smaller `identicon()` implementation
- Node and browser benchmark

### Documentation

- Framework integrations
  - React
  - Workbox
  - Elm
- Performance

## 1.0.3

_2022-03-03_

### Documentation update

- Version bump to update the npm readme

## 1.0.2

_2022-02-25_

### New features

- Slightly smaller minified + compressed size

## 1.0.1

_2022-02-11_

### New features

- Slightly smaller minified + compressed size

## 1.0.0

_2022-02-10_

### New features

- 18 different colors instead of 16 (less collisions)
- Saturation and lightness customization
- Smaller minified + compressed size

### Bug Fixes

- NodeJS tree shaking of `identiconSvg`


### Breaking Changes

- Compared to previous versions of Minidenticons, the color for a given username has changed. But the shape inside the identicon stays the same.

## 0.X.XX

Various experiments…
