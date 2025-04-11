import React from 'react';
import { hubspot } from '@hubspot/ui-extensions';
import { Flex } from '@hubspot/ui-extensions';

// Import our components
import { DataProvider, ApplicantDetails, ApplicantPipelineTracker } from './components';

const ApplicantCard = ({ context }) => {
  return (
    <DataProvider context={context}>
      <ApplicantDetails />
      <ApplicantPipelineTracker objectId={context?.crm?.objectId} />
    </DataProvider>
  );
};

// Export the extension with the correct parameters
hubspot.extend(({ context }) => {
  return <ApplicantCard context={context} />;
});