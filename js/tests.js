const context = require.context(
  "./",
  true,
  /\.test.js$/  // Pick only files ending in .test.js
);

// Execute each test suite
context.keys().forEach(context);