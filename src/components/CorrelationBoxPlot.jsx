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
                // yValueFormatString: "#,##0.# \"kcal/100g\"",
                dataPoints: [
                    { label: "With Defense System",  y: this.props.withd_y },
                    { label: "Without Defense System",  y: this.props.withoutd_y }
                ]
            }]
        }
        return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export default CorrelationBoxPlot;
