import React from 'react';
import PropTypes from 'prop-types';

export default class Controls extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let animationButtonValue = this.props.params.isAnimationEnabled ? 'Pause simulation' : 'Play simulation';
        let emissionButtonValue = this.props.params.isEmissionEnabled ? 'Stop emission' : 'Start emission';
        return(
            <React.Fragment>
                <h2>Controls</h2>
                <br/>
                <input
                    className="btn btn-primary" 
                    id="sim-button"
                    name="isAnimationEnabled"
                    type="button" 
                    value={animationButtonValue}
                    onClick={this.handleButtonClick.bind(this)}
                />
                <br/><br/>
                <label htmlFor="animationRate">Animation rate</label>
                <br/>
                <input
                    name="animationRate"
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.01"
                    value={this.props.params.animationRate}
                    onChange={this.handleSliderChange.bind(this)}
                />
                <br/><br/>
                <input
                    className="btn btn-primary"
                    id="sim-button"
                    name="isEmissionEnabled"
                    type="button"
                    value={emissionButtonValue}
                    onClick={this.handleButtonClick.bind(this)}  
                />
            </React.Fragment>
        );
    }

    handleButtonClick(e) {
        let buttonValue;
        if (e.target.name === 'isAnimationEnabled')
            buttonValue = this.props.params.isAnimationEnabled;
        if (e.target.name === 'isEmissionEnabled')
            buttonValue = this.props.params.isEmissionEnabled;

        this.props.onChange({
            ...this.props.params,
            [e.target.name]: !buttonValue
        });
    }

    handleSliderChange(e) {
        this.props.onChange({
            ...this.props.params,
            [e.target.name]: Number.parseFloat(e.target.value)
        });
    }

}
