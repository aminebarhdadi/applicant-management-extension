import React, { useState, useEffect } from 'react';
import { hubspot } from '@hubspot/ui-extensions';
import { LoadingSpinner, Alert, Flex } from '@hubspot/ui-extensions';
import { CONFIG } from '../config';

const DataProvider = ({ context, children }) => {
  const [applicantData, setApplicantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicantData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Validate context
        if (!context) {
          throw new Error('Context is not available');
        }

        if (!context.crm || !context.crm.objectId) {
          throw new Error('Invalid context: missing CRM object ID');
        }

        const response = await hubspot.serverless('getApplicantData', {
          parameters: {
            objectId: context.crm.objectId
          }
        });

        // Validate response
        if (!response) {
          throw new Error('No response received from server');
        }

        if (response.status === 'ERROR') {
          const errorMessage = response.body?.message || 'Unknown error occurred';
          const errorCode = response.body?.code || 'UNKNOWN_ERROR';
          throw new Error(errorMessage);
        }

        if (!response.body) {
          throw new Error('No data received from server');
        }

        // Validate required properties
        const missingProperties = CONFIG.REQUIRED_PROPERTIES.filter(prop => !response.body[prop]);
        
        if (missingProperties.length > 0) {
          console.warn('Missing required properties:', missingProperties);
        }

        // Set the applicant data
        setApplicantData(response.body);
      } catch (error) {
        console.error('Error fetching applicant data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (context) {
      fetchApplicantData();
    } else {
      setError('Kein Kontext verfügbar');
      setIsLoading(false);
    }
  }, [context]);

  if (isLoading) {
    return <LoadingSpinner label="Lade Bewerberdaten..." />;
  }

  if (error) {
    return <Alert title="Fehler" variant="error">{error}</Alert>;
  }

  return (
    <Flex direction="column" gap="md">
      {React.Children.map(children, child => 
        React.cloneElement(child, { applicantData })
      )}
    </Flex>
  );
};

export default DataProvider; 