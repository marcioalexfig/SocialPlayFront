const dev = {
  remoteServer: {
    baseURL: "http://localhost:10080",
    "IIDSURL" : ""
  }
};

const prod = {
  remoteServer: {
    baseURL: "http://prod-localhost",
    "IIDSURL" : ""
  }
};

const config = process.env.NODE_ENV === 'production'
  ? prod
  : dev;

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};

