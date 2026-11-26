import { describe, expect, it } from 'vitest'
import { RECT_DEPTH_MIN, RECT_CUSTOM_FRAME } from '../constants/rectDesk'
import { LSHAPE_L2_MAX, LSHAPE_MATERIALS } from '../constants/lshapeDesk'
import { createGrommets, activeGrommets, grommetCapCost } from '../utils/grommets'

describe('Yang feedback Nov 26', () => {
  it('supports 40cm depth and custom frame pricing', () => {
    expect(RECT_DEPTH_MIN).toBe(40)
    expect(RECT_CUSTOM_FRAME.price).toBe(649)
  })
  it('allows 180cm return side for both materials', () => {
    expect(LSHAPE_L2_MAX).toBe(180)
    expect(LSHAPE_MATERIALS.mfc.l2max).toBe(180)
    expect(LSHAPE_MATERIALS.solid.l2max).toBe(180)
  })
  it('allows 20cm ×1 plus 30cm ×1 with independent cap prices', () => {
    const g = createGrommets()
    g['20cm'].quantity = 1; g['20cm'].capQuantity = 1
    g['30cm'].quantity = 1; g['30cm'].capQuantity = 1
    expect(activeGrommets(g)).toHaveLength(2)
    expect(grommetCapCost(g)).toBeCloseTo(29.8, 2)
  })
  it('does not charge for caps without selected holes', () => {
    const g = createGrommets()
    g['30cm'].capQuantity = 1
    expect(grommetCapCost(g)).toBe(0)
  })
})
