import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			disabled: false,
			options: this.props.categories,
			value: [],
		};
	},

	handleSelectChange (value) {
		this.setState({ value });
		this.props.onSelectCategory(value);   
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.clear) {
		  this.setState({
		    value: [] 
		 });
		}
	},

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue disabled={this.state.disabled} value={this.state.value} placeholder="Select categories" options={this.props.categories} onChange={this.handleSelectChange} />
			</div>
		);
	}
});

export default MultiSelectField;
