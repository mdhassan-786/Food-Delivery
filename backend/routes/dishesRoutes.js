const express = require("express");

const { sendDishes } = require("../controller/dishescontroller");

const router = express.Router();

/**
 * @openapi
 * /api/dishes:
 *   get:
 *     description: Welcome to Dishes api
 *     responses:
 *       200:
 *         description: Returns a dishes api
 */

router.get("/dishes", sendDishes);

module.exports = router;
