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
    const expected = { mobilityItem: {}, mobilityOffers: {} }

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

  it('should access and validate mocked calls', async () => {
    const mobilityController = require('../controllers/mobility-controller')
    const mobilityService = require('../services/mobility-service')

    jest.mock('../services/mobility-service')
    mobilityService.getMobilityItem = jest.fn()
    mobilityService.getMobilityItemOffers = jest.fn()

    const req = { body: { mobilityItemId: 1 } }
    const res = { json: jest.fn() }

    mobilityController.getMobilityItemOffers(req, res)
    expect(mobilityService.getMobilityItem).toHaveBeenCalledTimes(1)
    expect(mobilityService.getMobilityItem).toHaveBeenCalledWith(req.body.mobilityItemId)

    expect(mobilityService.getMobilityItemOffers).toHaveBeenCalledTimes(1)
    expect(mobilityService.getMobilityItemOffers).toHaveBeenCalledWith(req.body.mobilityItemId)
  })

  it('should mock implementations', async () => {
    const mobilityController = require('../controllers/mobility-controller')
    const mobilityService = require('../services/mobility-service')

    jest.mock('../services/mobility-service')

    mobilityService.getMobilityItem =
      jest.fn().mockImplementation((id) => ({ id, awesome: 'stuff' }))
    mobilityService.getMobilityItemOffers =
      jest.fn().mockImplementation(() => [])

    const req = { body: { mobilityItemId: 1 } }
    const res = { json: jest.fn() }

    mobilityController.getMobilityItemOffers(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ mobilityItem: { id: req.body.mobilityItemId, awesome: 'stuff' }, mobilityOffers: [] })
  })
})