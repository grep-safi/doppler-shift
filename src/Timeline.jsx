import React from 'react';

const WIDTH = 700;
const HEIGHT = 200;

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
        this.time = WIDTH;
        this.timeSpeed = 1;
    }

    componentDidMount() {
        // this.container = select(this.ref.current)
        //     .append('g');
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.numCollisions !== this.props.numCollisions) {
            console.log(`# of collisions: ${this.props.numCollisions}`);
            this.collisionSpikes.push({
                x1: WIDTH,
                x2: WIDTH,
                y1: HEIGHT / 2,
                y2: (HEIGHT / 2) - 15,
                stroke: 'pink'
            });
        }

        // If the line hasn't reached the other end yet, then increment it
        if (this.time >= 0) this.time -= this.timeSpeed;
        this.collisionSpikes.forEach((element, index) => {
            element.x1 -= this.timeSpeed;
            element.x2 -= this.timeSpeed;
        });

        this.collisionSpikes = this.collisionSpikes.filter(element => element.x1 >= 0);
    }

    render() {
        return(
            <React.Fragment>
                <div className={"time-line"}>
                    <p>Waves as detected by observer</p>
                    <div className={'observer-detection'}>
                        <svg width={WIDTH} height={HEIGHT}>
                            <g> {this.collisionSpikes.map(renderSpikes())} </g>
                            <line x1={WIDTH} y1={HEIGHT / 2} x2={this.time} y2={HEIGHT / 2} stroke={'red'}></line>
                        </svg>                       
                    </div>
                    {/*<p>Waves as detected by observer</p>*/}
                </div>
            </React.Fragment>
        );
    }
}