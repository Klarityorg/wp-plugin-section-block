import './style.scss';
import './editor.scss';

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {InnerBlocks, MediaUpload} = wp.editor;

const colorClasses = {
	'section-default': __('Theme\'s default background color'),
	'section-primary': __('Theme\'s primary color'),
	'section-secondary': __('Theme\'s secondary color'),
	'section-tertiary': __('Theme\'s tertiary color')
};

const widthClasses = {
	normal: 'Normal',
	'extra-width': 'Large'
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
		widthClass: {
			type: 'string',
			default: Object.keys(widthClasses)[0]
		},
		backgroundImage: {
			type: 'string',
			default: null
		}
	},

	edit: props => {
		let {attributes: {colorClass, widthClass, backgroundImage}, setAttributes} = props;

		const setWidthClass = event => {
			setAttributes({widthClass: event.target.value});
			event.preventDefault();
		};

		const setColorClass = event => {
			setAttributes({colorClass: event.target.value});
			event.preventDefault();
		};

		const setHasColorClass = event => {
			colorClass = event.target.checked ? Object.keys(colorClasses)[0] : null;
			backgroundImage = null;
			setAttributes({backgroundImage, colorClass});
		};

		const setHasNotColorClass = event => {
			colorClass = !event.target.checked ? Object.keys(colorClasses)[0] : null;
			setAttributes({colorClass});
		};

		const setBackgroundImage = imageObject => {
			backgroundImage = imageObject.url;
			setAttributes({backgroundImage});
		};

		return (
			<form onSubmit={event => {event.preventDefault();}}>
				<div className="form-group">
					<label>{__('Background')}:&nbsp;</label>
					<div className="form-group">
						<label>
							<input type="radio" name="backgroundType" value={!!colorClass} checked={!!colorClass}  onChange={setHasColorClass} />Color: {!!colorClass &&
						<select value={colorClass} onChange={setColorClass}>
							{Object.keys(colorClasses).map((colorClass) => (
								<option value={colorClass} selected>{colorClasses[colorClass]}</option>
							))}
						</select>}
						</label>
					</div>
					<div className="form-group">
						<label>
							<input type="radio" name="backgroundType" value={!colorClass} checked={!colorClass}  onChange={setHasNotColorClass} />Image: {!colorClass && <MediaUpload
							onSelect={setBackgroundImage}
							type="image"
							value={backgroundImage}
							render={({ open }) => (
								<span>
									<button onClick={open}>
										Select background
									</button>
									<small>{backgroundImage || 'No background image selected'}</small>
								</span>
							)}
						/>}
						</label>
					</div>

				</div>
				<div className="form-group">
					<label>{__('Width')}:&nbsp;
						<select value={widthClass} onChange={setWidthClass}>
							{Object.keys(widthClasses).map((widthClass) => (
								<option value={widthClass} selected>{widthClasses[widthClass]}</option>
							))}
						</select>
					</label>
				</div>
				<div className={"wp-block-klarity-section " + colorClass} style={{backgroundImage: (colorClass ? 'none' : 'url(' + backgroundImage + ')')}}>
					<InnerBlocks/>
				</div>
			</form>
		);
	},

	save: props => {
		let {attributes: {colorClass, widthClass, backgroundImage}} = props;
		return (
			<div className={[colorClass, widthClass, backgroundImage ? 'with-background' : ''].join(' ')} style={backgroundImage ? {backgroundImage: 'url("' + backgroundImage + '")'} : null}>
				<InnerBlocks.Content/>
			</div>
		);
	},
});
