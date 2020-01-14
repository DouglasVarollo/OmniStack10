const { Router } = require("express");

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hello OmniStack" });
});

module.exports = routes;
