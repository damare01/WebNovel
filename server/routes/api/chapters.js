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
 *         type: "array"
 *         items:
 *          type: "string"
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
 *        description: An array of chapters
 *        schema:
 *          $ref: '#/definitions/Chapter'
 */
router.get('/', (req, res) => {
  Chapter.find((err, chapters) => {
    res.send(chapters);
  })
});

/**
 * @swagger
 * /chapters/id/{id}:
 *   get:
 *     tags:
 *       - Chapters
 *     description: Returns the chapter with the provided id
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "id"
 *        in: "path"
 *        description: "Chapter id"
 *        required: true
 *        type: "string"
 *     responses:
 *      200:
 *        description: A chapter object
 *        schema:
 *          $ref: '#/definitions/Chapter'
 *
 */
router.get('/id/:id', (req, res) => {
  let id = req.params.id;
  Chapter.findOne({_id: id}, (err, chapter) => {
    if (err) {
      res.sendStatus(500);
    } else if (!chapter) {
      res.sendStatus(204);
    } else {
      res.send(chapter);
    }
  })
});

/**
 * @swagger
 * /chapters:
 *   post:
 *    tags:
 *      - Chapters
 *    description: "Adds a new chapter to the db"
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: "201 when successfully created"
 *      500:
 *        description: "500 when there was an error"
 */
router.post('/', (req, res) => {
  let chapter = req.body;
  Chapter.save(chapter, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  })
});


module.exports = router;

