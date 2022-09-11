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
        <section className="header relative bg-hero-pattern bg-no-repeat bg-top bg-[length:60%] flex justify-center items-center text-center px-8 flex-col max-w-screen-xl m-auto pt-5">
          <div className="text-black text-sm bg-tech/10 w-fit p-1 px-4 mb-5 rounded-full">
            {language.availability}
          </div>
          <h1
            className="lg:text-[4.5rem]
            xl:w-7/12 md:w-8/12 text-slate-900 w-full md:text-6xl whitespace-pre-line text-4xl  font-bold font-serif"
          >
            Your new bio <br /> link,
            <div className="relative text-[#4353FF] ml-2 inline w-fit">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="z-[-1] absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/20"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              done right.
            </div>
          </h1>
          <div className="md:w-9/12 pb-10 flex items-center flex-col">
            <p
              className={`md:pt-10 xl:w-9/12 w-9/12  pt-3 font-inter md:text-[17.5px] text-[17px] font-medium lh-3 leading-9 break-words`}
            >
              {language.heroDescription}
            </p>
            <div className="flex justify-center mt-5 gap-3 items-center">
              <Link href="#pricing">
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                  <span className="font-medium">{language.heroCta[1]}</span>
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
          <img className="md:w-10/12 w-12/12 mt-10" src={language.heroImage} />
        </section>
        <section className="max-w-screen-xl w-full relative mt-[100px] overflow-hidden flex  text-center items-center flex-col m-auto md:gap-[20px] md:px-10 px-8">
          <h2 className="lg:w-6/12 md:w-10/12 md:text-5xl text-3xl md:block font-bold text-slate-900 whitespace-pre-line font-serif">
            {language.linkTitle}
          </h2>
          <p className="md:w-6/12 pb-10 font-inter md:text-[18px] md:mt-0 text-[17px] font-medium lh-3 leading-9 ">
            {language.linkContent}
          </p>
          <div className="links-wrap md:w-11/12 w-full overflow-hidden relative flex justify-center">
            <div className="links flex md:gap-10 gap-5">
              {language.links.map((link) => (
                <div
                  key={link}
                  className="text-slate-900 bg-white py-5 md:w-[200px] w-[100px] text-center rounded-full border-solid border border-gray-200"
                >
                  <h3 className="text-lg font-serif font-bold">{link.type}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="links-wrap md:w-11/12 w-full overflow-hidden relative flex justify-center">
            <div className="links-2 flex md:gap-10 gap-5">
              {language.links2.map((link) => (
                <div
                  key={link}
                  className="text-slate-900 transition-transform bg-white py-5 md:w-[200px] w-[100px] text-center rounded-full border-solid border border-gray-200"
                >
                  <h3 className="text-lg font-serif font-bold">{link.type}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="max-w-screen-xl bg-white md:mx-10 p-12 border-2 border-neutral-100 rounded-3xl relative mt-[150px] mb-[100px] md:flex items-center flex-row m-auto gap-[100px]">
          <div className="md:w-6/12 rounded-3xl border-solid border-2 border-neutral-100 overflow-hidden relative ">
            <video
              className="video rounded-3xl"
              loop
              playsInline
              muted
              src={language.branding.video}
            ></video>
          </div>
          <div className="md:w-6/12">
            <h2 className="xlg:text-4xl lg:leading-none text-4xl md:block font-bold pt-10 md:pt-0 whitespace-pre-line font-serif">
              {language.branding.title}
            </h2>
            <p className="pt-10 pb-10 md:w-10/12 font-inter md:text-[18px] text-[17px] font-medium lh-3 leading-9 break-words">
              {language.branding.content}
            </p>
            <Link href="#pricing">
              <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                <span className="font-normal">{language.heroCta[1]}</span>{' '}
                {language.heroCta[2]}
              </a>
            </Link>
          </div>
        </section>
        <section className="max-w-screen-xl bg-white md:mx-10 p-12 border-2 border-neutral-100 rounded-3xl relative mt-[50px] mb-[100px] md:flex items-center flex-row-reverse m-auto gap-[100px]">
          <div className="md:w-6/12 rounded-3xl border-solid border-2 border-neutral-100 overflow-hidden relative">
            <video
              className="video rounded-3xl"
              loop
              playsInline
              muted
              src={language.reach.video}
            ></video>
          </div>
          <div className="md:w-6/12 md:pl-8">
            <h2 className="xl:text-6xl lg:text-[3.25rem] lg:leading-none text-4xl md:block font-medium  pt-10 md:pt-0  font-serif">
              {language.reach.title}
            </h2>
            <p className="pt-10 pb-10 md:w-10/12 font-inter md:text-[18px] text-[17px] font-medium lh-3 leading-9 break-words">
              {language.reach.content}
            </p>
            <Link href="#pricing">
              <a className="text-white bg-tech hover:bg-tech-hover mt-5 py-3  px-8 rounded-full font-light">
                <span className="font-normal">{language.heroCta[1]}</span>{' '}
                {language.heroCta[2]}
              </a>
            </Link>
          </div>
        </section>
        <section className="max-w-screen-xl bg-white md:mx-10 p-12 border-2 border-neutral-100 rounded-3xl relative mt-[50px] mb-[100px] md:flex items-center flex-row m-auto gap-[100px]">
          <div className="md:w-6/12 rounded-3xl border-solid border-2 border-neutral-100 overflow-hidden relative">
            <video
              className="video rounded-3xl"
              loop
              playsInline
              muted
              src={language.analytics.video}
            ></video>
          </div>
          <div className="md:w-6/12">
            <h2 className="xl:text-6xl  lg:text-[3.25rem] lg:leading-none text-4xl md:block font-medium pt-10 md:pt-0 lh-3 font-serif">
              {language.analytics.title}
            </h2>
            <p className="pt-10 pb-10 md:w-10/12 font-inter md:text-[18px] text-[17px] font-medium lh-3 leading-9 break-words">
              {language.analytics.content}
            </p>
            <Link href="#pricing">
              <a className="text-white bg-tech hover:bg-tech-hover mt-5 py-3  px-8 rounded-full font-light">
                <span className="font-normal">{language.heroCta[1]}</span>{' '}
                {language.heroCta[2]}
              </a>
            </Link>
          </div>
        </section>
        <section
          id="get-free-shares-today"
          className="relative overflow-hidden bg-tech w-full py-20 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-md sm:text-center">
              <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Get your first tips today
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                It takes 30 seconds to sign up. Download the app and create an
                account today and we’ll send you a tip guaranteed to double your
                first investment.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  aria-label="Download on the App Store"
                  className="rounded-lg transition-colors bg-white text-gray-900 hover:bg-gray-50"
                  href="/#"
                >
                  <svg viewBox="0 0 120 40" aria-hidden="true" className="h-10">
                    <path
                      fill="currentColor"
                      d="M24.769 20.301a4.947 4.947 0 0 1 2.357-4.152 5.066 5.066 0 0 0-3.992-2.157c-1.679-.177-3.307 1.004-4.163 1.004-.872 0-2.19-.987-3.608-.958a5.315 5.315 0 0 0-4.473 2.728c-1.934 3.349-.491 8.27 1.361 10.976.927 1.326 2.01 2.806 3.428 2.753 1.387-.057 1.905-.884 3.58-.884 1.658 0 2.144.884 3.59.851 1.489-.024 2.426-1.331 3.32-2.669a10.96 10.96 0 0 0 1.52-3.092 4.782 4.782 0 0 1-2.92-4.4ZM22.037 12.211a4.872 4.872 0 0 0 1.115-3.49 4.957 4.957 0 0 0-3.208 1.66 4.635 4.635 0 0 0-1.143 3.36 4.099 4.099 0 0 0 3.236-1.53ZM42.302 27.14H37.57l-1.137 3.356h-2.005l4.484-12.418h2.083l4.483 12.418h-2.039l-1.136-3.356Zm-4.243-1.55h3.752l-1.85-5.446h-.051l-1.85 5.447ZM55.16 25.97c0 2.813-1.506 4.62-3.779 4.62a3.068 3.068 0 0 1-2.848-1.584h-.043v4.485H46.63V21.442h1.8v1.506h.033a3.21 3.21 0 0 1 2.883-1.6c2.298 0 3.813 1.816 3.813 4.622Zm-1.91 0c0-1.833-.948-3.039-2.393-3.039-1.42 0-2.375 1.23-2.375 3.038 0 1.825.955 3.046 2.375 3.046 1.445 0 2.392-1.196 2.392-3.046ZM65.124 25.97c0 2.813-1.505 4.62-3.778 4.62a3.07 3.07 0 0 1-2.848-1.584h-.043v4.485h-1.859V21.442h1.799v1.506h.034a3.21 3.21 0 0 1 2.883-1.6c2.298 0 3.813 1.816 3.813 4.621Zm-1.91 0c0-1.834-.947-3.039-2.392-3.039-1.42 0-2.375 1.23-2.375 3.038 0 1.825.955 3.046 2.375 3.046 1.445 0 2.392-1.196 2.392-3.046ZM71.71 27.036c.138 1.232 1.335 2.04 2.97 2.04 1.566 0 2.693-.808 2.693-1.919 0-.964-.68-1.54-2.29-1.936l-1.609-.388c-2.28-.55-3.339-1.617-3.339-3.348 0-2.142 1.867-3.614 4.519-3.614 2.624 0 4.423 1.472 4.483 3.614h-1.876c-.112-1.239-1.136-1.987-2.634-1.987-1.497 0-2.521.757-2.521 1.858 0 .878.654 1.395 2.255 1.79l1.368.336c2.548.603 3.606 1.626 3.606 3.443 0 2.323-1.85 3.778-4.793 3.778-2.754 0-4.614-1.42-4.734-3.667h1.902ZM83.346 19.3v2.142h1.722v1.472h-1.722v4.991c0 .776.345 1.137 1.102 1.137.204-.004.408-.018.611-.043v1.463c-.34.064-.686.092-1.032.086-1.833 0-2.548-.689-2.548-2.444v-5.19h-1.316v-1.472h1.316V19.3h1.867ZM86.065 25.97c0-2.849 1.678-4.639 4.294-4.639 2.625 0 4.295 1.79 4.295 4.639 0 2.856-1.661 4.638-4.295 4.638-2.633 0-4.294-1.782-4.294-4.638Zm6.695 0c0-1.954-.895-3.108-2.401-3.108-1.506 0-2.4 1.162-2.4 3.108 0 1.962.894 3.106 2.4 3.106 1.506 0 2.401-1.144 2.401-3.106ZM96.186 21.442h1.772v1.541h.043a2.16 2.16 0 0 1 2.178-1.636c.214 0 .428.023.637.07v1.738a2.594 2.594 0 0 0-.835-.112 1.872 1.872 0 0 0-1.937 2.083v5.37h-1.858v-9.054ZM109.384 27.837c-.25 1.643-1.85 2.771-3.898 2.771-2.634 0-4.269-1.764-4.269-4.595 0-2.84 1.644-4.682 4.191-4.682 2.505 0 4.08 1.72 4.08 4.466v.637h-6.395v.112a2.353 2.353 0 0 0 .639 1.832 2.364 2.364 0 0 0 1.797.732 2.045 2.045 0 0 0 2.091-1.273h1.764Zm-6.282-2.702h4.526a2.167 2.167 0 0 0-.608-1.634 2.168 2.168 0 0 0-1.612-.664 2.293 2.293 0 0 0-2.306 2.298ZM37.826 8.731a2.64 2.64 0 0 1 2.808 2.965c0 1.906-1.03 3.002-2.808 3.002h-2.155V8.731h2.155Zm-1.228 5.123h1.125a1.877 1.877 0 0 0 1.967-2.146 1.881 1.881 0 0 0-1.967-2.133h-1.125v4.28ZM41.68 12.445a2.133 2.133 0 1 1 4.248 0 2.132 2.132 0 1 1-4.247 0Zm3.334 0c0-.976-.439-1.547-1.209-1.547-.772 0-1.206.57-1.206 1.547 0 .984.434 1.55 1.207 1.55.769 0 1.208-.57 1.208-1.55ZM51.573 14.697h-.922l-.93-3.316h-.07l-.927 3.316h-.913l-1.242-4.503h.902l.806 3.436h.067l.925-3.436h.853l.926 3.436h.07l.803-3.436h.889l-1.237 4.503ZM53.853 10.195h.856v.715h.066a1.348 1.348 0 0 1 1.344-.802 1.466 1.466 0 0 1 1.559 1.675v2.915h-.889v-2.692c0-.724-.314-1.084-.972-1.084a1.034 1.034 0 0 0-1.075 1.141v2.635h-.889v-4.503ZM59.094 8.437h.888v6.26h-.888v-6.26ZM61.218 12.444a2.133 2.133 0 1 1 4.248 0 2.134 2.134 0 1 1-4.248 0Zm3.333 0c0-.976-.439-1.547-1.208-1.547-.772 0-1.207.57-1.207 1.547 0 .984.435 1.55 1.207 1.55.77 0 1.208-.57 1.208-1.55ZM66.4 13.425c0-.81.604-1.278 1.676-1.344l1.22-.07v-.39c0-.475-.315-.744-.922-.744-.497 0-.84.183-.939.5h-.86c.09-.773.818-1.269 1.84-1.269 1.128 0 1.765.562 1.765 1.514v3.076h-.855v-.633h-.07a1.515 1.515 0 0 1-1.353.707 1.36 1.36 0 0 1-1.501-1.347Zm2.895-.385v-.376l-1.1.07c-.62.041-.9.252-.9.65 0 .405.351.64.834.64a1.062 1.062 0 0 0 1.166-.984ZM71.348 12.444c0-1.423.732-2.324 1.87-2.324a1.484 1.484 0 0 1 1.38.79h.067V8.437h.888v6.26h-.851v-.711h-.07a1.563 1.563 0 0 1-1.415.785c-1.145 0-1.869-.9-1.869-2.327Zm.918 0c0 .955.45 1.53 1.203 1.53.75 0 1.212-.583 1.212-1.526 0-.939-.468-1.53-1.212-1.53-.748 0-1.203.579-1.203 1.526ZM79.23 12.445a2.133 2.133 0 1 1 4.247 0 2.132 2.132 0 1 1-4.247 0Zm3.333 0c0-.976-.439-1.547-1.208-1.547-.773 0-1.207.57-1.207 1.547 0 .984.434 1.55 1.207 1.55.77 0 1.208-.57 1.208-1.55ZM84.67 10.195h.855v.715h.066a1.349 1.349 0 0 1 1.344-.802 1.466 1.466 0 0 1 1.559 1.675v2.915h-.889v-2.692c0-.724-.315-1.084-.972-1.084a1.034 1.034 0 0 0-1.075 1.141v2.635h-.889v-4.503ZM93.515 9.074v1.142h.976v.748h-.976v2.316c0 .472.195.678.637.678.113 0 .226-.007.339-.02v.74c-.16.028-.322.043-.484.045-.988 0-1.382-.348-1.382-1.216v-2.543h-.714v-.748h.715V9.074h.89ZM95.705 8.437h.88v2.481h.07a1.386 1.386 0 0 1 1.374-.807 1.485 1.485 0 0 1 1.55 1.679v2.907h-.889V12.01c0-.719-.335-1.083-.963-1.083a1.05 1.05 0 0 0-1.134 1.141v2.63h-.888v-6.26ZM104.761 13.482a1.823 1.823 0 0 1-1.951 1.302 2.047 2.047 0 0 1-2.08-2.324 2.093 2.093 0 0 1 .071-.88 2.08 2.08 0 0 1 2.005-1.473c1.253 0 2.009.856 2.009 2.27v.31h-3.18v.05a1.19 1.19 0 0 0 1.2 1.29 1.077 1.077 0 0 0 1.071-.545h.855Zm-3.126-1.452h2.275a1.094 1.094 0 0 0-.667-1.084 1.086 1.086 0 0 0-.442-.082 1.151 1.151 0 0 0-1.166 1.166Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="secondary-features"
          aria-label="Features for building a portfolio"
          className="py-20 w-full sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold font-serif tracking-tight text-gray-900">
                Now is the time to build your portfolio.
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                With typical market returns, you have to start young to secure
                your future. With Pocket, it’s never too late to build your nest
                egg.
              </p>
            </div>
            <ul
              role="list"
              className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
            >
              <li className="rounded-2xl border border-gray-200 p-8">
                <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
                    fill="#737373"
                  />
                  <path
                    d="M12 25l8-8m0 0h-6m6 0v6"
                    stroke="#171717"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={16}
                    cy={16}
                    r={16}
                    fill="#A3A3A3"
                    fillOpacity="0.2"
                  />
                </svg>
                <h3 className="mt-6 font-semibold text-gray-900">
                  Invest any amount
                </h3>
                <p className="mt-2 text-gray-700">
                  Whether it’s $1 or $1,000,000, we can put your money to work
                  for you.
                </p>
              </li>
              <li className="rounded-2xl border border-gray-200 p-8">
                <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
                    fill="#737373"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 13a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H10a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H10a1 1 0 01-1-1v-2zm1 5a1 1 0 00-1 1v2a1 1 0 001 1h12a1 1 0 001-1v-2a1 1 0 00-1-1H10z"
                    fill="url(#:R1adm:-gradient)"
                  />
                  <rect
                    x={9}
                    y={6}
                    width={14}
                    height={4}
                    rx={1}
                    fill="#171717"
                  />
                  <circle
                    cx={16}
                    cy={16}
                    r={16}
                    fill="#A3A3A3"
                    fillOpacity="0.2"
                  />
                  <defs>
                    <linearGradient
                      id=":R1adm:-gradient"
                      x1={16}
                      y1={12}
                      x2={16}
                      y2={28}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#737373" />
                      <stop offset={1} stopColor="#737373" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
                <h3 className="mt-6 font-semibold text-gray-900">
                  Build a balanced portfolio
                </h3>
                <p className="mt-2 text-gray-700">
                  Invest in different industries to find the most opportunities
                  to win huge.
                </p>
              </li>
              <li className="rounded-2xl border border-gray-200 p-8">
                <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
                  <circle
                    cx={16}
                    cy={16}
                    r={16}
                    fill="#A3A3A3"
                    fillOpacity="0.2"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 4a4 4 0 014-4h14a4 4 0 014 4v10h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h5v2H9a4 4 0 01-4-4V4z"
                    fill="#737373"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 32a8 8 0 100-16 8 8 0 000 16zm1-8.414V19h-2v5.414l4 4L28.414 27 25 23.586z"
                    fill="#171717"
                  />
                </svg>
                <h3 className="mt-6 font-semibold text-gray-900">
                  Trade in real-time
                </h3>
                <p className="mt-2 text-gray-700">
                  Get insider tips on big stock moves and act on them within
                  seconds.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section
          id="pricing"
          className="border-t border-gray-200 relative w-full bg-gray-100 mb-[100px] py-10 flex text-center items-center flex-col m-auto gap-[30px] px-10"
        >
          <h2 className="md:w-8/12 md:text-4xl text-4xl md:block font-bold font-serif">
            {language.pricing.headline}
          </h2>
          <p className="md:w-6/12 font-inter md:text-[18px] text-[17px] font-medium lh-3 leading-9 break-words">
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
                    checked && 'bg-slate-900 text-white'
                  } cursor-pointer border-solid border-2 border-neutral-100 focus:outline-none bg-white flex items-center justify-center rounded-full py-3 px-5 font-medium`}
                >
                  {language.price.monthly}
                </span>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="annual">
              {({ checked }) => (
                <span
                  className={`${
                    checked && 'bg-slate-900 text-white'
                  } cursor-pointer border-solid border-2 border-neutral-100 focus:outline-none bg-white flex items-center justify-center rounded-full py-3 px-5 font-medium`}
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
          <div className="md:w-6/12 bg-white w-full pt-5 border-2 border-neutral-100 md:p-12 p-0 rounded-3xl">
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
                              checked && 'text-black bg-slate-900'
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
                              checked && 'text-black bg-slate-900 border-tech'
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
                              checked && 'text-black bg-slate-900 border-tech'
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
              <div className="md:w-6/12 w-10/12 mt-5 md:pl-5">
                {language.pricing.pro.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <CheckIcon className="w-5 h-5" />
                    {feature}
                  </li>
                ))}
              </div>
            </div>
            <div className="w-12/12 flex mb-5 flex-col items-center">
              <a
                onClick={() => handleCheckout()}
                className="text-black bg-slate-900 hover:bg-slate-900-hover mt-10 py-3 cursor-pointer px-8 rounded-full font-light"
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
                            className="inline-flex justify-center rounded-full border border-transparent bg-slate-900 text-white px-4 py-3 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

        <section className="max-w-screen-xl w-full relative mt-[25px] md:flex text-center items-center flex-col m-auto gap-[50px] px-10">
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
