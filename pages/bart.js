// bart.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bart-form");
  const textInput = document.getElementById("text-input");
  const canvas = document.getElementById("bart-canvas");
  const ctx = canvas.getContext("2d");
  const downloadBtn = document.getElementById("download-btn");

  canvas.width = 800;
  canvas.height = 600;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = textInput.value.trim();
    if (!text) return;

    // Gambar latar putih polos
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gambar teks
    ctx.fillStyle = "#000000";
    ctx.font = "bold 32px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    wrapText(ctx, text, canvas.width / 2, canvas.height / 2, 700, 40);
  });

  downloadBtn.addEventListener("click", () => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "bart-generator.png";
    link.click();
  });

  // Fungsi wrap text
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let lines = [];
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const startY = y - (lines.length / 2) * lineHeight;
    lines.forEach((l, i) => {
      context.fillText(l.trim(), x, startY + i * lineHeight);
    });
  }
});
