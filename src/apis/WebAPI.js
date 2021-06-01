import Cookies from '../store/cookies'

class WebAPI {
  constructor({endpoint}) {
    this.endpoint = endpoint
  }

  async __post (url, data, options) {
    options = options ?? {}
    url = url || ''
    let calling = this.endpoint + url
    const response = await fetch(calling, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async __fetch (url, data, options) {
    options = options ?? {}
    url = url || ''
    let authHeader = {"authorization": Cookies.AuthToken.get()}
    let headers = {
      'Content-Type': 'application/json',
      ...options.headers
    }
    if (options.auth !== false) {
      headers = {...headers, ...authHeader}
    }
    let calling = this.endpoint + url
    const response = await fetch(calling, {
      method: options.method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers,
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async __post(url, data, options) {
    options = options ?? {}
    options.method = 'POST'
    return this.__fetch(url, data, options)
  }

  async __put(url, data, options) {
    options = options ?? {}
    options.method = 'PUT'
    return this.__fetch(url, data, options)
  }

  async __get(url, options) {
    const response = await fetch(url)
    return response.json();
  }
}

export default WebAPI
