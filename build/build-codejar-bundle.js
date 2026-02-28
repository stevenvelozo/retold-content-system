#!/usr/bin/env node
/**
 * Build script to bundle CodeJar + highlight.js into a single browser-compatible file.
 * Run: node build/build-codejar-bundle.js
 *
 * This creates html/codejar-bundle.js which exposes window.CodeJarModules
 * with { CodeJar, hljs }.
 */
const { build } = require('esbuild');
const path = require('path');

const tmpProjectRoot = path.join(__dirname, '..');

build(
{
	entryPoints: [path.join(__dirname, 'codejar-entry.js')],
	bundle: true,
	outfile: path.join(tmpProjectRoot, 'html', 'codejar-bundle.js'),
	format: 'iife',
	globalName: 'CodeJarModules',
	platform: 'browser',
	target: ['es2018'],
	minify: true
}).then(() =>
{
	console.log('CodeJar + highlight.js bundle built successfully -> html/codejar-bundle.js');
}).catch((pError) =>
{
	console.error('Build failed:', pError);
	process.exit(1);
});
