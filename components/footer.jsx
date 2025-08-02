import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-white">QuickDesk</h2>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="text-center md:text-right text-sm text-gray-400">
            Ticket platform powered by AI &mdash; Built by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline transition-colors duration-200"
            >
              Made By Syntax Terror
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
