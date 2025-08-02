import React from 'react'
import { checkUser } from "@/lib/checkUser"; // Import the checkUser function

const Footer = async() => {
    await checkUser();
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-lg font-semibold mb-2">Process Manager</p>
                <p className="text-sm text-gray-300">
                  &copy; {new Date().getFullYear()} Process Listing app. All rights reserved.
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-300 mb-1">
                  Made with <span className="text-red-500 text-lg">❤️</span> by
                </p>
                <p className="text-sm font-medium text-blue-400">
                  Software Development Team (Sombit Karmakar)
                </p>
              </div>
            </div>
          </div>
        </footer>
  )
}

export default Footer