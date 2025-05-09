
function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// Specify the BASE_URL for the API.
export const BASE_URL = "http://localhost:3001";

// The register function accepts the necessary data as arguments,
// and sends a POST request to the given endpoint.
export const register = (email, password, name, avatar,) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {  
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password, name, avatar}),
  }).then(checkResponse);
};

// The authorize function accepts the necessary data as parameters.
export const authorize = (email, password) => {
  // A POST request is sent to /auth/local.
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // The parameters are wrapped in an object, converted to a JSON
    // string, and sent in the body of the request.
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};
