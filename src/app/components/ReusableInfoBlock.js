const ReusableInfoBlock = ({ title, children }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg p-2 lg:p-8 mb-4 lg:mb-8">
      <div className="font-semibold text-2xl mb-8">{title}</div>
      {children}
    </div>
  );
}

export default ReusableInfoBlock;