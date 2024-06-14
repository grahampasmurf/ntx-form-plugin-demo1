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
		theme: {
			type: 'string',
			title: 'custom theme. Ex. material_orange or airbnb',
		},
		minDate: {
			type: 'string',
			title: 'Min Date. Ex. 2020-01',
		},
		maxDate: {
			type: 'string',
			title: 'Max Date. Ex. 2024-12-31',
		},
		defaultDate: {
			type: 'string',
			title: 'Default Date. Ex. ["2024-12-31"]',
		},
	},
	standardProperties: {
		fieldLabel: false,
		description: false,
		defaultValue: false,
		readOnly: false,
	},
};
