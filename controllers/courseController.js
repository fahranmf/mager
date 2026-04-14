const db = require("../config/db");

exports.getCourses = async (req, res) => {
  const result = await db.query("SELECT * FROM courses");
  res.json(result.rows);
};

exports.createCourse = async (req, res) => {
  const { admin_id, nama_course, deskripsi, tipe_course, harga } = req.body;

  await db.query(
    `INSERT INTO courses (admin_id, nama_course, deskripsi, tipe_course, harga)
     VALUES ($1,$2,$3,$4,$5)`,
    [admin_id, nama_course, deskripsi, tipe_course, harga]
  );

  res.json({ message: "Course berhasil dibuat" });
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { nama_course, deskripsi, tipe_course, harga } = req.body;

  await db.query(
    `UPDATE courses 
     SET nama_course=$1, deskripsi=$2, tipe_course=$3, harga=$4, updated_at=NOW()
     WHERE course_id=$5`,
    [nama_course, deskripsi, tipe_course, harga, id]
  );

  res.json({ message: "Course diupdate" });
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM courses WHERE course_id=$1", [id]);

  res.json({ message: "Course dihapus" });
};