

const db = require("../config/db"); 


exports.createUser = (req, res) => {
    const user = req.body;
    const sql = "INSERT INTO users (name, email, phoneNumber, busNumber) VALUES (?, ?, ?, ?)";
    db.query(sql, [user.name, user.email, user.phoneNumber, user.busNumber], (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).send({ id: result.insertId, ...user });
    });
};


exports.getUsers = (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
};

exports.deleteUser = (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully" });
    });
};
