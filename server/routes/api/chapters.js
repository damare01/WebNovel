var express = require('express');
var router = express.Router();
var Chapter = require('../../models/chapter');

/**
 * @swagger
 * definition:
 *   Chapter:
 *     properties:
 *       author:
 *         type: string
 *       title:
 *         type: string
 *       body:
 *         type: string
 *       parent:
 *         type: string
 *       children:
 *         type: string[]
 */

/**
 * @swagger
 * /chapters:
 *   get:
 *     tags:
 *       - Chapters
 *     description: Returns all chapters
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of hapters
 *         schema:
 *           $ref: '#/definitions/Chapter'
 */
router.get('/', (req, res) => {
  Chapter.find((err, chapters) => {
    res.send(chapters);
  })
});

module.exports = router;

