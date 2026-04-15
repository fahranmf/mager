const db = require("../config/db");

exports.getCourses = async (req, res) => {
  const result = await db.query("SELECT * FROM courses");
  res.json(result.rows);
};

exports.createCourse = async (req, res) => {
  const { admin_id, nama_course, deskripsi, tipe_course, harga } = req.body;

  if (!admin_id || !nama_course || !tipe_course) {
    return res.status(400).json({
      status: "error",
      message: "Data tidak lengkap",
    });
  }

  try {
    const result = await db.query(
      `INSERT INTO courses (admin_id, nama_course, deskripsi, tipe_course, harga)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [admin_id, nama_course, deskripsi, tipe_course, harga]
    );

    res.json({
      status: "success",
      data: result.rows,
      message: "Course berhasil dibuat",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { nama_course, deskripsi, tipe_course, harga } = req.body;

  try {
    const result = await db.query(
      `UPDATE courses 
       SET nama_course=$1, deskripsi=$2, tipe_course=$3, harga=$4, updated_at=NOW()
       WHERE course_id=$5 RETURNING *`,
      [nama_course, deskripsi, tipe_course, harga, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Course tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      data: result.rows,
      message: "Course berhasil diupdate",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM courses WHERE course_id=$1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Course tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      data: result.rows,
      message: "Course berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};