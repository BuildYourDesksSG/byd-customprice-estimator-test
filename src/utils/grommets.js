import { GROMMET_RECT_SIZES, grommetAddonPrice } from '../constants/rectDesk'
import { quantity } from './quantity'

export function createGrommets() {
  return Object.fromEntries([
    ['Circle', { type: 'Circle', size: '6cm', quantity: 0, position: 'Centre', colour: 'Black', capQuantity: 0 }],
    ...GROMMET_RECT_SIZES.map(size => [size, { type: 'Rectangular', size, quantity: 0, position: 'Centre', colour: 'Black', capQuantity: 0 }]),
  ])
}

export function activeGrommets(grommets) {
  return Object.values(grommets).filter(g => quantity(g.quantity) > 0)
}

export function grommetCapCost(grommets) {
  return activeGrommets(grommets).reduce((sum, g) => sum +
    grommetAddonPrice(g.type, g.size, g.colour) * Math.min(quantity(g.capQuantity), quantity(g.quantity)), 0)
}
