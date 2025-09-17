const xss = require("xss");

module.exports = (template, injectionObject) => {
  for (const key in injectionObject) {
    template = template.replaceAll(key, xss(injectionObject[key]));
  }

  return template;
};
