const hubspot = require('@hubspot/api-client');

// Configuration constants
const CONFIG = {
  OBJECT_TYPE: 'p_bewerber',
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

exports.main = async (context = {}, sendResponse) => {
  try {
    // Validate context and parameters
    if (!context) {
      throw new Error('Context is required');
    }

    const { objectId } = context.parameters;
    const accessToken = process.env.PRIVATE_APP_ACCESS_TOKEN;

    // Validate required parameters
    if (!accessToken) {
      throw new Error('PRIVATE_APP_ACCESS_TOKEN secret is required');
    }

    if (!objectId) {
      throw new Error('objectId parameter is required');
    }

    // Initialize HubSpot client
    let hubspotClient;
    try {
      hubspotClient = new hubspot.Client({ accessToken });
    } catch (e) {
      throw new Error(`Failed to initialize HubSpot client: ${e.message}`);
    }

    // Validate properties to fetch
    if (!CONFIG.PROPERTIES_TO_FETCH.length) {
      throw new Error('No properties specified to fetch');
    }

    // Fetch data from HubSpot
    let apiResponse;
    try {
      apiResponse = await hubspotClient.crm.objects.basicApi.getById(
        CONFIG.OBJECT_TYPE,
        objectId,
        CONFIG.PROPERTIES_TO_FETCH
      );
    } catch (e) {
      if (e.statusCode === 404) {
        throw new Error(`Applicant with ID ${objectId} not found`);
      } else if (e.statusCode === 401) {
        throw new Error('Invalid or expired access token');
      } else {
        throw new Error(`Failed to fetch applicant data: ${e.message}`);
      }
    }

    // Validate API response
    if (!apiResponse) {
      throw new Error('Empty response from HubSpot API');
    }

    if (!apiResponse.properties) {
      throw new Error('Invalid response format: missing properties');
    }

    // Add the objectId to the response for proper tracking
    const responseWithId = {
      ...apiResponse.properties,
      objectId
    };

    // Prepare success response
    const successResponse = {
      status: 'SUCCESS',
      body: responseWithId
    };

    // Send response if callback is available
    if (typeof sendResponse === 'function') {
      sendResponse(successResponse);
    }

    return successResponse;

  } catch (error) {
    console.error('Error in serverless function:', error);
    
    // Prepare error response
    const errorResponse = {
      status: 'ERROR',
      body: {
        message: error.message || 'An unexpected error occurred',
        code: error.statusCode || 'UNKNOWN_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    };

    // Send error response if callback is available
    if (typeof sendResponse === 'function') {
      sendResponse(errorResponse);
    }

    return errorResponse;
  }
}; 