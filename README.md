# [kala.watch](https://kala.watch) [![Netlify Status](https://api.netlify.com/api/v1/badges/a4ccd1aa-76a1-4174-a164-900f78d519b9/deploy-status)](https://app.netlify.com/sites/horilogy/deploys)

> An interactive online tool that visualizes the passing of time.

## Technologies

- I use [Nuxt 3](https://nuxt.com/) as the frontend framework.
- [Pinia](https://pinia.vuejs.org/ssr/nuxt.html) is used to manage global state.
- To keep track of time and handle all the weird localization shit, I use [Day.js](https://day.js.org/). It rules.
- Some visualizations leverage [P5.js](https://p5js.org/).
- [GSAP](https://greensock.com/gsap/) is used for all sorts of UI animations.

## Setup

Make sure to install the dependencies:

```bash
# step 1: use proper node version (v18.5.0 at the time of this writing)
# if you use nvm, like me, run this:
nvm use

# step 2: install depenencies
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

## What's with the name?

Glad you asked. [Kāla](https://en.wikipedia.org/wiki/K%C4%81la) is a Sanskrit word that has fluid meanings and often refers to _"time"_, _"destiny"_, or _"fate"_. Other translations define Kala as _"an impersonal messenger of death"_. Gloomy as hell, I know... but we're mortals after all; time and death go hand in hand.

According to Monier-Williams, kāla's verbal root (kal) means "to calculate".

The name kala was ultimately chosen because this project is a time calulator, aka: a watch.

Now, look, I'd be lying if I said I knew all of this beforehand. Like most things, I stumbled across this meaningfully rich word serendipitously while researching various time units I could register within the app (one kālá corresponds to 144 seconds).

Anyhow. That's the story.

## Todo

- Add "punct" : 15mins
- Add QUADRANT: 6 hours
- Add MILEWAY: 20mins
- Add LOTR Trilogy: 11.4hrs
- Pregnancy: 280days
- Methuselah: 969years
- kālá: to 144 seconds

# Inputs

- [Time scale](https://en.wikipedia.org/wiki/Time_scale)

# Add later

- [Traditional Chinese timekeeping](https://en.wikipedia.org/wiki/Traditional_Chinese_timekeeping)
- [Hindu units of time](https://en.wikipedia.org/wiki/Hindu_units_of_time)
- [Roman timekeeping](https://en.wikipedia.org/wiki/Roman_timekeeping)
- [Thai six-hour clock](https://en.wikipedia.org/wiki/Thai_six-hour_clock)
