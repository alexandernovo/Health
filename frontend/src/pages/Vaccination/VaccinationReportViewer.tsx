import React from 'react'
import VaccinationReport from '@reports/VaccinationReport'
import { useParams } from 'react-router-dom';

const VaccinationReportViewer: React.FC = () => {
    const { appointment_id } = useParams<{ appointment_id: string }>();

    return (
        <div>
            <VaccinationReport appointment_id={appointment_id} />
        </div>
    )
}

export default VaccinationReportViewer
