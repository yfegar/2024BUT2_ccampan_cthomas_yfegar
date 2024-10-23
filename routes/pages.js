 const express = require('express');

const router = express.Router();

router.get('/inscription', function (req, res) {
    res.render("inscription", {error : null});
});

module.exports = router;


