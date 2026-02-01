// Vercel serverless function handler
const express = require("express");
const { registerRoutes } = require("../server/routes");
const { serveStatic } = require("../server/static");

const app = express();

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Register API routes
(async () => {
  await registerRoutes(null, app);
  
  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  }
})();

module.exports = app;
