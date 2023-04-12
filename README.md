# Time

> [My](https://egstad.com) personal [horilogical](https://en.wikipedia.org/wiki/Horology) experiment.
> [![Netlify Status](https://api.netlify.com/api/v1/badges/a4ccd1aa-76a1-4174-a164-900f78d519b9/deploy-status)](https://app.netlify.com/sites/horilogy/deploys)

## Built with:

- [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction)
- [Day.js documentation](https://day.js.org/docs/en/installation/installation)

## Setup

Make sure to install the dependencies:

```bash
# step 1: use proper node version
# if you use nvm, like me, run this:
nvm use

# step 2: install depenencies (
# i use npm. but use whatever package manager you prefer, babe.
npm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## How to add a new time unit

1. Create a new `.vue` component (`./components/time-[UNIT_NAME].vue`). Important to note you must use the `time-` prefix here!
2. Register the new `[UNIT_NAME]` within the `timeUnitsSupported` array found within `./store/time`. Doing this will add it into the site-wide navigation.
3. Voila. That's it!

### Standard units

`Day.js`, the library that handles most all of the time logic throughout the app, has some pretty handy methods for comparing `now` against any unit you can dream up. For standard units like second, minute, hour, etc., you can use `endOf()`. Check out `./components/time-month.vue` for an example.

### Nonstandard units

For non-standard units - say for example, a `scaramucci` (10 days) – we take a more hands-on approach. First, we figure out how many milliseconds long that time unit is. In this case we use a handy lil function that converts days to milliseconds called `daysToMsec`. We then compare `now` against that time unit duration. Check out `./components/time-scaramucci.vue` for an in-depth example.

## How to add a new visualization

1. Create a new `.vue` component (`./components/visualizations/[NAME].vue`). Important to note you must include this within the `visualizations` directory!
2. Register the new `[NAME]` within the `styleList` array found within `./store/ui`. Doing this will add it into the site-wide navigation.
3. Voila. That's it!

## Todo

- Add "punct" : 15mins
- Add QUADRANT: 6 hours
- Add MILEWAY: 20mins
- Add LOTR Trilogy: 11.4hrs
- Pregnancy: 280days

- Life expectancy: 73.16years
- Methuselah: 969years

# Inputs

- [Time scale](https://en.wikipedia.org/wiki/Time_scale)

# Add later

- [Traditional Chinese timekeeping](https://en.wikipedia.org/wiki/Traditional_Chinese_timekeeping)
- [Hindu units of time](https://en.wikipedia.org/wiki/Hindu_units_of_time)
- [Roman timekeeping](https://en.wikipedia.org/wiki/Roman_timekeeping)
- [Thai six-hour clock](https://en.wikipedia.org/wiki/Thai_six-hour_clock)
