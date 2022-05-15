import React from 'react';

export const Label = (props) => {
  const { className, children, ...rest } = props;

  let classes = `text-sm font-semibold text-shadow-sm`;
  classes += className ? ' ' + className : '';

  return (
    <label className={classes} {...rest}>
      {children}
    </label>
  );
};
