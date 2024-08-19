function WelcomeContent() {
  return (
    <div className="flex flex-col items-center gap-5">
      <img
        className="w-52 h-40"
        src="https://static.vecteezy.com/system/resources/previews/010/880/186/original/charity-hand-sign-inside-a-love-shape-international-day-of-charity-png.png"
      />
      <h1 className="text-5xl text-[#FF5555] font-bold">EmpowerFunds</h1>
      <span className="text-sm text-gray-200">
        Happiness doesn’t result from what we get, but from what we give.
      </span>
    </div>
  );
}

export default WelcomeContent;
