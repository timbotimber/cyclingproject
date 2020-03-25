import React, { useState, useEffect } from "react";
import Chart from "chart.js";
import axios from "axios";

const ElevationChart = props => {
  const [elevations, setElevations] = useState([]);
  const [origin, setOrigin] = useState([]);
  const [destination, setDestination] = useState([]);

  // state = {
  //   elevations: [],
  //   Origin: [],
  //   Destination: []
  // };
  const chartRef = React.createRef();

  const createChart = () => {
    const myChartRef = chartRef.current.getContext("2d");

    let xAxis = [];

    for (let i = 0; i < elevations.length; i += 1) {
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
            data: elevations,
            // this might not work?

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

  const getData = () => {
    const id = props.match.params.id;
    return axios.get(`/api/trips/trip/${id}`).then(trip => {
      console.log("trip?!", trip.data.elevations);
      setElevations(trip.data.elevations);
      setOrigin(trip.data.origin);
      setDestination(trip.data.destination);
      // setState({
      //   elevations: trip.data.elevations,
      //   Origin: trip.data.origin,
      //   Destination: trip.data.destination
      // });
    });
  };

  useEffect(() => {
    getData().then(res => {
      createChart();
    });
  }, []);

  return (
    <div className="chart">
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

export default ElevationChart;
