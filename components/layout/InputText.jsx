export const InputText = (props) => {
  const { className, ...rest } = props;

  let classes = `w-full text-black p-3 shadow-lg focus:outline-none`;
  classes += className ? ' ' + className : '';

  return <input type="text" className={classes} {...rest} />;
};
