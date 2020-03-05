import React, { Component } from "react";
import Chart from "chart.js";
import axios from "axios";

export default class ElevationChart extends Component {
  chartRef = React.createRef();

  state = {
    elevations: [],
    Origin: [],
    Destination: []
  };

  createChart = () => {
    console.log("this is the state in the function call", this.state);
    const myChartRef = this.chartRef.current.getContext("2d");

    let xAxis = [];

    for (let i = 0; i < this.state.elevations.length; i += 1) {
      xAxis.push(" ");
    }

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: xAxis,
        datasets: [
          {
            label: "elevation / m",
            data: this.state.elevations,
            fill: true,
            backgroundColor: "rgba(255, 105, 98, 0.2)",
            borderColor: "#ff6962",
            borderWidth: 2
            // pointBorderColor: "rgba(255,255,255,0.0)"
          }
        ]
      },
      options: {
        bezierCurve: true,
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0)"
              }
            }
          ]
        }
      }
    });
  };

  getData = () => {
    const id = this.props.match.params.id;
    return axios.get(`/api/trips/trip/${id}`).then(trip => {
      console.log("trip?!", trip.data.elevations);
      this.setState({
        elevations: trip.data.elevations,
        Origin: trip.data.origin,
        Destination: trip.data.destination
      });
    });
    console.log("the getData fn ran");
  };

  componentDidMount() {
    this.getData().then(res => {
      this.createChart();
    });
    console.log("this is the id", this.props.match.params.id);
  }

  render() {
    return (
      <div className="chart">
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
