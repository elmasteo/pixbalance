const fetch = require('node-fetch');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { url, method, headers, body } = JSON.parse(event.body);

    const fetchOptions = {
      method: method || 'PUT',
      headers,
      body: body ? JSON.stringify(body) : undefined
    };

    const response = await fetch(url, fetchOptions);
    const resText = await response.text();

    return {
      statusCode: response.status,
      body: resText,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
