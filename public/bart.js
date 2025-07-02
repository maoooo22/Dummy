window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const downloadBtn = document.getElementById("download");
  const inputText = document.getElementById("text");

  const img = new Image();
  img.src = "/Screenshot_20250702-224314.jpg"; // Gambar polos Bart

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    // Gambar background awal
    ctx.drawImage(img, 0, 0);
  };

  inputText.addEventListener("input", () => {
    // Bersihkan dan render ulang gambar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Tulis teks
    ctx.font = "bold 36px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    // Bungkus teks panjang
    const maxWidth = canvas.width - 60;
    const lineHeight = 40;
    const lines = wrapText(ctx, inputText.value, maxWidth);

    lines.forEach((line, i) => {
      ctx.fillText(line, canvas.width / 2, canvas.height - 100 + i * lineHeight);
    });
  });

  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "bart-generator.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  // Fungsi untuk membungkus teks panjang jadi banyak baris
  function wrapText(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }
};
