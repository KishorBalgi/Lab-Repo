module.exports = (temp, data) => {
  const date = new Date(data.timestamp.seconds * 1000);
  let code = data.code.replace(/</g, "&lt;");
  code = code.replace(/>/g, "&gt;");
  // Highlightings
  code = code.replace(
    /\b(import|class|interface|abstract|println|print)\b/g,
    (x) => `<span class="h-blue">${x}</span>`
  );

  code = code.replace(
    /\b(private|protected|public|static|new|java|Math|System)\b/g,
    (x) => `<span class="h-brown">${x}</span>`
  );

  code = code.replace(
    /\b(int|float|double|void|String|char|long|short)\b/g,
    (x) => `<span class="h-green">${x}</span>`
  );

  code = code.replace(
    /\b(if|else|for|while|do|switch)\b/g,
    (x) => `<span class="h-violet">${x}</span>`
  );

  let output = temp.replace(/{%TITLE%}/g, data.id.toUpperCase());
  output = output.replace(
    /{%TIME%}/g,
    date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  );
  output = output.replace(/{%CODE%}/g, code);
  return output;
};
