import Head from "next/head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useEffect, useState, Fragment, useRef } from "react";
import { Disclosure, RadioGroup, Transition, Dialog } from "@headlessui/react";
import Link from "next/link";
import {
  ChevronUpIcon,
  CheckIcon,
  ExclamationCircleIcon,
  XIcon,
  CursorClickIcon,
  ColorSwatchIcon,
  CodeIcon,
  SearchIcon,
  CurrencyDollarIcon,
  PlayIcon,
  RssIcon,
  CalendarIcon,
  RefreshIcon,
  LockClosedIcon,
  CollectionIcon,
  LinkIcon,
} from "@heroicons/react/outline";

import "animate.css";

import { jsonLdScriptProps } from "react-schemaorg";

import en from "../locales/en";

import jsonp from "jsonp";

import ScrollAnimation from "react-animate-on-scroll";

import { FSCheckout } from "freemius-checkout-js";

export default function Home() {
  const language = en;

  const linkWrapRefs = [useRef(null), useRef(null)];

  const pricingRef = useRef(null);

  const [license, setLicense] = useState({
    amount: "1",
    billingCycle: "monthly",
    currency: {
      code: "EUR",
      symbol: "€",
    },
  });

  const [installModal, setInstallModal] = useState({
    open: false,
    loading: false,
    compatible: null,
    userSite: null,
    downloadLink: null,
  });

  const [videoModal, setVideoModal] = useState({
    open: false,
    video: null,
  });

  const [pricingInView, setPricingInView] = useState(false);

  const openVideoModal = (video) => {
    setVideoModal({
      open: true,
      video: video,
    });
  };

  const closeVideoModal = () => {
    setVideoModal({
      open: false,
      video: null,
    });
  };

  const openInstallModal = () => {
    setInstallModal((previous) => ({ ...previous, open: true }));
  };

  const closeInstallModal = () => {
    setInstallModal((previous) => ({ ...previous, open: false }));
  };

  async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  }

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

    fetchWithTimeout(
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
          fetch("https://api.wordpress.org/plugins/info/1.0/social-lite.json")
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

  const handleCheckout = () => {
    let handler = new FSCheckout({
      plugin_id: "10702",
      plan_id: "18404",
      public_key: "pk_b8bb9e62381f312b76f0633cd602a",
      image:
        "https://ik.imagekit.io/chadwickmarketing/social/icon_128_uEfTliaqvG.png",
      currency: "auto",
      trial: "paid",
    });

    handler.open({
      name: "Social",
      licenses: license.amount,
      billing_cycle: license.billingCycle,
      purchaseCompleted: (response) => {
        gtag("event", "conversion", {
          send_to: "AW-10833648628/80WNCIq4xIAYEPS38a0o",
          value: response.purchase.initial_amount.toString(),
          currency: response.purchase.currency.toString().toUpperCase(),
          transaction_id: response.purchase.id.toString(),
        });
      },
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      linkWrapRefs[1].current.style.transform = `translateX(${
        window.scrollY * 0.25
      }px)`;

      linkWrapRefs[0].current.style.transform = `translateX(${
        window.scrollY * -0.35
      }px)`;
    });

    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setPricingInView(entry.isIntersecting);
      });
    }).observe(pricingRef.current);

    let constrain = 100;
    let mouseOverContainers = document.querySelectorAll(
      ".social-parallax-container"
    );

    function transforms(x, y, el) {
      let box = el.getBoundingClientRect();
      let calcX = -(y - box.y - box.height / 2) / constrain;
      let calcY = (x - box.x - box.width / 2) / constrain;

      return (
        "perspective(600px) " +
        "   rotateX(" +
        calcX +
        "deg) " +
        "   rotateY(" +
        calcY +
        "deg) "
      );
    }

    function transformElement(el, xyEl) {
      el.style.transform = transforms.apply(null, xyEl);
    }

    mouseOverContainers.forEach((container) => {
      let layer = container.querySelector(".social-parallax-effect-layer");

      container.addEventListener("mousemove", (e) => {
        let xy = [e.clientX, e.clientY];
        let position = xy.concat([layer]);

        window.requestAnimationFrame(function () {
          transformElement(layer, position);
        });
      });

      container.addEventListener("mouseleave", (e) => {
        layer.style.transform =
          "perspective(600px) rotateX(0deg) rotateY(0deg)";
      });
    });

    jsonp("https://checkout.freemius.com/geo.json", null, (err, data) =>
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
          content="https://ik.imagekit.io/chadwickmarketing/social/og--image_haZDiZynP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666863781752"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="x-default" href="https://socialwp.io" />
        <script {...jsonLdScriptProps(language.schema)} />
      </Head>
      <Navigation language={language} pricingInView={pricingInView} />
      <main className="flex items-center flex-col">
        <section className="header relative bg-no-repeat bg-top flex justify-center md:items-center md:text-center px-8 flex-col max-w-screen-xl m-auto pt-5">
          <h6 className="font-bold text-tech my-3 md:order-none order-2">
            Introducing Social
          </h6>
          <h1
            className="lg:text-5xl
             xl:w-7/12 md:w-8/12 w-full text-slate-900 w-full sm:text-4xl text-3xl m-auto  font-bold font-serif md:order-none order-3"
          >
            The
            <div className="relative text-tech mx-2 inline w-fit">complete</div>
            bio link solution for WordPress
          </h1>
          <div className="md:w-11/12 pb-10 flex md:items-center flex-col md:order-none order-4">
            <p
              className={`md:pt-5 pt-3 lg:w-7/12 md:w-8/12 w-12/12 font-inter text-lg text-slate-800 font-medium leading-9`}
            >
              {language.heroDescription}
            </p>
            <div className="flex md:justify-center mt-5 gap-3 items-center">
              <Link href="#pricing">
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-tech text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                  <span className="font-medium mr-1">
                    {language.heroCta[1]}
                  </span>
                  {language.heroCta[2]}
                </a>
              </Link>
              <a
                className="group cursor-pointer inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300"
                onClick={() => openVideoModal("snjPbqfqTyQ")}
              >
                <svg
                  aria-hidden="true"
                  class="h-3 w-3 mr-2 flex-none fill-blue-600 group-active:fill-current"
                >
                  <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z"></path>
                </svg>
                <span>Watch video</span>
              </a>
              <Transition appear show={videoModal.open} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-50"
                  onClose={closeVideoModal}
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
                        <Dialog.Panel className="transform transition-all w-full max-w-4xl">
                          <div className="w-full max-w-4xl inline-block relative m-auto">
                            <div
                              className="overflow-hidden rounded-2xl shadow-xl h-0 w-full"
                              style={{ paddingTop: "56.25%" }}
                            >
                              <iframe
                                className="rounded-2xl absolute left-0 top-0 w-full h-full block"
                                src={`https://www.youtube-nocookie.com/embed/${videoModal.video}?autoplay=1`}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                              />
                            </div>
                          </div>
                          <div
                            onClick={() => closeVideoModal()}
                            className="cursor-pointer flex items-center justify-center w-10 h-10 bg-white m-auto rounded-full mb-2 p-2"
                          >
                            <XIcon className="w-5 h-5" />
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
          </div>
          <div
            className="w-full social-parallax-container py-5 relative md:order-none order-1"
            src={language.heroImage}
          >
            <div className="social-parallax-effect-layer">
              <ScrollAnimation animateOnce={true} animateIn="bounceIn">
                <img
                  className="w-3/12 m-auto rounded-2xl"
                  src="https://ik.imagekit.io/chadwickmarketing/social/phone-frame.d4b6b62a_1_mIQ_lKoHIa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666784627928"
                ></img>
              </ScrollAnimation>

              <div
                className="absolute left-0 top-0 w-6/12"
                style={{
                  transform: "translateZ(-200px) translateY(-50px)",
                }}
              >
                {" "}
                <ScrollAnimation
                  animateOnce={true}
                  animateIn="bounceIn"
                  delay={1000}
                  animatePreScroll={true}
                >
                  <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_43__9s4owxMs.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666784684029"></img>
                </ScrollAnimation>
              </div>

              <div
                className="absolute left-0 top-0 w-6/12"
                style={{
                  transform: "translateZ(-200px) translateY(-50px)",
                }}
              >
                <ScrollAnimation
                  animateOnce={true}
                  animateIn="bounceIn"
                  delay={1000}
                  animatePreScroll={true}
                >
                  <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_43__9s4owxMs.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666784684029"></img>
                </ScrollAnimation>{" "}
              </div>

              <div
                className="absolute right-0 top-0 w-6/12"
                style={{
                  transform: "translateZ(-200px) translateY(-50px)",
                }}
              >
                {" "}
                <ScrollAnimation
                  animateOnce={true}
                  animateIn="bounceIn"
                  delay={700}
                  animatePreScroll={true}
                >
                  <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_45_7j3Y-7UOED.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666784747465"></img>
                </ScrollAnimation>{" "}
              </div>

              <div
                className="absolute top-1/2 left-1/2 w-4/12"
                style={{
                  transform:
                    "translateZ(100px) translateY(-50%) translateX(-50%)",
                }}
              >
                {" "}
                <ScrollAnimation
                  animateOnce={true}
                  animateIn="bounceIn"
                  delay={300}
                  animatePreScroll={true}
                  offset={-2500}
                >
                  <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_40_DrSUljxTa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666784630715"></img>
                </ScrollAnimation>{" "}
              </div>

              <div
                className="absolute left-1/2 w-1/12 top-0"
                style={{
                  transform:
                    "translateZ(100px) translateY(10px) translateX(-175%)",
                }}
              >
                {" "}
                <ScrollAnimation
                  animateOnce={true}
                  animateIn="bounceIn"
                  delay={1000}
                  animatePreScroll={true}
                >
                  <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_41_HzKBxQmL3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666784628212" />
                </ScrollAnimation>
              </div>

              <div
                className="absolute right-1/2 w-1/12 bottom-0"
                style={{
                  transform:
                    "translateZ(150px) translateY(-25px) translateX(150%)",
                }}
              >
                {" "}
                <ScrollAnimation
                  animateOnce={true}
                  animateIn="bounceIn"
                  delay={800}
                  animatePreScroll={true}
                >
                  <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_42_bYZbhCT4p.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666784627710" />
                </ScrollAnimation>{" "}
              </div>

              <div
                className="absolute right-0 w-5 bottom-0"
                style={{
                  transform:
                    "translateZ(100px) translateX(-25%) translateY(-75px)",
                  right: "25%",
                }}
              >
                <ScrollAnimation
                  animateOnce={true}
                  animateIn="bounceIn"
                  delay={700}
                  animatePreScroll={true}
                >
                  <img src="https://ik.imagekit.io/chadwickmarketing/social/youtube_nLUUBZlHgz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666784627661" />
                </ScrollAnimation>{" "}
              </div>

              <div
                className="absolute right-0 w-1/6 top-0"
                style={{
                  transform: "translateZ(80px) translateY(0px)",
                  right: "20%",
                }}
              >
                <ScrollAnimation
                  animateOnce={true}
                  animateIn="bounceIn"
                  delay={300}
                  animatePreScroll={true}
                >
                  <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_46_GtPBU_mfNx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666789153448" />
                </ScrollAnimation>{" "}
              </div>

              <div
                className="absolute left-0 w-5 top-0"
                style={{
                  transform:
                    "translateZ(100px) translateX(25%) translateY(250%)",
                  left: "25%",
                }}
              >
                <ScrollAnimation
                  animateOnce={true}
                  animateIn="bounceIn"
                  delay={1000}
                  animatePreScroll={true}
                >
                  <img src="https://ik.imagekit.io/chadwickmarketing/social/instagram__1__ZnOD_1Kjox.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666784627726" />
                </ScrollAnimation>{" "}
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-screen-xl w-full relative mt-[100px] overflow-hidden flex  md:text-center md:items-center flex-col m-auto gap-[20px] md:px-10 px-8">
          <h2 className="lg:w-8/12 md:w-10/12 md:text-5xl text-3xl md:block font-bold text-slate-900 whitespace-pre-line font-serif">
            Everything you are. <br /> In one simple place.
          </h2>
          <p className="md:w-6/12 pb-10 font-inter text-lg text-slate-800 font-medium leading-9">
            {language.linkContent}
          </p>
          <div className="links-wrap md:w-11/12 w-full overflow-hidden relative flex justify-center">
            <div ref={linkWrapRefs[0]} className="links flex md:gap-10 gap-5">
              {language.links.map((link) => (
                <div
                  key={link}
                  className="text-slate-900 bg-white py-3 md:w-[200px] w-[150px] text-center rounded-full border-solid border border-gray-200"
                >
                  <h3 className="text-base font-serif font-bold">
                    {link.type}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className="links-wrap md:w-11/12 w-full overflow-hidden relative flex justify-center">
            <div
              ref={linkWrapRefs[1]}
              className="links-2 flex md:mt-0 mt-5 md:gap-10 gap-5"
            >
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
        <section className="w-full bg-white p-9 md:mx-10  border-2 border-neutral-100 relative mt-[150px] md:flex items-center flex-col m-auto">
          <div className="flex md:flex-row flex-col max-w-screen-lg md:gap-20 m-auto items-center py-10  feature-section">
            <div className="md:w-6/12 w-full relative social-parallax-container">
              <div className="social-parallax-effect-layer">
                <ScrollAnimation animateOnce={true} animateIn="bounceIn">
                  <img
                    className="w-8/12 m-auto"
                    src="https://ik.imagekit.io/chadwickmarketing/social/Group_33_73CoDwPIh.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666717283096"
                  />
                </ScrollAnimation>
                <div
                  className="absolute top-1/2 left-1/2 w-8/12 md:mt-0 mt-9"
                  style={{
                    transform:
                      "translateZ(80px) translateX(-50%) translateY(-100px) scale(.75)",
                  }}
                >
                  <ScrollAnimation animateOnce={true} animateIn="bounceIn">
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_32_gH65KGaOrX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666717280699" />
                  </ScrollAnimation>
                </div>
                <div
                  className="absolute bottom-0 left-0 w-8/12"
                  style={{
                    transform:
                      "translateZ(150px) translateX(-27px) translateY(-26px) scale(.55)",
                  }}
                >
                  <ScrollAnimation
                    animateOnce={true}
                    animateIn="bounceIn"
                    delay={500}
                  >
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_27_6GyEkmJsQ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666717281514" />
                  </ScrollAnimation>
                </div>
                <div
                  className="absolute top-0 right-0 w-8/12"
                  style={{
                    transform: "translateZ(175px) translateX(50px) scale(.5)",
                  }}
                >
                  <ScrollAnimation
                    animateOnce={true}
                    animateIn="bounceIn"
                    delay={1000}
                  >
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_31_DV_1CT817t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666717280078" />
                  </ScrollAnimation>
                </div>
                <div
                  className="absolute top-0 right-0 w-8/12 md:mt-0 -mt-5"
                  style={{
                    transform:
                      "translateZ(195px) translateX(40px) translateY(100px) scale(.25)",
                  }}
                >
                  <ScrollAnimation
                    animateOnce={true}
                    animateIn="bounceIn"
                    delay={500}
                  >
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_26_7CXvHiZZYn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666717279386" />
                  </ScrollAnimation>
                </div>
              </div>
            </div>
            <div className="md:w-6/12 w-full py-20">
              <h6 className="font-bold text-tech my-3 ">Easy setup</h6>
              <h2 className="lg:leading-none md:text-5xl text-3xl md:block text-slate-900 font-bold whitespace-pre-line font-serif">
                Create your bio link in minutes
              </h2>
              <p className="pt-5 pb-10 font-inter text-lg text-slate-800 font-medium ">
                Getting started is easy. Design your custom bio link in minutes,
                or use one of our pre-made templates. No coding required.
              </p>
              <div className="grid md:grid-cols-2 gap-5 mb-8">
                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <ColorSwatchIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  Pre-made designs
                </div>

                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <CursorClickIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  Drag & drop editor
                </div>

                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <CodeIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  No coding required
                </div>
                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <SearchIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  SEO-optimized
                </div>
              </div>
              <Link href="#pricing">
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-tech text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                  <span className="font-normal">{language.heroCta[1]}</span>{" "}
                  {language.heroCta[2]}
                </a>
              </Link>
            </div>
          </div>
          <div className="flex md:flex-row-reverse flex-col max-w-screen-lg items-center gap-20 py-10 m-auto feature-section">
            <div className="md:w-6/12 w-full relative social-parallax-container">
              <div className="social-parallax-effect-layer">
                <ScrollAnimation animateOnce={true} animateIn="bounceIn">
                  <img
                    className="w-8/12 m-auto"
                    src="https://ik.imagekit.io/chadwickmarketing/social/phone-frame.d4b6b62a_1_YE7Ufxsme6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666774862438"
                  />
                </ScrollAnimation>
                <div
                  className="absolute top-1/2 left-1/2 w-8/12"
                  style={{
                    transform:
                      "translateZ(80px) translateX(-60%) translateY(-50px) scale(.85)",
                  }}
                >
                  <ScrollAnimation animateOnce={true} animateIn="bounceIn">
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_16_4oiteBPIk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666774337771" />
                  </ScrollAnimation>
                </div>
                <div
                  className="absolute bottom-0 left-0 w-8/12"
                  style={{
                    transform:
                      "translateZ(150px) translateX(-27px) translateY(-26px) scale(.65)",
                  }}
                >
                  <ScrollAnimation
                    animateOnce={true}
                    animateIn="bounceIn"
                    delay={500}
                  >
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_36_Ci-4AV9Tw.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666774337874" />
                  </ScrollAnimation>
                </div>
                <div
                  className="absolute bottom-0 left-0 w-8/12 md:mb-0 -mb-5"
                  style={{
                    transform:
                      "translateZ(160px) translateX(-27px) translateY(-100px) scale(.5)",
                  }}
                >
                  <ScrollAnimation
                    animateOnce={true}
                    animateIn="bounceIn"
                    delay={500}
                  >
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_34_j-V8xvop6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666774337561" />
                  </ScrollAnimation>
                </div>
                <div
                  className="absolute top-0 right-0 w-8/12"
                  style={{
                    transform:
                      "translateZ(150px) translateX(50px) translateY(100px) scale(.75)",
                  }}
                >
                  <ScrollAnimation
                    animateOnce={true}
                    animateIn="bounceIn"
                    delay={1000}
                  >
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Rectangle_68_wJxp9XWsx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666774337998" />
                  </ScrollAnimation>
                </div>
                <div
                  className="absolute top-0 right-0 w-8/12 md:mt-0 -mt-5"
                  style={{
                    transform:
                      "translateZ(200px) translateX(65px) translateY(125px) scale(0.3)",
                  }}
                >
                  <ScrollAnimation
                    animateOnce={true}
                    animateIn="bounceIn"
                    delay={1000}
                  >
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_35_s5nrEcYOX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666774337876" />
                  </ScrollAnimation>
                </div>
              </div>
            </div>
            <div className="md:w-6/12 md:py-20 ">
              <h6 className="font-bold text-tech my-3 ">Sharing</h6>
              <h2 className="lg:leading-none md:text-5xl text-3xl md:block  text-slate-900 font-bold whitespace-pre-line font-serif">
                Share your work and drive sales
              </h2>
              <p className="pt-5 pb-10 font-inter text-lg tracking-tight text-slate-800 font-medium ">
                Social offers different content blocks. You can embed videos,
                collect donations, share your latest blog posts, and more. The
                possibilities are endless.
              </p>
              <div className="grid md:grid-cols-2 gap-5 mb-8">
                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <CurrencyDollarIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  Collect donations
                </div>
                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <PlayIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  Embed videos
                </div>
                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <RssIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  Share your posts
                </div>
                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <CollectionIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  Organize your links
                </div>
              </div>
              <Link href="#pricing">
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-tech text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                  <span className="font-normal">{language.heroCta[1]}</span>{" "}
                  {language.heroCta[2]}
                </a>
              </Link>
            </div>
          </div>
          <div className="flex md:flex-row flex-col max-w-screen-lg md:gap-20 m-auto items-center py-10 feature-section">
            <div className="md:w-6/12 w-full relative social-parallax-container">
              <div className="social-parallax-effect-layer">
                <ScrollAnimation animateOnce={true} animateIn="bounceIn">
                  <img
                    className="w-9/12 m-auto"
                    src="https://ik.imagekit.io/chadwickmarketing/social/Group_39_Yfq2zdvr2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666775761130"
                  />
                </ScrollAnimation>
                <div
                  className="w-9/12 m-auto absolute top-0 left-1/2"
                  style={{
                    transform:
                      "translateZ(-1px) translateX(-50%) translateY(75%) scale(1.2)",
                  }}
                >
                  <ScrollAnimation animateOnce={true} animateIn="bounceIn">
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/magicpattern-svg-chart-1666536805079_1__1__uJNyx4iz-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666775812187" />
                  </ScrollAnimation>
                </div>
                <div
                  className="absolute top-1/2 left-1/2 w-8/12"
                  style={{
                    transform:
                      "translateZ(80px) translateX(-50%) translateY(-50px) scale(.85)",
                  }}
                >
                  <ScrollAnimation animateOnce={true} animateIn="bounceIn">
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_38_5ken4rtnX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666775762613" />
                  </ScrollAnimation>
                </div>

                <div
                  className="absolute top-0 left-0 w-8/12"
                  style={{
                    transform:
                      "translateZ(159px) translateX(-40px) translateY(48px) scale(.5)",
                  }}
                >
                  <ScrollAnimation
                    animateOnce={true}
                    animateIn="bounceIn"
                    delay={1000}
                  >
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_28__1__fWG9nA9Lz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666775761661" />
                  </ScrollAnimation>
                </div>
                <div
                  className="absolute top-0 left-0 w-8/12 md:mt-0 -mt-10"
                  style={{
                    transform:
                      "translateZ(200px) translateX(-15px) translateY(250px) scale(0.2)",
                  }}
                >
                  <ScrollAnimation
                    animateOnce={true}
                    animateIn="bounceIn"
                    delay={1000}
                  >
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_21_X1ZJ9IMA9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666775761673" />
                  </ScrollAnimation>
                </div>
                <div
                  className="absolute top-0 right-0 w-8/12 md:mt-0 -mt-10"
                  style={{
                    transform:
                      "translateZ(225px) translateX(0px) translateY(175px) scale(0.25)",
                  }}
                >
                  <ScrollAnimation
                    animateOnce={true}
                    animateIn="bounceIn"
                    delay={1000}
                  >
                    <img src="https://ik.imagekit.io/chadwickmarketing/social/Group_37_uA8t1uFdx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666776924918" />
                  </ScrollAnimation>
                </div>
              </div>
            </div>
            <div className="md:w-6/12 md:py-20">
              <h6 className="font-bold text-tech my-3 ">Analytics</h6>
              <h2 className="lg:leading-none md:text-5xl text-3xl md:block  text-slate-900 font-bold md:pt-0 whitespace-pre-line font-serif">
                Get meaningful stats, in realtime
              </h2>
              <p className="pt-5 pb-10 font-inter text-lg tracking-tight text-slate-800 font-medium ">
                With Social's analytics, you get meaningful insights - in
                realtime. Gather all the data you need to analyze your audience
                and optimize your content.
              </p>
              <div className="grid md:grid-cols-2 gap-5 mb-8">
                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <CalendarIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  Custom date ranges
                </div>
                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <RefreshIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  Realtime updates
                </div>
                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <LinkIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  Individual link analytics
                </div>
                <div className="flex font-semibold font-serif border border-gray-200 rounded-full p-2 items-center">
                  <LockClosedIcon className="w-9 h-9 mr-3 bg-tech text-white rounded-full p-1" />
                  Privacy-friendly
                </div>
              </div>
              <Link href="#pricing">
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-tech text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                  <span className="font-normal">{language.heroCta[1]}</span>{" "}
                  {language.heroCta[2]}
                </a>
              </Link>
            </div>
          </div>
        </section>

        <section
          ref={pricingRef}
          id="pricing"
          className="max-w-screen-xl md:px-10 px-5 relative w-full py-20 flex text-center items-center flex-col m-auto md:gap-[20px] gap-[10px]"
        >
          <h6 className="font-bold text-tech">Pricing</h6>
          <h2 className="md:text-5xl text-3xl font-bold font-serif tracking-tight text-slate-900">
            {language.pricing.headline}
          </h2>
          <p className="md:w-6/12 text-lg tracking-tight text-slate-900 font-medium lh-3 leading-9 break-words">
            Pick a plan that works for you - or get started for free.
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
                    checked ? "bg-tech text-white" : "bg-white"
                  } cursor-pointer border-solid border-2 border-neutral-100 focus:outline-none  text-sm flex items-center justify-center rounded-full py-2 px-3 font-medium`}
                >
                  {language.price.monthly}
                </span>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="annual">
              {({ checked }) => (
                <span
                  className={`${
                    checked ? "bg-tech text-white" : "bg-white"
                  } cursor-pointer border-solid border-2 border-neutral-100 focus:outline-none text-sm flex items-center justify-center rounded-full py-2 px-3 font-medium`}
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
          <div className="md:w-8/12 md:-mx-4 mt-10 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-2 xl:mx-0 md:gap-x-8">
            <section className="flex flex-col rounded-3xl px-6 sm:px-8 py-8 bg-white border-2 border-neutral-100">
              <h3 className="mt-5 font-serif font-bold text-lg text-slate-800">
                Lite
              </h3>
              <p className="mt-2 text-base text-slate-600">
                Good for anyone who is just getting started, or for personal
                use.
              </p>
              <p className="order-first font-serif text-4xl font-bold tracking-tight text-slate-800">
                {(license.currency.code == "usd" ||
                  license.currency.code == "gbp") &&
                  license.currency.symbol}
                0{license.currency.code == "eur" && license.currency.symbol}
              </p>
              <ul
                role="list"
                className="order-last mt-10 flex flex-col gap-y-3 text-sm text-slate-800"
              >
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-slate-800"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Add unlimited links</span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-slate-800"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Choose a pre-made design</span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-slate-800"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Add thumbnails to your links</span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-slate-800"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Set a custom URL ending</span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-slate-800"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Gather basic analytics</span>
                </li>
              </ul>
              <button
                className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-700 text-slate-800 hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white mt-8"
                onClick={openInstallModal}
              >
                Get started
              </button>
            </section>
            <section className="flex flex-col rounded-3xl px-6 sm:px-8 order-first bg-tech py-8 border-2 border-neutral-100 lg:order-none">
              <h3 className="mt-5 font-serif font-bold text-lg text-white">
                Pro
              </h3>
              <p className="mt-2 text-base text-white">
                Level up your bio link with custom designs, advanced analytics,
                dynamic content links, and more.
              </p>
              <p className="order-first font-serif text-4xl font-bold tracking-tight text-white">
                {(license.currency.code == "usd" ||
                  license.currency.code == "gbp") &&
                  license.currency.symbol}
                <span className="line-through-diagonal text-base opacity-50 mr-2">
                  {license.billingCycle == "monthly" ? "5.99" : "4.99"}
                </span>
                {license.billingCycle == "monthly" ? "4.99" : "3.99"}
                {license.currency.code == "eur" && license.currency.symbol}
                <span className="block text-sm opacity-50">/ month </span>
              </p>

              <ul
                role="list"
                className="order-last mt-10 flex flex-col gap-y-3 text-sm  text-white"
              >
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-white"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Everything from Lite</span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-white"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Create your own designs</span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-white"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Prioritize links with animations</span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-white"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Schedule your links and content</span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-white"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">
                    Share your socials with social icons
                  </span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-white"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Set your bio link as homepage</span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-white"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Gather advanced analytics</span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-white"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Hide the Social badge</span>
                </li>
                <li className="flex">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-current stroke-current text-white"
                  >
                    <path
                      d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
                      strokeWidth={0}
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="8.25"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-4">Priority email support</span>
                </li>
              </ul>
              <button
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white mt-8"
                onClick={handleCheckout}
              >
                Start 7-day free trial
              </button>
            </section>
          </div>
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
                    <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h2"
                        className="font-bold text-base font-serif leading-6 text-gray-900 mb-5 relative"
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
                              {language.installModal.incompatible}{" "}
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
                            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-tech text-white hover:text-slate-100 hover:bg-blue-600 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
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
                            )}{" "}
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
          <div className="flex items-center gap-3 pt-8 w-8/12 m-auto justify-center border-t border-grey-200">
            <h5 className="font-bold font-serif text-base">As featured on:</h5>
            <a
              href="https://layerwp.com/product/social-link-in-bio-creator/"
              target="_blank"
            >
              <img
                className="w-20"
                src="https://ik.imagekit.io/chadwickmarketing/social/logo--layerwp_VPxRMZSl7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666816591774"
              />
            </a>
          </div>
        </section>
        <section className="max-w-screen-xl w-full relative md:flex text-center items-center flex-col m-auto gap-[50px] md:px-10 px-5">
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
                          !open && "mb-10 rounded-3xl border-b-2"
                        } border-2 border-neutral-100  bg-white justify-between w-full rounded-t-3xl text-xl px-10 pb-10 font-serif font-bold text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
                      >
                        <span>{question.question}</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "transform rotate-180" : ""
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
