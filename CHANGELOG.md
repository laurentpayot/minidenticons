# Minidenticons changelog

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

Various experiments.
