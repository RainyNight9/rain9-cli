import config from '../config'

// check response status
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

// format response data
function parseJson (response) {
  return response.json()
}

// format request params
function parseParams (options = {}) {
  let defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (options.method) {
    return {...defaultOptions,
      ...options,
      ...{data: JSON.stringify(options.data)}
    }
  }
  return defaultOptions
}

export const User = {
  signin (data) {
    return fetch(`${config.API_PATH}/signig`, parseParams({
      data,
      method: 'POST'
    }))
      .then(checkStatus)
      .then(parseJson)
      .then(data => data)
      .catch(err => err)
  }
}
