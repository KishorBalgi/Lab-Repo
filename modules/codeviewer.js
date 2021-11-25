module.exports = (temp, data) => {
  let code = data.code.replace(/;/g, ";<br>");
  code = code.replace(/{/g, "{<br>");
  code = code.replace(/}/g, "<br>}");
  code = code.replace(/</g, "&lt;");
  code = code.replace(/>/g, "&gt;<br>");

  let output = temp.replace(/{%TITLE%}/g, data.id.toUpperCase());
  output = output.replace(/{%TIME%}/g, Date(data.timestamp));
  output = output.replace(/{%CODE%}/g, code);
  return output;
};
