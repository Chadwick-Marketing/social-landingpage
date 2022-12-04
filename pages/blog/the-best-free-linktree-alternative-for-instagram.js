import Navigation from "../../components/Navigation";

import Footer from "../../components/Footer";

import Head from "next/head";

import en from "../../locales/en";

export default function Page() {
  const language = en;

  return (
    <div>
      <Head>
        <title>Social: The supercharged free Linktree alternative</title>
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
          <span className="text-tech ">Marketing </span>
          <h1 className="font-bold text-5xl font-serif my-5">
            What’s the right content for each stage of the sales funnel?
          </h1>
          <span className="flex">
            January 14, 2022
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
      <section className="max-w-screen-xl m-auto px-10">
        <img
          className="rounded-3xl mt-10"
          src="https://images.prismic.io/social-blog/4f7930a5-5d2a-47c2-a4df-829c9cfbe451_image.png?auto=compress,format"
        />
      </section>
      <section className="content max-w-screen-md m-auto pt-20 px-10">
        <p className="text-lg leading-9 mb-5">
          The sales funnel is a popular tool in the online marketing of
          companies. It's not just the structure that matters, but also the
          right content at the right point in the funnel. But which content
          makes sense when?
        </p>
        <p className="text-lg leading-9 mb-5"> </p>
        <h2 className="text-4xl font-serif leading-9 my-10">
          Sales funnel explained briefly
        </h2>
        <p className="text-lg leading-9 mb-5">
          The sales funnel is a tool from the B2B sector and sales, which is
          divided into different stages.
        </p>
        <p className="text-lg leading-9 mb-5"> </p>
        <p className=" block-img">
          <img
            src="https://images.prismic.io/social-blog/d6ebd801-e4c8-444a-bf01-bab6a0bfae52_image.jpeg?auto=compress,format"
            alt=""
            className="rounded-3xl"
          />
        </p>
        <p className="text-lg leading-9 mb-5"> </p>
        <p className="text-lg leading-9 mb-5">
          This tool is designed to accompany potential customers on their way to
          closing the sale. Here we talk about sales funnel marketing - to which
          you can also find a suitable article in our blog.
        </p>
        <p className="text-lg leading-9 mb-5">
          The goal of the sales funnel is to filter out customers who drop out
          for various reasons (e.g.: loss of interest, lack of budget) and focus
          on the customers who sign contracts or buy products.
        </p>
        <p className="text-lg leading-9 mb-5"> </p>
        <h2 className="text-4xl font-serif leading-9 my-10">
          Why is custom content so important?
        </h2>
        <p className="text-lg leading-9 mb-5">
          The wave of daily offline and online offers and products makes it
          increasingly difficult to reach customers in a way that they actually
          buy. In order to address every customer at the point in the buying
          process where they are, the content must be tailored.
        </p>
        <p className="text-lg leading-9 mb-5"> </p>
        <h2 className="text-4xl font-serif leading-9 my-10">
          Which content at which point in the funnel?
        </h2>
        <p className="text-lg leading-9 mb-5">
          Content - TOFU - Top of the funnel:
        </p>
        <p className="text-lg leading-9 mb-5">
          Content that provides more general information on selected topics is
          suitable for the first area in the funnel. Here, "informational
          keywords" should play a role without compromising the actual
          information content for the user. Suitable media are text
          contributions in blogs, videos, animations, podcast formats or info
          graphics.
        </p>
        <p className="text-lg leading-9 mb-5">
          Content - MIFU - Middle of the funnel:C
        </p>
        <p className="text-lg leading-9 mb-5">
          In the middle of the funnel, the customer is already aware of what he
          is looking for. Here, the content may be much more specific and also
          offer clear solutions to problems. Convince the potential customer
          with checklists, well-researched e-books, white papers or your own
          case studies.
        </p>
        <p className="text-lg leading-9 mb-5">
          Content - BOFU - Bottom of the funnel:
        </p>
        <p className="text-lg leading-9 mb-5">
          At the funnel end, the customer has clear ideas of what he needs, but
          still has to make the decision to actually buy a product from a
          specific company.
        </p>
        <p className="text-lg leading-9 mb-5">
          Here it is important that you motivate them directly to buy and offer
          them the opportunity to contact your company at any time. Offer
          customers free demos, webinars, advantages over the competition and
          tell them about success stories that other customers have already
          experienced with them.
        </p>
        <p className="text-lg leading-9 mb-5"> </p>
        <p className="text-lg leading-9 mb-5">
          Our tip: Make content a priority. Invest in informative and
          high-quality texts, videos, podcasts. Address a customer at the
          beginning of the funnel with valuable information, for example in your
          blog. In this way, you can accompany them through all stages, so that
          they reach the end of the funnel and thus the conclusion of the
          purchase with the help of targeted and interesting content.
        </p>
      </section>
      <Footer language={language}></Footer>
    </div>
  );
}
