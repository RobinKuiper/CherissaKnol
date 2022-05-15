export const Title = ({ children, className }) => {
  let classes = `text-4xl font-bold text-shadow-sm`;
  classes += className ? ' ' + className : '';

  return <h1 className={classes}>{children}</h1>;
};
