"use client";

import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center justify-between px-4 py-4">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-lg font-bold">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 110 110"
            >
              <path
                d="M85 57.327H64v-36.41L43 70.673h21v36.41l21-49.756z"
                fill="#ffc950"
              />
            </svg>
          </Link>
        </span>
      </div>

      {/*Banner GIF */}
      <div className="flex flex-1 justify-center">
        <Image
        src="/banner.gif"
        alt="Banner"
        width={900}
        height={100}
        className="object-contain" />
      </div>

      {/* Light/Dark mode toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="ml-auto w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center py-2"
      >
        {theme === "light" ? (
          <Sun />
        ) : (
          <Moon />
        )}
      </Button>
    </div>
  );
};

export default Header;