import React from 'react';
import Chart from 'chart.js'

class LineChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            options: {
                title: {
                    display: true,
                    text: this.props.title,
                    fontSize: 20
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            userCallback: function (item, index) {
                                if (index === 0) return item;
                                if (index === 1) return;
                                if (((index) % 2) === 0) return item;
                            },
                            autoSkip: false,
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            autoSkip: false,
                            fontSize: 10
                        }
                    }]
                },
                legend: {
                    display: false,
                    position: 'top'
                }
            },
            data: {
                labels: this.props.labels,
                datasets: [{
                    label: this.props.legend,
                    data: this.props.data,
                    fill: 'none',
                    backgroundColor: this.props.color,
                    pointRadius: 2,
                    borderColor: this.props.color,
                    borderWidth: 1,
                    lineTension: 0
                }]
            }
        });
    }

    componentDidUpdate() { 
        this.myChart.data.labels = this.props.labels;
        this.myChart.data.datasets[0].data = this.props.data;
        this.myChart.update();
    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}

export default LineChart;