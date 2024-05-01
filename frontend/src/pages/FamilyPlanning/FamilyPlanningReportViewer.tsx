import React from 'react'
import { useParams } from 'react-router-dom';
import FamilyPlanningReport from '@/reports/FamilyPlanningReport';

const FamilyPlanningReportViewer: React.FC = () => {

    const { appointment_id } = useParams<{ appointment_id: string }>();

    return (
        <>
            <FamilyPlanningReport appointment_id={appointment_id} />
        </>
    )
}

export default FamilyPlanningReportViewer
