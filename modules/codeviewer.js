module.exports = (temp, data) => {
  let code = data.code.replace(/</g, "&lt;");
  code = code.replace(/>/g, "&gt;");

  let output = temp.replace(/{%TITLE%}/g, data.id.toUpperCase());
  output = output.replace(/{%TIME%}/g, data.timestamp.toDate());
  output = output.replace(/{%CODE%}/g, code);
  return output;
};