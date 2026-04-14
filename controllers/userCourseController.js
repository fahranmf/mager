const db = require("../config/db");

exports.getUserCourses = async (req, res) => {
  const { user_id } = req.params;

  const result = await db.query(
    `SELECT uc.*, c.nama_course 
     FROM user_courses uc
     JOIN courses c ON uc.course_id = c.course_id
     WHERE uc.user_id=$1`,
    [user_id]
  );

  res.json(result.rows);
};