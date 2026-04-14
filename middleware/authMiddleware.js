// dummy middleware (belum JWT, cuma contoh role)
exports.checkRole = (role) => {
  return (req, res, next) => {
    const userRole = req.headers["role"]; // kirim dari Postman

    if (!userRole || userRole !== role) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    next();
  };
};