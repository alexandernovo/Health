import React from 'react'
import { useParams } from 'react-router-dom';
import HypertensiveReport from '@/reports/HypertensiveReport';

const HypertensiveReportViewer: React.FC = () => {

    const { appointment_id } = useParams<{ appointment_id: string }>();

    return (
        <>
            <HypertensiveReport appointment_id={appointment_id} />
        </>
    )
}

export default HypertensiveReportViewer
