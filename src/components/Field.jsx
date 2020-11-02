import React from 'react';

const Field = ({ fields }) => {
  return (
    <div className="field">
      {
        fields.map((row) => {
          return row.map((column) => {
            return <div className={`dots ${column}`}></div>
          })
        })
      }
    </div>
  );
};

export default Field
