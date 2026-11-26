import { describe, expect, it } from 'vitest'
import {
  RECT_MAX_LEN,
  RECT_CUSTOM_THRESHOLD,
  RECT_CUSTOM_FRAME,
  MDF_EDGES,
  WOOD_EDGE_STYLES,
  grommetAddonPrice,
} from '../constants/rectDesk'

describe('BYD requested updates', () => {
  it('allows rectangular MDF and Solid Wood lengths to 260cm', () => {
    expect(RECT_MAX_LEN).toBe(260)
  })
  it('uses the $649 custom frame beyond 180cm', () => {
    expect(RECT_CUSTOM_THRESHOLD).toBe(180)
    expect(RECT_CUSTOM_FRAME.price).toBe(649)
    expect(RECT_CUSTOM_FRAME.maxLen).toBe(260)
  })
  it('offers Standard Edge only under MDF', () => {
    expect(MDF_EDGES.some((edge) => edge.id === 'standard-edge')).toBe(true)
    expect(WOOD_EDGE_STYLES.some((edge) => edge.id === 'standard-edge')).toBe(false)
  })
  it('preserves independent circle and rectangular cap prices', () => {
    expect(grommetAddonPrice('Circle', '6cm', 'Black')).toBe(9.9)
    expect(grommetAddonPrice('Rectangular', '20cm', 'Black')).toBe(9.9)
    expect(grommetAddonPrice('Rectangular', '13cm', 'Black')).toBe(19.9)
  })
})
