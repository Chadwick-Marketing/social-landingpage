import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navigation = ({ language }) => {
  const [headerSticky, setHeaderSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });

  const isSticky = (e) => {
    const scrollTop = window.scrollY;

    setHeaderSticky(scrollTop >= 50);
  };

  return (
    <nav
      className={`${
        headerSticky
          ? `bg-white py-1.5 px-5 shadow-sm max-w-full py-2 rounded-b-2xl`
          : 'md:py-10 md:px-5 lg:px-5 xl:px-0  px-5 py-3'
      } navigation transition-all max-w-screen-xl m-auto  top-0 z-50`}
    >
      <div className="max-w-screen-xl m-auto items-center flex justify-between">
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
    </nav>
  );
};

export default Navigation;
