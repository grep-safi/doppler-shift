import React from 'react';

const WIDTH = 700;
const HEIGHT = 200;
export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        // this.container = select(this.ref.current)
        //     .append('g');
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.numCollisions !== this.props.numCollisions) {
            console.log(`# of collisions: ${this.props.numCollisions}`);
        }

    }

    render() {
        return(
            <React.Fragment>
                <div className={"time-line"}>
                    <p>Waves as emitted from source</p>
                    <div className={'observer-detection'}>
                        <svg width={WIDTH} height={HEIGHT}>
                            <g ref={this.ref} />
                        </svg>                       
                    </div>
                    {/*<p>Waves as detected by observer</p>*/}
                </div>
            </React.Fragment>
        );
    }
}