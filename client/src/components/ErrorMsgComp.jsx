export const ErrorMsgComp = ({ error }) => {
  return (
    <div>
      <p className="text-red-500 text-center text-xs">{error}</p>
    </div>
  );
}