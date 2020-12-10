describe('Mocking Data', () => {
  beforeEach(() => {
    jest.resetModules()
    // jest.resetAllMocks()
  })

  it('should not mock', () => {
    const mobilityController = require('../controllers/mobility-controller')
    const req = { body: { mobilityItemId: 1 } }
    const res = { json: jest.fn() }

    const expected = {
      mobilityItem: {
        id: 1,
        price: 800,
        description: "iPhone 11 Pro",
      },
      mobilityOffers: [
        { id: 1, discount: 100, description: 'Black Friday', applicableItems: [1, 3] },
        { id: 3, discount: 20, description: 'Not worth it', applicableItems: [1, 4] },
        { id: 4, discount: 60, description: 'Boxing Day', applicableItems: [1, 2, 3, 4] }
      ]
    }

    mobilityController.getMobilityItemOffers(req, res)

    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('should mock the entire module', () => {
    const mobilityController = require('../controllers/mobility-controller')

    jest.mock('../services/mobility-service')

    const req = { body: { mobilityItemId: 1 } }
    const res = { json: jest.fn() }
    const expected = { mobilityItem: undefined, mobilityOffers: undefined }

    mobilityController.getMobilityItemOffers(req, res)

    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('should mock specific functions', () => {
    const mobilityController = require('../controllers/mobility-controller')

    jest.mock('../services/mobility-service', () => ({
      getMobilityItem: jest.fn().mockReturnValue(1),
      getMobilityItemOffers: jest.fn().mockReturnValue([])
    }))

    const req = { body: { mobilityItemId: 1 } }
    const res = { json: jest.fn() }
    const expected = { mobilityItem: 1, mobilityOffers: [] }

    mobilityController.getMobilityItemOffers(req, res)

    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('should mock promise', async () => {
    const mobilityController = require('../controllers/mobility-controller')

    jest.mock('../services/mobility-service', () => ({
      save: jest.fn().mockResolvedValue(true)
    }))

    const req = { body: { mobilityItemId: 1 } }
    const res = { json: jest.fn() }

    await mobilityController.save(req, res)

    expect(res.json).toHaveBeenCalledTimes(1)
  })
})