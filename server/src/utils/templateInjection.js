import xss from "xss";

export default (template, injectionObject) => {
  for (const key in injectionObject) {
    template = template.replaceAll(key, xss(injectionObject[key]));
  }

  return template;
};
