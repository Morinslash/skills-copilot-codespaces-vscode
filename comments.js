// create web server
// ==============================

// import express
const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');

// create a comment
router.post('/', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    db.comment.create({
        postId: req.body.postId,
        userId: decoded.id,
        body: req.body.body
    })
    .then((comment) => {
        res.json({comment: comment});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).end();
    })
});

// get all comments
router.get('/', (req, res) => {
    db.comment.findAll()
    .then((comments) => {
        res.json(comments);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).end();
    })
});

// get all comments for a specific post
router.get('/:postId', (req, res) => {
    db.comment.findAll({
        where: {
            postId: req.params.postId
        }
    })
    .then((comments) => {
        res.json(comments);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).end();
    })
});

// update a comment
router.put('/:id', (req, res) => {
    db.comment.update({
        body: req.body.body
    }, {
        where: {
            id: req.params.id
        }
    })
    .then((updatedComment) => {
        res.json(updatedComment);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).end();
    })
});

// delete a comment
router.delete('/:id', (req, res) => {
    db.comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.status(200).end();
    })
    .catch((err) => {
        console.log(err);
        res.status(500).end();
    })
});

module.exports = router;