import React from 'react';

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white mt-auto border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-sm sm:text-base">
         © {currentYear} Created by Sandeep Singh Solanki. All Rights Reserved.
        </p>       
      </div>
    </footer>
  );
}
