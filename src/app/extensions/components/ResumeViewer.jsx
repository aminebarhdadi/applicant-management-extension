import React from 'react';
import { Link, Text } from '@hubspot/ui-extensions';

// Configuration constants - in a real app, these would be in a config file
const FILE_PREVIEW_BASE_URL = 'https://app.hubspot.com/file-preview/49643328/file/';

const ResumeViewer = ({ resumeId }) => {
  if (!resumeId) {
    return <Text>Lebenslauf nicht vorhanden</Text>;
  }
  
  return (
    <Link
      href={{
        url: `${FILE_PREVIEW_BASE_URL}${resumeId}/`,
        external: true,
      }}
    >
      Lebenslauf ansehen
    </Link>
  );
};

export default ResumeViewer;
