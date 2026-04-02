export default async function handler(req, res) {
  const playerId = req.query.playerId;

  if (!playerId) {
    return res.status(400).json({ error: "Missing playerId" });
  }

  try {
    const response = await fetch(
      `https://api.balldontlie.io/nba/v1/stats?player_ids[]=${playerId}&per_page=5`,
      {
        headers: {
          Authorization: process.env.BALLDONTLIE_API_KEY,
        },
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch last 5 games", details: error.message });
  }
}