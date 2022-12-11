import Navigation from "../../components/Navigation";

import Footer from "../../components/Footer";

import Head from "next/head";

import en from "../../locales/en";

import { ChevronRightIcon, XIcon, CheckIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Page() {
  const language = en;

  return (
    <div>
      <Head>
        <title>
          Social: The free Linktree alternative that will supercharge your bio
          link
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Looking for a free Linktree alternative? Learn how to boost your bio link and easily create a customizable landing page to showcase all of your important links in one place."
        />
        <meta
          name="og:url"
          content="https://socialwp.io/blog/the-best-free-linktree-alternative-for-instagram"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/chadwickmarketing/social/link-in-bio-creator-socialwp_Q50SehKb7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670519094377"
        />
        <meta
          property="og:title"
          content="Social: The free Linktree alternative that will supercharge your bio link"
        />
        <meta
          property="og:description"
          content="Looking for a free Linktree alternative? Learn how to boost your bio link and easily create a customizable landing page to showcase all of your important links in one place."
        />
        <meta property="article:published_time" content="2021-08-08" />
        <meta property="article:modified_time" content="2021-08-08" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Social: The free Linktree alternative that will supercharge your bio link",
            "image": "https://ik.imagekit.io/chadwickmarketing/social/link-in-bio-creator-socialwp_Q50SehKb7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670519094377",
            "datePublished": "2021-08-08",
            "dateModified": "2021-08-08",
            "author": {
              "@type": "Person",
              "name": "Colin Chadwick"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SocialWP.io",
              "logo": {
                "@type": "ImageObject",
                "url": "https://ik.imagekit.io/chadwickmarketing/social/icon_128_uEfTliaqvG.png"
              }
            },
            "description": "Looking for a free Linktree alternative? Learn how to boost your bio link and easily create a customizable landing page to showcase all of your important links in one place."
          }`}
        </script>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Social: The free Linktree alternative that will supercharge your bio link"
        />
        <meta
          name="twitter:description"
          content="Looking for a free Linktree alternative? Learn how to boost your bio link and easily create a customizable landing page to showcase all of your important links in one place."
        />
        <meta
          name="twitter:image"
          content="https://ik.imagekit.io/chadwickmarketing/social/link-in-bio-creator-socialwp_Q50SehKb7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670519094377"
        />
      </Head>
      <Navigation language={language} />
      <section className="px-10">
        <div className="header flex flex-col max-w-screen-md m-auto pt-10">
          <span className="text-tech font-bold">Introducing Social</span>
          <h1 className="font-bold md:text-5xl text-3xl font-serif my-5 text-slate-800">
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
            10 Min.
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
      <section className="content max-w-screen-md m-auto pt-20 px-10 text-slate-800">
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
                <a
                  href="#why-do-i-need-such-a-link-page"
                  className="flex items-center"
                >
                  <ChevronRightIcon className="w-4 h-4 mr-2" /> Why do I need
                  such a link page?
                </a>
              </li>
              <li className="text-base leading-9 mb-2">
                <a
                  href="#but-is-linktree-really-the-best-solution"
                  className="flex items-center"
                >
                  <ChevronRightIcon className="w-4 h-4 mr-2" /> Is Linktree
                  really the best solution?
                </a>
              </li>
              <li className="text-base leading-9 mb-2">
                <a
                  href="#introducing-the-socialwp-plugin"
                  className="flex items-center"
                >
                  <ChevronRightIcon className="w-4 h-4 mr-2" /> Introducing the
                  SocialWP plugin
                </a>
              </li>
              <li className="text-base leading-9 mb-2">
                <a
                  href="#building-a-link-page-with-socialwp"
                  className="flex items-center"
                >
                  <ChevronRightIcon className="w-4 h-4 mr-2" /> Building a link
                  page with SocialWP
                </a>
              </li>
              <li className="text-base leading-9 mb-2">
                <a href="#conclusion" className="flex items-center">
                  <ChevronRightIcon className="w-4 h-4 mr-2" /> Conclusion
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-base leading-9 mb-5 mt-7">
          If you're an influencer on Instagram, you've likely come across a link
          that looks something like this:
          <div className="p-1.5 bg-tech/5 inline-block rounded-lg leading-none font-medium">
            linktr.ee/name
          </div>
          . This is a link created with a tool called Linktree, which many
          influencers use to share multiple links with their followers. While
          Linktree is popular, it doesn't offer much beyond the ability to share
          links.
        </p>
        <p className="text-base leading-9 mb-5">
          In this article, we'll recommend a free alternative that doesn't
          require signing up on a third-party site. Instead, all you need is
          your website, which you likely already manage on a daily basis.
        </p>
        <p className="text-base leading-9 mb-5">
          Before we get started, let's clarify a few things:
        </p>
        <h2
          id="linktree-what-is-that"
          className="md:text-3xl text-2xl font-serif leading-9 my-10 font-bold"
        >
          Linktree - what is that?
        </h2>
        <p className="text-base leading-9 mb-5">
          With the help of Linktree, you can create a small landing page from
          which you can link to other pages. These can be pages on your website,
          but also all other links that you want to make available to your
          followers. The whole page looks something like this:
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
        <h2
          id="why-do-i-need-such-a-link-page"
          className="md:text-3xl text-2xl font-serif leading-9 my-10 font-bold"
        >
          Why do I need such a link page?
        </h2>
        <p className="text-base leading-9 mb-5">
          It is important to remember what the goal of using Instagram is: Sell
          your products, market your blog, or collect newsletter subscribers. In
          order to achieve this goal, it is essential to link your followers to
          your website. Without a link, it will be difficult for them to visit
          your site. Many people will not take the time to open a web browser
          and manually enter your website's address. To increase the likelihood
          that your followers will visit your site, it is important to include a
          link in your Instagram profile.
        </p>
        <p className="text-base leading-9 mb-5"></p>
        <h2
          id="but-is-linktree-really-the-best-solution"
          className="md:text-3xl text-2xl font-serif leading-9 my-10 font-bold"
        >
          But is Linktree really the best solution?
        </h2>
        <p className="text-base leading-9 mb-5">
          While Linktree can be a useful tool for creating a dedicated link page
          for your Instagram followers, it may not be the best solution for
          everyone. Especially if you already have a website, you should
          consider building your bio link on your own instead of using Linktree.
        </p>
        <p className="text-base leading-9 mt-5">Here's why:</p>
        <ul className="mt-5 flex flex-col gap-3">
          <li className="text-base leading-9 mb-2">
            <div className="flex ">
              <XIcon className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0" />
              <div>
                <span className="font-bold font-serif text-lg">
                  You leave important traffic on the table
                </span>
                <p>
                  Using Linktree in your bio redirects traffic coming from your
                  social media channels to Linktree instead of your website.
                  This can be detrimental to your SEO efforts, as having a high
                  volume of traffic on your website is important for improving
                  your search engine rankings.
                </p>
              </div>
            </div>
          </li>
          <li className="text-base leading-9 mb-2">
            <div className="flex ">
              <XIcon className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0" />
              <div>
                <span className="font-bold font-serif text-lg">
                  You're not allowing your brand to shine
                </span>
                <p>
                  In today's competitive landscape, building a strong brand and
                  standing out from the crowd is essential. Your bio should
                  therefore include a link to your own website, rather than a
                  third-party service, in order to support these efforts.
                </p>
              </div>
            </div>
          </li>
          <li className="text-base leading-9 mb-2">
            <div className="flex ">
              <XIcon className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0" />
              <div>
                <span className="font-bold font-serif text-lg">
                  You miss out on advanced content sharing
                </span>
                <p>
                  Your website is the central hub for all of your content. By
                  building your bio link on your own site, you can integrate
                  your content in a way that is not possible with Linktree. This
                  allows you to share a wide range of content with your
                  followers, including blog posts, newsletters, and product
                  catalogs.
                </p>
              </div>
            </div>
          </li>
          <li className="text-base leading-9 mb-2">
            <div className="flex ">
              <XIcon className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0" />
              <div>
                <span className="font-bold font-serif text-lg">
                  You're not owning your data
                </span>
                <p>
                  It is always a good idea to own your data, rather than relying
                  on third-party services to store it. By hosting your bio link
                  on your own website, you can have greater control over the
                  data collected and ensure that it is handled in compliance
                  with relevant regulations, such as GDPR within the European
                  Union.
                </p>
              </div>
            </div>
          </li>
        </ul>
        <p className="text-base leading-9 mb-5"> </p>
        <h2
          id="introducing-the-socialwp-plugin"
          className="md:text-3xl text-2xl font-serif leading-9 my-10 font-bold"
        >
          Introducing the SocialWP plugin
        </h2>
        <p className="text-base leading-9 mb-5">
          If you're a website owner looking to create a dedicated link page for
          your Instagram followers, you should consider using a plugin that
          automatically generates it for you. This will save you time and
          effort, as you won't have to manually update the link page with a page
          builder every time you want to add a new link.
        </p>
        <p className="text-base leading-9 mb-5">
          We created{" "}
          <a href="https://socialwp.io" className="text-tech underline">
            SocialWP
          </a>{" "}
          – a plugin that does exactly that. With SocialWP, you can save time,
          ensure your followers have access to the most up-to-date information,
          and host the link page on your own website to support your branding
          efforts and share a wide range of content with your followers.
        </p>
        <p className="text-base leading-9 mb-5">
          Here are some of the features of SocialWP:
          <ul className="mt-5 flex flex-col gap-3">
            <li className="text-base leading-9 mb-2">
              <div className="flex ">
                <CheckIcon className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0" />
                <div>
                  <span className="font-bold font-serif text-lg">
                    Easy 5-minute setup
                  </span>
                  <p>
                    Skip the complicated setup processes and page builders. With
                    SocialWP, you can create a link page in just 5 minutes.
                    Simply install the plugin, choose a template, and add your
                    links.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-base leading-9 mb-2">
              <div className="flex ">
                <CheckIcon className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0" />
                <div>
                  <span className="font-bold font-serif text-lg">
                    Custom design options
                  </span>
                  <p>
                    SocialWP allows you to create a custom link page that
                    reflects your brand. Choose from a variety of pre-made
                    templates or use the built-in editor to design your own.
                    This way, your link page will be consistent with the rest of
                    your website and showcase your unique style.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-base leading-9 mb-2">
              <div className="flex ">
                <CheckIcon className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0" />
                <div>
                  <span className="font-bold font-serif text-lg">
                    Integrate your content like a pro
                  </span>
                  <p>
                    SocialWP offers different content blocks, such as contact
                    forms, donation buttons, blog feeds, headers, social icons,
                    documents, and more. Automate your bio link and never worry
                    about updating it again.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-base leading-9 mb-2">
              <div className="flex ">
                <CheckIcon className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0" />
                <div>
                  <span className="font-bold font-serif text-lg">
                    Own your data
                  </span>
                  <p>
                    With SocialWP, the plugin and its data are hosted on your
                    own website. This means that you have full control over the
                    data collected and can ensure that it is handled in
                    compliance with relevant regulations, such as GDPR within
                    the European Union.
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div className="cta py-10 rounded-3xl px-10 bg-tech text-white grid md:grid-cols-[0.2fr_0.7fr] gap-[50px] mt-10">
            <img
              className="w-12 md:w-full"
              src="https://ik.imagekit.io/chadwickmarketing/social/Group_30-2_JuqXuNgEs.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666710570153"
            />
            <div>
              <h3 className="font-serif text-xl font-bold">
                The complete bio link solution for WordPress
              </h3>
              <p>
                Turn your site into a launchpad for your links, products, and
                more. Meet our bio link for WordPress - a place your fans will
                love.
              </p>
              <Link href="/">
                <a
                  className="bg-white text-tech text-center mt-5 py-2 rounded-full block font-light"
                  href="https://socialwp.io/?utm_source=blog&utm_medium=linktree&utm_campaign=linktree"
                >
                  <span className="font-bold">Get the plugin for free</span>
                </a>
              </Link>
            </div>
          </div>
        </p>
        <h2
          id="building-a-link-page-with-socialwp"
          className="md:text-3xl text-2xl font-serif leading-9 my-10 mt-12 font-bold"
        >
          Building a link page with SocialWP
        </h2>
        <p className="text-base leading-9 mb-5">
          Getting started with SocialWP is easy. Here's how to set up your link
          page in less than 5 minutes:
          <ul className="mt-5 flex flex-col gap-3">
            <li className="text-base leading-9 mb-2">
              <div className="flex ">
                <div className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0 flex items-center">
                  1
                </div>
                <div>
                  <span className="font-bold font-serif text-lg">
                    Installing and activating the plugin
                  </span>
                  <p>
                    To get started with SocialWP, simply install and activate
                    the plugin. In your WordPress dashboard, go to Plugins > Add
                    New and search for "Link in Bio". Look for "Link in Bio
                    Creator - Social", click Install and then Activate.
                  </p>
                  <p className="block-img my-5">
                    <img
                      alt="Installing and activating SocialWP within the WordPress dashboard"
                      src="https://ik.imagekit.io/chadwickmarketing/social/ezgif-2-87e2a49ef0_uThQWP7WV.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1670688494314"
                      className="rounded-t-3xl w-full"
                    />
                    <div className="text-center  text-sm mb-2 p-3 bg-tech/5 rounded-b-3xl">
                      Installing and activating the plugin
                    </div>
                  </p>
                </div>
              </div>
            </li>
            <li className="text-base leading-9 mb-2">
              <div className="flex ">
                <div className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0 flex items-center justify-center">
                  2
                </div>
                <div>
                  <span className="font-bold font-serif text-lg">
                    Customizing your link page
                  </span>
                  <p>
                    After activating SocialWP, you'll be able to access the
                    plugin's dashboard. The navigation bar at the top allows you
                    to access the settings of your bio link. Here, you can
                    upload a profile picture, give your link page a name and
                    description, and choose a theme for your link page.
                  </p>
                  <p className="block-img my-5">
                    <img
                      alt="Customizing your link page"
                      src="https://ik.imagekit.io/chadwickmarketing/social/ezgif-2-9a291e8979_jT0NJV1Jn.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1670690912855"
                      className="rounded-t-3xl w-full"
                    />
                    <div className="text-center  text-sm mb-2 p-3 bg-tech/5 rounded-b-3xl">
                      Customizing your link page
                    </div>
                  </p>
                </div>
              </div>
            </li>
            <li className="text-base leading-9 mb-2">
              <div className="flex ">
                <div className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0 flex items-center justify-center">
                  3
                </div>
                <div>
                  <span className="font-bold font-serif text-lg">
                    Adding your first links and content
                  </span>
                  <p>
                    If you're done customizing your link page, you can start
                    adding links. In the links view, click Add New Link. Enter
                    the title of your link and its URL. You can also add an icon
                    to your link or make it stand out with an animation. The
                    Explore button allows you to add dynamic content blocks,
                    such as blog posts, YouTube videos, or headers.
                  </p>
                  <p className="block-img my-5">
                    <img
                      alt="Adding your first links and content"
                      src="https://ik.imagekit.io/chadwickmarketing/social/ezgif-5-2640ac8bd2_H7Jr0qG1g.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1670690907103"
                      className="rounded-t-3xl w-full"
                    />
                    <div className="text-center  text-sm mb-2 p-3 bg-tech/5 rounded-b-3xl">
                      Adding your first links and content
                    </div>
                  </p>
                </div>
              </div>
            </li>
            <li className="text-base leading-9 mb-2">
              <div className="flex ">
                <div className="w-7 h-7 bg-tech/5 rounded-full text-tech p-1 mr-3 shrink-0 flex items-center justify-center">
                  4
                </div>
                <div>
                  <span className="font-bold font-serif text-lg">
                    Sharing your link page
                  </span>
                  <p>
                    If you're ready to share your link page, you can do so by
                    clicking on the Share button in the top right corner of the
                    navigation bar. Here, you can copy your link page's URL and
                    put it in your bio on social media.
                  </p>
                  <p className="block-img my-5">
                    <img
                      alt="Copying your link page's URL"
                      src="https://ik.imagekit.io/chadwickmarketing/social/ezgif-5-9918f33871_r9wMropv1.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1670691616536"
                      className="rounded-t-3xl w-full"
                    />
                    <div className="text-center  text-sm mb-2 p-3 bg-tech/5 rounded-b-3xl">
                      Copying your link page's URL
                    </div>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </p>
        <h2 id="conclusion" className="text-2xl font-bold font-serif my-5">
          Conclusion
        </h2>
        <p className="text-base leading-9 mb-2">
          As a website owner, you shouldn't have to rely on third-party sites to
          create your link page. With SocialWP, you can easily create a bio link
          that is fully integrated into your website, without needing any coding
          or page building skills. This solution offers a simple, convenient way
          to manage your links and provide your followers with easy access to
          all your content.{" "}
          <a href="https://socialwp.io" className="text-tech underline">
            Give SocialWP a try today
          </a>{" "}
          and see how it can help you take your online presence to the next
          level!
        </p>
      </section>
      <section className="author max-w-screen-md my-20 grid m-auto grid-cols-[0.2fr_0.8fr] px-10">
        <img
          className="rounded-full w-2/4"
          src="https://ik.imagekit.io/chadwickmarketing/social/Thl93bsR_400x400_9UGujrLqT.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1670524537559"
        />
        <div>
          <span className="text-tech font-bold">Written by</span>
          <h3 className="md:text-2xl text-xl my-2 font-serif font-bold">
            Colin Chadwick
          </h3>
          <div className="flex md:items-center md:flex-row">
            <p className="font-bold hidden md:block">Tags:</p>
            <div className="flex items-center p-2 mr-2 md:mx-2 rounded-2xl bg-tech/5 text-sm font-bold text-tech">
              Marketing
            </div>
            <div className="flex items-center p-2 rounded-2xl bg-tech/5 text-sm font-bold text-tech ">
              Social media
            </div>
          </div>
        </div>
      </section>
      <Footer language={language}></Footer>
    </div>
  );
}
