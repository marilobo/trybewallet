import React from 'react';
// import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import '../css/container.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div className="central-container">
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
