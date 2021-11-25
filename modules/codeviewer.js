module.exports = (temp, data) => {
  let code = data.code.replace(/;/g, ";<br/>");
  code = code.replace(/{/g, "{<br/>");
  code = code.replace(/}/g, "<br/>}");

  let output = temp.replace(/{%TITLE%}/g, data.title);
  output = output.replace(/{%TIME%}/g, Date(data.timestamp));
  output = output.replace(/{%CODE%}/g, code);
  return output;
};
