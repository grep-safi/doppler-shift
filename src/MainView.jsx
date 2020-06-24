import React from 'react';
import PropTypes from 'prop-types';
import Timeline from './Timeline';
import {select, drag, event, scaleLinear} from 'd3/dist/d3';

const WIDTH = 900;
const HEIGHT = 400;

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        const handleDrag = this.dragFunction();

        this.path = select(this.ref.current)
            .append('g')
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 20)
            .attr('id', 'source')
            .attr('fill', "lightpink")
            .attr('stroke', "black")
            .call(handleDrag);
    }

    dragFunction() {
        return drag()
            .on('drag', function() {
                let x = event.x;
                let y = event.y;
                select('#source').attr("transform", `translate(${x}, ${y})`);
            });
    }

    render() {
        return(
            <React.Fragment>
                <Timeline

                />

                <div className={"main-view"}>
                    <svg width={WIDTH} height={HEIGHT}>
                        <g ref={this.ref} />
                    </svg>
                </div>
            </React.Fragment>
        );
    }
}
