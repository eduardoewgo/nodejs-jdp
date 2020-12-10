module.exports = {
  getMobilityItem: jest.fn().mockReturnValue({}),
  getMobilityItemOffers: jest.fn().mockReturnValue({}),
  save: jest.fn().mockResolvedValue(true)
}
