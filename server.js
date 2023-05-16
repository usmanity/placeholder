const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
const { createCanvas } = require("canvas");

app.get(["/"], (req, res) => {
  greeting =
    "<h3>Get a placeholder image using `width x height` in the URL</h3>";
  res.send(greeting);
});

app.get("/:size", (req, res) => {
  const size = getSize(req.params["size"]);
  console.log({ size });
  if (size[0] > 10000 || size[1] > 10000) {
    res.send("Requested image too large");
    return;
  }

  // res.send(`<p>${size}</p>`);
  const i = getImage(size);
  console.log(i);
  res.contentType("image/jpeg");
  res.send(i);
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

function getImage(size) {
  const WIDTH = size[0];
  const HEIGHT = size[1];

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#CCCCCC";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = "#2A1863";
  ctx.font = "32px sans-serif";
  ctx.fillText(`${WIDTH} x ${HEIGHT}`, 16, 32);

  const buffer = canvas.toBuffer("image/jpeg");
  return buffer;
}
