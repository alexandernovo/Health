import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { DashboardType, initialEkonsultaModel } from '@/types/dashboardType';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import {
    BeakerIcon,
    BriefcaseIcon,
    HeartIcon,
    UserIcon,
    ClipboardDocumentIcon,
    StarIcon,
    ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'; // Import Heroicons
interface ConsultationItem {
    label: string;
    icon: JSX.Element;
    key: keyof DashboardType; // 'key' is now a specific key of DashboardType
}
const Dashboard: React.FC = () => {
    const [Igpalge, setIgpalge] = useState<DashboardType>(initialEkonsultaModel);
    const [Capoyuan, setCapoyuan] = useState<DashboardType>(initialEkonsultaModel);
    const [Palma, setPalma] = useState<DashboardType>(initialEkonsultaModel);
    const [overAll, setOverAll] = useState<DashboardType>(initialEkonsultaModel);

    const token: string | null = localStorage.getItem("token");

    const customColors = [
        '#1C4D9C','#C84E2E', '#1E8B2D', '#1C4D9C', '#C22B7A', '#B28D18', '#1A7467', '#9D1F7B'
    ];

    // Updated typeOfConsultation array with icons and labels
    const typeOfConsultation: ConsultationItem[] = [
        { label: 'Overall', icon: <ListBulletIcon className="w-6 h-6" />, key: 'overall' },
        { label: 'Vaccination', icon: <BeakerIcon className="w-6 h-6" />, key: 'vaccination' },
        { label: 'Check-up', icon: <BriefcaseIcon className="w-6 h-6" />, key: 'checkup' },
        { label: 'Immunization', icon: <HeartIcon className="w-6 h-6" />, key: 'immunization' },
        { label: 'Hypertensive/Diabetic', icon: <UserIcon className="w-6 h-6" />, key: 'hypertensive' },
        { label: 'Family Planning', icon: <ClipboardDocumentIcon className="w-6 h-6" />, key: 'familyplanning' },
        { label: 'Newborn Delivery Record', icon: <StarIcon className="w-6 h-6" />, key: 'newborn' },
        { label: 'Maternal Health Record', icon: <ChatBubbleLeftIcon className="w-6 h-6" />, key: 'maternal' }
    ];

    // Polar Area Chart Options
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
        series: [
            Igpalge.vaccination, Igpalge.checkup, Igpalge.immunization,
            Igpalge.hypertensive, Igpalge.familyplanning, Igpalge.newborn, Igpalge.maternal
        ],
        labels: typeOfConsultation.slice(1).map(x => x.label), // Use labels from the array
        colors: customColors.slice(1), // Apply custom colors
        dataLabels: {
            enabled: false, // Disable data labels if needed
        },
        tooltip: {
            enabled: true, // Optionally disable tooltips if needed
        }
    };

    // Donut Chart Options (Capoyuan)
    const options2: ApexOptions = {
        chart: {
            type: 'polarArea',

        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 460
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        series: [
            Capoyuan.vaccination, Capoyuan.checkup, Capoyuan.immunization, Capoyuan.hypertensive,
            Capoyuan.familyplanning, Capoyuan.newborn, Capoyuan.maternal
        ],
        labels: typeOfConsultation.slice(1).map(x => x.label), // Use labels from the array
        colors: customColors.slice(1), // Apply custom colors
        dataLabels: {
            enabled: false, // Disable data labels
        },
    };

    // Donut Chart Options (Palma)
    const options3: ApexOptions = {
        chart: {
            type: 'polarArea',
        },
        responsive: [{
            breakpoint: 580,
            options: {
                chart: {
                    width: 460
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        series: [
            Palma.vaccination, Palma.checkup, Palma.immunization, Palma.hypertensive,
            Palma.familyplanning, Palma.newborn, Palma.maternal
        ],
        labels: typeOfConsultation.slice(1).map(x => x.label), // Use labels from the array
        colors: customColors.slice(1), // Apply custom colors
        dataLabels: {
            enabled: false, // Disable data labels
        },
    };

    useEffect(() => {
        const getDashboardData = async () => {
            const response = await axios.get("/api/dashboard/getDashboardData", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.status == 'success') {
                setIgpalge(response.data.data.Igpalge);
                setCapoyuan(response.data.data.Capoyuan);
                setPalma(response.data.data.Palma);
                setOverAll(response.data.data.overall);
            }
        };

        getDashboardData();
    }, []);

    return (
        <div className='m-3'>
            <h1 className='mb-4 font-semibold flex items-center text-[20px] px-2' >
                <svg xmlns="http://www.w3.org/4000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                </svg>
                ANNUAL REPORT
            </h1>
            <div className='w-full flex flex-wrap mb-2'>
                {typeOfConsultation.map((item, index) => {
                    return (
                        <div key={index} className="w-1/4 px-2">
                            <div className="flex items-center mb-2 justify-start border p-3 px-5 rounded-[25px] bg-white gap-2">
                                <div className="border rounded-full text-white w-[70px] h-[70px] flex items-center justify-center" style={{ backgroundColor: customColors[index] }}>
                                    {item.icon}
                                </div>
                                <div className='flex-1'>
                                    <p className="text-[13px] text-end font-semibold">{item.label}</p>
                                    <p className="text-[19px] text-end font-semibold text-wrap text-end">{overAll[item.key]}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-between">
                <div className="w-1/3 px-2">
                    <div className="card border border-gray-100 bg-base-100 shadow-md mb-3 p-2 rounded-[25px] chart-container h-[230px]">
                        <h6 className='font-semibold ml-[55px]'>CAPOYUAN</h6>
                        <ReactApexChart options={option} series={option.series} type="polarArea" />
                    </div>
                </div>
                <div className="w-1/3 px-2">
                    <div className="card border border-gray-100 bg-base-100 shadow-md mb-3 p-2 rounded-[25px] chart-container h-[230px]">
                        <h6 className='font-semibold ml-[78px]'>PALMA</h6>
                        <ReactApexChart options={options2} series={options2.series} type="polarArea" />
                    </div>
                </div>
                <div className="w-1/3 px-2">
                    <div className="card border border-gray-100 bg-base-100 shadow-md mb-3 p-2 rounded-[25px] chart-container h-[230px]">
                        <h6 className='font-semibold ml-[70px]'>IGPALGE</h6>
                        <ReactApexChart options={options3} series={options3.series} type="polarArea" />
                    </div>
                </div>
            </div>

            {/* Additional Section with icons and labels */}

        </div>
    );
};

export default Dashboard;
