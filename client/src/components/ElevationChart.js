import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js';
import axios from 'axios';

const ElevationChart = (props) => {
  const [elevations, setElevations] = useState([]);
  const [origin, setOrigin] = useState([]);
  const [destination, setDestination] = useState([]);
  const [chart, setChart] = useState(false);

  const chartRef = useRef();

  const createChart = () => {
    const myChartRef = chartRef.current.getContext('2d');

    let xAxis = [];

    for (let i = 0; i < elevations.length; i += 1) {
      xAxis.push(' ');
    }

    new Chart(myChartRef, {
      type: 'line',
      data: {
        //Bring in data
        labels: xAxis,
        datasets: [
          {
            label: 'elevation / m',
            data: elevations,
            fill: true,
            backgroundColor: 'rgba(255, 105, 98, 0.2)',
            borderColor: '#ff6962',
            borderWidth: 2,
            // pointBorderColor: "rgba(255,255,255,0.0)"
          },
        ],
      },
      options: {
        bezierCurve: true,
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
              },
            },
          ],
        },
      },
    });
    setChart(true);
  };

  const getData = () => {
    const id = props.match.params.id;
    return axios.get(`/api/trips/trip/${id}`).then((trip) => {
      setElevations(trip.data.elevations);
      setOrigin(trip.data.origin);
      setDestination(trip.data.destination);
    });
  };

  useEffect(() => {
    getData().then((res) => {
      createChart();
    });
  }, [chart]);

  return (
    <div className="chart">
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

export default ElevationChart;
