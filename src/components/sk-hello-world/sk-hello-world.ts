import { type PluginContract } from '@nintex/form-plugin-contract';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'lit-flatpickr';
import { config } from './sk-hello-world.config';
import { styles } from './sk-hello-world.styles';
import { addBootstrap } from '../../common/templates';

const localName = 'plugin-elementname';

@customElement(localName)
export class PageHighlight extends LitElement {
	static getMetaConfig = (): Promise<PluginContract> | PluginContract => config;

	static override styles = styles;

	getValue() {
		this.shadowRoot.querySelector('#my-date-picker').getValue();
	}

	@property({ type: String })
	declare color: string;

	@property({ type: String })
	declare message: string;

	@property({ type: String })
	declare theme: string;

	@property({ type: String })
	declare minDate: string;

	@property({ type: String })
	declare maxDate: string;

	override render() {
		return html`
			${addBootstrap()}
			<div>
				<h1>Your custom calendar date picker</h1>
				<span style="color: ${this.color}">${this.message}</span>
				<lit-flatpickr
					id="my-date-picker"
					altInput
					altFormat="F j, Y"
					dateFormat="Y-m-d"
					theme="${this.theme}"
					minDate="${this.minDate}"
					maxDate="${this.maxDate}"
				></lit-flatpickr>
			</div>
		`;
	}
}
