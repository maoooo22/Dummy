const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");

canvas.width = 1080;
canvas.height = 1080;

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const testWidth = context.measureText(testLine).width;

    if (testWidth > maxWidth && line !== "") {
      lines.push(line.trim());
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());

  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], x, y + i * lineHeight);
  }
}

generateBtn.addEventListener("click", () => {
  const text = document.getElementById("text-input").value.trim();
  if (!text) return alert("Masukkan teks dulu!");

  const img = new Image();
  img.src = "/Screenshot_20250702-224314.jpg";
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const x = canvas.width / 2;
    const y = canvas.height - 220;
    const maxWidth = 900;
    const lineHeight = 60;

    wrapText(ctx, text, x, y, maxWidth, lineHeight);

    // siapin download
    const dataURL = canvas.toDataURL("image/png");
    downloadBtn.href = dataURL;
  };
});
