import { T } from '../../constants/tokens'
import { GROMMET_RECT_SIZES, grommetAddonPrice } from '../../constants/rectDesk'
import { quantity } from '../../utils/quantity'
import CheckOption from './CheckOption'
import PillSelect from './PillSelect'

// One selectable line per size. Each hole size keeps independent quantity, position, cap quantity and cap colour.
export default function MultiGrommetPicker({ grommets, setGrommets }) {
  const update = (key, changes) => setGrommets(prev => ({
    ...prev, [key]: { ...prev[key], ...changes },
  }))
  return <div style={{ display: 'grid', gap: 16 }}>
    {['Circle', ...GROMMET_RECT_SIZES].map(key => {
      const g = grommets[key]
      const isCircle = key === 'Circle'
      const selected = quantity(g.quantity) > 0
      const count = quantity(g.quantity)
      return <div key={key} style={{ border: `1px solid ${T.border}`, borderRadius: 12, padding: 12, minWidth: 0 }}>
        <CheckOption
          label={isCircle ? 'Circle hole cut-out · 6cm (Free)' : `Rectangular hole cut-out · ${key} (Free)`}
          price={0}
          checked={selected}
          onChange={checked => update(key, { quantity: checked ? 1 : 0, capQuantity: checked ? g.capQuantity : 0 })}
          qty={count}
          onQuantityChange={v => {
            const n = quantity(v)
            update(key, { quantity: n, capQuantity: Math.min(n, quantity(g.capQuantity)) })
          }}
        />
        {selected && <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: T.textMute, marginBottom: 6 }}>Position</div>
            <PillSelect options={['Left', 'Centre', 'Right']} value={g.position} onChange={v => update(key, { position: v })}/>
          </div>
          <div style={{ fontSize: 11, color: T.textMute }}>Left/Right positions sit 25cm in from the table top's width edge (standard offset).</div>
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
            <CheckOption
              label='Add grommet cap (optional)'
              price={grommetAddonPrice(g.type, g.size, g.colour)}
              checked={quantity(g.capQuantity) > 0}
              onChange={checked => update(key, { capQuantity: checked ? 1 : 0 })}
              qty={quantity(g.capQuantity)}
              onQuantityChange={v => update(key, { capQuantity: Math.min(count, quantity(v)) })}
            />
            {quantity(g.capQuantity) > 0 && <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 12, color: T.textMute, marginBottom: 6 }}>Cap colour</div>
              <PillSelect options={['Black','Other']} value={g.colour} onChange={v => update(key, { colour: v })}/>
            </div>}
          </div>
        </div>}
      </div>
    })}
  </div>
}
