const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-2xl font-[family-name:var(--font-geist-sans)]">
              Inventory
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
