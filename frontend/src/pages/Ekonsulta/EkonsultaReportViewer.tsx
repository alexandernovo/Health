import React from 'react'
import { useParams } from 'react-router-dom';
import { EkonsultaReport } from '@reports/EkonsultaReport';

export const EkonsultaReportViewer: React.FC = () => {
    const { appointment_id } = useParams<{ appointment_id: string }>();

    return (
        <>
            <EkonsultaReport appointment_id={appointment_id} />
        </>
    )
}
