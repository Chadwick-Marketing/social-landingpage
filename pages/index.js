import Head from 'next/head';
import { useRouter } from 'next/router';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useEffect, useState, Fragment } from 'react';
import { Disclosure, RadioGroup, Transition, Dialog } from '@headlessui/react';
import Link from 'next/link';
import {
  ShieldCheckIcon,
  ServerIcon,
  SearchCircleIcon,
  ChevronUpIcon,
  CheckIcon,
  ExclamationCircleIcon,
  XIcon,
  ColorSwatchIcon,
} from '@heroicons/react/outline';

import { jsonLdScriptProps } from 'react-schemaorg';

import en from '../locales/en';

import jsonp from 'jsonp';

export default function Home() {
  const router = useRouter();

  const { locale } = router;

  const language = en;

  const [license, setLicense] = useState({
    amount: '1',
    billingCycle: 'monthly',
    currency: {
      code: 'EUR',
      symbol: '€',
    },
  });

  const [installModal, setInstallModal] = useState({
    open: false,
    loading: false,
    compatible: null,
    userSite: null,
    downloadLink: null,
  });

  const [testimonial, setTestimonial] = useState(0);

  const openInstallModal = () => {
    setInstallModal((previous) => ({ ...previous, open: true }));
  };

  const closeInstallModal = () => {
    setInstallModal((previous) => ({ ...previous, open: false }));
  };

  const checkSiteCompatibility = (e) => {
    e.preventDefault();

    let userSite = installModal.userSite.replace(
      /^(?:(.*:)?\/\/)?(.*)/i,
      (match, schemma, nonSchemmaUrl) =>
        schemma ? match : `http://${installModal.userSite}`
    );

    if (installModal.compatible) {
      window.location = `${userSite}/wp-admin/plugin-install.php?tab=plugin-information&plugin=social-lite&TB_iframe=true`;

      return false;
    }

    setInstallModal((previous) => ({ ...previous, loading: true }));

    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `${userSite}/wp-json`
      )}`
    )
      .then((response) => {
        setInstallModal((previous) => ({ ...previous, loading: false }));

        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        try {
          JSON.parse(data.contents.replace(/\:null/gi, ':""'));
        } catch (e) {
          fetch('https://api.wordpress.org/plugins/info/1.0/social-lite.json')
            .then((data) => data.json())
            .then((data) =>
              setInstallModal((previous) => ({
                ...previous,
                downloadLink: data.download_link,
                compatible: false,
              }))
            );

          return false;
        }

        setInstallModal((previous) => ({ ...previous, compatible: true }));
      });
  };

  const playPauseVideo = () => {
    let videos = document.querySelectorAll('video');

    videos.forEach((video) => {
      video.muted = true;

      video.parentElement.insertAdjacentHTML(
        'beforeend',
        '<div class="play-pause absolute bottom-5 flex items-center justify-center h-8 w-8 left-5 cursor-pointer rounded-full font-bold bg-white">| |</div>'
      );

      let playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {
          let observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.intersectionRatio !== 1 && !video.paused) {
                  video.pause();
                } else if (video.paused) {
                  video.play();
                }
              });
            },
            { threshold: 0.1 }
          );
          observer.observe(video);
        });
      }
    });

    document.querySelectorAll('.play-pause').forEach((button) =>
      button.addEventListener('click', (button) => {
        let video = button.currentTarget.previousSibling;

        if (!video.paused) {
          video.pause();

          button.currentTarget.textContent = '▶';
        } else if (video.paused) {
          video.play();

          button.currentTarget.textContent = '| |';
        }
      })
    );
  };

  const handleCheckout = () => {
    let handler = FS.Checkout.configure({
      plugin_id: '10045',
      plan_id: '16915',
      public_key: 'pk_7bbfec18fb763a123256e1b643320',
      image:
        'https://ik.imagekit.io/chadwickmarketing/social/icon_128_uEfTliaqvG.png',
      currency: 'auto',
      trial: 'paid',
    });

    handler.open({
      name: 'Social',
      licenses: license.amount,
      billing_cycle: license.billingCycle,
    });
  };

  useEffect(() => {
    playPauseVideo();

    window.addEventListener('scroll', () => {
      document.querySelector('.links-2').style.transform = `translateX(${
        window.scrollY * 0.25
      }px)`;

      document.querySelector(
        '.links-wrap .links'
      ).style.transform = `translateX(${window.scrollY * -0.35}px)`;
    });

    jsonp('https://checkout.freemius.com/geo.json', null, (err, data) =>
      !err
        ? setLicense((previous) => ({
            ...previous,
            currency: { ...data.currency },
          }))
        : console.error(err)
    );
  }, []);

  return (
    <div>
      <Head>
        <title>{language.home.title}</title>
        <meta name="description" content={language.home.description} />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/chadwickmarketing/social/banner-772x250_zGfos61xsHN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643727968060"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="x-default" href="https://socialwp.io" />
        <script {...jsonLdScriptProps(language.schema)} />
      </Head>
      <Navigation language={language} />
      <main className="flex items-center flex-col">
        <section className="header relative bg-no-repeat bg-top bg-[length:60%] flex justify-center items-center text-center px-8 flex-col max-w-screen-xl m-auto pt-5">
          <h6 className="font-bold text-tech my-3 ">Introducing Social</h6>
          <h1
            className="lg:text-5xl
             xl:w-6/12 md:w-7/12 w-full text-slate-900 w-full text-4xl  font-bold font-serif"
          >
            The
            <div className="relative text-tech mx-2 inline w-fit">complete</div>
            bio link solution for WordPress
          </h1>
          <div className="md:w-9/12 pb-10 flex items-center flex-col">
            <p
              className={`md:pt-5 pt-3 xl:w-8/12 w-10/12 font-inter text-lg text-slate-800 font-medium leading-9`}
            >
              {language.heroDescription}
            </p>
            <div className="flex justify-center mt-5 gap-3 items-center">
              <Link href="#pricing">
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-tech text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                  <span className="font-medium mr-1">
                    {language.heroCta[1]}
                  </span>
                  {language.heroCta[2]}
                </a>
              </Link>
              <Link href="#">
                <a
                  className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300"
                  onClick={() => (window.scrollTop = window.scrollTop + 50)}
                >
                  <span>Learn more</span>
                </a>
              </Link>
            </div>
          </div>
          <img className="md:w-9/12 w-12/12 " src={language.heroImage} />
        </section>
        <section className="max-w-screen-xl w-full relative mt-[100px] overflow-hidden flex  text-center items-center flex-col m-auto md:gap-[20px] md:px-10 px-8">
          <h2 className="lg:w-6/12 md:w-10/12 md:text-5xl text-3xl md:block font-bold text-slate-900 whitespace-pre-line font-serif">
            Everything you are. <br /> In one simple place.
          </h2>
          <p className="md:w-6/12 pb-10 font-inter text-lg text-slate-800 font-medium leading-9 ">
            {language.linkContent}
          </p>

          <div className="links-wrap md:w-11/12 w-full overflow-hidden relative flex justify-center">
            <div className="links flex md:gap-10 gap-5">
              {language.links.map((link) => (
                <div
                  key={link}
                  className="text-slate-900 bg-white py-3 md:w-[200px] w-[100px] text-center rounded-full border-solid border border-gray-200"
                >
                  <h3 className="text-base font-serif font-bold">
                    {link.type}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className="links-wrap md:w-11/12 w-full overflow-hidden relative flex justify-center">
            <div className="links-2 flex md:gap-10 gap-5">
              {language.links2.map((link) => (
                <div
                  key={link}
                  className="text-slate-900 transition-transform bg-white py-3 md:w-[200px] w-[100px] text-center rounded-full border-solid border border-gray-200"
                >
                  <h3 className="text-base font-serif font-bold">
                    {link.type}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full bg-white p-9 md:mx-10  border-2 border-neutral-100 relative mt-[150px]  md:flex items-center flex-col m-auto ">
          <div className="flex md:flex-row flex-col max-w-screen-lg md:gap-20 m-auto items-center py-10">
            <div className="md:w-6/12 w-full rounded-3xl border-solid border-2 border-neutral-100 overflow-hidden relative ">
              <video
                className="video rounded-3xl"
                loop
                playsInline
                muted
                src={language.branding.video}
              ></video>
            </div>
            <div className="md:w-6/12 w-full py-20">
              <h2 className="lg:leading-none md:text-5xl text-3xl md:block  text-slate-900 font-bold pt-10 md:pt-0 whitespace-pre-line font-serif">
                Create your bio link{' '}
                <div className="relative text-[#4353FF] ml-2 inline w-fit">
                  {' '}
                  in minutes.
                </div>
              </h2>
              <div className="grid grid-cols-2 gap-y-5 mt-10 mb-8">
                <div className="flex font-semibold font-serif items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Custom Backgrounds
                </div>
                <div className="flex font-semibold font-serif items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Button & Font Styles
                </div>{' '}
                <div className="flex font-semibold font-serif items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Thumbnails & Icons
                </div>{' '}
                <div className="flex font-semibold font-serif items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Animations & More
                </div>
              </div>
              <p className="pt-5 pb-10 md:w-10/12 font-inter text-lg  text-slate-800 font-medium ">
                {language.branding.content}
              </p>

              <Link href="#pricing">
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-tech text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                  <span className="font-normal">{language.heroCta[1]}</span>{' '}
                  {language.heroCta[2]}
                </a>
              </Link>
            </div>
          </div>
          <div className="flex md:flex-row-reverse flex-col max-w-screen-lg items-center gap-20 py-10 m-auto">
            <div className="md:w-6/12 w-full rounded-3xl border-solid border-2 border-neutral-100 overflow-hidden relative ">
              <video
                className="video rounded-3xl"
                loop
                playsInline
                muted
                src={language.reach.video}
              ></video>
            </div>
            <div className="md:w-6/12 py-20 ">
              <h2 className="lg:leading-none md:text-5xl text-3xl md:block  text-slate-900 font-bold pt-10 md:pt-0 whitespace-pre-line font-serif">
                Share your work in
                <div className="relative text-[#4353FF] ml-2 inline w-fit">
                  limitless ways.
                </div>
              </h2>
              <div className="grid grid-cols-2 gap-y-5 mt-10 mb-8">
                <div className="flex font-bold items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Custom Backgrounds
                </div>
                <div className="flex font-bold items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Button & Font Styles
                </div>{' '}
                <div className="flex font-bold items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Button & Font Styles
                </div>{' '}
                <div className="flex font-bold items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Button & Font Styles
                </div>
              </div>
              <p className="pt-5 pb-10 md:w-10/12 font-inter text-lg tracking-tight text-slate-800 font-medium ">
                {language.reach.content}
              </p>
              <Link href="#pricing">
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-tech text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                  <span className="font-normal">{language.heroCta[1]}</span>{' '}
                  {language.heroCta[2]}
                </a>
              </Link>
            </div>
          </div>
          <div className="flex md:flex-row-reverse flex-col max-w-screen-lg md:gap-20 m-auto items-center py-10">
            <div className="md:w-6/12 rounded-3xl border-solid border-2 border-neutral-100 overflow-hidden relative ">
              <video
                className="video rounded-3xl"
                loop
                playsInline
                muted
                src={language.analytics.video}
              ></video>
            </div>
            <div className="md:w-6/12 py-20">
              <h2 className="lg:leading-none md:text-5xl text-3xl md:block  text-slate-900 font-bold pt-10 md:pt-0 whitespace-pre-line font-serif">
                Gather meaningful stats,
                <div className="relative text-[#4353FF] mr-2 inline w-fit">
                  {' '}
                  in realtime.
                </div>
              </h2>
              <div className="grid grid-cols-2 gap-y-5 mt-10 mb-8">
                <div className="flex font-bold items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Custom Backgrounds
                </div>
                <div className="flex font-bold items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Button & Font Styles
                </div>{' '}
                <div className="flex font-bold items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Button & Font Styles
                </div>{' '}
                <div className="flex font-bold items-center">
                  <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                  Button & Font Styles
                </div>
              </div>
              <p className="pt-5 pb-10 md:w-10/12 font-inter text-lg tracking-tight text-slate-800 font-medium ">
                {language.branding.content}
              </p>

              <Link href="#pricing">
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-tech text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                  <span className="font-normal">{language.heroCta[1]}</span>{' '}
                  {language.heroCta[2]}
                </a>
              </Link>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="max-w-screen-xl px-10 relative w-full py-20 flex text-center items-center flex-col m-auto gap-[30px]"
        >
          <h2 className="md:text-5xl text-3xl font-bold font-serif tracking-tight text-slate-900">
            {language.pricing.headline}
          </h2>
          <p className="md:w-6/12 text-lg tracking-tight text-slate-900 font-medium lh-3 leading-9 break-words">
            {language.pricing.subheadline}
          </p>
          <RadioGroup
            value={license.billingCycle}
            className="flex items-center justify-center text-center gap-3 relative"
            onChange={(value) =>
              setLicense((previous) => ({ ...previous, billingCycle: value }))
            }
          >
            <RadioGroup.Option value="monthly">
              {({ checked }) => (
                <span
                  className={`${
                    checked && 'bg-tech text-white'
                  } cursor-pointer border-solid border-2 border-neutral-100 focus:outline-none bg-white text-sm flex items-center justify-center rounded-full py-2 px-3 font-medium`}
                >
                  {language.price.monthly}
                </span>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="annual">
              {({ checked }) => (
                <span
                  className={`${
                    checked && 'bg-tech text-white'
                  } cursor-pointer border-solid border-2 border-neutral-100 focus:outline-none bg-white text-sm flex items-center justify-center rounded-full py-2 px-3 font-medium`}
                >
                  {language.price.yearly}
                </span>
              )}
            </RadioGroup.Option>
            <img
              className="w-40 right-[-175px] top-[-20px] absolute md:block hidden"
              src={language.pricing.save20}
            />
          </RadioGroup>
          <div className="md:w-8/12 bg-white w-full pt-5 border-2 border-neutral-100 md:p-12 p-0 rounded-3xl">
            <div className="flex md:flex-row flex-col items-center md:gap-5">
              <div className="md:w-6/12 w-10/12">
                <RadioGroup
                  value={license.amount}
                  onChange={(value) =>
                    setLicense((previous) => ({ ...previous, amount: value }))
                  }
                >
                  <RadioGroup.Option value="1">
                    {({ checked }) => (
                      <span
                        className={`${
                          checked ? 'text-black' : 'text-gray-600'
                        } cursor-pointer justify-between border-solid border-2 border-neutral-100 focus:outline-none bg-white flex items-center rounded-full py-3 px-5 font-medium`}
                      >
                        <div className="shrink-0 flex">
                          <CheckIcon
                            className={`h-7 w-7 mr-5 text-white border-solid border-2 rounded-full p-1 border-neutral-100 ${
                              checked && 'text-black bg-tech'
                            }`}
                          />
                          {language.oneSite}
                        </div>
                        <span>
                          {(license.currency.code == 'usd' ||
                            license.currency.code == 'gbp') &&
                            license.currency.symbol}
                          {license.billingCycle == 'monthly' ? '4.99' : '3.99'}
                          {license.currency.code == 'eur' &&
                            license.currency.symbol}
                        </span>
                      </span>
                    )}
                  </RadioGroup.Option>
                  <RadioGroup.Option value="3">
                    {({ checked }) => (
                      <span
                        className={`${
                          checked ? 'text-black' : 'text-gray-600'
                        } my-5 cursor-pointer justify-between border-solid border-2 border-neutral-100 focus:outline-none bg-white flex items-center rounded-full py-3 px-5 font-medium`}
                      >
                        <div className="shrink-0 flex">
                          <CheckIcon
                            className={`h-7 w-7 mr-5 text-white border-solid border-2 rounded-full p-1 border-neutral-100 ${
                              checked && 'text-black bg-tech border-tech'
                            }`}
                          />
                          {language.threeSites}
                        </div>
                        <span>
                          {(license.currency.code == 'usd' ||
                            license.currency.code == 'gbp') &&
                            license.currency.symbol}
                          {license.billingCycle == 'monthly' ? '7.99' : '5.99'}
                          {license.currency.code == 'eur' &&
                            license.currency.symbol}
                        </span>
                      </span>
                    )}
                  </RadioGroup.Option>
                  <RadioGroup.Option value="10">
                    {({ checked }) => (
                      <span
                        className={`${
                          checked ? 'text-black' : 'text-gray-600'
                        } cursor-pointer justify-between border-solid border-2 border-neutral-100 focus:outline-none bg-white flex items-center rounded-full py-3 px-5 font-medium`}
                      >
                        <div className="shrink-0 flex">
                          <CheckIcon
                            className={`h-7 w-7 mr-5 text-white border-solid border-2 rounded-full p-1 border-neutral-100 ${
                              checked && 'text-black bg-tech border-tech'
                            }`}
                          />
                          {language.tenSites}
                        </div>
                        <span>
                          {(license.currency.code == 'usd' ||
                            license.currency.code == 'gbp') &&
                            license.currency.symbol}
                          {license.billingCycle == 'monthly' ? '10.99' : '8.99'}
                          {license.currency.code == 'eur' &&
                            license.currency.symbol}
                        </span>
                      </span>
                    )}
                  </RadioGroup.Option>
                </RadioGroup>
              </div>
              <div className="md:w-6/12 w-10/12 flex gap-4 flex-col md:pl-5">
                {language.pricing.pro.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-sm font-bold gap-2"
                  >
                    <CheckIcon className="w-6 h-6 mr-3 bg-tech text-white rounded-full p-1" />
                    {feature}
                  </li>
                ))}
              </div>
            </div>
            <div className="w-12/12 flex mt-5 flex-col items-center">
              <a
                onClick={() => handleCheckout()}
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-tech text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
              >
                <span className="font-medium">
                  {language.pricing.startTrial}
                </span>
              </a>
              <p className="text-sm mt-3 font-medium text-gray-600">
                {language.trial}
              </p>
            </div>
          </div>
          <div className="mt-2 lg:flex lg:items-center lg:justify-center">
            <div className="flex flex-shrink-0 justify-center -space-x-4 overflow-hidden lg:justify-start">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://cdn.feather.blog?src=https%3A%2F%2Ffeather.so%2Fimages%2Fayush.jpeg"
                alt="Ayush"
              />
              <img
                className="inline-block  h-10 w-10 rounded-full ring-2 ring-white"
                src="https://cdn.feather.blog?src=https%3A%2F%2Ffeather.so%2Fimages%2Fanthony.png"
                alt="Anthony"
              />
              <img
                className="inline-block  h-10 w-10 rounded-full ring-2 ring-white"
                src="https://cdn.feather.blog?src=https%3A%2F%2Ffeather.so%2Fimages%2Fvensy.png"
                alt="Vensy"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://cdn.feather.blog?src=https%3A%2F%2Ffeather.so%2Fimages%2Froberto.png"
                alt="Roberto"
              />
            </div>
            <p className="mt-4 text-center text-base text-gray-900 lg:mt-0 lg:ml-4">
              Join{/* */}{' '}
              <span className="font-bold">
                170+ creators, bloggers and makers
              </span>{' '}
              <br />
              and start publishing your content today
            </p>
          </div>
          <p
            onClick={openInstallModal}
            className="text-sm font-medium text-gray-600"
          >
            {language.freeCta.or}{' '}
            <a className="underline text-gray-800 cursor-pointer">
              {language.freeCta.base}
            </a>{' '}
            {language.freeCta.free}
          </p>

          <Transition appear show={installModal.open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              onClose={closeInstallModal}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-12 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h2"
                        className="font-medium text-2xl leading-6 text-gray-900 mb-5 relative"
                      >
                        {installModal.compatible
                          ? language.installModal.titleSuccess
                          : language.installModal.title}
                      </Dialog.Title>
                      <form onSubmit={(e) => checkSiteCompatibility(e)}>
                        <div className="mt-2">
                          <p className="text-gray-500">
                            {installModal.compatible
                              ? language.installModal.contentSuccess
                              : language.installModal.content}
                          </p>
                        </div>
                        <div className="mt-5">
                          <input
                            className="shadow appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            pattern="(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,9}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)"
                            value={installModal.userSite}
                            onInput={(e) =>
                              setInstallModal((previous) => ({
                                ...previous,
                                userSite: e.target.value,
                                compatible: null,
                              }))
                            }
                            placeholder={language.installModal.placeholder}
                          />
                        </div>
                        {installModal.compatible == false && (
                          <div
                            className="bg-orange-50 text-orange-700 px-4 py-3 rounded-xl relative flex items-start gap-5 mt-5"
                            role="alert"
                          >
                            <ExclamationCircleIcon className="w-10 h-10" />
                            <span className="block sm:inline">
                              {language.installModal.incompatible}{' '}
                              <a
                                className="underline"
                                href={installModal.downloadLink}
                                download
                              >
                                {language.installModal.installManually}
                              </a>
                              .
                            </span>
                          </div>
                        )}
                        <div className="mt-4 text-right">
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-full border border-transparent bg-tech text-white px-4 py-3 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          >
                            {installModal.loading && (
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            )}{' '}
                            {installModal.compatible
                              ? `${language.installModal.install} ${installModal.userSite}`
                              : language.installModal.continue}
                          </button>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </section>

        <section className="max-w-screen-xl w-full relative md:flex text-center items-center flex-col m-auto gap-[50px] px-10">
          <h2 className="md:w-8/12  text-4xl md:mb-0 mb-10 md:block font-bold font-serif">
            {language.pricing.faqTitle}
          </h2>
          <div className="md:w-8/12 w-full">
            <div className="rounded-2xl">
              {language.pricing.faq.map((question, index) => (
                <Disclosure key={question}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`pt-10 flex border-b-0 ${
                          !open && 'mb-10 rounded-3xl border-b-2'
                        } border-2 border-neutral-100  bg-white justify-between w-full rounded-t-3xl text-xl px-10 pb-10 font-serif font-bold text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
                      >
                        <span>{question.question}</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-10 pb-10 mb-10 text-left bg-white rounded-b-3xl font-inter border-2 border-t-0 border-neutral-100 leading-9">
                        {question.answer}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer language={language}></Footer>
    </div>
  );
}
