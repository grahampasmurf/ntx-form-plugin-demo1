import { css } from 'lit';

export const styles = [
	css`
		:lit-flatpickr {
			cursor: pointer;
			font-size: 32px !important;
		}
		.form-control {
			color: var(--ntx-form-theme-color-text-input);
			background-color: var(
				--ntx-form-theme-color-field-and-modal,
				transparent
			);
		}
	`,
];
