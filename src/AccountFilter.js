import React from 'react';
import './App.css';

class AccountFilter extends React.Component {

  constructor(props) {
    super(props);
    this.changeOption = this.changeOption.bind(this);
  }

  changeOption(e) {
    let val = e.target.value;
    this.props.changeOption(val);
  }

  render() {
    let selectedOption = this.props.account;
    let options = [];
    if (this.props.accounts) {
      let accounts = this.props.accounts; 
      Object.keys(accounts).forEach(function(key) {
        options.push(<optgroup key={key} label={accounts[key]['accountName']}><option key={key} value={accounts[key]['accountId']}>{accounts[key]['accountId']}</option></optgroup>);
      });
      options.unshift(<option key="all" value="">All accounts</option>);
    }
    return (
      <div className="filter-options">
        <h5>Account</h5>
        <select id="account" value={selectedOption} onChange={this.changeOption}>
        {options}
        </select>
      </div>
    );
  }
};

export default AccountFilter;
