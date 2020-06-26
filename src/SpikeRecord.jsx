import React from 'react';

const renderSpikes = () => {
    return (lineProps, index) => {
        const props = {
            x1: lineProps.x1,
            x2: lineProps.x2,
            y1: lineProps.y1,
            y2: lineProps.y2,
            strokeWidth: lineProps.strokeWidth,
            stroke: lineProps.stroke,
            key: index,
        };
        return <line {...props} />;
    };
};

export default (props) => {
    return (
        <React.Fragment>
            <p style={{color: 'white'}}>{props.title}</p>
            <div className={'spike-detection'}>
                <svg width={props.WIDTH} height={props.HEIGHT}>
                    <g> {props.spikeArray.map(renderSpikes())} </g>
                    <line x1={props.WIDTH} y1={props.HEIGHT / 2} x2={props.time} y2={props.HEIGHT / 2} stroke={'white'}></line>
                </svg>
            </div>
        </React.Fragment>
    );
}