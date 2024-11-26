// craco.config.js
module.exports = {
    webpack: {
      configure: {
        resolve: {
          fallback: {
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "util": require.resolve("util/"),
            "stream": require.resolve("stream-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "url": require.resolve("url/"),
            "assert": require.resolve("assert/"),
          }
        }
      }
    }
  };
  