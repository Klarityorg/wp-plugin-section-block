import './style.scss';
import './editor.scss';

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {InnerBlocks} = wp.editor;

const colorClasses = {
	'section-white': __('White (default)'),
	'section-primary': __('Theme\'s primary color'),
	'section-secondary': __('Theme\'s secondary color'),
	'section-tertiary': __('Theme\'s tertiary color')
};

registerBlockType('klarity/section-block', {
	title: __('Section block'),
	icon: 'admin-site',
	category: 'layout',

	attributes: {
		colorClass: {
			type: 'string',
			default: Object.keys(colorClasses)[0]
		},
		isLargeSection: {
			type: 'boolean',
			default: false
		}
	},

	edit: props => {
		let {attributes: {colorClass, isLargeSection}, setAttributes} = props;

		const setIsLargeSection = event => {
			setAttributes({isLargeSection: event.target.checked});
		};

		const setColorClass = event => {
			setAttributes({colorClass: event.target.value});
			event.preventDefault();
		};

		return (
			<div>
				<div className="form-group">
					<label>{__('Background color')}: </label>
					<select value={colorClass} onChange={setColorClass}>
						{Object.keys(colorClasses).map((colorClass) => (
							<option value={colorClass} selected>{colorClasses[colorClass]}</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label>
						<input type="checkbox" value={isLargeSection} onChange={setIsLargeSection}/>
						&nbsp;{__('Large section')}</label>
				</div>
				<div className={"wp-block-klarity-section " + colorClass}>
					<InnerBlocks/>
				</div>
			</div>
		);
	},

	save: props => {
		let {attributes: {colorClass, isLargeSection}} = props;
		return (
			<div className={colorClass + (isLargeSection ? ' extra-width' : '')}>
				<InnerBlocks.Content/>
			</div>
		);
	},
});
