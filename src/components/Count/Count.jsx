import React from 'react';
import countStyles from './Count.module.css';

const Count = ({ count }) => {
  return (
    <>
      {count > 0 && (
        <div className={countStyles.element}>
          <p className='text text_type_main-small'>{count}</p>
        </div>
      )}
    </>
  );
};

export default Count;
