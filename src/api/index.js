class Api {
  constructor() {
    // this._server = 'http://localhost:5000/api';
    this._server = ' https://floating-fjord-28041.herokuapp.com/api';
  }

  async get(url) {
    try {
      const response = await fetch(this._server + url);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async post(url, properties) {
    const options = Api.requestOptionsBuilder('POST', properties);
    const response = await fetch(this._server + url, options);
    return response;
  }

  async put(url, properties) {
    const options = Api.requestOptionsBuilder('PUT', properties);
    const response = await fetch(this._server + url, options);
    return response;
  }

  async delete(url, properties) {
    const options = Api.requestOptionsBuilder('DELETE', properties);
    const response = await fetch(this._server + url, options);
    return response;
  }

  static requestOptionsBuilder(method, properties) {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(properties),
    };
  }
}

export default new Api();
