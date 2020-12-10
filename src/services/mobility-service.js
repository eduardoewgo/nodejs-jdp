const offers = [
  { id: 1, discount: 100, description: 'Black Friday', applicableItems: [1, 3] },
  { id: 2, discount: 40, description: 'Something else', applicableItems: [2, 4] },
  { id: 3, discount: 20, description: 'Not worth it', applicableItems: [1, 4] },
  { id: 4, discount: 60, description: 'Boxing Day', applicableItems: [1, 2, 3, 4] }
]

const items = [
  { id: 1, price: 800, description: 'iPhone 11 Pro' },
  { id: 2, price: 1300, description: 'iPhone 12 Pro' },
  { id: 3, price: 900, description: 'Galaxy 20' },
  { id: 4, price: 1200, description: 'Galaxy 20+' },
]

const getMobilityItem = (mobilityItemId) => items.find(item => item.id == mobilityItemId)

const getMobilityItemOffers = (mobilityItemId) => offers.filter(offer => offer.applicableItems.indexOf(mobilityItemId) > -1)

const save = () => new Promise(resolve => setTimeout(resolve, 5000))

module.exports = {
  getMobilityItem,
  getMobilityItemOffers,
  save
}