import React from 'react';
import API from "./api";

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

    return (
      <div></div>  
    )

  }

}

export default Dashboard;
