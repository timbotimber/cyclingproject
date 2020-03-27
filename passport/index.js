require("./serializers");
require("./localStrategy");
// Only use google if in prod
if (process.env.NODE_ENV == 'production') {
  require("./google");
}
