require("./serializers");
require("./localStrategy");
// Only use google if in prod
if (process.env.ENABLE_GOOGLE_LOGIN === 'yes') {
  require("./google");
}
