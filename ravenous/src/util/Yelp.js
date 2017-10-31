const clientId= '4k3KM9xla823kEW19iINuQ';
const secret = 'j6kA34kUzLxr3CaMXOYjZXMa4Nm5Y6I5ucdpCMsvA8InBkZYrM3Ov3MCP2WtzOxp';
let accessToken = '';

let Yelp = {
  getAccessToken: function() {
    if (accessToken) {
      return new Promise(function(resolve) {
        resolve(accessToken);
      });
    }
    return fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + secret, {
      method: 'POST'
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },
  search: function(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      return fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term='+ term + '&location=' + location + '&sort_by=' + sortBy, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      }).then(response => {
        return response.json();
      }).then(function(jsonResponse) {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(function(business) {
            return {
              id:business.id,
              imageSrc:business.image_url,
              name:business.name,
              address:business.location.address1,
              city:business.location.city,
              state:business.location.state,
              zipCode:business.location.zip_code,
              category:business.categories[0].title,
              rating:business.rating,
              reviewCount:business.review_count
            };
          });
        }
      });
    })
  }
};

export default Yelp;
