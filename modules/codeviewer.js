module.exports = (temp, data) => {
  const date = new Date(data.timestamp.seconds * 1000);
  let code = data.code.replace(/</g, "&lt;");
  code = code.replace(/>/g, "&gt;");

  let output = temp.replace(/{%TITLE%}/g, data.id.toUpperCase());
  output = output.replace(
    /{%TIME%}/g,
    date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  );
  output = output.replace(/{%CODE%}/g, code);
  return output;
};
