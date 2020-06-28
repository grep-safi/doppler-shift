import React from 'react';
import SpikeRecord from './SpikeRecord';
import Controls from './Controls';

const WIDTH = 700;
const HEIGHT = 100;

const renderSpikes = () => {
    return (lineProps, index) => {
        const props = {
            x1: lineProps.x1,
            x2: lineProps.x2,
            y1: lineProps.y1,
            y2: lineProps.y2,
            stroke: lineProps.stroke,
            key: index,
        };
        return <line {...props} />;
    };
};

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.collisionSpikes = [];
        this.sourceSpikes = [];
        this.time = WIDTH;
        this.timeSpeed = 1;
    }

    componentDidMount() {

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.params.isAnimationEnabled) {
            if (prevProps.numCollisions !== this.props.numCollisions) {
                console.log(`# of collisions: ${this.props.numCollisions}`);
                this.collisionSpikes.push({
                    x1: WIDTH,
                    x2: WIDTH,
                    y1: HEIGHT / 2,
                    y2: (HEIGHT / 2) - 25,
                    strokeWidth: 2.5,
                    stroke: 'darkred'
                });
            }

            if (prevProps.circles !== this.props.circles) {
                this.sourceSpikes.push({
                    x1: WIDTH,
                    x2: WIDTH,
                    y1: HEIGHT / 2,
                    y2: (HEIGHT / 2) - 25,
                    strokeWidth: 2.5,
                    stroke: 'green'
                });
            }

            // If the line hasn't reached the other end yet, then increment it
            if (this.time >= 0) this.time -= this.timeSpeed;

            this.collisionSpikes.forEach((element, index) => {
                element.x1 -= this.timeSpeed;
                element.x2 -= this.timeSpeed;
            });

            this.sourceSpikes.forEach((element, index) => {
                element.x1 -= this.timeSpeed;
                element.x2 -= this.timeSpeed;
            });

            this.collisionSpikes = this.collisionSpikes.filter(element => element.x1 >= 0);
            this.sourceSpikes = this.sourceSpikes.filter(element => element.x1 >= 0);
        }
    }

    render() {
        return(
            <React.Fragment>
                <div className={"time-line"}>
                    <div className="wrapper">
                        <div className="box">
                            <SpikeRecord
                                title={'Waves as emitted from source'}
                                WIDTH={WIDTH}
                                HEIGHT={HEIGHT}
                                spikeArray={this.sourceSpikes}
                                time={this.time}
                            />

                            <SpikeRecord
                                title={'Waves as detected by observer'}
                                WIDTH={WIDTH}
                                HEIGHT={HEIGHT}
                                spikeArray={this.collisionSpikes}
                                time={this.time}
                            />
                        </div>
                        <div className="box">
                            <div className="controls-wrapper">
                                <Controls
                                    params={this.props.params}
                                    onChange={this.props.onChange}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}