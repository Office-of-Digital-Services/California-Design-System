# California Design System

[The Design System test site](https://office-of-digital-services.github.io/California-Design-System/)

This is the Base Team repository for the upcoming California Design System. We can make this readme professional later. For now, here's what devs need to know.

## Grab it

There are currently three ways to grab the latest code from this repository. Take your pick.

- Check out the `dist` folder.
- Go to the [Releases](https://github.com/Office-of-Digital-Services/California-Design-System/releases) section of this repository.
- Fetch the [NPM package](https://www.npmjs.com/package/@cagovweb/design-system).

We plan to support CDN-based download options in the future.

### Install from NPM

From your JavaScript project folder, run the following.

```bash
npm install @cagovweb/design-system
```

For now, the files will be available in `node_modules/@cagovweb/design-system/dist`. 

> We'll make this more conventient as we learn more about how people want to consume this code from the NPM package.

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
