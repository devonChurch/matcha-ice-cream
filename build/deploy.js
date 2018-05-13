const path = require("path");
const ghpages = require("gh-pages");
const consola = require("consola").withScope("deploy");
const { url } = require("../package.json").repository;
const dirDist = path.resolve(__dirname, "../", "dist");
const params = {
  repo: url,
  remote: "origin"
};
const callback = error => {
  if (error) consola.error(error);
  consola.success("deployment complete");
};

consola.start(`begin deployment to (${url})`);
ghpages.publish(dirDist, params, callback);
