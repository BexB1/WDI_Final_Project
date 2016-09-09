dbURIs = {
  test: "mongodb://localhost/londate",
  development: "mongodb://localhost/londate",
  production: process.env.MONGOLAB_URI || "mongodb://localhost/londate"
}

module.exports = function(env) {
  return dbURIs[env];
}