import React from 'react';
import Chart from 'chart.js'

class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'bar',
            options: {
                animation: {
                    duration: 0
                },
                title: {
                    display: false,
                    text: this.props.title,
                    fontSize: 20,
                    fontColor: '#2d4052',
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    fontStyle: "",
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 10,
                            fontColor: '#2d4052',
                            padding: 10
                        },
                        gridLines: {
                            display: false,
                            drawTicks: false,
                            color: 'rgb(180, 180, 180, .2)'
                        }
                    }],
                    yAxes: [{
                        position: this.props.yAxisPosition,
                        ticks: {
                            fontSize: 10,
                            fontColor: '#2d4052',
                            padding: 5
                        },
                        gridLines: {
                            drawTicks: false,
                            color: 'rgb(45, 45, 45, .2)'
                        }
                    }]
                },
                legend: {
                    display: false,
                }
            },
            data: {
                labels: this.props.labels,
                datasets: [
                    {
                        label: this.props.legend,
                        data: this.props.data,
                        fill: 'none',
                        backgroundColor: this.props.color,
                        pointRadius: 2,
                        borderColor: this.props.color,
                        borderWidth: 1,
                        lineTension: .2
                    }
                ]
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

export default BarChart;