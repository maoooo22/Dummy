// pages/api/tiktok.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing TikTok URL" });
  }

  try {
    // Step 1: Get verification token from homepage
    const homepage = await fetch("https://ttdownloader.com");
    const html = await homepage.text();
    const token = html.match(/name="token" value="(.*?)"/)[1];

    // Step 2: Post URL + token ke ttdownloader
    const formData = new URLSearchParams();
    formData.append("url", url);
    formData.append("format", "");
    formData.append("token", token);

    const response = await fetch("https://ttdownloader.com/req/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://ttdownloader.com/",
        "User-Agent": "Mozilla/5.0",
      },
      body: formData.toString(),
    });

    const resultHtml = await response.text();

    // Extract link hasil
    const videoNoWatermark = resultHtml.match(/id="download-url"\s*href="(.*?)"/)?.[1];
    const videoWithWatermark = resultHtml.match(/id="download-url-wm"\s*href="(.*?)"/)?.[1];
    const music = resultHtml.match(/id="download-url-music"\s*href="(.*?)"/)?.[1];

    if (!videoNoWatermark || !music) {
      return res.status(500).json({ error: "Gagal mengambil link download. Coba lagi nanti." });
    }

    res.status(200).json({
      video_no_watermark: videoNoWatermark,
      video_watermark: videoWithWatermark,
      music,
    });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error." });
  }
}
