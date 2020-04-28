import React from 'react'

const Dot = (props) => <div className={`dots ${props.value}`}></div>

const fieldSize = 30

// 1行分のドット
const cols = new Array(fieldSize).fill("")

// 縦のドット
const rows = new Array(fieldSize).fill(cols)

const Field = () => {
  return <div className="field">
    {
      rows.map(row => {
        return row.map(col => <Dot value={col} />)
      })
    }
    </div>
}

export default Field
