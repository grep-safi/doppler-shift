import React from 'react';

const WIDTH = 600;
const HEIGHT = 200;
export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        
    }

    render() {
        return(
            <React.Fragment>
                <div className={"time-line"}>
                    <p>Waves as emitted from source</p>
                    <svg width={WIDTH} height={HEIGHT}>
                        <g ref={this.ref} />
                    </svg>
                    <p>Waves as detected by observer</p>
                </div>
            </React.Fragment>
        );
    }
}