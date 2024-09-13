// src/components/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ButtonGradient from '../assets/svg/ButtonGradient';

const Layout = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <main className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        {children}
      </main>
      <ButtonGradient />
      <Footer />
    </>
  );
};

export default Layout;
