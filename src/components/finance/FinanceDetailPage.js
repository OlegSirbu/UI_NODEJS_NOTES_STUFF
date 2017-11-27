import React from 'react';
import {connect} from 'react-redux';
import { fetchFinance } from '../../actions/financeActions';

class FinanceDetailPage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      bank: Object.assign({}, this.props.bank)
    };
  }

  componentDidMount() {
    if(this.props.finance.organizations.length === 0) this.props.fetchFinance();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.bank.id !== nextProps.bank.id) {
      this.setState({bank:
        Object.assign({},
          nextProps.bank,
          {city: nextProps.finance.cities[nextProps.bank.cityId]}
        )
      });
    }
  }
  
  render() {
    const {bank} = this.state;
    return (
      <div>
        <h2>{bank.title}</h2>
        <div className="tableDetail row">
          <div><span>City - </span>{bank.city}</div>
          <div><span>Address - </span>{bank.address}</div>
          <div><span>Phone - </span>{bank.phone}</div>
          <div><span>USD - </span>sale {bank.currencies['EUR'].ask}  purchase {bank.currencies['EUR'].bid}</div>
          <div><span>EUR - </span>sale {bank.currencies['EUR'].ask}  purchase {bank.currencies['EUR'].bid}</div>
        </div>
      </div>
    )
  }
}

FinanceDetailPage.propTypes = {};

function getBankById(finance, id){
  const {organizations: banks, cities} = finance;
  const banksFiltered = banks.filter(bank => bank.id === id);
  banksFiltered[0].city = cities[banksFiltered[0].cityId];
  if(banksFiltered) return banksFiltered[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const {finance: {organizations: orgs}} = state;
  let bankId = ownProps.params.id;
  let bank = {
    title: '', phone: '', address: '', city: '',
    currencies: {
      EUR: {
        ask: '',bid: ''
      },
      USD: {
        ask: '',bid: ''
      }
    }
  };
  
  if(bankId && orgs.length > 0) bank = getBankById(state.finance, bankId);
  
  return {
    finance: state.finance,
    bank: bank
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchFinance: (params) => dispatch(fetchFinance(params))
});

export default connect(mapStateToProps,mapDispatchToProps)(FinanceDetailPage);