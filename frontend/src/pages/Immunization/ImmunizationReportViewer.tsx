import React from 'react'
import { useParams } from 'react-router-dom';
import { ImmunizationReport } from '@reports/ImmunizationReport';

export const ImmunizationReportViewer: React.FC = () => {
  const { appointment_id } = useParams<{ appointment_id: string }>();

  return (
    <>
      <ImmunizationReport appointment_id={appointment_id} />
    </>
  )
}
