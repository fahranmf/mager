const db = require("../config/db");

exports.exportProgress = async (req, res) => {
  const { user_id } = req.params;

  const result = await db.query(
    "SELECT * FROM user_schedules WHERE user_id=$1",
    [user_id]
  );

  res.json(result.rows); // simple dulu (JSON)
};