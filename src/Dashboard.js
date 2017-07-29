import React from 'react';
import API from "./api";
import Transactions from "./Transactions";

class Dashboard extends React.Component {

  componentDidMount() {
    let component = this;
    API.getData().then(function(data) {
      console.log(data,'data')
      component.setState({
        data: data.transactionData.transactions,
      });
    });
  }

  render() {

  let data;
  let state = this.state;
  
  if (state && state.data) {
    data = state.data;
  }  

    return (
      <div>
        <Transactions data={data} />
      </div>  
    )

  }

}

export default Dashboard;
