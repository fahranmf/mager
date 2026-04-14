const db = require("../config/db");

// USER
exports.createPayment = async (req, res) => {
  const { user_id, course_id, payment_id, total_bayar, nota_url } = req.body;

  await db.query(
    `INSERT INTO user_payment 
    (user_id, course_id, payment_id, total_bayar, status_pembayaran, nota_url)
    VALUES ($1,$2,$3,$4,'Pending',$5)`,
    [user_id, course_id, payment_id, total_bayar, nota_url]
  );

  res.json({ message: "Pembayaran dibuat" });
};

// ADMIN
exports.getAllPayments = async (req, res) => {
  const result = await db.query("SELECT * FROM user_payment");
  res.json(result.rows);
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await db.query(
    "UPDATE user_payment SET status_pembayaran=$1 WHERE payment_trx_id=$2",
    [status, id]
  );

  res.json({ message: "Status diupdate" });
};

// MASTER PAYMENT
exports.createPaymentMethod = async (req, res) => {
  const { nama_metode, kategori } = req.body;

  await db.query(
    "INSERT INTO payment (nama_metode, kategori) VALUES ($1,$2)",
    [nama_metode, kategori]
  );

  res.json({ message: "Metode ditambah" });
};

exports.getPaymentMethods = async (req, res) => {
  const result = await db.query("SELECT * FROM payment");
  res.json(result.rows);
};

exports.updatePaymentMethod = async (req, res) => {
  const { id } = req.params;
  const { nama_metode, kategori, is_active } = req.body;

  await db.query(
    "UPDATE payment SET nama_metode=$1, kategori=$2, is_active=$3 WHERE payment_id=$4",
    [nama_metode, kategori, is_active, id]
  );

  res.json({ message: "Metode diupdate" });
};

exports.deletePaymentMethod = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM payment WHERE payment_id=$1", [id]);

  res.json({ message: "Metode dihapus" });
};