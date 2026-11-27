import { useState } from 'react'
import { T } from '../../constants/tokens'
import { GROMMET_RECT_SIZES, grommetAddonPrice } from '../../constants/rectDesk'
import { quantity } from '../../utils/quantity'
import CheckOption from './CheckOption'
import PillSelect from './PillSelect'

// Compact add-on list follows Yang's sketch. Keep the free hole-only controls
// below, but place Position and Cover on separate rows for cleaner layout.
export default function MultiGrommetPicker({ grommets, setGrommets }) {
  const [showHoleOnly, setShowHoleOnly] = useState(false)
  const update = (key, changes) => setGrommets(prev => ({
    ...prev,
    [key]: { ...prev[key], ...changes },
  }))
  const setHoleQuantity = (key, value) => setGrommets(prev => {
    const count = quantity(value)
    const current = prev[key]
    return { ...prev, [key]: {
      ...current,
      quantity: count,
      capQuantity: Math.min(quantity(current.capQuantity), count),
    } }
  })
  const setCoverQuantity = (key, value) => setGrommets(prev => {
    const count = quantity(value)
    const current = prev[key]
    return { ...prev, [key]: {
      ...current,
      quantity: Math.max(quantity(current.quantity), count),
      capQuantity: count,
    } }
  })

  const controlRowStyle = { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }
  const controlLabelStyle = { fontSize: 11.5, color: T.textMute, minWidth: 72 }

  const configuration = key => quantity(grommets[key].quantity) > 0 && (
    <div style={{ display: 'grid', gap: 8, padding: '8px 6px 0' }}>
      <div style={controlRowStyle}>
        <span style={controlLabelStyle}>Position</span>
        <PillSelect options={['Left', 'Centre', 'Right']} value={grommets[key].position}
          onChange={position => update(key, { position })} />
      </div>
      {quantity(grommets[key].capQuantity) > 0 && (
        <div style={controlRowStyle}>
          <span style={controlLabelStyle}>Cover</span>
          <PillSelect options={['Black', 'Other']} value={grommets[key].colour}
            onChange={colour => update(key, { colour })} />
        </div>
      )}
    </div>
  )

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={headingStyle}>Add circle grommet</div>
      <CheckOption
        label='6cm circle cover'
        price={grommetAddonPrice('Circle', '6cm', grommets.Circle.colour)}
        checked={quantity(grommets.Circle.capQuantity) > 0}
        onChange={checked => setCoverQuantity('Circle', checked ? 1 : 0)}
        qty={quantity(grommets.Circle.capQuantity)}
        onQuantityChange={value => setCoverQuantity('Circle', value)}
      />
      {quantity(grommets.Circle.capQuantity) > 0 && configuration('Circle')}

      <div style={{ ...headingStyle, marginTop: 5 }}>Add rectangular grommet</div>
      {GROMMET_RECT_SIZES.map(size => {
        const g = grommets[size]
        return (
          <div key={size}>
            <CheckOption
              label={`${size} rectangular cover`}
              price={grommetAddonPrice(g.type, g.size, g.colour)}
              checked={quantity(g.capQuantity) > 0}
              onChange={checked => setCoverQuantity(size, checked ? 1 : 0)}
              qty={quantity(g.capQuantity)}
              onQuantityChange={value => setCoverQuantity(size, value)}
            />
            {quantity(g.capQuantity) > 0 && configuration(size)}
          </div>
        )
      })}
      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
        <button type='button' aria-expanded={showHoleOnly}
          onClick={() => setShowHoleOnly(prev => !prev)}
          style={{ background: 'transparent', border: 'none', padding: '4px 0', color: T.brand,
            fontFamily: T.font, fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
          {showHoleOnly ? '− Hide free hole cut-outs' : '+ Add free hole cut-out without cap/cover'}
        </button>
        {showHoleOnly && <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
          <CheckOption label='Circle hole cut-out · 6cm (Free)' price={0}
            checked={quantity(grommets.Circle.quantity) > 0}
            onChange={checked => setHoleQuantity('Circle', checked ? 1 : 0)}
            qty={quantity(grommets.Circle.quantity)}
            onQuantityChange={value => setHoleQuantity('Circle', value)} />
          {configuration('Circle')}
          {GROMMET_RECT_SIZES.map(size => (
            <div key={`hole-${size}`}>
              <CheckOption label={`${size} rectangular hole cut-out (Free)`} price={0}
                checked={quantity(grommets[size].quantity) > 0}
                onChange={checked => setHoleQuantity(size, checked ? 1 : 0)}
                qty={quantity(grommets[size].quantity)}
                onQuantityChange={value => setHoleQuantity(size, value)} />
              {configuration(size)}
            </div>
          ))}
        </div>}
      </div>
      <div style={{ fontSize: 11, color: T.textMute, lineHeight: 1.5 }}>
        Hole cut-outs are free. Selecting a cap or cover automatically includes its matching cut-out.
        Left/Right positions are 25cm from the tabletop width edge.
      </div>
    </div>
  )
}

const headingStyle = { fontWeight: 700, fontSize: 13.5, color: T.text }
