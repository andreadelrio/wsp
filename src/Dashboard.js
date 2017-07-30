import React from 'react';
import API from "./api";
import Transactions from "./Transactions";
import AccountFilter from "./AccountFilter";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.filterByAccount = this.filterByAccount.bind(this);
    this.state = { account: "" };
  }

  componentDidMount() {
    let component = this;
    API.getData().then(function(data) {
      console.log(data,'data')
      component.setState({
        data: data.transactionData.transactions,
        accounts: data.accounts
      });
    });
  }

  filterByAccount(val) {
    this.setState({account: val});
  }

  render() {

  let data;
  let account;
  let accounts;
  let state = this.state;
  
  if (state && state.data) {
    data = state.data;
    account = state.account;
    accounts = state.accounts;
  }  

    return (
      <div>
        <AccountFilter 
          accounts={accounts}
          account={account}
          changeOption={this.filterByAccount} />
        <Transactions account={account} data={data} />
      </div>  
    )

  }

}

export default Dashboard;
