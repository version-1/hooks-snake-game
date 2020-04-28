import React from 'react'

const Dot = (props) => <div className={`dots ${props.value}`}></div>

const Field = (props) => {
  const { fields } = props
  return <div className="field">
    {
      fields.map((row, rowindex) => {
      return row.map((col, colIndex) => <Dot
        key={`${rowindex}-${colIndex}`}
        value={col}
          />)
      })
    }
    </div>
}

export default Field
