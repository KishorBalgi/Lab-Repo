module.exports = (lab, filelist, explorer) => {
  const f = filelist
    .map(
      (t) => `<a href="/labs/${lab !== "Labs" ? `${lab}/` : `${t}`}"
    ><div class="file">
      <p>${t.toUpperCase()}</p>
    </div></a
  >`
    )
    .join("");
  let files = explorer.replace(/{%TITLE%}/g, lab.toUpperCase());
  files = files.replace(/{%LAB%}/g, lab);
  files = files.replace(/{%FILES%}/g, f);
  return files;
};
