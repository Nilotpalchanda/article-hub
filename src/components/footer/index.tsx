import React from 'react';

const Footer: React.FC = () => (
  <footer className="shadow-t bg-white p-4 text-center text-black shadow-lg">
      &copy; {new Date().getFullYear()} ArticleHub. All rights reserved.
  </footer>
);

export default Footer;
