import Navigation from "../../components/Navigation";

import Footer from "../../components/Footer";

import Head from "next/head";

import en from "../../locales/en";

import { ChevronRightIcon } from "@heroicons/react/outline";

export default function Page() {
  const language = en;

  return (
    <div>
      <Head>
        <title>
          Social: The free Linktree alternative that will supercharge your bio
          link
        </title>
        <meta name="description" content="" />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/chadwickmarketing/social/og--image_haZDiZynP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666863781752"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="x-default" href="https://socialwp.io" />
      </Head>
      <Navigation language={language} />
      <section className="px-10">
        <div className="header flex flex-col max-w-screen-md m-auto pt-10">
          <span className="text-tech ">Introducing Social</span>
          <h1 className="font-bold text-5xl font-serif my-5">
            The free Linktree alternative that will supercharge your bio link.
          </h1>
          <span className="flex">
            December 8, 2022
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              className="w-5 h-5 ml-5 mr-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>{" "}
            5 Min.
          </span>
        </div>
      </section>
      <section className="max-w-screen-md m-auto">
        <img
          className="rounded-3xl mt-10 w-full"
          alt="The free Linktree alternative that will supercharge your bio link."
          src="https://ik.imagekit.io/chadwickmarketing/social/link-in-bio-creator-socialwp_Q50SehKb7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670519094377"
        />
      </section>
      <section className="content max-w-screen-md m-auto pt-20 px-10">
        <div className="flex flex-col bg-tech/5 rounded-xl">
          <div className="flex flex-col p-10">
            <h2 className="text-xl font-serif leading-9 font-bold mb-2">
              Table of contents
            </h2>
            <ul className="list-disc list-inside list-none">
              <li className="text-base leading-9 mb-2">
                <a href="#linktree-what-is-that" className="flex items-center">
                  <ChevronRightIcon className="w-4 h-4 mr-2" /> Linktree - what
                  is that?
                </a>
              </li>
              <li className="text-base leading-9 mb-2">
                <a href="#linktree-what-is-that" className="flex items-center">
                  <ChevronRightIcon className="w-4 h-4 mr-2" /> Linktree - what
                  is that?
                </a>
              </li>
              <li className="text-base leading-9 mb-2">
                <a href="#linktree-what-is-that" className="flex items-center">
                  <ChevronRightIcon className="w-4 h-4 mr-2" /> Linktree - what
                  is that?
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-base leading-9 mb-5 mt-7">
          If you're an influencer on Instagram, you've likely come across a link
          that looks something like this:
          <div className="p-1.5 mx-1 bg-tech/5 inline-block rounded-lg leading-none font-medium">
            linktr.ee/name
          </div>
          . This is a link created with a tool called Linktree, which many
          influencers use to share multiple links with their followers. While
          Linktree is popular, it doesn't offer much beyond the ability to share
          links.
        </p>
        <p className="text-base leading-9 mb-5">
          In this article, we'll recommend a free alternative that doesn't
          require signing up on a third-party site. Instead, all you need is a
          website, which you likely already use on a daily basis.
        </p>
        <p className="text-base leading-9 mb-5">
          Before we get started, let's clarify a few things:
        </p>
        <h2 className="text-3xl font-serif leading-9 my-10 font-bold">
          Linktree - what is that?
        </h2>
        <p className="text-base leading-9 mb-5">
          With the help of this Linktree, you can create a small landing page
          from which you can link to other pages. These can be pages on your
          website, but also all other links that you want to make available to
          your followers. The whole page looks something like this:
        </p>

        <p className="block-img my-5">
          <img
            src="https://ik.imagekit.io/chadwickmarketing/social/Frame_20_FfaZZnqHH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670523521401"
            alt="Link in bio example"
            className="rounded-t-3xl"
          />
          <div className="text-center  text-sm mb-2 p-3 bg-tech/5 rounded-b-3xl">
            Example of a link page
          </div>
        </p>
        <h2 className="text-3xl font-serif leading-9 my-10 font-bold">
          Why do I need such a link page?
        </h2>
        <p className="text-base leading-9 mb-5">
          It is important to remember that the goal of using Instagram is to
          sell your products, market your blog, and collect newsletter
          subscribers. In order to achieve this goal, it is essential to link
          your followers to your website. Without a link, it will be difficult
          for them to visit your site. Many people will not take the time to
          open a web browser and manually enter your website's address. To
          increase the likelihood that your followers will visit your site, it
          is important to include a link in your Instagram profile.
        </p>
        <p className="text-base leading-9 mb-5"> </p>
        <h2 className="text-3xl font-serif leading-9 my-10 font-bold">
          But is Linktree really the best solution?
        </h2>
        <p className="text-base leading-9 mb-5">
          While Linktree can be a useful tool for creating a dedicated link page
          for your Instagram followers, it may not be the best solution for
          everyone. This is because Linktree is a third-party service that
          requires your followers to leave the Instagram platform in order to
          access your links. This can be inconvenient for your followers and may
          decrease the likelihood that they will visit your website.
          Additionally, using a third-party service like Linktree can also limit
          your ability to fully customize the appearance and functionality of
          your link page. If you want more control over the design and user
          experience of your link page, it may be better to create your own link
          page on your own website, using a platform such as WordPress or
          Squarespace. This will allow you to fully customize the page to match
          your brand and make it as easy as possible for your followers to
          access the links you want to share with them.
        </p>
        <p className="text-base leading-9 mb-5"> </p>
      </section>
      <section className="author max-w-screen-md my-20 grid m-auto grid-cols-[0.2fr_0.8fr] px-10">
        <img
          className="rounded-full w-2/4"
          src="https://ik.imagekit.io/chadwickmarketing/social/Thl93bsR_400x400_9UGujrLqT.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1670524537559"
        />
        <div>
          <span className="text-tech">Written by</span>
          <h3 className="text-2xl my-2 font-serif font-bold">Colin Chadwick</h3>
          <div className="flex items-center">
            <p className="font-bold">Tags:</p>
            <div className="flex items-center p-1 mx-2 rounded-2xl bg-tech/5">
              Marketing
            </div>
            <div className="flex items-center p-1 rounded-2xl bg-tech/5">
              Social media
            </div>
          </div>
        </div>
      </section>
      <Footer language={language}></Footer>
    </div>
  );
}
