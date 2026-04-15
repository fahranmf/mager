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
      const { password, ...adminData } = admin.rows[0];

      return res.json({
        status: "success",
        data: [adminData],
        message: "Login berhasil sebagai admin",
      });
    }

    // cek user
    const user = await db.query(
      "SELECT * FROM users WHERE email=$1 AND password=$2",
      [email, password]
    );

    if (user.rows.length > 0) {
      const { password, ...userData } = user.rows[0];

      return res.json({
        status: "success",
        data: [userData],
        message: "Login berhasil sebagai user",
      });
    }

    return res.status(401).json({
      status: "error",
      message: "Email atau password salah",
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err); 

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};