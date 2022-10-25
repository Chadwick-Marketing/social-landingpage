import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import Countdown from 'react-countdown';

const Navigation = ({ language, pricingInView }) => {
  const [headerSticky, setHeaderSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };s
  });

  const isSticky = (e) => {
    const scrollTop = window.scrollY;

    setHeaderSticky(scrollTop >= 50);
  };

  const countdownRenderer = ({ hours, minutes, seconds }) => {
      return (<div className="flex gap-2 text-slate-800">
        <span className='border border-grey-300 p-1  bg-white/20 rounded-lg text-xs text-center'>{hours}h</span>
         <span className='border border-grey-300 p-1  bg-white/20 rounded-lg text-xs text-center'>{minutes}min</span>
          <span className='border border-grey-300 p-1  bg-white/20 rounded-lg text-xs text-center'>{seconds}s</span>
          </div>
        );
  };

  return (
    <nav
      className={`navigation sticky m-auto top-0 z-50`}
    >
      <div className={`${
        headerSticky
          ? `bg-white/90 py-1.5 px-5 shadow-sm max-w-full py-2`
          : 'md:py-10 md:px-5 lg:px-5 xl:px-0 px-5 py-3 max-w-screen-xl '
      } backdrop-blur-xl  m-auto items-center flex justify-between transition-all `}>
        <div className="logo ">
          <Link href="/" passHref>
            <Image
              height={50}
              width={50}
              className="rounded-2xl cursor-pointer"
              src="https://ik.imagekit.io/chadwickmarketing/social/icon_128_uEfTliaqvG.png"
              alt="Logo of Social for WordPress"
            />
          </Link>
        </div>
        <div className="links md:flex font-medium items-center">
          <Link href="/#pricing">
            <a className="md:mx-10 py-1 px-2 text-gray-800 text-sm hover:text-gray-900 rounded-lg hover:bg-slate-100 hidden md:flex">
              {language.navigation.pricing}
            </a>
          </Link>
          <Link href="/#pricing">
            <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-tech text-white hover:text-slate-100 hover:bg-blue-600 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600">
              <span className="font-normal">{language.heroCta[1]}</span>
              <span className="hidden md:flex"> {language.heroCta[2]}</span>
            </a>
          </Link>
        </div>
      </div>
      <Transition
     show={pricingInView || false}
     appear={true}
     enter="transition ease-out duration-100"
       enterFrom="transform opacity-0 scale-95"
       enterTo="transform opacity-100 scale-100"
       leave="transition ease-in duration-75"
       leaveFrom="transform opacity-100 scale-100"
       leaveTo="transform opacity-0 scale-95"
   >
     <div className="flex md:flex-row flex-col justify-center gap-2 items-center shadow-sm bg-gradient-to-r text-white py-1 from-[#e1eaff] to-[#fbf0f4] ">
       <p className='text-xs text-slate-800 '>Launch sale: <strong>Up to 20% off</strong> on all plans. Time left:</p>
       <Countdown date="2022-12-31" zeroPadTime={2}  renderer={countdownRenderer} />
       
     </div>
   </Transition>
    </nav>
    
  );
};

export default Navigation;
