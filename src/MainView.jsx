import React from 'react';
import PropTypes from 'prop-types';
import Timeline from './Timeline';
import {select, drag, event, scaleLinear } from 'd3/dist/d3';
import { parseSvg } from "d3-interpolate/src/transform/parse";

const WIDTH = 900;
const HEIGHT = 400;

const renderCircles = () => {
    return (circleProperties, index) => {
        const circleProps = {
            cx: circleProperties.cx,
            cy: circleProperties.cy,
            r: circleProperties.r,
            fill: 'none',
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
            time: 1,
            numCollisions: 0,
        }

        // this.speed = 1;

        // Store the positions of all the desired objects
        this.positions = {
            source: {
                x: 350,
                y: 200
            },
            observer: {
                x: 650,
                y: 250
            },
            cursor: {
                x: 0,
                y: 0
            }
        };

        // Holds the focus of the drag
        this.focus = null;

        // Record whether the circles are being dragged
        this.isMoving = false;

        // Objects for holding the source and observer circles
        this.source = null;
        this.observer = null;

        // Animation frame loop counter
        this.raf = null;

        // Set state to initial state
        this.state = this.initialState;
    }

    componentDidMount() {
        this.container = select(this.ref.current)
            .append('g');

        this.observer = this.createAgents(this.positions.observer.x, this.positions.observer.y, 'observer', 'darkred');
        this.source = this.createAgents(this.positions.source.x, this.positions.source.y, 'source', 'green');

        requestAnimationFrame(this.animate.bind(this));
    }

    moveCircle() {
        const object = this.positions[this.focus];
        const cursor = this.positions.cursor;

        const radius = 2 * this.props.params.animationRate / 3;  // two-thirds speed of animation rate
        const dx = cursor.x - object.x;
        const dy = cursor.y - object.y;
        const angle = Math.atan2(dy, dx);

        let xPos = object.x + radius * Math.cos(angle);
        let yPos = object.y + radius * Math.sin(angle);

        this.updatePosition(this.focus, xPos, yPos);
        select(`#${this.focus}`)
            .attr('transform', `translate(${xPos}, ${yPos})`)
    }

    updateCircleStatus(d) {
        d.r += this.props.params.animationRate;
        
        if (!d.collided) {
            const cx = d.cx;
            const cy = d.cy;
            const radius = d.r;

            const observer = this.positions.observer;
            const distanceBetween = Math.sqrt(Math.pow(cx - observer.x, 2) + Math.pow(cy - observer.y, 2));

            d.collided = radius >= distanceBetween;
            if (d.collided) {
                this.setState({
                    numCollisions: this.state.numCollisions + 1
                });
            }
        }
    }

    animate() {
        if (this.props.params.isAnimationEnabled) {

            let circles = this.state.circles;
            circles.forEach(this.updateCircleStatus.bind(this));

            if (this.props.params.isEmissionEnabled) {
                if (this.state.time % 100 === 0) {
                    circles.push({
                        cx: this.positions.source.x,
                        cy: this.positions.source.y,
                        r: 0,
                        stroke: 'whitesmoke',
                        collided: false,
                    });

                    circles = circles.filter(element => element.r <= WIDTH);
                }

            }

            if (this.isMoving) {
                this.moveCircle();
            }

            this.setState({
                time: this.state.time + 1, // * this.props.params.animationRate,
                circles: circles
            });
        
        }

        requestAnimationFrame(this.animate.bind(this));
    }

    createAgents(x, y, name, fill) {
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
            .attr('r', 10)
            .attr('fill', fill)
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
        const updatePosition = this.updatePosition.bind(this);
        const updateIsMoving = this.updateIsMoving.bind(this);

        return drag()
            .on('start', function() {

                let xPos = event.x;
                let yPos = event.y;

                // Ensures that object cannot move outside of bounds
                if (xPos <= 0) xPos = 0;
                if (yPos <= 0) yPos = 0;
                if (xPos >= WIDTH) xPos = WIDTH;
                if (yPos >= HEIGHT) yPos = HEIGHT;

                updatePosition('cursor', xPos, yPos);
                updateIsMoving(true, select(this).attr('id'));
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

                updatePosition('cursor', xPos, yPos);
            })
            .on('end', function() {
                updateIsMoving(false, null);
            });
    }

    updateIsMoving(bool, object) {
        this.isMoving = bool;
        this.focus = object;
    }

    updatePosition(name, x, y) {
        this.positions[name] = {
            x,
            y
        };
    }

    render() {
        return(
            <React.Fragment>
                <Timeline
                    circles={this.state.circles}
                    observer={this.positions.observer}
                    numCollisions={this.state.numCollisions}
                    params={this.props.params}
                    onChange={this.props.onChange}
                />

                <div className={"main-view"}>
                    <svg width={WIDTH} height={HEIGHT}>
                        <rect x={0} y={0} width={'100%'} height={'100%'}></rect>
                        <g> {this.state.circles.map(renderCircles())} </g>
                        <g ref={this.ref} />
                    </svg>
                </div>
            </React.Fragment>
        );
    }
}
