const db = require("../config/db");

exports.exportProgress = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({
      status: "error",
      message: "User ID wajib diisi",
    });
  }

  try {
    const result = await db.query(
      "SELECT * FROM user_schedules WHERE user_id=$1",
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      data: result.rows,
      message: "Export berhasil",
    });

  } catch (err) {
    console.error("EXPORT ERROR:", err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};