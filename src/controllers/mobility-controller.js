const mobilityService = require('../services/mobility-service')

const getMobilityItemOffers = (req, res) => {
  const { mobilityItemId } = req.body

  const mobilityItem = mobilityService.getMobilityItem(mobilityItemId)
  const mobilityOffers = mobilityService.getMobilityItemOffers(mobilityItemId)

  res.json({ mobilityOffers, mobilityItem })
}

const save = async (req, res) => {
  await mobilityService.save() // this will take 5 seconds to complete
  res.json({ data: 'something' })
}


module.exports = {
  getMobilityItemOffers,
  save
}

