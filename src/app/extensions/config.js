/**
 * Central configuration for the Applicant Management Extension
 */

export const CONFIG = {
  // HubSpot configuration
  HUBSPOT_PORTAL_ID: '49643328',
  
  // CRM Object configuration
  OBJECT_TYPE_ID: '2-43019983',
  OBJECT_TYPE: 'p_bewerber',
  
  // File preview configuration
  FILE_PREVIEW_BASE_URL: 'https://app.hubspot.com/file-preview/49643328/file/',
  
  // Required fields for proper display
  REQUIRED_PROPERTIES: ['bewerber_nachname', 'bewerber_email'],
  
  // Properties to fetch from API
  PROPERTIES_TO_FETCH: [
    'bewerber_vorname',
    'bewerber_nachname',
    'bewerber_email',
    'bewerber_telefonnummer',
    'bewerber_status',
    'beworben_fur_stelle',
    'lebenslauf',
    'hs_pipeline_stage'
  ]
}; 