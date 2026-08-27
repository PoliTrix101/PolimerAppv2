require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@libsql/client");

const app = express();

// ==================================================
// MIDDLEWARE
// ==================================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================================================
// TURSO DATABASE
// ==================================================

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

// ==================================================
// HOME
// ==================================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "PolimerApp API is running",
    });
});

// ==================================================
// TEST DATABASE
// ==================================================

app.get("/api/test-db", async (req, res) => {
    try {
        const result = await db.execute("SELECT 1 AS test");

        res.json({
            success: true,
            message: "Turso database connected",
            data: result.rows,
        });
    } catch (error) {
        console.error("DATABASE ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message,
        });
    }
});

// ==================================================
// GET ALL USERS
// ==================================================

app.get("/api/users", async (req, res) => {
    try {
        const result = await db.execute(`
            SELECT
                user_id,
                user_login,
                user_pass,
                fname,
                lname,
                gender,
                user_level,
                branch_cd,
                email,
                registered,
                user_activation_key,
                isActive
            FROM users
            ORDER BY user_id ASC
        `);

        res.status(200).json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error("GET USERS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
});

// ==================================================
// GET USER BY ID
// ==================================================

app.get("/api/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }

        const result = await db.execute({
            sql: `
                SELECT
                    user_id,
                    user_login,
                    user_pass,
                    fname,
                    lname,
                    gender,
                    user_level,
                    branch_cd,
                    email,
                    registered,
                    user_activation_key,
                    isActive
                FROM users
                WHERE user_id = ?
            `,
            args: [id],
        });

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error("GET USER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: error.message,
        });
    }
});

// ==================================================
// LOGIN
// POST /api/login
// ==================================================

app.post("/api/login", async (req, res) => {
    try {
        console.log("\n====================================");
        console.log("LOGIN REQUEST");
        console.log("====================================");

        console.log("Request body:", req.body);

        const { user_login, user_pass } = req.body || {};

        // ------------------------------------------
        // VALIDATION
        // ------------------------------------------

        if (
            typeof user_login !== "string" ||
            typeof user_pass !== "string"
        ) {
            console.log("❌ Invalid request format");

            return res.status(400).json({
                success: false,
                message: "user_login and user_pass must be strings",
            });
        }

        const username = user_login.trim();
        const password = user_pass.trim();

        if (username === "" || password === "") {
            console.log("❌ Empty username or password");

            return res.status(400).json({
                success: false,
                message: "Username and password are required",
            });
        }

        console.log("Username received:", username);
        console.log("Password length:", password.length);

        // ------------------------------------------
        // FIND USER
        // ------------------------------------------

        const result = await db.execute({
            sql: `
                SELECT
                    user_id,
                    user_login,
                    user_pass,
                    fname,
                    lname,
                    gender,
                    user_level,
                    branch_cd,
                    email,
                    registered,
                    user_activation_key,
                    isActive
                FROM users
                WHERE user_login = ?
                LIMIT 1
            `,
            args: [username],
        });

        console.log("Users found:", result.rows.length);

        // ------------------------------------------
        // USER NOT FOUND
        // ------------------------------------------

        if (result.rows.length === 0) {
            console.log("❌ USER NOT FOUND");
            console.log("Username searched:", username);

            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        const user = result.rows[0];

        console.log("User ID:", user.user_id);
        console.log("Database username:", user.user_login);
        console.log("Database password length:", String(user.user_pass).length);
        console.log("isActive:", user.isActive);

        // ------------------------------------------
        // CHECK PASSWORD
        // ------------------------------------------

        if (String(user.user_pass).trim() !== password) {
            console.log("❌ PASSWORD DOES NOT MATCH");

            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        console.log("✅ PASSWORD MATCH");

        // ------------------------------------------
        // CHECK ACTIVE ACCOUNT
        // ------------------------------------------

        if (Number(user.isActive) !== 1) {
            console.log("❌ ACCOUNT INACTIVE");

            return res.status(403).json({
                success: false,
                message: "This account is inactive",
            });
        }

        // ------------------------------------------
        // REMOVE PASSWORD
        // ------------------------------------------

        delete user.user_pass;

        // ------------------------------------------
        // LOGIN SUCCESS
        // ------------------------------------------

        console.log("✅ LOGIN SUCCESS:", username);
        console.log("====================================\n");

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: user,
        });

    } catch (error) {
        console.error("❌ LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message,
        });
    }
});

// ==================================================
// CREATE USER
// ==================================================

app.post("/api/users", async (req, res) => {
    try {
        const {
            user_login,
            user_pass,
            fname,
            lname,
            gender,
            user_level = 0,
            branch_cd = "",
            email = "",
            user_activation_key = "",
            isActive = 1,
        } = req.body || {};

        if (
            typeof user_login !== "string" ||
            typeof user_pass !== "string" ||
            typeof fname !== "string" ||
            typeof lname !== "string" ||
            typeof gender !== "string" ||
            user_login.trim() === "" ||
            user_pass.trim() === "" ||
            fname.trim() === "" ||
            lname.trim() === "" ||
            gender.trim() === ""
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "user_login, user_pass, fname, lname, and gender are required",
            });
        }

        const cleanLogin = user_login.trim();

        const existingUser = await db.execute({
            sql: "SELECT user_id FROM users WHERE user_login = ?",
            args: [cleanLogin],
        });

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "User login already exists",
            });
        }

        const result = await db.execute({
            sql: `
                INSERT INTO users (
                    user_login,
                    user_pass,
                    fname,
                    lname,
                    gender,
                    user_level,
                    branch_cd,
                    email,
                    user_activation_key,
                    isActive
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            args: [
                cleanLogin,
                user_pass.trim(),
                fname.trim(),
                lname.trim(),
                gender.trim(),
                Number(user_level),
                String(branch_cd).trim(),
                String(email).trim(),
                String(user_activation_key).trim(),
                Number(isActive),
            ],
        });

        const newId = Number(result.lastInsertRowid);

        const newUser = await db.execute({
            sql: `
                SELECT
                    user_id,
                    user_login,
                    fname,
                    lname,
                    gender,
                    user_level,
                    branch_cd,
                    email,
                    registered,
                    user_activation_key,
                    isActive
                FROM users
                WHERE user_id = ?
            `,
            args: [newId],
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser.rows[0],
        });

    } catch (error) {
        console.error("CREATE USER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message,
        });
    }
});

// ==================================================
// UPDATE USER
// ==================================================

app.put("/api/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }

        const existing = await db.execute({
            sql: "SELECT * FROM users WHERE user_id = ?",
            args: [id],
        });

        if (existing.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const oldUser = existing.rows[0];

        const {
            user_login,
            user_pass,
            fname,
            lname,
            gender,
            user_level,
            branch_cd,
            email,
            user_activation_key,
            isActive,
        } = req.body || {};

        const newLogin =
            user_login !== undefined
                ? String(user_login).trim()
                : oldUser.user_login;

        const newPass =
            user_pass !== undefined
                ? String(user_pass)
                : oldUser.user_pass;

        const newFname =
            fname !== undefined
                ? String(fname).trim()
                : oldUser.fname;

        const newLname =
            lname !== undefined
                ? String(lname).trim()
                : oldUser.lname;

        const newGender =
            gender !== undefined
                ? String(gender).trim()
                : oldUser.gender;

        const newUserLevel =
            user_level !== undefined
                ? Number(user_level)
                : oldUser.user_level;

        const newBranch =
            branch_cd !== undefined
                ? String(branch_cd).trim()
                : oldUser.branch_cd;

        const newEmail =
            email !== undefined
                ? String(email).trim()
                : oldUser.email;

        const newActivationKey =
            user_activation_key !== undefined
                ? String(user_activation_key).trim()
                : oldUser.user_activation_key;

        const newIsActive =
            isActive !== undefined
                ? Number(isActive)
                : oldUser.isActive;

        await db.execute({
            sql: `
                UPDATE users
                SET
                    user_login = ?,
                    user_pass = ?,
                    fname = ?,
                    lname = ?,
                    gender = ?,
                    user_level = ?,
                    branch_cd = ?,
                    email = ?,
                    user_activation_key = ?,
                    isActive = ?
                WHERE user_id = ?
            `,
            args: [
                newLogin,
                newPass,
                newFname,
                newLname,
                newGender,
                newUserLevel,
                newBranch,
                newEmail,
                newActivationKey,
                newIsActive,
                id,
            ],
        });

        res.json({
            success: true,
            message: "User updated successfully",
        });

    } catch (error) {
        console.error("UPDATE USER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message,
        });
    }
});

// ==================================================
// DELETE USER
// ==================================================

app.delete("/api/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }

        const existing = await db.execute({
            sql: "SELECT user_id FROM users WHERE user_id = ?",
            args: [id],
        });

        if (existing.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await db.execute({
            sql: "DELETE FROM users WHERE user_id = ?",
            args: [id],
        });

        res.json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        console.error("DELETE USER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message,
        });
    }
});

// ==================================================
// DEBUG USERS TABLE
// ==================================================

app.get("/api/debug/users", async (req, res) => {
    try {
        const result = await db.execute(
            "PRAGMA table_info(users)"
        );

        res.json({
            success: true,
            columns: result.rows,
        });

    } catch (error) {
        console.error("DEBUG ERROR:", error);

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// ==================================================
// 404
// ==================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found",
    });
});

// ==================================================
// START SERVER
// ==================================================

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log("");
        console.log("====================================");
        console.log("🚀 POLIMERAPP API");
        console.log("====================================");
        console.log(`Local: http://localhost:${PORT}`);
        console.log(`Network: http://192.168.1.124:${PORT}`);
        console.log(`Port: ${PORT}`);
        console.log("====================================");
        console.log("");
    });
}

module.exports = app;