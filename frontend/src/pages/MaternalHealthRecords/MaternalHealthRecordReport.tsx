import React from 'react'
import { useParams } from 'react-router-dom';
import MaternalReport from '@reports/MaternalReport';

const MaternalHealthRecordReport: React.FC = () => {

    const { appointment_id } = useParams<{ appointment_id: string }>();

    return (
        <div >
            <MaternalReport appointment_id={appointment_id} />
        </div>
    )
}

export default MaternalHealthRecordReport
