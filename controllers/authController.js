const db = require("../config/db");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // cek admin
    const admin = await db.query(
      "SELECT * FROM admin WHERE email=$1 AND password=$2",
      [email, password]
    );

    if (admin.rows.length > 0) {
      return res.json({ role: "admin", data: admin.rows[0] });
    }

    // cek user
    const user = await db.query(
      "SELECT * FROM users WHERE email=$1 AND password=$2",
      [email, password]
    );

    if (user.rows.length > 0) {
      return res.json({ role: "user", data: user.rows[0] });
    }

    res.status(401).json({ message: "Login gagal" });
  } catch (err) {
    res.status(500).json(err);
  }
};