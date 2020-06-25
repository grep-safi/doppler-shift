import React from 'react';

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

export default (props) => {
    return (
    <React.Fragment>
        <div className={"time-line"}>
            <p>Waves as detected by observer</p>
            <div className={'observer-detection'}>
                <svg width={props.WIDTH} height={props.HEIGHT}>
                    <g> {props.spikeArray.map(renderSpikes())} </g>
                    <line x1={props.WIDTH} y1={props.HEIGHT / 2} x2={props.time} y2={props.HEIGHT / 2} stroke={'red'}></line>
                </svg>
            </div>
        </div>
    </React.Fragment>
    );
}