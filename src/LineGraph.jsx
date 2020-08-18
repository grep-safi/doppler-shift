import React from 'react';
import Line  from './Line';
import { curveCardinal, max, scaleLinear, line } from 'd3/dist/d3';

const lineGenerator = () => {
    return line()
        .x(d => d.t)
        .y(d => d.y)
        .curve(curveCardinal)
};

export default (props) => {
    // Data set for the line
    const lineData = props.spikeArray.map((d, i) => {return {"y": d.y2, "t": d.x2}; });

    // Line generators for the data set
    const lineGenLightVal = lineGenerator();

    return (
        <Line
            data={lineData}
            lineGenerator={lineGenLightVal}
            width={props.width}
            height={props.height}
            id={props.id}
            color={props.color}
        />
    );
}
