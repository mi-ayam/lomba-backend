var express = require('express');
var router = express.Router();

const competitionController = require("../controllers/competitions.controller")

router.get('/' , competitionController.getAllProducts)
router.get('/:id',competitionController.getCompetitionByID)
router.post('/',competitionController.addCompetition)
router.put('/:id',competitionController.editCompetition)
router.delete('/:id',competitionController.deleteCompetition)
module.exports = router