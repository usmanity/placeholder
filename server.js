const express = require("express");
const app = express();
const { createCanvas } = require("canvas");
const { convert } = require("convert-svg-to-png");

const port = process.env.PORT || 3000;

app.get(["/"], (req, res) => {
  greeting =
    "<h3>Get a placeholder image using `width x height` in the URL</h3>";
  res.send(greeting);
});

app.get("/:size", async (req, res) => {
  const size = getSize(req.params["size"]);
  console.log({ size });
  if (size[0] > 10000 || size[1] > 10000) {
    res.send("Requested image too large");
    return;
  }

  const svgImage = getSvgImage(size);
  console.log({ svgImage });
  const png = await convert(svgImage);

  res.set("Content-Type", "image/png");
  res.send(png);
});

app.listen(port, () =>
  console.log(`Placeholder app listening on port ${port}!`)
);

// returns a size of either [width, height]
function getSize(params) {
  if (params.includes("x")) {
    const splitSize = params.split("x");
    return [parseInt(splitSize[0]), parseInt(splitSize[1])];
  } else {
    return [parseInt(params), parseInt(params)];
  }
}

function getSvgImage(size) {
  const [width, height] = size;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="none" viewBox="0 0 400 400">
    <path fill="#D9D9D9" d="M0 0h400v400H0z"/>
    <text x="25%" y="50%" font-family="monospace" font-size="35" fill="#262626">${width} x ${height}</text>
  </svg>`;
}
