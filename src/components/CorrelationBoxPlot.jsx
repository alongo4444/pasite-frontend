import {CanvasJSChart} from 'canvasjs-react-charts'
var React = require('react');
var Component = React.Component;

/**
 * the box plot correlation component
 */
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
                    { label: "With Defense System",  y: this.props.withd_y },
                    { label: "Without Defense System",  y: this.props.withoutd_y }
                ]
            }]
        }
        return (
            <div>
                <CanvasJSChart options = {options}
                />
            </div>
        );
    }
}
export default CorrelationBoxPlot;
