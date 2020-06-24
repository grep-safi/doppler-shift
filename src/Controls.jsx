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
                <input
                    className="btn btn-primary" 
                    name="isAnimationEnabled"
                    type="button" 
                    value={animationButtonValue}
                    onClick={this.handleButtonClick.bind(this)}
                />
                &nbsp;&nbsp;
                <label htmlFor="animationRate">Animation rate</label>
                <input
                    name="animationRate"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={this.props.params.animationRate}
                    onChange={this.handleSliderChange.bind(this)}
                />
                <br/>
                <input
                    className="btn btn-primary"
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
        if (e.target.name == 'isAnimationEnabled')
            buttonValue = this.props.params.isAnimationEnabled;
        if (e.target.name == 'isEmissionEnabled')
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


Controls.propTypes = {
    params: PropTypes.exact({
        animationRate: PropTypes.number.isRequired,
        isAnimationEnabled: PropTypes.bool.isRequired,
        isEmissionEnabled: PropTypes.bool.isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired
};
