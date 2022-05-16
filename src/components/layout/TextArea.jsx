export const TextArea = (props) => {
  const { className, rows, ...rest } = props;

  let classes = `w-full text-black p-3 shadow-lg focus:outline-none`;
  classes += className ? ' ' + className : '';
  const newRows = rows ? rows : 6;

  return <textarea rows={newRows} className={classes} {...rest} />;
};
