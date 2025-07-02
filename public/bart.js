const downloadBtn = document.getElementById("download-btn");
const textInput = document.getElementById("text-input");
const previewImage = document.getElementById("preview-image");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "./bart-template.png"; // letakkan gambar ini di public folder

backgroundImage.onload = () => {
  canvas.width = backgroundImage.width;
  canvas.height = backgroundImage.height;
  drawCanvas();
};

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0);

  const text = textInput.value;
  ctx.font = "bold 32px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  wrapText(ctx, text, canvas.width / 2, 470, 400, 36);

  // update preview image
  previewImage.src = canvas.toDataURL("image/png");
}

textInput.addEventListener("input", drawCanvas);

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "bart-generator.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}
