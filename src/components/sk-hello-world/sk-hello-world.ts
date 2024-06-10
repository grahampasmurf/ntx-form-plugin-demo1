import { type PluginContract } from '@nintex/form-plugin-contract';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { config } from './sk-hello-world.config';
import { styles } from './sk-hello-world.styles';
import { addBootstrap } from '../../common/templates';

@customElement('plugin-elementname')
export class PageHighlight extends LitElement {
	static getMetaConfig = (): Promise<PluginContract> | PluginContract => config;

	static override styles = styles;

	@property({ type: String })
	declare color: string;

	@property({ type: String })
	declare message: string;

	override render() {
		return html`
			${addBootstrap()}
			<div>
				<h1>Hello0 w0rld!</h1>
				<span style="color: ${this.color}">${this.message}</span>
			</div>
		`;
	}
}
