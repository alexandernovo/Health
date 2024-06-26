import React from 'react'
import { useParams } from 'react-router-dom';
import MaternalReport from '@reports/MaternalReport';

const MaternalHealthRecordReport: React.FC = () => {

    const { appointment_id } = useParams<{ appointment_id: string }>();

    return (
        <>
            <MaternalReport appointment_id={appointment_id} />
        </>
    )
}

export default MaternalHealthRecordReport
