import { type PluginContract } from '@nintex/form-plugin-contract';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'lit-flatpickr';
import { config } from './sk-hello-world.config';
import { styles } from './sk-hello-world.styles';
import { addBootstrap } from '../../common/templates';

const fire = <T>(
	element: HTMLElement,
	data: {
		bubbles?: boolean;
		cancelable?: boolean;
		composed?: boolean;
		detail?: T;
	}
) => {
	const args = {
		bubbles: true,
		cancelable: false,
		composed: true,
		...data,
	};

	// the event name 'ntx-value-change' is required to tell the form engine to update the value
	const event = new CustomEvent('ntx-value-change', args);
	element.dispatchEvent(event);
	return event;
};

const localName = 'plugin-elementname';

@customElement(localName)
export class PageHighlight extends LitElement {
	static getMetaConfig = (): Promise<PluginContract> | PluginContract => config;

	static override styles = styles;

	// getValue() {
	// 	this.shadowRoot.querySelector('#my-date-picker').getValue();
	// }

	@property({ type: String })
	declare color: string;

	@property({ type: String })
	declare message: string;

	override render() {
		const today1string = new Date().toISOString().substring(0, 10);
		const bracketStart = '["';
		const bracketEnd = '"]';
		const today1brackets = bracketStart.concat(today1string, bracketEnd);
		return html`
			${addBootstrap()}
			<div>
				<span style="color: ${this.color}">${this.message}</span>
				<lit-flatpickr
					id="my-date-picker"
					altInput
					allowInput
					altFormat="m/d/Y"
					dateFormat="Y-m-d"
					theme="airbnb"
					minDate="2020-01"
					maxDate="2024-06-30"
					defaultDate=${today1brackets}
				></lit-flatpickr>
			</div>
		`;
	}

	private onChange() {
		const el = this.shadowRoot?.getElementById('my-date-picker');
		if (el) {
			fire<any>(this, { detail: el.innerHTML });
		}
	}
}
