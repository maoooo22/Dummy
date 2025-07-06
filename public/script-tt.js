function downloadVideo() {
  const url = document.getElementById("tt-url").value;
  if (!url) return alert("Masukkan URL TikTok terlebih dahulu.");

  // GANTI URL API sesuai kebutuhan kamu
  fetch(`/api/tiktok?url=${encodeURIComponent(url)}&type=video`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("result").innerHTML =
          `<a href="${data.download}" target="_blank">Download Video</a>`;
      } else {
        alert("Gagal mendapatkan video.");
      }
    });
}

function downloadAudio() {
  const url = document.getElementById("tt-url").value;
  if (!url) return alert("Masukkan URL TikTok terlebih dahulu.");

  fetch(`/api/tiktok?url=${encodeURIComponent(url)}&type=audio`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("result").innerHTML =
          `<a href="${data.download}" target="_blank">Download Musik</a>`;
      } else {
        alert("Gagal mendapatkan audio.");
      }
    });
}
