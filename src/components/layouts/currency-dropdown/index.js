import React, {Component} from 'react';
import "./styles.scss";
import {AVAILABLE_CURRENCIES} from "./constants";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";


class CurrencyDropdownLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentCurrencyFlag: AVAILABLE_CURRENCIES[0]["flag"],
            currentCurrencyName: AVAILABLE_CURRENCIES[0]["name"]
        };

        this.handleCurrentCurrency = this.handleCurrentCurrency.bind(this);
    }

    componentDidMount(): void {
        if(this.props.currencyExchangeData.to !== "USD"){
            const currency = AVAILABLE_CURRENCIES.find(item => item.name === this.props.currencyExchangeData.to);
            this.setState({
                currentCurrencyFlag: currency.flag,
                currentCurrencyName: currency.name
            })
        }
    }

    handleCurrentCurrency(event) {
        const currency = AVAILABLE_CURRENCIES.find(item => item.name === event.target.value);
        this.setState({
            currentCurrencyFlag: currency.flag,
            currentCurrencyName: currency.name
        }, () => {
            this.props.currencyExchange({
                from: "USD",
                to: currency.name
            });
        })
    }

    render() {
        return (
            <div className="CurrencyDropdownLayout">
                <svg data-v-19e79a88=""
                     xmlns="http://www.w3.org/2000/svg"
                     width="100"
                     height="24"
                     viewBox="0 0 24 24"
                >
                    <path data-v-19e79a88=""
                          d="M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z"/>
                </svg>
                <img src={this.state.currentCurrencyFlag} alt={"flag"}/>
                <select value={this.state.currentCurrencyName} onChange={this.handleCurrentCurrency}>
                    <option value="USD">USD</option>
                    <option value="COP">COP</option>
                    {/*{*/}
                    {/*    AVAILABLE_CURRENCIES.map((item, index) => {*/}
                    {/*        return <option key={index} value={item.name}>{item.name}</option>*/}
                    {/*    })*/}
                    {/*}*/}
                </select>
            </div>
        );
    };

}

// Set propTypes
CurrencyDropdownLayout.propTypes = {};

// Set defaultProps
CurrencyDropdownLayout.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    currencyExchangeLoading: state.payments.currencyExchangeReducer.loading,
    currencyExchangeData: state.payments.currencyExchangeReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    currencyExchange: paymentsOperations.currencyExchange,
};

// Export Class
const _CurrencyDropdownLayout = connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdownLayout);
export {_CurrencyDropdownLayout as CurrencyDropdownLayout};
