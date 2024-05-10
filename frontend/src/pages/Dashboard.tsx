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
        series: [14, 23, 21, 17]
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
        series: [44, 55, 41, 17]
    };


    return (
        <div className='m-3'>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3 p-4">
                <h1 className='mb-4 font-semibold flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                    </svg>
                    ANNUAL REPORT
                </h1>
                <div className="card-body p-0">
                    <div className='flex gap-4 justify-between mt-4'>
                        <div className="chart-container">
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
