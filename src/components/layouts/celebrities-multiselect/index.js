import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {restCelebritiesOperations} from "../../../state/ducks/rest-celebrities";
import {connect} from "react-redux";
import "./styles.scss";
import Creatable from 'react-select/creatable';

class CelebritiesMultiselect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: [],
            options: []
        };
    }

    componentWillMount(): void {
        this.props.fetchCelebrities()
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (this.props.celebrities.length !== nextProps.celebrities.length) {
            const finalList = [];
            nextProps.celebrities.forEach(c => {
                const dateOfDeath = c.node.nodeProperties.find(p => p.propertyName === "DateOfDeath");
                if (dateOfDeath.propertyValue === "") {
                    finalList.push({
                        value: c.node.name,
                        label: c.node.name,
                    })
                }
            });
            this.setState({
                options: finalList
            });
        }
        if (nextProps.currentValue && !this.state.currentValue) {
            const values = nextProps.currentValue;
            const finalValue = [];
            values.forEach(v => {
                finalValue.push({
                    value: v,
                    label: v
                })
            });
            this.setState({
                selectedOption: finalValue
            });
        }
    }

    handleChange = selectedOption => {
        this.setState({selectedOption},
            () => {
                console.log(`Option selected:`, this.state.selectedOption);
                let fav_celebrities = [];
                if(this.state.selectedOption){
                    this.state.selectedOption.forEach(so => {
                        fav_celebrities.push(so.label)
                    });
                    this.props.onChange(fav_celebrities)
                }else{
                    this.props.onChange([])
                }
            }
        );
    };

    render() {
        const {selectedOption} = this.state;
        return (
            <div className="CelebritiesMultiselect">
                <Creatable
                    formatCreateLabel={(label) => 'Añadir a "' + label + '"'}
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.state.options}
                    isMulti={true}
                />
            </div>
        );
    };

}


// Set propTypes
CelebritiesMultiselect.propTypes = {
    celebrities: PropTypes.array,
};

// Set defaultProps
CelebritiesMultiselect.defaultProps = {
    celebrities: [],
    onSelect: () => {
    },
    onChange: () => {

    }
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.restCelebrities.fetchCelebritiesReducer.loading,
    isCompleted: state.restCelebrities.fetchCelebritiesReducer.completed,
    celebrities: state.restCelebrities.fetchCelebritiesReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    fetchCelebrities: restCelebritiesOperations.list,
};

// Export Class
const _CelebritiesMultiselect = connect(mapStateToProps, mapDispatchToProps)(CelebritiesMultiselect);
export {_CelebritiesMultiselect as CelebritiesMultiselect};
