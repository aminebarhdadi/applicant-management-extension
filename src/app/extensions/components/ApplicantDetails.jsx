import React from 'react';
import {
  Text,
  DescriptionList,
  DescriptionListItem,
  Flex
} from '@hubspot/ui-extensions';
import ResumeViewer from './ResumeViewer';

const ApplicantDetails = ({ applicantData }) => {
  if (!applicantData) {
    return <Text>Keine Bewerberdaten verfügbar.</Text>;
  } 

  return (
    <Flex direction="column" gap="md">
      <DescriptionList>
        <DescriptionListItem label="Vorname">
          <Text>{applicantData.bewerber_vorname || 'N/A'}</Text>
        </DescriptionListItem>
        <DescriptionListItem label="Nachname">
          <Text>{applicantData.bewerber_nachname || 'N/A'}</Text>
        </DescriptionListItem>
        <DescriptionListItem label="E-Mail">
          <Text>{applicantData.bewerber_email || 'N/A'}</Text>
        </DescriptionListItem>
        <DescriptionListItem label="Telefonnummer">
          <Text>{applicantData.bewerber_telefonnummer || 'N/A'}</Text>
        </DescriptionListItem>
        <DescriptionListItem label="Status">
          <Text>{applicantData.bewerber_status || 'N/A'}</Text>
        </DescriptionListItem>
        <DescriptionListItem label="Position">
          <Text>{applicantData.beworben_fur_stelle || 'N/A'}</Text>
        </DescriptionListItem>
        <DescriptionListItem label="Lebenslauf">
          <ResumeViewer resumeId={applicantData.lebenslauf} />
        </DescriptionListItem>
        <DescriptionListItem label="">
          <Text>{applicantData.hs_pipeline_stage || 'N/A'}</Text>
        </DescriptionListItem>
      </DescriptionList>
    </Flex>
  );
};

export default ApplicantDetails; 