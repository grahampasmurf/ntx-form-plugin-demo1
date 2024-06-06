import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import prompt from 'prompt';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const templates = {
	path: 'plugin.template',
	items: {
		main: 'plugin.hbs',
		config: 'plugin.config.hbs',
		styles: 'plugin.styles.hbs',
	},
};

const getTemplate = (key) =>
	Handlebars.compile(
		fs.readFileSync(
			path.join(__dirname, templates.path, templates.items[key]),
			'utf-8'
		)
	);

const promptSchema = {
	properties: {
		elementName: {
			description:
				'Specify the plugin element name. This is the name that you will use to register the plugin in your NAC tenant. Must contain only lower case characters and should have a preffix with a hyphen',
			pattern: /^[a-z]+-{1}(([a-z]+-?)+)$/,
			message: 'Plugin already exists, or invalid element name',
			required: true,
			conform(value) {
				return !fs.existsSync(path.join('./src/components', value));
			},
		},
		className: {
			description:
				'Specify the class name for the element. This is the TypeScript class that will be generated',
			pattern: /^[A-Z][a-zA-z]+$/,
			message:
				'Class name must start with an uppercase letter and only contain characters',
			required: true,
		},
		name: {
			description:
				'Specify the name of your plugin. This is the name that you will appear on your NAC toolbox',
			required: true,
		},
		description: {
			description: "Optional short description of the plugin's function",
			required: false,
		},
	},
};

const generate = (options) => {
	const pluginFolderPath = path.join('./src/components', options.elementName);
	const config = JSON.parse(fs.readFileSync('./src/config.json', 'utf-8'));
	fs.mkdirSync(pluginFolderPath);
	Object.keys(templates.items).forEach((key) => {
		const template = getTemplate(key);
		const result = template({
			elementName: options.elementName,
			className: options.className,
			description: options.description,
		});
		const fileName = templates.items[key]
			.replace('plugin', options.elementName)
			.replace('.hbs', '.ts');
		fs.writeFileSync(path.join(pluginFolderPath, fileName), result);
	});

	config.plugins[options.elementName] = options.name;
	fs.writeFileSync('./src/config.json', JSON.stringify(config));
};

prompt.start({ message: 'Generate plugin' });
prompt.get(promptSchema, (err, result) => generate(result));
