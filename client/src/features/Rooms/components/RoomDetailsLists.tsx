function RoomDetailsLists({ children }: { children: React.ReactNode }) {
  return (
    <ul className="grid grid-cols-1 gap-y-4 text-gray-700 sm:grid-cols-3">
      {children}
    </ul>
  );
}

export default RoomDetailsLists;
