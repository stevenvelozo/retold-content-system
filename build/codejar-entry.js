/**
 * CodeJar + highlight.js entry point for browser bundling.
 *
 * This file is bundled by esbuild into a single script that sets
 * window.CodeJar and window.hljs for the code editor.
 */
import { CodeJar } from 'codejar';
import hljs from 'highlight.js';

export { CodeJar, hljs };
