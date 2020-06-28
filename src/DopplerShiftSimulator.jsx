import React from 'react';
import { render } from 'react-dom';
import NavigationBar from './NavigationBar.jsx';
import Timeline from './Timeline.jsx';
import Controls from './Controls.jsx';
import MainView from './MainView.jsx';

export default class DopplerShiftSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            parameters: {
                animationRate: 1,
                isAnimationEnabled: false,
                isEmissionEnabled: true
            }
            // might need to initialize some more variables
        };

        this.state = this.initialState;
    }

    render() {
        return(
            <React.Fragment>
                <div className="box">
                    <NavigationBar onReset={this.handleResetClick.bind(this)}/>
                </div>


                {/* <div className="wrapper">
                    <div className="controls-wrapper">
                        <Controls
                            params={this.state.parameters}
                            onChange={this.handleNewParameters.bind(this)}
                        />
                    </div>
                </div> */}

                <div className="main-view-wrapper">
                    <MainView
                        params={this.state.parameters}
                        onChange={this.handleNewParameters.bind(this)}
                    />
                </div>
            </React.Fragment>
        );
    }

    handleNewParameters(newParams) {
        this.setState({ parameters: newParams });
    }

    // handleNewSettings(newSettings) {
    //     this.setState({ settings: newSettings });
    // }

    handleResetClick(event) {
        event.preventDefault();
        this.setState(this.initialState);
    }
}