'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

const mandelbrot = require('@frctl/mandelbrot'); // require the Mandelbrot theme module

// create a new instance with custom config options
const myCustomisedTheme = mandelbrot({
	skin: "black"
	// any other theme configuration values here
});

fractal.web.theme(myCustomisedTheme); // tell Fractal to use the configured theme by default

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Documentation');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));

//fractal.components.engine('@frctl/jade');

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */

fractal.web.set('static.path', path.join(__dirname, '../build/'));

fractal.components.set('default.preview', '@preview');

/*
 * Tell the Fractal the build folder
 */
fractal.web.set('builder.dest', __dirname + '/public');
