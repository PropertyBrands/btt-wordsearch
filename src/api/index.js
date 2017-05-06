/**
 * Here's how we query for stuff.
 */

/**
 * ENDPOINT represents the web endpoint for queries.
 *
 * @todo Calculate this in a sensible fashion.
 */
const ENDPOINT = 'change/me';

/**
 * queryForResults hits our configured endpoint for query results
 *
 * @param {object} - The query parameters to utilize
 *
 * @return {Promise}
 */
const queryForResultsReal = query =>
  fetch(`${ENDPOINT}?${hashToParams(query)}`);

// Just a mockup for now.
const queryForResults = query =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(['result', 'result', 'result']);
    }, 300);
  });

export { queryForResults };
