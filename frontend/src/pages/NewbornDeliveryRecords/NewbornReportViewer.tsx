import React from 'react'
import { useParams } from 'react-router-dom';
import NewbornReport from '@reports/NewbornReport';

const NewbornReportViewer: React.FC = () => {
    const { appointment_id } = useParams<{ appointment_id: string }>();

    return (
        <>
            <NewbornReport appointment_id={appointment_id} />
        </>
    )
}

export default NewbornReportViewer
