import { type PluginContract } from '@nintex/form-plugin-contract';

export const config: PluginContract = {
	controlName: '__pluginControlName__',
	groupName: '__pluginGroupName__',
	fallbackDisableSubmit: false,
	description: 'Date Picker',
	version: '1.0',
	properties: {
		color: {
			type: 'string',
			title: 'Text Color',
		},
		message: {
			type: 'string',
			title: 'Your message to the world',
		},
	},
	standardProperties: {
		fieldLabel: false,
		description: false,
		defaultValue: false,
		readOnly: false,
	},
};
