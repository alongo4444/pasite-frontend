import {CanvasJSChart} from 'canvasjs-react-charts'
var React = require('react');
var Component = React.Component;

class CorrelationBoxPlot extends Component {
    render() {
        const options = {
            theme: "light2",
            animationEnabled: true,
            axisY: {
                title: "Distribution"
            },
            data: [{
                type: "boxAndWhisker",
                dataPoints: [
                    { label: "WithDef",  y: this.props.withd_y },
                    { label: "WithoutDef",  y: this.props.withoutd_y }
                ]
            }]
        }
        return (
            <div>
                <CanvasJSChart options = {options}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export default CorrelationBoxPlot;
