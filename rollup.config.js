import resolve from '@rollup/plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import path from 'path';
import { existsSync, readFileSync, readdirSync } from 'fs';
import replace from '@rollup/plugin-replace';
import eslint from '@rollup/plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';

/**
 * This is used to split out the individual Web components into there own js output
 *
 * @param {*} source The base folder to start serching
 * @returns a list of file paths that indicate the exported web component
 */
const elementNameSuffix = process.env.DEV ? '-dev' : '';
const configNameSuffix = process.env.DEV ? ' DEV' : '';
const getPrimaryComponent = (source) =>
	readdirSync(source, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => path.join(source, entry.name, `${entry.name}.ts`))
		.filter((x) => existsSync(x));

const tsconfig = JSON.parse(readFileSync('./tsconfig.json', 'utf8'));
const outputFolder = `${tsconfig.compilerOptions.outDir}/${
	process.env.DEV ? 'dev' : 'release'
}`;

const inputFolder = tsconfig.compilerOptions.rootDir;
const config = JSON.parse(readFileSync(`${inputFolder}/config.json`, 'utf8'));
const individualComponents = getPrimaryComponent(`${inputFolder}/components`);

/* Add more inputs if needed */
const additionalFiles = [];

const pluginElementName = (source) =>
	path.basename(source, source.includes('.config.ts') ? '.config.ts' : '.ts');
const pluginControlName = (source) =>
	config.plugins[pluginElementName(source)] ?? path.basename(source);
const pluginGroupName = () => config.group ?? 'My Plugins';

const resolvedString = (value, suffix) => `${value}${suffix}`;

export default [
	{
		input: [...additionalFiles, ...individualComponents],
		output: {
			format: 'es',
			chunkFileNames: `[name]${elementNameSuffix}-[hash].js`,
			entryFileNames: `[name]${elementNameSuffix}.js`,
			dir: outputFolder,
			sourcemap: !!process.env.DEV,
		},
		plugins: [
			cleaner({
				targets: [`${outputFolder}/`],
			}),
			resolve({
				extensions: ['.ts', '.js'],
				browser: true,
			}),
			commonjs({ include: ['node_modules/**'] }),
			replace({
				preventAssignment: true,
				'plugin-elementname': (source) =>
					resolvedString(pluginElementName(source), elementNameSuffix),
				__pluginControlName__: (source) =>
					resolvedString(pluginControlName(source), configNameSuffix),
				__pluginGroupName__: () =>
					resolvedString(pluginGroupName(), configNameSuffix),
			}),
			eslint(),
			babel({
				babelHelpers: 'bundled',
				extensions: ['.ts'],
				assumptions: { setPublicClassFields: true },
				presets: [
					[
						'@babel/preset-env',
						{
							shippedProposals: true,
							bugfixes: true,
						},
					],
					'@babel/preset-typescript',
				],
				plugins: [
					[
						'@babel/plugin-proposal-decorators',
						{ decoratorsBeforeExport: true },
					],
					['@babel/plugin-proposal-class-properties'],
				],
			}),
			!process.env.DEV && uglify(),
		],
	},
];
