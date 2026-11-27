import { T } from '../../constants/tokens'
import { GROMMET_RECT_SIZES, grommetAddonPrice } from '../../constants/rectDesk'
import { quantity } from '../../utils/quantity'
import CheckOption from './CheckOption'
import PillSelect from './PillSelect'

// Keep the original two-option layout: Circle and Rectangular.
// Rectangular sizes are multi-select; each selected size owns its quantity,
// position, cap quantity and cap colour. Pricing stays in the shared model.
export default function MultiGrommetPicker({ grommets, setGrommets }) {
  const update = (key, changes) => setGrommets(prev => ({
    ...prev,
    [key]: { ...prev[key], ...changes },
  }))
  const setCount = (key, value) => {
    const count = quantity(value)
    const current = grommets[key]
    update(key, {
      quantity: count,
      capQuantity: Math.min(count, quantity(current.capQuantity)),
    })
  }
  const renderDetails = (key) => {
    const g = grommets[key]
    const count = quantity(g.quantity)
    if (!count) return null
    return (
      <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <div>
          <div style={{ fontSize: 12, color: T.textMute, marginBottom: 6 }}>Position</div>
          <PillSelect options={['Left', 'Centre', 'Right']} value={g.position} onChange={v => update(key, { position: v })} />
        </div>
        <div style={{ fontSize: 11, color: T.textMute }}>
          Left/Right positions sit 25cm in from the table top's width edge (standard offset).
        </div>
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
          <CheckOption
            label='Add grommet cap (optional)'
            price={grommetAddonPrice(g.type, g.size, g.colour)}
            checked={quantity(g.capQuantity) > 0}
            onChange={checked => update(key, { capQuantity: checked ? 1 : 0 })}
            qty={quantity(g.capQuantity)}
            onQuantityChange={v => update(key, { capQuantity: Math.min(count, quantity(v)) })}
          />
          {quantity(g.capQuantity) > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 12, color: T.textMute, marginBottom: 6 }}>Cap colour</div>
              <PillSelect options={['Black', 'Other']} value={g.colour} onChange={v => update(key, { colour: v })} />
            </div>
          )}
        </div>
      </div>
    )
  }

  const circle = grommets.Circle
  const selectedRect = GROMMET_RECT_SIZES.filter(size => quantity(grommets[size].quantity) > 0)
  const rectCount = selectedRect.reduce((sum, size) => sum + quantity(grommets[size].quantity), 0)

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={cardStyle}>
        <CheckOption
          label='Circle hole cut-out · 6cm (Free)'
          price={0}
          checked={quantity(circle.quantity) > 0}
          onChange={checked => update('Circle', { quantity: checked ? 1 : 0, capQuantity: checked ? circle.capQuantity : 0 })}
          qty={quantity(circle.quantity)}
          onQuantityChange={value => setCount('Circle', value)}
        />
        {renderDetails('Circle')}
      </div>

      <div style={cardStyle}>
        <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text, marginBottom: 4 }}>
          Rectangular hole cut-out (Free) {rectCount > 0 ? `(${rectCount})` : ''}
        </div>
        <div style={{ fontSize: 12, color: T.textMute, marginBottom: 12 }}>
          Select one or more sizes. Each size has its own quantity and options.
        </div>
        <div role='group' aria-label='Rectangular grommet sizes' style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {GROMMET_RECT_SIZES.map(size => {
            const active = quantity(grommets[size].quantity) > 0
            return (
              <button
                key={size}
                type='button'
                aria-pressed={active}
                onClick={() => update(size, { quantity: active ? 0 : 1, capQuantity: active ? 0 : grommets[size].capQuantity })}
                style={{
                  cursor: 'pointer', padding: '8px 15px', borderRadius: 20,
                  border: `1.5px solid ${active ? '#C8551F' : T.border}`,
                  background: active ? T.brand : T.bg,
                  color: active ? '#fff' : T.text,
                  fontSize: 12.5, fontWeight: active ? 600 : 400, fontFamily: T.font,
                }}
              >
                {size}{active ? ' ✓' : ''}
              </button>
            )
          })}
        </div>
        {selectedRect.map(size => (
          <div key={size} style={{ borderTop: `1px solid ${T.border}`, marginTop: 14, paddingTop: 14 }}>
            <CheckOption
              label={`Rectangular · ${size} (Free)`}
              price={0}
              checked
              onChange={checked => update(size, { quantity: checked ? 1 : 0, capQuantity: checked ? grommets[size].capQuantity : 0 })}
              qty={quantity(grommets[size].quantity)}
              onQuantityChange={value => setCount(size, value)}
            />
            {renderDetails(size)}
          </div>
        ))}
      </div>
    </div>
  )
}

const cardStyle = {
  border: `1px solid ${T.border}`,
  borderRadius: 12,
  padding: 12,
  minWidth: 0,
}
