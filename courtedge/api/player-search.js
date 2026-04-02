export default async function handler(req, res) {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: "Missing player name" });
  }

  try {
    const response = await fetch(
      `https://api.balldontlie.io/nba/v1/players?search=${encodeURIComponent(q)}`,
      {
        headers: {
          Authorization: process.env.BALLDONTLIE_API_KEY,
        },
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to search player", details: error.message });
  }
}