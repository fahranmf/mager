const db = require("../config/db");

exports.getUserCourses = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({
      status: "error",
      message: "User ID wajib diisi",
    });
  }

  try {
    const result = await db.query(
      `SELECT 
        uc.user_course_id,
        uc.course_id,
        uc.tanggal_daftar,
        uc.status_akses,
        c.nama_course,
        c.tipe_course,
        c.harga
      FROM user_courses uc
      JOIN courses c ON uc.course_id = c.course_id
      WHERE uc.user_id=$1`,
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Course tidak ditemukan untuk user ini",
      });
    }

    res.json({
      status: "success",
      data: result.rows,
      message: "ok",
    });
  } catch (err) {
    console.error("GET USER COURSES ERROR:", err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};