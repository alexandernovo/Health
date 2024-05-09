import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Dashboard: React.FC = () => {
    const option: ApexOptions = {
        chart: {
            type: 'polarArea',
        },
        stroke: {
            colors: ['#fff']
        },
        fill: {
            opacity: 0.8
        },
        series: [14, 23, 21, 17, 15]
    };

    const options2: ApexOptions = {
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        series: [44, 55, 41, 17, 15]
    };


    return (
        <div className='m-3'>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3 p-4">
                <h1 className='mb-4 font-semibold'>ANNUAL REPORT</h1>
                <div className="card-body p-0">
                    <div className='flex gap-4 justify-between mt-4'>
                        <div className="chart-container w-[300px] h-[300px]">
                            <ReactApexChart options={option} series={option.series} type="polarArea" />
                        </div>
                        <div className="chart-container w-[300px] h-[300px]">
                            <ReactApexChart options={options2} series={options2.series} type="donut" />
                        </div>
                        <div className="chart-container w-[300px] h-[300px]">
                            <ReactApexChart options={options2} series={options2.series} type="pie" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
