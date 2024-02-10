import React from 'react';

export const Nav = (props) => {
  const { title } = props;

  return (
    <div className='text-center h1 shadow p-3'>
      {title && <div>{title}</div>}
    </div>
  );
};
