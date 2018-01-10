function Person (GraphRequest) {
  // this.getProfile = getProfile;  
  // this.getMatchingPsids = getMatchingPsids;
  // this.getMatchingAsids = getMatchingAsids;
  // this.send = send.bind(GraphRequest);
}

function getProfile (psid, fields) {
  return new Promise (async (resolve, reject) => {
    if (!psid || !fields) {
      reject('PSID and fields required');
    }
    fields = fields.join(',');
    let options = {
      'endpoint': '/' + psid,
      'qs': {'fields': fields}
    }

    try {
      let response = await this.send(options);
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

function matchPsids (id_type, id) {
  return new Promise (async (resolve, reject) => {
    if (!id_type || !id) {
      reject('id_type and id required');
    }  
    
    let options = {
      'endpoint': `/${id}/ids_for_pages`,
      'qs': {'access_token': 'test'}
    }
    
    try {
      let response = await this.send(options);
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

function matchAsids (id_type, id) {
  return new Promise (async (resolve, reject) => {
    if (!id_type || !id) {
      reject('id_type and id required');
    }
    options.endpoint = `/${id}/ids_for_apps`
    
    try {
      let response = await this.send(options);
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

function send (options) {
  return new Promise (async (resolve, reject) => {
    if (!options) {
      reject('Options object required');
    }
    let path;
    let request_options = {
      'qs': options.qs || {}    
    };
    
    if (options.endpoint) request_options.path += options.endpoint;

    if (options.id_type === 'asid') {
      request_options.qs.access_token = this.getAppToken();
    }

    try {
      let response = await this.sendGraphRequest(request_options);
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = Person;