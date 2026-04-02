// api/player-last5.js
// Vercel serverless function — fetches last 5 game stats for a player

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { playerId } = req.query;

  if (!playerId) {
    return res.status(400).json({ error: 'Missing query param: playerId' });
  }

  if (!process.env.BALLDONTLIE_API_KEY) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  try {
    const url = `https://api.balldontlie.io/nba/v1/stats?player_ids[]=${encodeURIComponent(playerId)}&per_page=5&sort_by=game_date&direction=desc`;

    const response = await fetch(url, {
      headers: {
        Authorization: process.env.BALLDONTLIE_API_KEY,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: `Upstream API error: ${response.status}`, detail: text });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
};
