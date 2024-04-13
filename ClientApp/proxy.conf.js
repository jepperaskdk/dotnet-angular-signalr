const PROXY_CONFIG = [
  {
    context: ["/api"],
    proxyTimeout: 10000,
    target: "http://localhost:5000",
    secure: false,
    headers: {
      Connection: "Keep-Alive",
    },
  },
];

module.exports = PROXY_CONFIG;
