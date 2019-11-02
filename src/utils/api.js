import axios from "axios";

export default async (url, type) => {
  /**
   * I have defined this variable __isBrowser__ at both server and client webpack config files
   * If the call is from the server then we need to append the full url,
   * At the server/index.js file I am setting the domain/endpoint
   * Note: I have added this variable as part of global declaration on
   * .eslintrc.js and jest.config.js so that it does not throw undefined!
   */
  if (!__isBrowser__) {
    url = process.env.API_ENDPOINT + url;
  }

  let collection;

  switch (true) {
    case type === "get":
      await axios
        .get(url)
        .then(res => {
          collection = res;
        })
        .catch(err => {
          collection = err;
        });
      break;
    case type === "post":
      await axios
        .post(url)
        .then(res => {
          collection = res;
        })
        .catch(err => {
          collection = err;
        });
      break;
    default:
      break;
  }

  return collection.data;
};
