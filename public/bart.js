const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");

canvas.width = 1080;
canvas.height = 1080;

generateBtn.addEventListener("click", () => {
  const textInput = document.getElementById("text-input").value.trim();
  if (!textInput) return alert("Masukkan teks dulu!");

  const img = new Image();
  img.src = "/Screenshot_20250702-224314.jpg";

  img.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.font = "bold 50px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lines = textInput.split("\n"); // biar bisa enter
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, canvas.height - 200 + index * 60);
    });

    const dataURL = canvas.toDataURL("image/png");
    downloadBtn.href = dataURL;
  };
});
