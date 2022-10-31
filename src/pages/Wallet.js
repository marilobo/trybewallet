import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { thunkWalletAPI } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(thunkWalletAPI());
  }

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // walletReducer: state.wallet,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
