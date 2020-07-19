# README.md

## DEMO

http://jakesalazar.com/demo/template-viewer


## Installation

Clone this repo:

`git clone git@bitbucket.org:jsalazar100/template-viewer.git`

CD into the project directory, then:

`$ npm install`

To start the server and begin development:

`$ npm run server`


----


## My Assumptions
* I struggled with of doing exactly as the requirements stated or deviating from the requirements.
* I struggled to determine if I should use the provided code as-is or try to get fancy update the layout (design, html, css).
* I chose to stick to the provided code as-is and make the least modifications possible.
* I thought alot about how to fetch the data. I know the requirements stated to use Express.js, but obtaining and serving these images can be done in several ways. 
    * I wondered if they should be served from disk (stored locally), or an S3 bucket (with cloudfront end-points), or a third-party API. I wondered alot about the overall app architecture and how that would influence the file storage options and api consumption.


## My Approach
* I tried to Keep It Simple, but I failed at first.
* I tried to be cool and learn React/Next.js for this assignment, but decided against this when I got stuck in JSX/Prop hell. Plus, I was really short on time.
* Going back to my keep it simple philosophy, I decided this project did not require a framework or library like React, Angular, or Vue because of the overhead and complexities these tools introduce. 

* Instead, I created an app with Javascript/ES6/SCSS and a build environment with Node, Webpack, and Babel.

* If your curious about how I did that, please see my instructions for this simplified setup.

* You may see this code and think, "he forgot to..", but I prefer to write the least amount of code necessary and not over-engineer upfront (plus stick to requirements). I prefer to refactor and polish the code/product overtime.

* I did the usual performance enhancements by caching selectors, limiting event listeners, etc.

* I stuck to naming conventions provided.
* I attempted a quick optimize for mobile.

* Initially, I could see spliting up this code into two components.
  * One for displaying a large image and details, and one for thumbnails.
    * The Large.component would be a stateless, dummy component.
    * The Thumbnails.component would be a stateful, smart component 
      * And, possible a third component for the previous/next buttons.
* For this SPA, I created a skeleton container from the HTML provided and then hydrated it with a data fetch onLoad.
* I package the code up in a single object to keep global clean.



## Changes to HTML/CSS
* updated head for additional meta tags 
* added id's for .group containers withing #large and .thumbnail containers
* added bundle.css for webpack output
* added bundle.js for webpack output
* changed to sass format
* added media queries for cheap mobile optimizations

----

# ES6, SCSS, Node, WebPack, Babel Setup

# How To Quickly Setup A Dev Environment using Node, Webpack, Babel for ES6 & SCSS

Use NPM as our Javascript package manager to automatically download and install all of your library needs.

## Create your project directory

`$ mkdir my-project && cd my-project`

Now you will type the rest of commands below from within this directory.

## Create index.html

`subl index.html if you use Sublime`

`OR code index.html if you use VSCode` 

`OR touch index.html from the command line`

Create this file inside your project directory and add a standard HTML container with `bundle.css and bundle.js` references as provided below.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
	  <meta charset="utf-8">
	  <title>Hola Mundo</title>
		<link rel="stylesheet" href="bundle.css">
	</head>
	<body>
		<h1>Hola Mundo!</h1>

		<script src="bundle.js" async></script>
	</body>
</html>
```

- Webpack will generate the CSS and JS files referenced in the index.html file.
- You will write and edit code within `app.js` and `app.scss` and Webpack will compile and transpile all of your files into `bundle.js` and `bundle.css`

## Create app.js

`subl app.js if you use Sublime`

`OR code app.js if you use VSCode` 

`OR touch app.js from the command line`

Create this blank file inside of your project directory. 

## Create app.scss

`subl app.scss if you use Sublime`

`OR code app.scss if you use VSCode` 

`OR touch app.scss from the command line`

Create this blank file inside of your project directory. 

## Create package.json

`$ npm init -y`

The command above will create your project **`package.json`** file inside of your project directory. 

If you don't use the `-y` flag to accept the default configurations, you will be prompted to answer several questions, which you can ignore by pressing <Enter>.

     You can install packages like this (anytime you need them...):

`$ npm install moment`

This command does two things — first, it downloads all the code from the moment.js package into a folder called node_modules. Second, it automatically modifies the ***package.json*** file to keep track of moment.js as a project dependency.

This is useful later when sharing a project with others — instead of sharing the node_modules folder (which can get very large), you only need to share the ***package.json*** file and other developers can install the required packages automatically with the command:

`$ npm install`

## Install Webpack

`$ npm install --save-dev webpack webpack-cli webpack-dev-server`

- Webpack is a JavaScript module bundler that automates the bundling of Javascript libraries and files.
- The --save-dev argument  saves it as a development dependency (in **`package.json`**), which means it’s a package that you need in your development environment but not on your production server.
- We’re installing three packages as dev dependencies
    - webpack which is the base/core webpack package
    - webpack-cli which enables you to use webpack from the command line
    - webpack-dev-server which is a simple web server with live reloading

## Install SCSS Dependencies

`$ npm install --save-dev css-loader sass-loader node-sass extract-loader file-loader autoprefixer postcss-loader`

- The CSS is generated by sass-loader, which compiles Sass files into CSS. The CSS is extracted into a `bundle.css` file by extract-loader.
- In order to add vendor-specific styles to the Sass files, we need to configure autoprefixer through PostCSS (see `webpack.config.js` below).

## Install Babel

`$ npm install --save-dev @babel/core @babel/preset-env babel-loader`

- Babel will transpile the modern Javascript you will be writing for cross-browser support.
- The JS is extracted into a `bundle.js` file by babel-loader.
- We’re installing three packages as devDependencies
    - @babel/core is the main part of babel
    - @babel/preset-env is a preset defining which new JavaScript features to transpile
    - babel-loader is a package to enable Babel to work with Webpack.

## Create and Configure webpack.config.js

`subl webpack.config.js if you use Sublime`

`OR code webpack.config.js if you use VSCode` 

`OR touch webpack.config.js from the command line`

Create this file inside of your project directory ******with the following contents.

```jsx
// webpack.config.js
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['./app.scss', './app.js'],
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
                sassOptions: {
                    includePaths: ['./node_modules'],
                },              
            },
          }
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

We will be writing code in ****`app.js` and Webpack will bundle this and any require/import statements it finds in this file to create a single output file `bundle.js`.

Your ***`index.html`*** file already has a reference to the file generated by Webpack:

`<script src="bundle.js" async></script>`

We configure Webpack to use ***babel-loader*** by adding the loader property and options object to the list of modules. 

If you want to save`app.js` in a js/ directory simply update your webpack.config.js like so:
Change the entry property to `'./js/app.js'` instead of entry: `'./app.js'`

```jsx
// webpack.config.js
module.exports = {
  entry: ['./css/app.scss', './js/app.js'],
  output: {
    filename: 'bundle.js',
  },
...
```

## Configure NPM Scripts (task runners)

Open your `package.json` file and add (or replace )the following contents to the SCRIPTS object.

```jsx
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --progress --mode=production",
    "watch": "webpack --progress --watch",
    "server": "webpack-dev-server --open"
  },
```

### RUNNING SCRIPTS

To run the ***build*** script:

`$ npm run build`

This will run Webpack (using configuration from the ***webpack.config.js*** we made earlier) with the `--progress` option to show the percent progress and the `--mode=production` option to minimize the code for production. 

This will produce `bundle.js` and `bundle.css` in the project directory. These contain the compiled CSS and transpiled JS, which you can then copy into a directory served by any web server.

To run the ***watch*** script:

`$ npm run watch`

This uses the `--watch` option instead to automatically re-run Webpack each time any JavaScript file changes, which is great for development.

To start your dev server and begin writing code:

`$ npm run server`

This will automatically open the **`index.html`** website in your browser with an address of `localhost:8080` (by default). Any time you change your Javascript in **`index.js`**, webpack-dev-server will rebuild its own bundled Javascript and refresh the browser automatically.