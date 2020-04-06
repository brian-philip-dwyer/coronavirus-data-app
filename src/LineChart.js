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
                    fontSize: 20,
                    fontColor: '#b3b3b3',
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    fontStyle: "",
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                            fontSize: 10,
                            fontColor: '#999999'
                        },
                        gridLines: {
                            color: 'rgb(145, 145, 145, .2)'
                        }
                    }],
                    yAxes: [{
                        position: this.props.yAxisPosition,
                        ticks: {
                            autoSkip: false,
                            fontSize: 10,
                            fontColor: '#999999'
                        },
                        gridLines: {
                            color: 'rgb(145, 145, 145, .2)'
                        }
                    }]
                },
                legend: {
                    display: false,
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
                    lineTension: .2
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