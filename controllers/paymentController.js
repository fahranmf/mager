const db = require("../config/db");

// USER
exports.createPayment = async (req, res) => {
  const { user_id, course_id, payment_id, total_bayar, nota_url } = req.body;

  if (!user_id || !course_id || !payment_id || !total_bayar) {
    return res.status(400).json({
      status: "error",
      message: "Data tidak lengkap",
    });
  }

  try {
    await db.query(
      `INSERT INTO user_payment 
      (user_id, course_id, payment_id, total_bayar, status_pembayaran, nota_url)
      VALUES ($1,$2,$3,$4,'Pending',$5)`,
      [user_id, course_id, payment_id, total_bayar, nota_url]
    );

    res.json({
      status: "success",
      data: [],
      message: "Pembayaran berhasil dibuat",
    });
  } catch (err) {
    console.error("CREATE PAYMENT ERROR:", err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// ADMIN
exports.getAllPayments = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM user_payment");

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

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await db.query(
      "UPDATE user_payment SET status_pembayaran=$1 WHERE payment_trx_id=$2 RETURNING *",
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      data: result.rows,
      message: "Status berhasil diupdate",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
// MASTER PAYMENT
exports.createPaymentMethod = async (req, res) => {
  const { nama_metode, kategori } = req.body;

  if (!nama_metode || !kategori) {
    return res.status(400).json({
      status: "error",
      message: "Data tidak lengkap",
    });
  }

  try {
    await db.query(
      "INSERT INTO payment (nama_metode, kategori) VALUES ($1,$2)",
      [nama_metode, kategori]
    );

    res.json({
      status: "success",
      data: [],
      message: "Metode berhasil ditambahkan",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getPaymentMethods = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM payment");

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
exports.updatePaymentMethod = async (req, res) => {
  const { id } = req.params;
  const { nama_metode, kategori, is_active } = req.body;

  try {
    const result = await db.query(
      "UPDATE payment SET nama_metode=$1, kategori=$2, is_active=$3 WHERE payment_id=$4 RETURNING *",
      [nama_metode, kategori, is_active, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Metode tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      data: result.rows,
      message: "Metode diupdate",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deletePaymentMethod = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM payment WHERE payment_id=$1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Metode tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      data: result.rows,
      message: "Metode dihapus",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};