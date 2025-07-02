const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  const lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], x, y + i * lineHeight);
  }
}

generateBtn.addEventListener("click", () => {
  const text = document.getElementById("text-input").value.trim();
  const img = new Image();
  img.src = "/Screenshot_20250702-224314.jpg";
  img.onload = function () {
    canvas.width = 1080;
    canvas.height = 1080;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.font = "bold 50px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    wrapText(ctx, text, canvas.width / 2, canvas.height - 250, 900, 60);

    const dataURL = canvas.toDataURL("image/png");
    downloadBtn.href = dataURL;
  };
});
