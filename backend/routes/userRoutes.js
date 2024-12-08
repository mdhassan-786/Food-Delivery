const express = require("express");

const { loginUser, signupUser } = require("../controller/usercontroller");

const router = express.Router();

router.post("/login", loginUser);

/**

 * @swagger

 * /login:

 *   post:

 *     summary: User login

 *     description: Logs in a user with email and password.

 *     requestBody:

 *       required: true

 *       content:

 *         application/json:

 *           schema:

 *             type: object

 *             properties:

 *               email:

 *                 type: string

 *                 format: email

 *                 description: The user's email address

 *               password:

 *                 type: string

 *                 format: password

 *                 description: The user's password

 *             required:

 *               - email

 *               - password

 *     responses:

 *       200:

 *         description: Login successful

 */
router.post("/signup", signupUser);

/**
 * @openapi
 * /api/signup:
 *   post:
 *     description: Welcome to sign up api
 *     responses:
 *       200:
 *         description: Returns token and user
 */

module.exports = router;
