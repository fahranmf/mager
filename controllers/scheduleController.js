const db = require("../config/db");

// MASTER
exports.getSchedules = async (req, res) => {
  const result = await db.query("SELECT * FROM schedules");
  res.json(result.rows);
};

// USER
exports.createUserSchedule = async (req, res) => {
  const {
    user_id,
    schedule_id,
    tanggal_pelaksanaan,
    jam_pelaksanaan,
    waktu_alarm,
  } = req.body;

  await db.query(
    `INSERT INTO user_schedules 
    (user_id, schedule_id, tanggal_pelaksanaan, jam_pelaksanaan, waktu_alarm)
    VALUES ($1,$2,$3,$4,$5)`,
    [user_id, schedule_id, tanggal_pelaksanaan, jam_pelaksanaan, waktu_alarm]
  );

  res.json({ message: "Jadwal dibuat" });
};

// tambah di scheduleController

exports.getUserSchedules = async (req, res) => {
  const { user_id } = req.params;

  const result = await db.query(
    "SELECT * FROM user_schedules WHERE user_id=$1",
    [user_id]
  );

  res.json(result.rows);
};

exports.deleteSchedule = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM user_schedules WHERE user_schedule_id=$1", [id]);

  res.json({ message: "Jadwal dihapus" });
};