const db = require("../config/db");

// MASTER
exports.getSchedules = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM schedules");

    res.json({
      status: "success",
      data: result.rows,
      message: "ok",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
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

  if (!user_id || !schedule_id || !tanggal_pelaksanaan || !jam_pelaksanaan) {
    return res.status(400).json({
      status: "error",
      message: "Data tidak lengkap",
    });
  }

  try {
    const result = await db.query(
      `INSERT INTO user_schedules 
      (user_id, schedule_id, tanggal_pelaksanaan, jam_pelaksanaan, waktu_alarm)
      VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [user_id, schedule_id, tanggal_pelaksanaan, jam_pelaksanaan, waktu_alarm]
    );

    res.json({
      status: "success",
      data: result.rows,
      message: "Jadwal berhasil dibuat",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// tambah di scheduleController

exports.getUserSchedules = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM user_schedules WHERE user_id=$1",
      [user_id]
    );

    res.json({
      status: "success",
      data: result.rows,
      message: "ok",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM user_schedules WHERE user_schedule_id=$1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Jadwal tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      data: result.rows,
      message: "Jadwal berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};