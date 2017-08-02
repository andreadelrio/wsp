import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

var AccountFilter = createClass({

  displayName: 'SelectField',
  propTypes: {
    label: PropTypes.string,
  },
  getInitialState () {
    return {
      disabled: false,
      options: this.props.accounts,
      value: null,
    };
  },

  changeOption(value) {
    this.setState({ value });
    this.props.changeOption(value);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.clear) {
      this.setState({
        value: null 
     });
    }
  },


  render() {

    return (
      <div className="section">
        <h5 className="section-heading">Account</h5>
        <Select simpleValue clearable={false} disabled={this.state.disabled} value={this.state.value} placeholder="Select account" options={this.props.accounts} onChange={this.changeOption} />
      </div>
    );
  }
});

export default AccountFilter;
