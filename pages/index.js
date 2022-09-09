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

  const animateLinks = () => {
    let linkAnimation = new gsap.timeline({ repeat: -1 });

    linkAnimation.fromTo(
      '.links-wrap .links',
      {
        x: document.querySelector('.links').getBoundingClientRect().width * -2,
      },
      {
        duration: 45,
        x: document.querySelector('.links').getBoundingClientRect().width * 2,
        ease: 'none',
      }
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

    animateLinks();

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
            className="lg:text-[4.4rem]
            xl:w-7/12 md:w-8/12 text-slate-900 w-full md:text-6xl whitespace-pre-line text-4xl md:block hidden font-bold font-serif"
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
          <span className="text-4xl  md:hidden block font-medium font-serif">
            {language.heroTitleMobile}
          </span>
          <div className="md:w-9/12 pb-10 flex items-center flex-col">
            <p
              className={`md:pt-10 xl:w-9/12 w-11/12  pt-3 font-inter md:text-[17.5px] text-[17px] font-medium lh-3 leading-9 break-words`}
            >
              {language.heroDescription}
            </p>
            <div className="flex justify-center mt-5 gap-3 items-center">
              <Link href="#pricing">
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                  <span className="font-medium">{language.heroCta[1]}</span>{' '}
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
          <div className="w-12/12 m-auto pt-12 md:flex hidden justify-between">
            <div className="flex items-center font-medium">
              <ShieldCheckIcon
                className="w-10 h-10 mr-5 fill-tech/20"
                aria-hidden="true"
              />
              {language.linkInBio.gdpr}
            </div>
            <div className="flex mx-10 items-center font-medium">
              <ColorSwatchIcon className="w-10 h-10 mr-5" aria-hidden="true" />
              {language.security.decentral.headline}
            </div>
            <div className="flex items-center font-medium">
              <SearchCircleIcon
                className="w-10 h-10 mr-5 fill-tech/20"
                aria-hidden="true"
              />
              {language.linkInBio.tools}
            </div>
          </div>
        </section>
        <section className="max-w-screen-xl w-full relative mt-[100px] overflow-hidden flex  text-center items-center flex-col m-auto md:gap-[50px] md:px-10 px-8">
          <h2 className="lg:w-6/12 md:w-10/12 md:text-5xl text-3xl md:block font-bold text-slate-900 whitespace-pre-line font-serif">
            {language.linkTitle}
          </h2>
          <p className="md:w-6/12  pb-10 font-inter md:text-[18px] md:mt-0 mt-5 text-[17px] font-medium lh-3 leading-9 break-words">
            {language.linkContent}
          </p>
          <div className="links-wrap md:w-11/12 w-full overflow-hidden relative flex justify-center">
            <div className="links flex md:gap-10 gap-5">
              {language.links.map((link) => (
                <div
                  key={link}
                  className="bg-slate-900 text-white py-6 md:w-[200px] w-[100px] text-center rounded-full border-solid border-2 border-neutral-100"
                >
                  <h3 className="text-base font-medium">{link.type}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="features"
          aria-label="Features for investing all your money"
          className="w-full bg-white mt-20 py-20 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
              <h2 className="text-3xl md:block font-semibold  whitespace-pre-line font-serif">
                Every feature you need to win. Try it for yourself.
              </h2>
              <p className="mt-2 text-lg text-gray-400">
                Pocket was built for investors like you who play by their own
                rules and aren’t going to let SEC regulations get in the way of
                their dreams. If other investing tools are afraid to build it,
                Pocket has it.
              </p>
            </div>
          </div>
          <div className="mt-16 md:hidden">
            <div className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden">
              <div className="w-full flex-none snap-center px-4 sm:px-6">
                <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
                  <div className="relative aspect-[366/729] relative mx-auto w-full max-w-[366px]">
                    <div className="absolute inset-y-[calc(1/729*100%)] right-[calc(5/729*100%)] left-[calc(7/729*100%)] rounded-[calc(58/366*100%)/calc(58/729*100%)] shadow-2xl" />
                    <div className="absolute top-[calc(23/729*100%)] left-[calc(23/366*100%)] grid h-[calc(686/729*100%)] w-[calc(318/366*100%)] transform grid-cols-1 overflow-hidden bg-gray-900 pt-[calc(23/318*100%)]">
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between px-4 pt-4">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 w-6 flex-none"
                          >
                            <path
                              d="M5 6h14M5 18h14M5 12h14"
                              stroke="#fff"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <svg
                            viewBox="0 0 79 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 flex-none"
                          >
                            <path
                              d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12ZM2.4 12a9.004 9.004 0 0 0 6.055 8.507c1.565.542 2.945-.85 2.945-2.507V6c0-1.657-1.38-3.049-2.945-2.507A9.004 9.004 0 0 0 2.4 12Z"
                              fill="#06B6D4"
                            />
                            <path
                              d="M33.004 17V6.818h3.818c.783 0 1.439.146 1.97.438.533.291.935.692 1.207 1.203.275.507.413 1.084.413 1.73 0 .653-.138 1.233-.413 1.74a2.948 2.948 0 0 1-1.218 1.198c-.537.288-1.198.433-1.983.433h-2.531v-1.517h2.282c.457 0 .832-.08 1.124-.238.291-.16.507-.378.646-.657.142-.278.214-.598.214-.96 0-.36-.072-.679-.214-.954a1.452 1.452 0 0 0-.651-.641c-.292-.156-.668-.234-1.129-.234h-1.69V17h-1.845Zm12.152.15c-.746 0-1.392-.165-1.939-.493a3.343 3.343 0 0 1-1.273-1.377c-.298-.59-.447-1.28-.447-2.068 0-.79.15-1.48.447-2.073a3.335 3.335 0 0 1 1.273-1.383c.547-.328 1.193-.492 1.94-.492.745 0 1.391.164 1.938.492.547.329.97.79 1.268 1.383.301.593.452 1.284.452 2.073 0 .789-.15 1.478-.452 2.068a3.309 3.309 0 0 1-1.268 1.377c-.547.328-1.193.492-1.939.492Zm.01-1.443c.404 0 .742-.11 1.014-.333.272-.225.474-.527.607-.905.136-.377.204-.798.204-1.262 0-.468-.068-.89-.204-1.268a2.007 2.007 0 0 0-.607-.91c-.272-.225-.61-.338-1.014-.338-.414 0-.759.113-1.034.338a2.041 2.041 0 0 0-.612.91 3.81 3.81 0 0 0-.198 1.268c0 .464.066.885.198 1.262.136.378.34.68.612.905.275.222.62.333 1.034.333Zm8.508 1.442c-.763 0-1.417-.167-1.964-.502a3.352 3.352 0 0 1-1.258-1.387c-.292-.593-.437-1.276-.437-2.048 0-.776.149-1.46.447-2.054a3.34 3.34 0 0 1 1.263-1.392c.547-.334 1.193-.502 1.939-.502.62 0 1.168.115 1.645.343.48.226.864.546 1.149.96.285.41.447.891.487 1.441h-1.72a1.644 1.644 0 0 0-.497-.92c-.259-.248-.605-.372-1.04-.372-.367 0-.69.1-.969.298-.278.196-.495.478-.651.845-.153.368-.229.81-.229 1.323 0 .52.076.968.229 1.342.152.371.366.658.641.86.279.2.605.298.98.298.265 0 .502-.05.71-.149.213-.102.39-.25.532-.442.143-.192.24-.426.294-.701h1.72a2.999 2.999 0 0 1-.477 1.437c-.275.414-.65.739-1.124.974-.474.232-1.03.348-1.67.348Zm6.39-2.545-.006-2.173h.289l2.744-3.067h2.103l-3.376 3.758h-.372l-1.383 1.482ZM58.422 17V6.818h1.8V17h-1.8Zm4.792 0-2.485-3.475 1.213-1.268L65.368 17h-2.153Zm6.245.15c-.766 0-1.427-.16-1.984-.478a3.233 3.233 0 0 1-1.278-1.362c-.298-.59-.447-1.285-.447-2.083 0-.786.149-1.475.447-2.069a3.384 3.384 0 0 1 1.263-1.392c.54-.334 1.175-.502 1.904-.502.47 0 .915.076 1.333.229.42.149.792.381 1.113.696.325.315.58.716.766 1.203.186.484.278 1.06.278 1.73v.552h-6.259v-1.213h4.534a1.935 1.935 0 0 0-.224-.92 1.625 1.625 0 0 0-.611-.641 1.719 1.719 0 0 0-.905-.234c-.368 0-.691.09-.97.269a1.848 1.848 0 0 0-.65.696c-.153.285-.231.598-.234.94v1.058c0 .444.08.825.243 1.144.163.315.39.556.681.726.292.165.634.248 1.025.248.261 0 .498-.036.71-.11.213-.075.397-.187.552-.332.156-.146.274-.327.353-.542l1.68.189a2.62 2.62 0 0 1-.606 1.163 2.958 2.958 0 0 1-1.133.766c-.461.179-.988.268-1.581.268Zm8.731-7.786v1.392h-4.39V9.364h4.39Zm-3.306-1.83h1.8v7.17c0 .241.036.427.109.556a.59.59 0 0 0 .298.258c.123.047.259.07.408.07.113 0 .215-.008.308-.025.096-.016.17-.031.219-.045l.303 1.407c-.096.034-.233.07-.412.11-.176.04-.392.063-.647.07a2.934 2.934 0 0 1-1.218-.204 1.895 1.895 0 0 1-.86-.706c-.209-.319-.311-.716-.308-1.194V7.534Z"
                              fill="#fff"
                            />
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 w-6 flex-none"
                          >
                            <path
                              d="M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.696 19h10.608c1.175 0 2.08-.935 1.532-1.897C18.028 15.69 16.187 14 12 14s-6.028 1.689-6.836 3.103C4.616 18.065 5.521 19 6.696 19Z"
                              stroke="#fff"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="mt-6 px-4 text-white">
                          <div className="text-2xl text-white">
                            Invite people
                          </div>
                          <div className="text-sm text-gray-500">
                            Get tips{' '}
                            <span className="text-white">5s sooner</span> for
                            every invite.
                          </div>
                        </div>
                        <div className="mt-6 flex-auto rounded-t-2xl bg-white">
                          <div className="px-4 py-6">
                            <div className="space-y-6">
                              <div>
                                <div className="text-sm text-gray-500">
                                  Full name
                                </div>
                                <div className="mt-2 border-b border-gray-200 pb-2 text-sm text-gray-900">
                                  Albert H. Wiggin
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Email address
                                </div>
                                <div className="mt-2 border-b border-gray-200 pb-2 text-sm text-gray-900">
                                  awiggin@chase.com
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 rounded-lg bg-cyan-500 py-2 px-3 text-center text-sm font-semibold text-white">
                              Invite person
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <svg
                      viewBox="0 0 366 729"
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 h-full w-full fill-gray-100"
                    >
                      <path
                        fill="#F2F2F2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M300.092 1c41.22 0 63.223 21.99 63.223 63.213V184.94c-.173.184-.329.476-.458.851.188-.282.404-.547.647-.791.844-.073 2.496.257 2.496 2.157V268.719c-.406 2.023-2.605 2.023-2.605 2.023a7.119 7.119 0 0 1-.08-.102v394.462c0 41.213-22.001 63.212-63.223 63.212h-95.074c-.881-.468-2.474-.795-4.323-.838l-33.704-.005-.049.001h-.231l-.141-.001c-2.028 0-3.798.339-4.745.843H66.751c-41.223 0-63.223-21.995-63.223-63.208V287.739c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 284.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-16.289c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 214.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-26.041a2.26 2.26 0 0 0 .093-.236l-.064-.01a3.337 3.337 0 0 1-.72-.12l-.166-.028A2 2 0 0 1 1 135.62v-24.611a2 2 0 0 1 1.671-1.973l.857-.143v-44.68C3.528 22.99 25.53 1 66.75 1h233.341ZM3.952 234.516a5.481 5.481 0 0 0-.229-.278c.082.071.159.163.228.278Zm89.99-206.304A4.213 4.213 0 0 0 89.727 24H56.864C38.714 24 24 38.708 24 56.852v618.296C24 693.292 38.714 708 56.864 708h250.272c18.15 0 32.864-14.708 32.864-32.852V56.852C340 38.708 325.286 24 307.136 24h-32.864a4.212 4.212 0 0 0-4.213 4.212v2.527c0 10.235-8.3 18.532-18.539 18.532H112.48c-10.239 0-18.539-8.297-18.539-18.532v-2.527Z"
                      />
                      <rect
                        x={154}
                        y={29}
                        width={56}
                        height={5}
                        rx="2.5"
                        fill="#D4D4D4"
                      />
                    </svg>
                    <img
                      alt=""
                      src="/_next/static/media/phone-frame.d4b6b62a.svg"
                      width={366}
                      height={729}
                      decoding="async"
                      data-nimg="future"
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      loading="lazy"
                      style={{ color: 'transparent' }}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                    <svg
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      className="h-8 w-8"
                    >
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
                        d="M16 23a3 3 0 100-6 3 3 0 000 6zm-1 2a4 4 0 00-4 4v1a2 2 0 002 2h6a2 2 0 002-2v-1a4 4 0 00-4-4h-2z"
                        fill="#737373"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v24a4.002 4.002 0 01-3.01 3.877c-.535.136-.99-.325-.99-.877s.474-.98.959-1.244A2 2 0 0025 28V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 001.041 1.756C8.525 30.02 9 30.448 9 31s-.455 1.013-.99.877A4.002 4.002 0 015 28V4z"
                        fill="#A3A3A3"
                      />
                    </svg>
                    <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                      Invite friends for better returns
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      For every friend you invite to Pocket, you get insider
                      notifications 5 seconds sooner. And it’s 10 seconds if you
                      invite an insider.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex-none snap-center px-4 sm:px-6">
                <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg
                      viewBox="0 0 558 558"
                      width={558}
                      height={558}
                      fill="none"
                      aria-hidden="true"
                      className="rotate-180"
                    >
                      <defs>
                        <linearGradient
                          id=":R369m:"
                          x1={79}
                          y1={16}
                          x2={105}
                          y2={237}
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#13B5C8" />
                          <stop
                            offset={1}
                            stopColor="#13B5C8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <path
                        opacity=".2"
                        d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z"
                        stroke="#13B5C8"
                      />
                      <path
                        d="M1 279C1 125.465 125.465 1 279 1"
                        stroke="url(#:R369m:)"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="relative aspect-[366/729] relative mx-auto w-full max-w-[366px]">
                    <div className="absolute inset-y-[calc(1/729*100%)] right-[calc(5/729*100%)] left-[calc(7/729*100%)] rounded-[calc(58/366*100%)/calc(58/729*100%)] shadow-2xl" />
                    <div className="absolute top-[calc(23/729*100%)] left-[calc(23/366*100%)] grid h-[calc(686/729*100%)] w-[calc(318/366*100%)] transform grid-cols-1 overflow-hidden bg-gray-900 pt-[calc(23/318*100%)]">
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between px-4 pt-4">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 w-6 flex-none"
                          >
                            <path
                              d="M5 6h14M5 18h14M5 12h14"
                              stroke="#fff"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <svg
                            viewBox="0 0 79 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 flex-none"
                          >
                            <path
                              d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12ZM2.4 12a9.004 9.004 0 0 0 6.055 8.507c1.565.542 2.945-.85 2.945-2.507V6c0-1.657-1.38-3.049-2.945-2.507A9.004 9.004 0 0 0 2.4 12Z"
                              fill="#06B6D4"
                            />
                            <path
                              d="M33.004 17V6.818h3.818c.783 0 1.439.146 1.97.438.533.291.935.692 1.207 1.203.275.507.413 1.084.413 1.73 0 .653-.138 1.233-.413 1.74a2.948 2.948 0 0 1-1.218 1.198c-.537.288-1.198.433-1.983.433h-2.531v-1.517h2.282c.457 0 .832-.08 1.124-.238.291-.16.507-.378.646-.657.142-.278.214-.598.214-.96 0-.36-.072-.679-.214-.954a1.452 1.452 0 0 0-.651-.641c-.292-.156-.668-.234-1.129-.234h-1.69V17h-1.845Zm12.152.15c-.746 0-1.392-.165-1.939-.493a3.343 3.343 0 0 1-1.273-1.377c-.298-.59-.447-1.28-.447-2.068 0-.79.15-1.48.447-2.073a3.335 3.335 0 0 1 1.273-1.383c.547-.328 1.193-.492 1.94-.492.745 0 1.391.164 1.938.492.547.329.97.79 1.268 1.383.301.593.452 1.284.452 2.073 0 .789-.15 1.478-.452 2.068a3.309 3.309 0 0 1-1.268 1.377c-.547.328-1.193.492-1.939.492Zm.01-1.443c.404 0 .742-.11 1.014-.333.272-.225.474-.527.607-.905.136-.377.204-.798.204-1.262 0-.468-.068-.89-.204-1.268a2.007 2.007 0 0 0-.607-.91c-.272-.225-.61-.338-1.014-.338-.414 0-.759.113-1.034.338a2.041 2.041 0 0 0-.612.91 3.81 3.81 0 0 0-.198 1.268c0 .464.066.885.198 1.262.136.378.34.68.612.905.275.222.62.333 1.034.333Zm8.508 1.442c-.763 0-1.417-.167-1.964-.502a3.352 3.352 0 0 1-1.258-1.387c-.292-.593-.437-1.276-.437-2.048 0-.776.149-1.46.447-2.054a3.34 3.34 0 0 1 1.263-1.392c.547-.334 1.193-.502 1.939-.502.62 0 1.168.115 1.645.343.48.226.864.546 1.149.96.285.41.447.891.487 1.441h-1.72a1.644 1.644 0 0 0-.497-.92c-.259-.248-.605-.372-1.04-.372-.367 0-.69.1-.969.298-.278.196-.495.478-.651.845-.153.368-.229.81-.229 1.323 0 .52.076.968.229 1.342.152.371.366.658.641.86.279.2.605.298.98.298.265 0 .502-.05.71-.149.213-.102.39-.25.532-.442.143-.192.24-.426.294-.701h1.72a2.999 2.999 0 0 1-.477 1.437c-.275.414-.65.739-1.124.974-.474.232-1.03.348-1.67.348Zm6.39-2.545-.006-2.173h.289l2.744-3.067h2.103l-3.376 3.758h-.372l-1.383 1.482ZM58.422 17V6.818h1.8V17h-1.8Zm4.792 0-2.485-3.475 1.213-1.268L65.368 17h-2.153Zm6.245.15c-.766 0-1.427-.16-1.984-.478a3.233 3.233 0 0 1-1.278-1.362c-.298-.59-.447-1.285-.447-2.083 0-.786.149-1.475.447-2.069a3.384 3.384 0 0 1 1.263-1.392c.54-.334 1.175-.502 1.904-.502.47 0 .915.076 1.333.229.42.149.792.381 1.113.696.325.315.58.716.766 1.203.186.484.278 1.06.278 1.73v.552h-6.259v-1.213h4.534a1.935 1.935 0 0 0-.224-.92 1.625 1.625 0 0 0-.611-.641 1.719 1.719 0 0 0-.905-.234c-.368 0-.691.09-.97.269a1.848 1.848 0 0 0-.65.696c-.153.285-.231.598-.234.94v1.058c0 .444.08.825.243 1.144.163.315.39.556.681.726.292.165.634.248 1.025.248.261 0 .498-.036.71-.11.213-.075.397-.187.552-.332.156-.146.274-.327.353-.542l1.68.189a2.62 2.62 0 0 1-.606 1.163 2.958 2.958 0 0 1-1.133.766c-.461.179-.988.268-1.581.268Zm8.731-7.786v1.392h-4.39V9.364h4.39Zm-3.306-1.83h1.8v7.17c0 .241.036.427.109.556a.59.59 0 0 0 .298.258c.123.047.259.07.408.07.113 0 .215-.008.308-.025.096-.016.17-.031.219-.045l.303 1.407c-.096.034-.233.07-.412.11-.176.04-.392.063-.647.07a2.934 2.934 0 0 1-1.218-.204 1.895 1.895 0 0 1-.86-.706c-.209-.319-.311-.716-.308-1.194V7.534Z"
                              fill="#fff"
                            />
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 w-6 flex-none"
                          >
                            <path
                              d="M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.696 19h10.608c1.175 0 2.08-.935 1.532-1.897C18.028 15.69 16.187 14 12 14s-6.028 1.689-6.836 3.103C4.616 18.065 5.521 19 6.696 19Z"
                              stroke="#fff"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="mt-6 px-4 text-white">
                          <div className="text-2xl text-white">Stocks</div>
                          <div className="text-sm text-gray-500">
                            March 9, 2022
                          </div>
                        </div>
                        <div className="mt-6 flex-auto rounded-t-2xl bg-white">
                          <div className="divide-y divide-gray-100">
                            <div className="flex items-center gap-4 px-4 py-3">
                              <div
                                className="flex-none rounded-full"
                                style={{ backgroundColor: '#F9322C' }}
                              >
                                <svg
                                  viewBox="0 0 40 40"
                                  fill="#fff"
                                  aria-hidden="true"
                                  className="h-10 w-10"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M29.982 14.509c.002.005.006.01.007.015a.316.316 0 0 1 .011.082v4.293a.304.304 0 0 1-.043.156.32.32 0 0 1-.119.115l-3.709 2.075v4.112a.305.305 0 0 1-.043.157.32.32 0 0 1-.119.114l-7.742 4.33a.286.286 0 0 1-.056.023l-.022.008a.33.33 0 0 1-.18-.005l-.01-.005c-.018-.006-.036-.011-.053-.021l-7.742-4.33a.32.32 0 0 1-.119-.115.304.304 0 0 1-.043-.156v-12.88a.33.33 0 0 1 .01-.08c.004-.01.01-.018.012-.027l.01-.027a.158.158 0 0 1 .011-.022c.006-.01.015-.018.023-.028.009-.012.017-.025.028-.036.01-.01.02-.016.031-.024.012-.009.023-.019.036-.026l3.871-2.165a.33.33 0 0 1 .322 0l3.872 2.165c.013.007.024.017.036.026l.01.008c.008.005.015.01.021.016a.175.175 0 0 1 .021.025l.008.011.022.028c.008.015.014.032.02.049l.006.01.006.016a.307.307 0 0 1 .01.082v8.044l3.227-1.804v-4.112c0-.028.004-.055.011-.082.003-.01.008-.017.011-.026l.004-.01a.228.228 0 0 1 .017-.039.132.132 0 0 1 .013-.018.203.203 0 0 0 .01-.01c.009-.012.017-.025.028-.036l.015-.013.016-.01.019-.016a.126.126 0 0 1 .017-.011l3.871-2.165a.33.33 0 0 1 .322 0l3.871 2.165c.014.007.024.018.036.026l.012.008.02.016a.162.162 0 0 1 .02.026l.009.01.008.01c.005.006.01.012.013.018a.254.254 0 0 1 .018.04l.003.009.005.01Zm-15.138 8.717 3.22 1.77 7.094-3.933-3.223-1.803-7.091 3.966Zm10.64-2.704v-3.57l-3.226-1.804v3.57l3.225 1.804Zm3.547-5.916-3.225-1.803-3.224 1.803 3.224 1.803 3.225-1.803Zm-14.515.218v7.863l3.226-1.805V13.02l-3.226 1.804Zm2.902-2.346-3.225-1.803-3.224 1.803 3.224 1.803 3.225-1.803Zm-3.547 2.347-3.226-1.805v12.155l7.098 3.97V25.54l-3.708-2.038h-.001l-.002-.002c-.013-.008-.024-.018-.035-.027a.28.28 0 0 0-.011-.007.133.133 0 0 1-.02-.015v-.001l-.019-.022a.452.452 0 0 0-.008-.011l-.016-.02a.086.086 0 0 1-.008-.01v-.002a.123.123 0 0 1-.013-.027l-.005-.012-.008-.016a.115.115 0 0 1-.007-.02.18.18 0 0 1-.005-.033l-.002-.013a.293.293 0 0 0-.002-.013l-.002-.022v-8.405Zm4.516 10.715v3.605l7.096-3.969v-3.572l-7.096 3.935Zm7.742-5.019 3.226-1.804v-3.57l-3.226 1.805v3.57Z"
                                  />
                                </svg>
                              </div>
                              <div className="flex-auto text-sm text-gray-900">
                                Laravel
                              </div>
                              <div className="flex-none text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  4,098.01
                                </div>
                                <div className="text-xs leading-5 text-cyan-500">
                                  +4.98%
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 px-4 py-3">
                              <div
                                className="flex-none rounded-full"
                                style={{ backgroundColor: '#5A67D8' }}
                              >
                                <svg
                                  viewBox="0 0 40 40"
                                  fill="#fff"
                                  aria-hidden="true"
                                  className="h-10 w-10"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M22.5 8 12 11.692v12l3.5 1.231v3.385L26 32V12.615l-3.5 1.231V8Zm-5.833 17.334 5.833 2.05v-12.24l2.333-.82v15.968l-8.166-2.87v-2.088Z"
                                  />
                                </svg>
                              </div>
                              <div className="flex-auto text-sm text-gray-900">
                                Tuple
                              </div>
                              <div className="flex-none text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  5,451.10
                                </div>
                                <div className="text-xs leading-5 text-gray-500">
                                  -3.38%
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 px-4 py-3">
                              <div
                                className="flex-none rounded-full"
                                style={{ backgroundColor: '#2A5B94' }}
                              >
                                <svg
                                  viewBox="0 0 40 40"
                                  fill="#fff"
                                  aria-hidden="true"
                                  className="h-10 w-10"
                                >
                                  <path d="M20 32c-6.617 0-12-5.383-12-12S13.383 8 20 8s12 5.383 12 12-5.383 12-12 12Zm0-22.4C14.267 9.6 9.6 14.266 9.6 20S14.267 30.4 20 30.4c5.734 0 10.4-4.666 10.4-10.4S25.734 9.6 20 9.6Z" />
                                  <path d="M19.434 27.749c.15.15.354.234.566.235.433 0 .8-.368.8-.8V12.815a.8.8 0 0 0-1.6 0v14.368c0 .212.084.415.234.565ZM12.833 20.8h3.833a.802.802 0 0 0 .802-.8.8.8 0 0 0-.801-.8h-3.834c-.45 0-.8.35-.8.8a.8.8 0 0 0 .8.8ZM23.333 20.8h3.85c.433 0 .783-.35.783-.8a.799.799 0 0 0-.8-.8h-3.833c-.45 0-.8.35-.8.8a.8.8 0 0 0 .8.8Z" />
                                </svg>
                              </div>
                              <div className="flex-auto text-sm text-gray-900">
                                Transistor
                              </div>
                              <div className="flex-none text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  4,098.41
                                </div>
                                <div className="text-xs leading-5 text-cyan-500">
                                  +6.25%
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 px-4 py-3">
                              <div
                                className="flex-none rounded-full"
                                style={{ backgroundColor: '#3320A7' }}
                              >
                                <svg
                                  viewBox="0 0 40 40"
                                  fill="#fff"
                                  stroke="#fff"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                  className="h-10 w-10"
                                >
                                  <path
                                    d="M22.16 19 26 13H14l3.84 6"
                                    fill="none"
                                  />
                                  <path d="M25 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
                                </svg>
                              </div>
                              <div className="flex-auto text-sm text-gray-900">
                                Diageo
                              </div>
                              <div className="flex-none text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  250.65
                                </div>
                                <div className="text-xs leading-5 text-cyan-500">
                                  +1.25%
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 px-4 py-3">
                              <div
                                className="flex-none rounded-full"
                                style={{ backgroundColor: '#2A3034' }}
                              >
                                <svg
                                  viewBox="0 0 40 40"
                                  fill="#fff"
                                  aria-hidden="true"
                                  className="h-10 w-10"
                                >
                                  <path d="m26.068 10.555-11.49 13.089L12 21.089 23.489 8l2.58 2.555ZM28 18.91 16.512 32l-2.579-2.555 11.489-13.089L28 18.911Z" />
                                </svg>
                              </div>
                              <div className="flex-auto text-sm text-gray-900">
                                StaticKit
                              </div>
                              <div className="flex-none text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  250.65
                                </div>
                                <div className="text-xs leading-5 text-gray-500">
                                  -3.38%
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 px-4 py-3">
                              <div
                                className="flex-none rounded-full"
                                style={{ backgroundColor: '#0EA5E9' }}
                              >
                                <svg
                                  viewBox="0 0 40 40"
                                  fill="#fff"
                                  aria-hidden="true"
                                  className="h-10 w-10"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M30.177 27.293c0 1.921-.644 2.707-2.398 2.707H12.22c-1.754 0-2.397-.786-2.397-2.707v-3.741c0-1.805-.837-2.824-1.642-3.291a.385.385 0 0 1-.133-.143.403.403 0 0 1 .133-.526c.837-.551 1.642-1.704 1.642-3.241v-3.677c0-2.072.547-2.674 2.3-2.674h15.754c1.754 0 2.3.602 2.3 2.674v3.675c0 1.537.805 2.69 1.641 3.24.243.168.243.52 0 .67-.804.484-1.64 1.503-1.64 3.29v3.743h-.001Zm-14.739-2.455c1.271 1.152 2.64 1.737 4.522 1.737 2.96 0 4.891-1.537 4.891-4.026 0-2.637-2.3-3.31-4.17-3.856-1.282-.375-2.363-.691-2.363-1.54 0-.551.564-1.086 1.513-1.086.917 0 1.674.2 2.397.584.242.117.467.2.676.2.306 0 .547-.15.756-.45l.29-.451a.955.955 0 0 0 .161-.55c0-.336-.161-.67-.402-.837-.966-.635-2.27-1.17-4.039-1.17-2.51 0-4.44 1.37-4.44 3.826 0 2.746 2.349 3.443 4.23 4h.001c1.255.372 2.3.681 2.3 1.497 0 .785-.707 1.17-1.592 1.17a5.19 5.19 0 0 1-2.992-.92c-.274-.183-.532-.3-.805-.3-.242 0-.451.117-.644.368l-.387.517a.888.888 0 0 0-.192.585c0 .25.08.501.29.702Z"
                                  />
                                </svg>
                              </div>
                              <div className="flex-auto text-sm text-gray-900">
                                Statamic
                              </div>
                              <div className="flex-none text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  5,040.85
                                </div>
                                <div className="text-xs leading-5 text-gray-500">
                                  -3.11%
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 px-4 py-3">
                              <div
                                className="flex-none rounded-full"
                                style={{ backgroundColor: '#16A34A' }}
                              >
                                <svg
                                  viewBox="0 0 40 40"
                                  fill="#fff"
                                  aria-hidden="true"
                                  className="h-10 w-10"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24.05 9c2.307 0 4.177 1.885 4.177 4.21a4.21 4.21 0 0 1-2.762 3.964l3.366 6.057h2.304c.355 0 .642.29.642.647a.645.645 0 0 1-.642.647H7.142a.645.645 0 0 1-.642-.647c0-.358.288-.647.643-.647h2.304l5.994-10.747a.641.641 0 0 1 1.097-.036l3.444 5.32 1.071-1.627a4.214 4.214 0 0 1-1.178-2.93c0-2.326 1.87-4.211 4.176-4.211Zm-3.304 9.948 2.772 4.283h3.84l-4.317-7.769-2.295 3.486Zm1.239 4.283-5.944-9.183-5.121 9.183h11.065Zm5.038-10.02a2.995 2.995 0 0 1-2.159 2.883l-1.216-2.19a.64.64 0 0 0-1.096-.04l-.811 1.232a3 3 0 0 1-.663-1.885c0-1.655 1.332-2.997 2.973-2.997 1.641 0 2.972 1.341 2.972 2.997Z"
                                  />
                                  <path d="M12.069 26.469c-.354 0-.641.289-.641.646 0 .358.287.646.64.646h14.139c.354 0 .641-.29.641-.646a.644.644 0 0 0-.64-.646h-14.14Zm4.928 3.236a.645.645 0 0 0-.642.648c0 .357.288.647.642.647h4.282c.355 0 .643-.29.643-.647a.645.645 0 0 0-.643-.648h-4.282Z" />
                                </svg>
                              </div>
                              <div className="flex-auto text-sm text-gray-900">
                                Mirage
                              </div>
                              <div className="flex-none text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  140.44
                                </div>
                                <div className="text-xs leading-5 text-cyan-500">
                                  +9.09%
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 px-4 py-3">
                              <div
                                className="flex-none rounded-full"
                                style={{ backgroundColor: '#8D8D8D' }}
                              >
                                <svg
                                  viewBox="0 0 40 40"
                                  fill="none"
                                  stroke="#fff"
                                  strokeWidth={2}
                                  strokeLinecap="square"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                  className="h-10 w-10"
                                >
                                  <path d="M15 26v-5.25m0 0V16a2 2 0 0 1 2-2h4.21c.968 0 1.37 1.24.587 1.809L15 20.75Zm0 0L25 26" />
                                </svg>
                              </div>
                              <div className="flex-auto text-sm text-gray-900">
                                Reversable
                              </div>
                              <div className="flex-none text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  550.60
                                </div>
                                <div className="text-xs leading-5 text-gray-500">
                                  -1.25%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <svg
                      viewBox="0 0 366 729"
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 h-full w-full fill-gray-100"
                    >
                      <path
                        fill="#F2F2F2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M300.092 1c41.22 0 63.223 21.99 63.223 63.213V184.94c-.173.184-.329.476-.458.851.188-.282.404-.547.647-.791.844-.073 2.496.257 2.496 2.157V268.719c-.406 2.023-2.605 2.023-2.605 2.023a7.119 7.119 0 0 1-.08-.102v394.462c0 41.213-22.001 63.212-63.223 63.212h-95.074c-.881-.468-2.474-.795-4.323-.838l-33.704-.005-.049.001h-.231l-.141-.001c-2.028 0-3.798.339-4.745.843H66.751c-41.223 0-63.223-21.995-63.223-63.208V287.739c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 284.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-16.289c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 214.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-26.041a2.26 2.26 0 0 0 .093-.236l-.064-.01a3.337 3.337 0 0 1-.72-.12l-.166-.028A2 2 0 0 1 1 135.62v-24.611a2 2 0 0 1 1.671-1.973l.857-.143v-44.68C3.528 22.99 25.53 1 66.75 1h233.341ZM3.952 234.516a5.481 5.481 0 0 0-.229-.278c.082.071.159.163.228.278Zm89.99-206.304A4.213 4.213 0 0 0 89.727 24H56.864C38.714 24 24 38.708 24 56.852v618.296C24 693.292 38.714 708 56.864 708h250.272c18.15 0 32.864-14.708 32.864-32.852V56.852C340 38.708 325.286 24 307.136 24h-32.864a4.212 4.212 0 0 0-4.213 4.212v2.527c0 10.235-8.3 18.532-18.539 18.532H112.48c-10.239 0-18.539-8.297-18.539-18.532v-2.527Z"
                      />
                      <rect
                        x={154}
                        y={29}
                        width={56}
                        height={5}
                        rx="2.5"
                        fill="#D4D4D4"
                      />
                    </svg>
                    <img
                      alt=""
                      src="/_next/static/media/phone-frame.d4b6b62a.svg"
                      width={366}
                      height={729}
                      decoding="async"
                      data-nimg="future"
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      loading="lazy"
                      style={{ color: 'transparent' }}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                    <svg
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      className="h-8 w-8"
                    >
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
                        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
                        fill="#A3A3A3"
                      />
                      <path
                        d="M9 8a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H11a2 2 0 01-2-2V8z"
                        fill="#737373"
                      />
                    </svg>
                    <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                      Notifications on stock dips
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      Get a push notification every time we find out something
                      that’s going to lower the share price on your holdings so
                      you can sell before the information hits the public
                      markets.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex-none snap-center px-4 sm:px-6">
                <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg
                      viewBox="0 0 558 558"
                      width={558}
                      height={558}
                      fill="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id=":R3m9m:"
                          x1={79}
                          y1={16}
                          x2={105}
                          y2={237}
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#13B5C8" />
                          <stop
                            offset={1}
                            stopColor="#13B5C8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <path
                        opacity=".2"
                        d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z"
                        stroke="#13B5C8"
                      />
                      <path
                        d="M1 279C1 125.465 125.465 1 279 1"
                        stroke="url(#:R3m9m:)"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="relative aspect-[366/729] relative mx-auto w-full max-w-[366px]">
                    <div className="absolute inset-y-[calc(1/729*100%)] right-[calc(5/729*100%)] left-[calc(7/729*100%)] rounded-[calc(58/366*100%)/calc(58/729*100%)] shadow-2xl" />
                    <div className="absolute top-[calc(23/729*100%)] left-[calc(23/366*100%)] grid h-[calc(686/729*100%)] w-[calc(318/366*100%)] transform grid-cols-1 overflow-hidden bg-gray-900 pt-[calc(23/318*100%)]">
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between px-4 pt-4">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 w-6 flex-none"
                          >
                            <path
                              d="M5 6h14M5 18h14M5 12h14"
                              stroke="#fff"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <svg
                            viewBox="0 0 79 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 flex-none"
                          >
                            <path
                              d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12ZM2.4 12a9.004 9.004 0 0 0 6.055 8.507c1.565.542 2.945-.85 2.945-2.507V6c0-1.657-1.38-3.049-2.945-2.507A9.004 9.004 0 0 0 2.4 12Z"
                              fill="#06B6D4"
                            />
                            <path
                              d="M33.004 17V6.818h3.818c.783 0 1.439.146 1.97.438.533.291.935.692 1.207 1.203.275.507.413 1.084.413 1.73 0 .653-.138 1.233-.413 1.74a2.948 2.948 0 0 1-1.218 1.198c-.537.288-1.198.433-1.983.433h-2.531v-1.517h2.282c.457 0 .832-.08 1.124-.238.291-.16.507-.378.646-.657.142-.278.214-.598.214-.96 0-.36-.072-.679-.214-.954a1.452 1.452 0 0 0-.651-.641c-.292-.156-.668-.234-1.129-.234h-1.69V17h-1.845Zm12.152.15c-.746 0-1.392-.165-1.939-.493a3.343 3.343 0 0 1-1.273-1.377c-.298-.59-.447-1.28-.447-2.068 0-.79.15-1.48.447-2.073a3.335 3.335 0 0 1 1.273-1.383c.547-.328 1.193-.492 1.94-.492.745 0 1.391.164 1.938.492.547.329.97.79 1.268 1.383.301.593.452 1.284.452 2.073 0 .789-.15 1.478-.452 2.068a3.309 3.309 0 0 1-1.268 1.377c-.547.328-1.193.492-1.939.492Zm.01-1.443c.404 0 .742-.11 1.014-.333.272-.225.474-.527.607-.905.136-.377.204-.798.204-1.262 0-.468-.068-.89-.204-1.268a2.007 2.007 0 0 0-.607-.91c-.272-.225-.61-.338-1.014-.338-.414 0-.759.113-1.034.338a2.041 2.041 0 0 0-.612.91 3.81 3.81 0 0 0-.198 1.268c0 .464.066.885.198 1.262.136.378.34.68.612.905.275.222.62.333 1.034.333Zm8.508 1.442c-.763 0-1.417-.167-1.964-.502a3.352 3.352 0 0 1-1.258-1.387c-.292-.593-.437-1.276-.437-2.048 0-.776.149-1.46.447-2.054a3.34 3.34 0 0 1 1.263-1.392c.547-.334 1.193-.502 1.939-.502.62 0 1.168.115 1.645.343.48.226.864.546 1.149.96.285.41.447.891.487 1.441h-1.72a1.644 1.644 0 0 0-.497-.92c-.259-.248-.605-.372-1.04-.372-.367 0-.69.1-.969.298-.278.196-.495.478-.651.845-.153.368-.229.81-.229 1.323 0 .52.076.968.229 1.342.152.371.366.658.641.86.279.2.605.298.98.298.265 0 .502-.05.71-.149.213-.102.39-.25.532-.442.143-.192.24-.426.294-.701h1.72a2.999 2.999 0 0 1-.477 1.437c-.275.414-.65.739-1.124.974-.474.232-1.03.348-1.67.348Zm6.39-2.545-.006-2.173h.289l2.744-3.067h2.103l-3.376 3.758h-.372l-1.383 1.482ZM58.422 17V6.818h1.8V17h-1.8Zm4.792 0-2.485-3.475 1.213-1.268L65.368 17h-2.153Zm6.245.15c-.766 0-1.427-.16-1.984-.478a3.233 3.233 0 0 1-1.278-1.362c-.298-.59-.447-1.285-.447-2.083 0-.786.149-1.475.447-2.069a3.384 3.384 0 0 1 1.263-1.392c.54-.334 1.175-.502 1.904-.502.47 0 .915.076 1.333.229.42.149.792.381 1.113.696.325.315.58.716.766 1.203.186.484.278 1.06.278 1.73v.552h-6.259v-1.213h4.534a1.935 1.935 0 0 0-.224-.92 1.625 1.625 0 0 0-.611-.641 1.719 1.719 0 0 0-.905-.234c-.368 0-.691.09-.97.269a1.848 1.848 0 0 0-.65.696c-.153.285-.231.598-.234.94v1.058c0 .444.08.825.243 1.144.163.315.39.556.681.726.292.165.634.248 1.025.248.261 0 .498-.036.71-.11.213-.075.397-.187.552-.332.156-.146.274-.327.353-.542l1.68.189a2.62 2.62 0 0 1-.606 1.163 2.958 2.958 0 0 1-1.133.766c-.461.179-.988.268-1.581.268Zm8.731-7.786v1.392h-4.39V9.364h4.39Zm-3.306-1.83h1.8v7.17c0 .241.036.427.109.556a.59.59 0 0 0 .298.258c.123.047.259.07.408.07.113 0 .215-.008.308-.025.096-.016.17-.031.219-.045l.303 1.407c-.096.034-.233.07-.412.11-.176.04-.392.063-.647.07a2.934 2.934 0 0 1-1.218-.204 1.895 1.895 0 0 1-.86-.706c-.209-.319-.311-.716-.308-1.194V7.534Z"
                              fill="#fff"
                            />
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 w-6 flex-none"
                          >
                            <path
                              d="M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.696 19h10.608c1.175 0 2.08-.935 1.532-1.897C18.028 15.69 16.187 14 12 14s-6.028 1.689-6.836 3.103C4.616 18.065 5.521 19 6.696 19Z"
                              stroke="#fff"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="mt-6 px-4 text-white">
                          <div className="text-2xl text-white">Buy $LA</div>
                          <div className="text-sm text-gray-500">
                            <span className="text-white">$34.28</span> per share
                          </div>
                        </div>
                        <div className="mt-6 flex-auto rounded-t-2xl bg-white">
                          <div className="px-4 py-6">
                            <div className="space-y-4">
                              <div className="flex justify-between border-b border-gray-100 pb-4">
                                <div className="text-sm text-gray-500">
                                  Number of shares
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                  100
                                </div>
                              </div>
                              <div className="flex justify-between border-b border-gray-100 pb-4">
                                <div className="text-sm text-gray-500">
                                  Current market price
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                  <div className="flex">
                                    $34.28
                                    <svg
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      className="h-6 w-6"
                                    >
                                      <path
                                        d="M17 15V7H9M17 7 7 17"
                                        stroke="#06B6D4"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between border-b border-gray-100 pb-4">
                                <div className="text-sm text-gray-500">
                                  Estimated cost
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                  $3,428.00
                                </div>
                              </div>
                              <div className="rounded-lg bg-cyan-500 py-2 px-3 text-center text-sm font-semibold text-white">
                                Buy shares
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <svg
                      viewBox="0 0 366 729"
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 h-full w-full fill-gray-100"
                    >
                      <path
                        fill="#F2F2F2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M300.092 1c41.22 0 63.223 21.99 63.223 63.213V184.94c-.173.184-.329.476-.458.851.188-.282.404-.547.647-.791.844-.073 2.496.257 2.496 2.157V268.719c-.406 2.023-2.605 2.023-2.605 2.023a7.119 7.119 0 0 1-.08-.102v394.462c0 41.213-22.001 63.212-63.223 63.212h-95.074c-.881-.468-2.474-.795-4.323-.838l-33.704-.005-.049.001h-.231l-.141-.001c-2.028 0-3.798.339-4.745.843H66.751c-41.223 0-63.223-21.995-63.223-63.208V287.739c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 284.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-16.289c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 214.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-26.041a2.26 2.26 0 0 0 .093-.236l-.064-.01a3.337 3.337 0 0 1-.72-.12l-.166-.028A2 2 0 0 1 1 135.62v-24.611a2 2 0 0 1 1.671-1.973l.857-.143v-44.68C3.528 22.99 25.53 1 66.75 1h233.341ZM3.952 234.516a5.481 5.481 0 0 0-.229-.278c.082.071.159.163.228.278Zm89.99-206.304A4.213 4.213 0 0 0 89.727 24H56.864C38.714 24 24 38.708 24 56.852v618.296C24 693.292 38.714 708 56.864 708h250.272c18.15 0 32.864-14.708 32.864-32.852V56.852C340 38.708 325.286 24 307.136 24h-32.864a4.212 4.212 0 0 0-4.213 4.212v2.527c0 10.235-8.3 18.532-18.539 18.532H112.48c-10.239 0-18.539-8.297-18.539-18.532v-2.527Z"
                      />
                      <rect
                        x={154}
                        y={29}
                        width={56}
                        height={5}
                        rx="2.5"
                        fill="#D4D4D4"
                      />
                    </svg>
                    <img
                      alt=""
                      src="/_next/static/media/phone-frame.d4b6b62a.svg"
                      width={366}
                      height={729}
                      decoding="async"
                      data-nimg="future"
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      loading="lazy"
                      style={{ color: 'transparent' }}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      aria-hidden="true"
                      className="h-8 w-8"
                    >
                      <defs>
                        <linearGradient
                          id=":Rfm9m:-gradient"
                          x1={14}
                          y1="14.5"
                          x2={7}
                          y2={17}
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#737373" />
                          <stop
                            offset={1}
                            stopColor="#D4D4D4"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
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
                        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v13h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h4v2H9a4 4 0 01-4-4V4z"
                        fill="#A3A3A3"
                      />
                      <path
                        d="M7 22c0-4.694 3.5-8 8-8"
                        stroke="url(#:Rfm9m:-gradient)"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 20l.217-5.513a1.431 1.431 0 00-2.85-.226L17.5 21.5l-1.51-1.51a2.107 2.107 0 00-2.98 0 .024.024 0 00-.005.024l3.083 9.25A4 4 0 0019.883 32H25a4 4 0 004-4v-5a3 3 0 00-3-3h-5z"
                        fill="#A3A3A3"
                      />
                    </svg>
                    <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                      Invest what you want
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      We hide your stock purchases behind thousands of anonymous
                      trading accounts, so suspicious activity can never be
                      traced back to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                className="relative h-0.5 w-4 rounded-full bg-gray-300"
                aria-label="Go to slide 1"
              >
                <span className="absolute -inset-x-1.5 -inset-y-3" />
              </button>
              <button
                type="button"
                className="relative h-0.5 w-4 rounded-full bg-gray-500"
                aria-label="Go to slide 2"
              >
                <span className="absolute -inset-x-1.5 -inset-y-3" />
              </button>
              <button
                type="button"
                className="relative h-0.5 w-4 rounded-full bg-gray-500"
                aria-label="Go to slide 3"
              >
                <span className="absolute -inset-x-1.5 -inset-y-3" />
              </button>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 hidden md:mt-20 md:block">
            <div className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24">
              <div
                className="relative z-10 order-last col-span-6 space-y-6"
                role="tablist"
                aria-orientation="vertical"
              >
                <div className="relative rounded-2xl transition-colors hover:bg-gray-800/30">
                  <div className="relative z-10 p-8">
                    <svg
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      className="h-8 w-8"
                    >
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
                        d="M16 23a3 3 0 100-6 3 3 0 000 6zm-1 2a4 4 0 00-4 4v1a2 2 0 002 2h6a2 2 0 002-2v-1a4 4 0 00-4-4h-2z"
                        fill="#737373"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v24a4.002 4.002 0 01-3.01 3.877c-.535.136-.99-.325-.99-.877s.474-.98.959-1.244A2 2 0 0025 28V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 001.041 1.756C8.525 30.02 9 30.448 9 31s-.455 1.013-.99.877A4.002 4.002 0 015 28V4z"
                        fill="#A3A3A3"
                      />
                    </svg>
                    <h3 className="mt-6 text-lg font-semibold text-white">
                      <button
                        className="text-left [&:not(:focus-visible)]:focus:outline-none"
                        id="headlessui-tabs-tab-:R2ir9m:"
                        role="tab"
                        type="button"
                        aria-selected="false"
                        tabIndex={-1}
                        data-headlessui-state=""
                        aria-controls="headlessui-tabs-panel-:r2:"
                      >
                        <span className="absolute inset-0 rounded-2xl" />
                        Invite friends for better returns
                      </button>
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      For every friend you invite to Pocket, you get insider
                      notifications 5 seconds sooner. And it’s 10 seconds if you
                      invite an insider.
                    </p>
                  </div>
                </div>
                <div className="relative rounded-2xl transition-colors hover:bg-gray-800/30">
                  <div className="relative z-10 p-8">
                    <svg
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      className="h-8 w-8"
                    >
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
                        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
                        fill="#A3A3A3"
                      />
                      <path
                        d="M9 8a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H11a2 2 0 01-2-2V8z"
                        fill="#737373"
                      />
                    </svg>
                    <h3 className="mt-6 text-lg font-semibold text-white">
                      <button
                        className="text-left [&:not(:focus-visible)]:focus:outline-none"
                        id="headlessui-tabs-tab-:R2kr9m:"
                        role="tab"
                        type="button"
                        aria-selected="false"
                        tabIndex={-1}
                        data-headlessui-state=""
                      >
                        <span className="absolute inset-0 rounded-2xl" />
                        Notifications on stock dips
                      </button>
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      Get a push notification every time we find out something
                      that’s going to lower the share price on your holdings so
                      you can sell before the information hits the public
                      markets.
                    </p>
                  </div>
                </div>
                <div className="relative rounded-2xl transition-colors hover:bg-gray-800/30">
                  <div
                    className="absolute inset-0 bg-gray-800"
                    data-projection-id={7}
                    style={{
                      borderRadius: '2.85714% / 7.69231%',
                      transform: 'none',
                      transformOrigin: '50% 50% 0px',
                    }}
                  />
                  <div className="relative z-10 p-8">
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      aria-hidden="true"
                      className="h-8 w-8"
                    >
                      <defs>
                        <linearGradient
                          id=":R1mr9m:-gradient"
                          x1={14}
                          y1="14.5"
                          x2={7}
                          y2={17}
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#737373" />
                          <stop
                            offset={1}
                            stopColor="#D4D4D4"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
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
                        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v13h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h4v2H9a4 4 0 01-4-4V4z"
                        fill="#A3A3A3"
                      />
                      <path
                        d="M7 22c0-4.694 3.5-8 8-8"
                        stroke="url(#:R1mr9m:-gradient)"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 20l.217-5.513a1.431 1.431 0 00-2.85-.226L17.5 21.5l-1.51-1.51a2.107 2.107 0 00-2.98 0 .024.024 0 00-.005.024l3.083 9.25A4 4 0 0019.883 32H25a4 4 0 004-4v-5a3 3 0 00-3-3h-5z"
                        fill="#A3A3A3"
                      />
                    </svg>
                    <h3 className="mt-6 text-lg font-semibold text-white">
                      <button
                        className="text-left [&:not(:focus-visible)]:focus:outline-none"
                        id="headlessui-tabs-tab-:R2mr9m:"
                        role="tab"
                        type="button"
                        aria-selected="true"
                        tabIndex={0}
                        data-headlessui-state="selected"
                      >
                        <span className="absolute inset-0 rounded-2xl" />
                        Invest what you want
                      </button>
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      We hide your stock purchases behind thousands of anonymous
                      trading accounts, so suspicious activity can never be
                      traced back to you.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative col-span-6">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg
                    viewBox="0 0 558 558"
                    width={558}
                    height={558}
                    fill="none"
                    aria-hidden="true"
                    className="animate-spin-slower"
                  >
                    <defs>
                      <linearGradient
                        id=":R3b9m:"
                        x1={79}
                        y1={16}
                        x2={105}
                        y2={237}
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#13B5C8" />
                        <stop offset={1} stopColor="#13B5C8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <path
                      opacity=".2"
                      d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z"
                      stroke="#13B5C8"
                    />
                    <path
                      d="M1 279C1 125.465 125.465 1 279 1"
                      stroke="url(#:R3b9m:)"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="relative aspect-[366/729] z-10 mx-auto w-full max-w-[366px]">
                  <div className="absolute inset-y-[calc(1/729*100%)] right-[calc(5/729*100%)] left-[calc(7/729*100%)] rounded-[calc(58/366*100%)/calc(58/729*100%)] shadow-2xl" />
                  <div className="absolute top-[calc(23/729*100%)] left-[calc(23/366*100%)] grid h-[calc(686/729*100%)] w-[calc(318/366*100%)] transform grid-cols-1 overflow-hidden bg-gray-900 pt-[calc(23/318*100%)]">
                    <div
                      className="col-start-1 row-start-1 flex focus:outline-offset-[32px] [&:not(:focus-visible)]:focus:outline-none"
                      id="headlessui-tabs-panel-:r2:"
                      role="tabpanel"
                      tabIndex={-1}
                      data-headlessui-state=""
                      aria-labelledby="headlessui-tabs-tab-:R2ir9m:"
                    >
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between px-4 pt-4">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 w-6 flex-none"
                          >
                            <path
                              d="M5 6h14M5 18h14M5 12h14"
                              stroke="#fff"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <svg
                            viewBox="0 0 79 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 flex-none"
                          >
                            <path
                              d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12ZM2.4 12a9.004 9.004 0 0 0 6.055 8.507c1.565.542 2.945-.85 2.945-2.507V6c0-1.657-1.38-3.049-2.945-2.507A9.004 9.004 0 0 0 2.4 12Z"
                              fill="#06B6D4"
                            />
                            <path
                              d="M33.004 17V6.818h3.818c.783 0 1.439.146 1.97.438.533.291.935.692 1.207 1.203.275.507.413 1.084.413 1.73 0 .653-.138 1.233-.413 1.74a2.948 2.948 0 0 1-1.218 1.198c-.537.288-1.198.433-1.983.433h-2.531v-1.517h2.282c.457 0 .832-.08 1.124-.238.291-.16.507-.378.646-.657.142-.278.214-.598.214-.96 0-.36-.072-.679-.214-.954a1.452 1.452 0 0 0-.651-.641c-.292-.156-.668-.234-1.129-.234h-1.69V17h-1.845Zm12.152.15c-.746 0-1.392-.165-1.939-.493a3.343 3.343 0 0 1-1.273-1.377c-.298-.59-.447-1.28-.447-2.068 0-.79.15-1.48.447-2.073a3.335 3.335 0 0 1 1.273-1.383c.547-.328 1.193-.492 1.94-.492.745 0 1.391.164 1.938.492.547.329.97.79 1.268 1.383.301.593.452 1.284.452 2.073 0 .789-.15 1.478-.452 2.068a3.309 3.309 0 0 1-1.268 1.377c-.547.328-1.193.492-1.939.492Zm.01-1.443c.404 0 .742-.11 1.014-.333.272-.225.474-.527.607-.905.136-.377.204-.798.204-1.262 0-.468-.068-.89-.204-1.268a2.007 2.007 0 0 0-.607-.91c-.272-.225-.61-.338-1.014-.338-.414 0-.759.113-1.034.338a2.041 2.041 0 0 0-.612.91 3.81 3.81 0 0 0-.198 1.268c0 .464.066.885.198 1.262.136.378.34.68.612.905.275.222.62.333 1.034.333Zm8.508 1.442c-.763 0-1.417-.167-1.964-.502a3.352 3.352 0 0 1-1.258-1.387c-.292-.593-.437-1.276-.437-2.048 0-.776.149-1.46.447-2.054a3.34 3.34 0 0 1 1.263-1.392c.547-.334 1.193-.502 1.939-.502.62 0 1.168.115 1.645.343.48.226.864.546 1.149.96.285.41.447.891.487 1.441h-1.72a1.644 1.644 0 0 0-.497-.92c-.259-.248-.605-.372-1.04-.372-.367 0-.69.1-.969.298-.278.196-.495.478-.651.845-.153.368-.229.81-.229 1.323 0 .52.076.968.229 1.342.152.371.366.658.641.86.279.2.605.298.98.298.265 0 .502-.05.71-.149.213-.102.39-.25.532-.442.143-.192.24-.426.294-.701h1.72a2.999 2.999 0 0 1-.477 1.437c-.275.414-.65.739-1.124.974-.474.232-1.03.348-1.67.348Zm6.39-2.545-.006-2.173h.289l2.744-3.067h2.103l-3.376 3.758h-.372l-1.383 1.482ZM58.422 17V6.818h1.8V17h-1.8Zm4.792 0-2.485-3.475 1.213-1.268L65.368 17h-2.153Zm6.245.15c-.766 0-1.427-.16-1.984-.478a3.233 3.233 0 0 1-1.278-1.362c-.298-.59-.447-1.285-.447-2.083 0-.786.149-1.475.447-2.069a3.384 3.384 0 0 1 1.263-1.392c.54-.334 1.175-.502 1.904-.502.47 0 .915.076 1.333.229.42.149.792.381 1.113.696.325.315.58.716.766 1.203.186.484.278 1.06.278 1.73v.552h-6.259v-1.213h4.534a1.935 1.935 0 0 0-.224-.92 1.625 1.625 0 0 0-.611-.641 1.719 1.719 0 0 0-.905-.234c-.368 0-.691.09-.97.269a1.848 1.848 0 0 0-.65.696c-.153.285-.231.598-.234.94v1.058c0 .444.08.825.243 1.144.163.315.39.556.681.726.292.165.634.248 1.025.248.261 0 .498-.036.71-.11.213-.075.397-.187.552-.332.156-.146.274-.327.353-.542l1.68.189a2.62 2.62 0 0 1-.606 1.163 2.958 2.958 0 0 1-1.133.766c-.461.179-.988.268-1.581.268Zm8.731-7.786v1.392h-4.39V9.364h4.39Zm-3.306-1.83h1.8v7.17c0 .241.036.427.109.556a.59.59 0 0 0 .298.258c.123.047.259.07.408.07.113 0 .215-.008.308-.025.096-.016.17-.031.219-.045l.303 1.407c-.096.034-.233.07-.412.11-.176.04-.392.063-.647.07a2.934 2.934 0 0 1-1.218-.204 1.895 1.895 0 0 1-.86-.706c-.209-.319-.311-.716-.308-1.194V7.534Z"
                              fill="#fff"
                            />
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="h-6 w-6 flex-none"
                          >
                            <path
                              d="M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.696 19h10.608c1.175 0 2.08-.935 1.532-1.897C18.028 15.69 16.187 14 12 14s-6.028 1.689-6.836 3.103C4.616 18.065 5.521 19 6.696 19Z"
                              stroke="#fff"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div
                          className="mt-6 px-4 text-white"
                          style={{ opacity: 1 }}
                        >
                          <div className="text-2xl text-white">Buy $LA</div>
                          <div className="text-sm text-gray-500">
                            <span className="text-white">$34.28</span> per share
                          </div>
                        </div>
                        <div
                          className="mt-6 flex-auto rounded-t-2xl bg-white"
                          style={{
                            zIndex: 1073741821,
                            transform:
                              'translateY(0%) scale(1) translateZ(0px)',
                            opacity: 1,
                            filter: 'blur(0px)',
                          }}
                        >
                          <div className="px-4 py-6">
                            <div className="space-y-4">
                              <div className="flex justify-between border-b border-gray-100 pb-4">
                                <div className="text-sm text-gray-500">
                                  Number of shares
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                  100
                                </div>
                              </div>
                              <div className="flex justify-between border-b border-gray-100 pb-4">
                                <div className="text-sm text-gray-500">
                                  Current market price
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                  <div className="flex">
                                    $34.28
                                    <svg
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      className="h-6 w-6"
                                    >
                                      <path
                                        d="M17 15V7H9M17 7 7 17"
                                        stroke="#06B6D4"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between border-b border-gray-100 pb-4">
                                <div className="text-sm text-gray-500">
                                  Estimated cost
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                  $3,428.00
                                </div>
                              </div>
                              <div className="rounded-lg bg-cyan-500 py-2 px-3 text-center text-sm font-semibold text-white">
                                Buy shares
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 366 729"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full fill-gray-100"
                  >
                    <path
                      fill="#F2F2F2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M300.092 1c41.22 0 63.223 21.99 63.223 63.213V184.94c-.173.184-.329.476-.458.851.188-.282.404-.547.647-.791.844-.073 2.496.257 2.496 2.157V268.719c-.406 2.023-2.605 2.023-2.605 2.023a7.119 7.119 0 0 1-.08-.102v394.462c0 41.213-22.001 63.212-63.223 63.212h-95.074c-.881-.468-2.474-.795-4.323-.838l-33.704-.005-.049.001h-.231l-.141-.001c-2.028 0-3.798.339-4.745.843H66.751c-41.223 0-63.223-21.995-63.223-63.208V287.739c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 284.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-16.289c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 214.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-26.041a2.26 2.26 0 0 0 .093-.236l-.064-.01a3.337 3.337 0 0 1-.72-.12l-.166-.028A2 2 0 0 1 1 135.62v-24.611a2 2 0 0 1 1.671-1.973l.857-.143v-44.68C3.528 22.99 25.53 1 66.75 1h233.341ZM3.952 234.516a5.481 5.481 0 0 0-.229-.278c.082.071.159.163.228.278Zm89.99-206.304A4.213 4.213 0 0 0 89.727 24H56.864C38.714 24 24 38.708 24 56.852v618.296C24 693.292 38.714 708 56.864 708h250.272c18.15 0 32.864-14.708 32.864-32.852V56.852C340 38.708 325.286 24 307.136 24h-32.864a4.212 4.212 0 0 0-4.213 4.212v2.527c0 10.235-8.3 18.532-18.539 18.532H112.48c-10.239 0-18.539-8.297-18.539-18.532v-2.527Z"
                    />
                    <rect
                      x={154}
                      y={29}
                      width={56}
                      height={5}
                      rx="2.5"
                      fill="#D4D4D4"
                    />
                  </svg>
                  <img
                    alt=""
                    src="/_next/static/media/phone-frame.d4b6b62a.svg"
                    width={366}
                    height={729}
                    decoding="async"
                    data-nimg="future"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    loading="lazy"
                    style={{ color: 'transparent' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="secondary-features"
          aria-label="Features for building a portfolio"
          className="py-20 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-medium tracking-tight text-gray-900">
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
              <li className="rounded-2xl border border-gray-200 p-8">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                  className="h-8 w-8"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
                    fill="#737373"
                  />
                  <circle cx={11} cy={14} r={2} fill="#171717" />
                  <circle cx={11} cy={20} r={2} fill="#171717" />
                  <circle cx={11} cy={26} r={2} fill="#171717" />
                  <path
                    d="M16 14h6M16 20h6M16 26h6"
                    stroke="#737373"
                    strokeWidth={2}
                    strokeLinecap="square"
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
                  Profit from your network
                </h3>
                <p className="mt-2 text-gray-700">
                  Invite new insiders to get tips faster and beat even other
                  Pocket users.
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
                    d="M18 19.5a3.5 3.5 0 117 0V22a2 2 0 012 2v6a2 2 0 01-2 2h-7a2 2 0 01-2-2v-6a2 2 0 012-2v-2.5zm2 2.5h3v-2.5a1.5 1.5 0 00-3 0V22z"
                    fill="#171717"
                  />
                </svg>
                <h3 className="mt-6 font-semibold text-gray-900">
                  Encrypted and anonymized
                </h3>
                <p className="mt-2 text-gray-700">
                  Cutting-edge security technology that even the NSA doesn’t
                  know about keeps you hidden.
                </p>
              </li>
              <li className="rounded-2xl border border-gray-200 p-8">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                  className="h-8 w-8"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
                    fill="#737373"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23 13.838V26a2 2 0 01-2 2H11a2 2 0 01-2-2V15.65l2.57 3.212a1 1 0 001.38.175L15.4 17.2a1 1 0 011.494.353l1.841 3.681c.399.797 1.562.714 1.843-.13L23 13.837z"
                    fill="#171717"
                  />
                  <path
                    d="M10 12h12"
                    stroke="#737373"
                    strokeWidth={2}
                    strokeLinecap="square"
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
                  Portfolio tracking
                </h3>
                <p className="mt-2 text-gray-700">
                  Watch your investments grow exponentially, leaving other
                  investors in the dust.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section
          id="pricing"
          className="max-w-screen-xl relative rounded-3xl  mb-[100px] flex text-center items-center flex-col m-auto gap-[30px] px-10"
        >
          <h2 className="md:w-8/12 md:text-4xl text-4xl md:block font-medium font-serif">
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
          <div className="md:w-9/12 bg-white w-full pt-5 border-2 border-neutral-100 md:p-12 p-0 rounded-3xl">
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

        <section
          id="testimonials"
          aria-label="What our customers are saying"
          className="bg-slate-50 py-20 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl md:text-center">
              <h2 className="font-serif text-4xl font-medium text-black sm:text-4xl">
                Loved by businesses worldwide.
              </h2>
              <p className="mt-4 text-lg tracking-tight text-slate-700">
                Our software is so simple that people can’t help but fall in
                love with it. Simplicity is easy when you just skip tons of
                mission-critical features.
              </p>
            </div>
            <ul
              role="list"
              className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
            >
              <li>
                <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                  <li>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <svg
                        aria-hidden="true"
                        width={105}
                        height={78}
                        className="absolute top-6 left-6 fill-slate-100"
                      >
                        <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
                      </svg>
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          TaxPal is so easy to use I can’t help but wonder if
                          it’s really doing the things the government expects me
                          to do.
                        </p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-display text-base text-slate-900">
                            Sheryl Berge
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            CEO at Lynch LLC
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-full bg-slate-50">
                          <img
                            alt=""
                            srcSet="https://ik.imagekit.io/chadwickmarketing/social/FEA14AC0-E0E8-4218-8E84-4F459823DC07_kMgoD5m_0.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=16545327910495"
                            width={56}
                            height={56}
                            decoding="async"
                            className="h-14 w-14 object-cover"
                            loading="lazy"
                          />
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                </ul>
              </li>

              <li>
                <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                  <li>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <svg
                        aria-hidden="true"
                        width={105}
                        height={78}
                        className="absolute top-6 left-6 fill-slate-100"
                      >
                        <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
                      </svg>
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          I used to have to remit tax to the EU and with TaxPal
                          I somehow don’t have to do that anymore. Nervous to
                          travel there now though.
                        </p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-display text-base text-slate-900">
                            Peter Renolds
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            Founder of West Inc
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-full bg-slate-50">
                          <img
                            alt=""
                            srcSet="https://ik.imagekit.io/chadwickmarketing/social/60EAD10D-A767-4C4D-BED0-7F25DF2850F7_pOZChPL7F.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1654544909975"
                            width={56}
                            height={56}
                            decoding="async"
                            data-nimg="future"
                            className="h-14 w-14 object-cover"
                            loading="lazy"
                          />
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
        <section className="max-w-screen-xl w-full relative mt-[25px] md:flex text-center items-center flex-col m-auto gap-[50px] px-10">
          <h2 className="md:w-8/12  text-4xl md:mb-0 mb-10 md:block font-semibold font-serif">
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
                        } border-2 border-neutral-100  bg-white justify-between w-full rounded-t-3xl text-xl px-10 pb-10 font-serif font-medium text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
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
