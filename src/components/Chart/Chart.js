import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';


const options = {
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each bar to be 2px wide and green
  elements: {
    rectangle: {
      borderWidth: 2,
      borderColor: 'rgb(0, 255, 0)',
      borderSkipped: 'bottom'
    }
  },
  responsive: true,
  legend: {
    position: 'top'
  },
  title: {
    display: true,
    text: "Daily Attendance Overview"
  }
}


class Chart extends Component{
    
    constructor(props){
        super(props);
        this.state = {
             labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
      ],
      datasets: [
        {
          label: 'Students',
          backgroundColor: "rgba(220,220,220,0.5)",
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
          ]
        }, {
          label: 'Teachers',
          backgroundColor: "rgba(151,187,205,0.5)",
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
          ]
        }
      ]
        }
    }
    
 

 

  render() {
    return <div>
      <Bar data={this.state} options={options} ref={(ref) => this.Bar = ref}/>
    </div>
  }

    
}
function randomScalingFactor() {
  return (Math.random() > 0.5
    ? 1.0
    : 2.0) * Math.round(Math.random() * 100)
}
export default Chart;