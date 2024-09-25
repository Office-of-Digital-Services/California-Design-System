# California Design System

[The infamous "garbanzo" test site](https://effective-garbanzo-re4lo11.pages.github.io/)

This is the Base Team repository for the upcoming California Design System. We can make this readme professional later. For now, here's what devs need to know.

## Grab it

There are currently two ways to grab the latest code from this repository.

* Check out the `dist` folder.
* Go to the [Releases](https://github.com/Office-of-Digital-Services/California-Design-System/releases) section of this repository.

We plan to support NPM- and CDN-based download options in the future.

## Source

All CSS and JavaScript source can be found in the `src` subfolders.

Bundle files are managed from `src/_bundles`.

## Pages

The `pages` folder is a place to bring all of the components together into full demos.

## Development

The repository currently uses [11ty](https://11ty.dev) for page previews. To run it...

1. Clone this repository.
2. Run `npm install`.
3. Run `npm run start`.
4. Point your browser to the URL that appears in the terminal, probably [localhost:8080](http://localhost:8080).

### Build the 11ty site

To build the 11ty site files, run `npm run build:site`. 

> This is useful for uploading to GitHub Pages.

### Build standalone bundle files

To build the CSS/JS bundle files, run `npm run build:bundles`. 

> This is useful for packaging activities, such as GitHub Releases, NPM, and CDN.

### Add a new component

To quickly scaffold a new component, run the `npm run new` command. 

> You'll need to wire your new component's CSS into the bundle file at `src/_bundles/bundle.css`.

