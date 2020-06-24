import React from 'react';
import PropTypes from 'prop-types';
import Timeline from './Timeline';
import {select, drag, event, scaleLinear} from 'd3/dist/d3';

const WIDTH = 900;
const HEIGHT = 400;

const renderCircles = () => {
    return (circleProperties, index) => {
        circleProperties.r += 0.5;

        const circleProps = {
            cx: circleProperties.cx,
            cy: circleProperties.cy,
            r: circleProperties.r,
            // fill: 'none',
            stroke: circleProperties.stroke,
            key: index,
        };
        return <circle {...circleProps} />;
    };
};

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();

        this.initialState = {
            circles: [],
            time: 0,
        }

        this.state = this.initialState;

        // Objects for holding the source and observer circles
        this.source = null;
        this.observer = null;

        // Animation frame loop counter
        this.raf = null;
    }

    componentDidMount() {
        this.container = select(this.ref.current)
            .append('g');

        this.source = this.createAgents(350, 200, 's');
        this.observer = this.createAgents(650, 250, 'o');


        requestAnimationFrame(this.animate.bind(this));
    }

    animate() {

        if (this.state.time % 100 === 0) {
            this.state.circles.push({
                cx: 200,
                cy: 200,
                r: 0,
                stroke: 'blue',
            });
        }

        this.setState({
            time: this.state.time + 1,
            circles: this.state.circles
        });

        requestAnimationFrame(this.animate.bind(this));
    }

    createAgents(x, y, name) {
        const handleDrag = this.dragFunction();

        const object = this.container
            .append('g')
            .attr('id', 'source')
            .attr('transform', `translate(${x}, ${y})`)
            .call(handleDrag)

        object
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 15)
            .attr('fill', "lightpink")
            .attr('stroke', "black");

        object
            .append('text')
            .attr('x', -4)
            .attr('y', 4)
            .style('cursor', 'default')
            .text(name);

        return object;
    }

    dragFunction() {
        return drag()
            .on('drag', function() {
                let x = event.x;
                let y = event.y;
                select(this).attr("transform", `translate(${x}, ${y})`);
            });
    }

    render() {
        return(
            <React.Fragment>
                <Timeline

                />

                <div className={"main-view"}>
                    <svg width={WIDTH} height={HEIGHT}>
                        <g> {this.state.circles.map(renderCircles())} </g>
                        <g ref={this.ref} />
                    </svg>
                </div>
            </React.Fragment>
        );
    }
}
