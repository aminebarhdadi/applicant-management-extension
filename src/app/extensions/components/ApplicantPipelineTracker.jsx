import React from 'react';
import { CrmStageTracker } from '@hubspot/ui-extensions/crm';

// Configuration constants - in a real app, these would be in a config file
const OBJECT_TYPE_ID = '2-43019983';

const ApplicantPipelineTracker = ({ objectId }) => {
  if (!objectId) {
    return null;
  }

  return (
    <CrmStageTracker
      objectId={objectId}
      objectTypeId={OBJECT_TYPE_ID}
    />
  );
};

export default ApplicantPipelineTracker;