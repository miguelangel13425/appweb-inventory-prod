import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/warehouses">
        <a>Go to Warehouses</a>
      </Link>
    </div>
  );
};

export default HomePage;
