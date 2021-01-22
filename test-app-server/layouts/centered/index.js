const Centered = ({ children }) => (
  <div
    data-layout="centered"
    className="w-full h-screen flex items-center justify-center bg-qhite"
  >
    {children}
  </div>
);

export default Centered;
