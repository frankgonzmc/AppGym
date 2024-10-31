export function Card({ children }) {
  return (
    <div className="bg-zinc-800 max-w-md w-full p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      {children}
    </div>
  );
}
