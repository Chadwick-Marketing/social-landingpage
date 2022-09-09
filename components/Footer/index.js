import Link from 'next/link';
import LanguagePicker from "../LanguagePicker";
import { SocialIcon } from 'react-social-icons';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/outline';

const Footer = ({ language }) => {
  return (
    <footer className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 flex flex-col items-start">
          <Link href="/" passHref>
            <Image height={50} width={50} className="rounded-2xl cursor-pointer" src="https://ik.imagekit.io/chadwickmarketing/social/icon_128_uEfTliaqvG.png" alt="Logo of Social for WordPress" />
          </Link>
          <nav className="mt-10 text-sm" aria-label="quick links"><div className="-my-1 -mx-2 flex justify-center gap-x-6">
          <Link href="/legal">
              <a className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                {language.legal}
              </a>
            </Link>
            <Link href="/legal">
              <a className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                {language.privacy}
              </a>
            </Link>
            <Link href="/legal">
              <a className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                {language.terms}
              </a>
            </Link>
         
          </div>
          </nav></div><div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
            <div className="flex gap-x-6">
            <SocialIcon className='w-5 ml-[-4%] md:ml-0' bgColor='transparent' fgColor='black' url="https://instagram.com/social_dach" /></div>
              <p className="mt-6 text-sm text-slate-500 flex flex-col gap-3 sm:mt-0"><LanguagePicker language={language}></LanguagePicker> Copyright © {new Date().getFullYear()} Chadwick Marketing. All rights reserved.</p>
              </div>
              </div>
    </footer>
  )
}


export default Footer;