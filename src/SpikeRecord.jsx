import React from 'react';
import LineGraph from "./LineGraph";

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
            <p>{props.title}</p>
            <div className={'spike-detection'}>
                <svg width={props.WIDTH} height={props.HEIGHT}>
                    {/*Comment this entire <LineGraph /> section in order to remove the curve*/}
                    <LineGraph
                        spikeArray={props.spikeArray}
                        id={props.id}
                        color={props.color}
                        width={700}
                        height={100}
                    />
                    <line x1={props.WIDTH} y1={props.HEIGHT / 2} x2={props.time} y2={props.HEIGHT / 2} stroke={'black'}></line>
                </svg>
            </div>
        </React.Fragment>
    );
}