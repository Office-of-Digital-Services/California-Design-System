# California Design System

This repository contains the early development work for California’s next design system. Code, components, and documentation are evolving, and the system is not yet ready for production use. Follow along as we build towards an Alpha release.

## Grab it

There are currently two ways to grab the latest code from this repository. Take your pick.

- Go to the [Releases](https://github.com/Office-of-Digital-Services/California-Design-System/releases) section of this repository.
- Fetch the [NPM package](https://www.npmjs.com/package/@cagovweb/design-system).

We plan to support CDN-based download options in the future.

### Install from NPM

From your JavaScript project folder, run the following.

```bash
npm install @cagovweb/design-system
```

For now, the files will be available in `node_modules/@cagovweb/design-system/dist`. 

> We'll make this more convenient as we learn more about how people want to consume this code from the NPM package.

## Source

All CSS and JavaScript source can be found in their respective `src` subfolders.

## Pages

The `pages` folder is a place to test your work.

## Development

The repository currently uses [11ty](https://11ty.dev) for page previews. To run it...

1. Clone this repository.
2. Run `npm install`.
3. Run `npm run start`.
4. Point your browser to the URL that appears in the terminal, probably [localhost:8080](http://localhost:8080).

### Build the 11ty site

To build the 11ty site files, run `npm run site`.

Files will be written to the `_site` folder.

> This is useful for uploading to GitHub Pages.

### Build standalone bundle files

To build the CSS/JS bundle files, run `npm run bundle`. 

Files will be written to the `dist` folder.

> This is useful for packaging activities, such as GitHub Releases, NPM, and CDN.

## Deprecated NPM packages

We previously published NPM packages in the `1.X.X` series. Since then, we decided to republish as beta in `0.X.X`. Therefore, several npm packages from the past work have been deprecated, to prevent stale downloads while we're still in beta. 

To bring those packages back and remove the deprecation warning, run the following command.

```sh
npm deprecate @cagovweb/design-system@1.1.0 ""
```

npm deprecate @cagovweb/design-system@1.6.0 "The Design System is currently in beta. This post-1.0 package is an artifact of past work. It does not represent the latest progress on this project."

The following package version numbers apply.

* 1.1.0
* 1.2.0
* 1.3.1
* 1.4.0
* 1.5.0
* 1.6.0

See more at [npm's deprecation page](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions).

## Early test site

[View the test site](https://office-of-digital-services.github.io/California-Design-System/)

This is just our sandbox. It’s where we try things out and preview work in progress. It’s not the finished product and doesn’t reflect the final design or content.
