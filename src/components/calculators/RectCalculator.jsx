import { useState } from 'react'
import { T } from '../../constants/tokens'
import { RECT_MATERIALS, RECT_MDF_MAX_LEN } from '../../constants/rectDesk'
import RectMaterialPanel from './RectMaterialPanel'

export default function RectCalculator() {
  const [material, setMaterial] = useState('mdf')
  const [length, setLength] = useState(140)
  const selectMaterial = (nextMaterial) => {
    setMaterial(nextMaterial)
    if (nextMaterial === 'mdf') setLength(prev => Math.min(prev, RECT_MDF_MAX_LEN))
  }
  const keys = Object.keys(RECT_MATERIALS)

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${keys.length},1fr)`, gap: 10 }}>
        {keys.map((k) => {
          const m = RECT_MATERIALS[k]
          const active = material === k
          return (
            <div
              key={k}
              onClick={() => selectMaterial(k)}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: '14px 10px',
                borderRadius: 12,
                border: `1.5px solid ${active ? '#C8551F' : T.border}`,
                background: active ? T.brandTint : T.bgCard,
                transition: 'all 0.15s',
                boxShadow: active ? `0 0 0 1px ${T.brand}25` : 'none',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, color: active ? T.brand : T.text }}>
                {m.label}
              </div>
              <div style={{ fontSize: 11, color: T.textMute, marginTop: 2 }}>{m.tag}</div>
            </div>
          )
        })}
      </div>
      {/* key={material} resets all panel state when the material switches */}
      <RectMaterialPanel key={material} materialKey={material} length={length} setLength={setLength} />
    </div>
  )
}
