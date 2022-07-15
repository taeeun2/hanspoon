import React, { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import 'chart.js/auto';



function PieChart({ activeChart }) {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        console.log(activeChart)
    },[])  

    useEffect(() => {
        fetch(`http://172.27.1.33:8080/chart/${activeChart}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setChartData(data);
        })
    },[activeChart])  

    const data = {
        labels: chartData.map(data => data.type),
        datasets: [
          {
            labels: '통계 데이터',
            data: chartData.map(data => data.count),
            borderWidth: 2,
            hoverBorderWidth: 3,
            backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
            ],
            fill: true,
          }
        ],
      };

    return (
        <div className="pieChart">
            <Pie
                options={{
                    // responsive: false,
                    // legend: {
                    //     display: true,
                    //     position: "right",
                    // },
                    elements: {
                        arc: {
                            borderWidth: 2,
                            borderColor: '#333333'
                        }
                    },
                    plugins: {
                        legend: {
                          display: true,
                          position: "bottom",
                          labels: {
                            render: 'label',
                            position: 'default',
                            overlap: true,
                            font: {
                                size: 15,
                                weight: 700
                            }},
                            
                        },
                    },
                }}
                data={data}
                height={200}
                width={200}
            />
        </div>
    );
}

export default PieChart;