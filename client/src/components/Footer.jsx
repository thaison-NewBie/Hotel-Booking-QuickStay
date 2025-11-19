import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      // Handle newsletter subscription
      console.log('Newsletter subscription:', email)
      setEmail('')
      alert('Thank you for subscribing!')
    }
  }

  return (
    <div className='bg-[#F6F9FC] text-gray-600 pt-12 pb-6 px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-col md:flex-row flex-wrap justify-between gap-8 md:gap-6'>
        {/* QuickStay Branding */}
        <div className='max-w-80 w-full md:w-auto'>
          <div className='flex items-center gap-2 mb-4'>
            <img src={assets.logo} alt="logo" className='h-8 md:h-9 invert opacity-80' />
            <span className='font-playfair text-xl font-bold text-gray-800'>QuickStay</span>
          </div>
          <p className='text-sm text-gray-500 leading-relaxed mb-4'>
            Discover the world's most extraordinary places to stay,
            from boutique hotels to luxury villas and private islands.
          </p>
          <div className='flex items-center gap-3'>
            <a href="#" className='hover:opacity-70 transition-opacity'>
              <img src={assets.instagramIcon} alt="instagram-icon" className='w-6 h-6'/>
            </a>
            <a href="#" className='hover:opacity-70 transition-opacity'>
              <img src={assets.facebookIcon} alt="facebook-icon" className='w-6 h-6'/>
            </a>
            <a href="#" className='hover:opacity-70 transition-opacity'>
              <img src={assets.twitterIcon} alt="twitter-icon" className='w-6 h-6'/>
            </a>
            <a href="#" className='hover:opacity-70 transition-opacity'>
              <img src={assets.linkendinIcon} alt="linkedin-icon" className='w-6 h-6'/>
            </a>
          </div>
        </div>

        {/* COMPANY Links */}
        <div className='min-w-[150px]'>
          <p className='font-playfair text-base font-semibold text-gray-800 mb-4 uppercase tracking-wide'>Company</p>
          <ul className='flex flex-col gap-3 text-sm'>
            <li>
              <a href="#" className='hover:text-gray-800 transition-colors'>About</a>
            </li>
            <li>
              <a href="#" className='hover:text-gray-800 transition-colors'>Careers</a>
            </li>
            <li>
              <a href="#" className='hover:text-gray-800 transition-colors'>Press</a>
            </li>
            <li>
              <a href="#" className='hover:text-gray-800 transition-colors'>Blog</a>
            </li>
            <li>
              <a href="#" className='hover:text-gray-800 transition-colors'>Partners</a>
            </li>
          </ul>
        </div>

        {/* SUPPORT Links */}
        <div className='min-w-[150px]'>
          <p className='font-playfair text-base font-semibold text-gray-800 mb-4 uppercase tracking-wide'>Support</p>
          <ul className='flex flex-col gap-3 text-sm'>
            <li>
              <a href="#" className='hover:text-gray-800 transition-colors'>Help Center</a>
            </li>
            <li>
              <a href="#" className='hover:text-gray-800 transition-colors'>Safety Information</a>
            </li>
            <li>
              <a href="#" className='hover:text-gray-800 transition-colors'>Cancellation Options</a>
            </li>
            <li>
              <a href="#" className='hover:text-gray-800 transition-colors'>Contact Us</a>
            </li>
            <li>
              <a href="#" className='hover:text-gray-800 transition-colors'>Accessibility</a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className='max-w-80 w-full md:w-auto'>
          <p className='font-playfair text-base font-semibold text-gray-800 mb-4 uppercase tracking-wide'>Stay Updated</p>
          <p className='text-sm text-gray-500 mb-4 leading-relaxed'>
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <form onSubmit={handleNewsletterSubmit} className='flex items-center'>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-white rounded-l-md border border-gray-300 h-10 px-4 outline-none focus:border-gray-400 transition-colors text-sm flex-1' 
              placeholder='Your email'
              required
            />
            <button 
              type="submit"
              className='flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white h-10 w-10 rounded-r-md transition-colors'
            >
              <img src={assets.arrowIcon} alt="arrow-icon" className='w-3.5 invert' />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <hr className='border-gray-300 mt-10 mb-6' />
      <div className='flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-gray-500'>
        <p>© {new Date().getFullYear()} JSON-QUICKSTAY. All rights reserved.</p>
        <ul className='flex items-center gap-6'>
          <li>
            <a href="#" className='hover:text-gray-800 transition-colors'>Privacy</a>
          </li>
          <li>
            <a href="#" className='hover:text-gray-800 transition-colors'>Terms</a>
          </li>
          <li>
            <a href="#" className='hover:text-gray-800 transition-colors'>Sitemap</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer