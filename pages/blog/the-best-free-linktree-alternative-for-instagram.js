import Navigation from "../../components/Navigation";

import Footer from "../../components/Footer";

import Head from "next/head";

import en from "../../locales/en";

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
          src="https://ik.imagekit.io/chadwickmarketing/social/link-in-bio-creator-socialwp_Q50SehKb7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670519094377"
        />
      </section>
      <section className="content max-w-screen-md m-auto pt-20 px-10">
        <div className="flex flex-col bg-tech/5 rounded-xl">
          <div className="flex flex-col p-10">
            <h2 className="text-xl font-serif leading-9 font-bold mb-2">
              Table of Contents
            </h2>
            <ul className="list-disc list-inside">
              <li className="text-base leading-9 mb-2">
                <a href="#linktree-what-is-that">Linktree - what is that?</a>
              </li>
              <li className="text-base leading-9 mb-2">
                <a href="#linktree-alternative">Linktree alternative</a>
              </li>
              <li className="text-base leading-9 mb-2">
                <a href="#linktree-alternative-for-instagram">
                  Linktree alternative for Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-base leading-9 mb-5 mt-7">
          If you're an influencer on Instagram, you've likely come across a link
          that looks something like this:
          <div className="p-1.5 mx-1 bg-gray-200/50 inline-block rounded-lg leading-none font-medium">
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
        <p className="text-base leading-9 mb-5"> </p>
        <p className="block-img">
          <img
            src="https://ik.imagekit.io/chadwickmarketing/social/Frame_20_FfaZZnqHH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670523521401"
            alt=""
            className="rounded-t-3xl"
          />
          <div className="text-center  text-sm mb-2 p-3 bg-tech/5 rounded-b-3xl">
            Example of a Linktree page
          </div>
        </p>
        <p className="text-base leading-9 mb-5"> </p>
        <p className="text-base leading-9 mb-5">
          This tool is designed to accompany potential customers on their way to
          closing the sale. Here we talk about sales funnel marketing - to which
          you can also find a suitable article in our blog.
        </p>
        <p className="text-base leading-9 mb-5">
          The goal of the sales funnel is to filter out customers who drop out
          for various reasons (e.g.: loss of interest, lack of budget) and focus
          on the customers who sign contracts or buy products.
        </p>
        <p className="text-base leading-9 mb-5"> </p>
        <h2 className="text-4xl font-serif leading-9 my-10">
          Why is custom content so important?
        </h2>
        <p className="text-base leading-9 mb-5">
          The wave of daily offline and online offers and products makes it
          increasingly difficult to reach customers in a way that they actually
          buy. In order to address every customer at the point in the buying
          process where they are, the content must be tailored.
        </p>
        <p className="text-base leading-9 mb-5"> </p>
        <h2 className="text-4xl font-serif leading-9 my-10">
          Which content at which point in the funnel?
        </h2>
        <p className="text-base leading-9 mb-5">
          Content - TOFU - Top of the funnel:
        </p>
        <p className="text-base leading-9 mb-5">
          Content that provides more general information on selected topics is
          suitable for the first area in the funnel. Here, "informational
          keywords" should play a role without compromising the actual
          information content for the user. Suitable media are text
          contributions in blogs, videos, animations, podcast formats or info
          graphics.
        </p>
        <p className="text-base leading-9 mb-5">
          Content - MIFU - Middle of the funnel:C
        </p>
        <p className="text-base leading-9 mb-5">
          In the middle of the funnel, the customer is already aware of what he
          is looking for. Here, the content may be much more specific and also
          offer clear solutions to problems. Convince the potential customer
          with checklists, well-researched e-books, white papers or your own
          case studies.
        </p>
        <p className="text-base leading-9 mb-5">
          Content - BOFU - Bottom of the funnel:
        </p>
        <p className="text-base leading-9 mb-5">
          At the funnel end, the customer has clear ideas of what he needs, but
          still has to make the decision to actually buy a product from a
          specific company.
        </p>
        <p className="text-base leading-9 mb-5">
          Here it is important that you motivate them directly to buy and offer
          them the opportunity to contact your company at any time. Offer
          customers free demos, webinars, advantages over the competition and
          tell them about success stories that other customers have already
          experienced with them.
        </p>
        <p className="text-base leading-9 mb-5"> </p>
        <div className="cta py-10 rounded-3xl px-10 bg-tech text-white grid grid-cols-[0.2fr_0.7fr] gap-[50px]">
          <img src="https://images.prismic.io/social-blog/e0ed9362-4cc6-4c9c-b6c5-9e610db0cdff_image.png?auto=compress,format" />
          <div>
            <h3 className="font-serif text-2xl">
              The Ultimate Link Platform for WordPress
            </h3>
            <p>
              Create, share and track branded links - directly from your
              website.
            </p>
            <a
              className="bg-white text-tech text-center mt-5 py-3 rounded-full block font-light"
              href="/"
            >
              <span className="font-normal">Learn more</span>
            </a>
          </div>
        </div>
        <p className="text-base leading-9 mb-5">
          Our tip: Make content a priority. Invest in informative and
          high-quality texts, videos, podcasts. Address a customer at the
          beginning of the funnel with valuable information, for example in your
          blog. In this way, you can accompany them through all stages, so that
          they reach the end of the funnel and thus the conclusion of the
          purchase with the help of targeted and interesting content.
        </p>
      </section>
      <section className="author max-w-screen-md my-20 grid m-auto grid-cols-[0.2fr_0.8fr] px-10">
        <img
          className="rounded-full w-2/4"
          src="https://images.prismic.io/social-blog/bab28d46-2222-4a57-bedd-78f786656b65_489EA74B-E15C-4ABF-8041-316A12771454.jpeg?auto=compress,format"
        />
        <div>
          <span className="text-tech">Written by</span>
          <h3 className="text-2xl my-2 font-serif">Colin Chadwick</h3>
          <p>Hello World!</p>
        </div>
      </section>
      <Footer language={language}></Footer>
    </div>
  );
}
