import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const menuItems = {
    preschool: [
      { name: 'Preschool', path: '/preschool' },
      { name: 'Tracing', path: '/preschooltracing' },
      { name: 'English', path: '/preschool/english' },
      { name: 'Math', path: '/preschool/math' },
      { name: 'Science', path: '/preschool/science' },
      { name: 'Homework', path: '/preschool/homework' },
      { name: 'Practice', path: '/preschool/practice' },
      { name: 'Activity', path: '/preschool/activity' }
    ],
    kindergarten: [
      { name: 'Kindergarten', path: '/kindergarten' },
      { name: 'Reading', path: '/kindergarten/reading' },
      { name: 'Writing', path: '/kindergarten/writing' },
      { name: 'Math', path: '/kindergarten/math' },
      { name: 'Science', path: '/kindergarten/science' },
      { name: 'Social Studies', path: '/kindergarten/social-studies' }
    ],
    grade1: [
      { name: '1st Grade', path: '/grade1' },
      { name: 'Reading', path: '/grade1/reading' },
      { name: 'Writing', path: '/grade1/writing' },
      { name: 'Math', path: '/grade1/math' },
      { name: 'Science', path: '/grade1/science' }
    ],
    grade2: [
      { name: '2nd Grade', path: '/grade2' },
      { name: 'Reading', path: '/grade2/reading' },
      { name: 'Writing', path: '/grade2/writing' },
      { name: 'Math', path: '/grade2/math' },
      { name: 'Science', path: '/grade2/science' }
    ],
    blogs: [
      { name: 'All Blogs', path: '/blogs' },
      { name: 'Education Tips', path: '/blogs/education-tips' },
      { name: 'Parenting', path: '/blogs/parenting' },
      { name: 'Activities', path: '/blogs/activities' }
    ]
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-gray-800 border border-gray-800 px-2 py-1 rounded mr-1">
              ONLINE
            </span>
            <span className="text-3xl font-bold text-red-500" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
              Worksheets
            </span>
            <span className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
              KIDS
            </span>
            <span className="text-lg font-semibold text-gray-800">.COM</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-3xl text-gray-800 focus:outline-none"
          >
            ☰
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6">
            {/* Preschool Dropdown */}
            <li className="relative group">
              <button className="px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-1">
                Preschool +
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {menuItems.preschool.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-6 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold border-l-4 border-transparent hover:border-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Kindergarten Dropdown */}
            <li className="relative group">
              <button className="text-gray-800 font-semibold hover:text-red-500 transition-colors">
                Kindergarten +
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {menuItems.kindergarten.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-6 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold border-l-4 border-transparent hover:border-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* 1st Grade Dropdown */}
            <li className="relative group">
              <button className="text-gray-800 font-semibold hover:text-red-500 transition-colors">
                1st Grade +
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {menuItems.grade1.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-6 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold border-l-4 border-transparent hover:border-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* 2nd Grade Dropdown */}
            <li className="relative group">
              <button className="text-gray-800 font-semibold hover:text-red-500 transition-colors">
                2nd Grade +
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {menuItems.grade2.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-6 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold border-l-4 border-transparent hover:border-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Blogs Dropdown */}
            <li className="relative group">
              <button className="text-gray-800 font-semibold hover:text-red-500 transition-colors">
                Blogs +
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {menuItems.blogs.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-6 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold border-l-4 border-transparent hover:border-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="w-11 h-11 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 hover:scale-110 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <Link
              to="/privacy-policy"
              className="px-6 py-3 bg-yellow-400 text-white font-bold rounded-full border-4 border-dashed border-white outline outline-4 outline-yellow-400 hover:bg-yellow-500 hover:outline-yellow-500 hover:scale-105 transition-all whitespace-nowrap"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-[800px] pb-4' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col gap-2 pt-4 border-t border-gray-200">
            {/* Preschool Mobile Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown('preschool')}
                className="w-full text-left px-4 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Preschool +
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === 'preschool' ? 'max-h-96 mt-2' : 'max-h-0'
                }`}
              >
                <div className="bg-gray-50 rounded-lg p-2">
                  {menuItems.preschool.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Kindergarten Mobile Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown('kindergarten')}
                className="w-full text-left px-4 py-3 text-gray-800 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
              >
                Kindergarten +
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === 'kindergarten' ? 'max-h-96 mt-2' : 'max-h-0'
                }`}
              >
                <div className="bg-gray-50 rounded-lg p-2">
                  {menuItems.kindergarten.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* 1st Grade Mobile Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown('grade1')}
                className="w-full text-left px-4 py-3 text-gray-800 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
              >
                1st Grade +
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === 'grade1' ? 'max-h-96 mt-2' : 'max-h-0'
                }`}
              >
                <div className="bg-gray-50 rounded-lg p-2">
                  {menuItems.grade1.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* 2nd Grade Mobile Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown('grade2')}
                className="w-full text-left px-4 py-3 text-gray-800 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
              >
                2nd Grade +
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === 'grade2' ? 'max-h-96 mt-2' : 'max-h-0'
                }`}
              >
                <div className="bg-gray-50 rounded-lg p-2">
                  {menuItems.grade2.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Blogs Mobile Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown('blogs')}
                className="w-full text-left px-4 py-3 text-gray-800 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
              >
                Blogs +
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === 'blogs' ? 'max-h-96 mt-2' : 'max-h-0'
                }`}
              >
                <div className="bg-gray-50 rounded-lg p-2">
                  {menuItems.blogs.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <li className="flex gap-3 pt-2">
              <button className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
              <Link
                to="/privacy-policy"
                className="flex-1 px-5 py-2 bg-yellow-400 text-white font-bold rounded-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;