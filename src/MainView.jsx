import React from 'react';
import PropTypes from 'prop-types';
import Timeline from './Timeline';
import {select, drag, event, scaleLinear } from 'd3/dist/d3';
import { parseSvg } from "d3-interpolate/src/transform/parse";

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

        // Store the position of the source circle
        this.sourcePos = {
            x: 350,
            y: 200,
        };

        this.cursorPos = {
            x: 0,
            y: 0
        };

        // Record whether the circles are being dragged
        this.isMoving = false;

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

        this.source = this.createAgents(350, 200, 'source');
        this.observer = this.createAgents(650, 250, 'observer');

        requestAnimationFrame(this.animate.bind(this));
    }

    updateCursorPosition(x, y) {
        this.cursorPos = {
            x,
            y
        };

    }

    moveCircle() {
        console.log(`cursor: ${this.cursorPos.x} and ${this.cursorPos.y}`);
        const radius = 1;
        const dx = this.cursorPos.x - this.sourcePos.x;
        const dy = this.cursorPos.y - this.sourcePos.y;
        const angle = Math.atan2(dy, dx);

        let xPos = this.sourcePos.x + radius * Math.cos(angle);
        let yPos = this.sourcePos.y + radius * Math.sin(angle);

        this.updateSourcePosition(xPos, yPos);
        select('#source')
            .attr('transform', `translate(${xPos}, ${yPos})`);
    }

    animate() {
        let circles = this.state.circles;
        if (this.state.time % 100 === 0) {
            circles.push({
                cx: this.sourcePos.x,
                cy: this.sourcePos.y,
                r: 0,
                stroke: 'blue',
            });

            circles = circles.filter(element => element.r <= WIDTH);
        }

        if (this.isMoving) {
            this.moveCircle();
        }

        this.setState({
            time: this.state.time + 1,
            circles: circles
        });

        requestAnimationFrame(this.animate.bind(this));
    }

    createAgents(x, y, name) {
        const handleDrag = this.dragFunction();

        const object = this.container
            .append('g')
            .attr('id', name)
            .attr('transform', `translate(${x}, ${y})`)
            .call(handleDrag)

        object
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 15)
            .attr('fill', "darkred")
            .attr('stroke', "black");

        object
            .append('text')
            .attr('x', -4)
            .attr('y', 4)
            .style('cursor', 'default')
            .text(name.charAt(0));

        return object;
    }

    dragFunction() {
        const updateSourcePosition = this.updateSourcePosition.bind(this);
        const updateCursorPosition = this.updateCursorPosition.bind(this);
        const updateIsMoving = this.updateIsMoving.bind(this);

        return drag()
            .on('start', function() {
                updateIsMoving(true);

                let xPos = event.x;
                let yPos = event.y;

                // Ensures that object cannot move outside of bounds
                if (xPos <= 0) xPos = 0;
                if (yPos <= 0) yPos = 0;
                if (xPos >= WIDTH) xPos = WIDTH;
                if (yPos >= HEIGHT) yPos = HEIGHT;

                updateCursorPosition(xPos, yPos);
            })
            .on('drag', function() {
                // const thisObj = select(this);

                let xPos = event.x;
                let yPos = event.y;

                // Ensures that object cannot move outside of bounds
                if (xPos <= 0) xPos = 0;
                if (yPos <= 0) yPos = 0;
                if (xPos >= WIDTH) xPos = WIDTH;
                if (yPos >= HEIGHT) yPos = HEIGHT;

                updateCursorPosition(xPos, yPos);

                // const coordinates = parseSvg(thisObj.attr('transform'));
                // const radius = 1;
                // const dx = xPos - coordinates.translateX;
                // const dy = yPos - coordinates.translateY;
                // const angle = Math.atan2(dy, dx);
                //
                // xPos = coordinates.translateX + radius * Math.cos(angle);
                // yPos = coordinates.translateY + radius * Math.sin(angle);

                // if (thisObj.attr('id') === 'source') updateSourcePosition(xPos, yPos);
                // thisObj.attr("transform", `translate(${xPos}, ${yPos})`);
            })
            .on('end', function() {
                updateIsMoving(false);
            });
    }

    updateIsMoving(bool) {
        this.isMoving = bool;
    }

    updateSourcePosition(x, y) {
        this.sourcePos = {
            x,
            y
        };

        // this.setState({
        //     sourcePosition: {
        //         x,
        //         y
        //     }
        // });
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
