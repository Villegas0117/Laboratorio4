'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; 
import Footer from "./components/Footer";
import BlogList from './components/BlogList';
import Header from "./components/Header";
import BootstrapClient from './components/BoostrapClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState, useEffect } from "react";

export default function HomePage()
{

  return(
    <>
    <Header/>
    <BlogList/>
    <Footer/>
    <BootstrapClient/>
    </>
  );
}
