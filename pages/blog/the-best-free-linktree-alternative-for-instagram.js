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
      <article class="py-12 px-4">
        <h1 class="text-4xl font-serif text-center mb-4 font-bold font-heading">
          Social: The supercharged free Linktree alternative
        </h1>
        <p class="text-center">
          <span>October 22, by</span>
          <a class="ml-1 text-indigo-600 hover:underline" href="#">
            Michael Scott
          </a>
        </p>

        <div class="max-w-5xl mx-auto">
          <img
            className="rounded-2xl"
            src="https://ik.imagekit.io/chadwickmarketing/social/og--image_haZDiZynP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666863781752"
          />
        </div>
        <div class="max-w-3xl mx-auto">
          <p class="mb-4">
            We offer a dependable and quick supply of copy paper suited to all
            kinds of printers. Each of our various products is designed to
            provide the finest performance and meet international standards.
          </p>
          <p class="mb-4">
            We’re dedicated to ensure the highest level of customer satisfaction
            based on long-term professional relationships. By creating the
            positive working environment we’re enabling our employees to
            significantly improve not only their productivity, but what’s more
            important – job satisfaction.
          </p>
          <ul class="mb-4 list-inside list-disc">
            <li>High durability</li>
            <li>Value-based price</li>
            <li>Perfect performance on copy machines</li>
            <li>Long lasting whiteness</li>
          </ul>
          <p class="mb-10">
            We deliver our services with passion and dedication unmatched by
            other so called “big players”. We create a friendly environment for
            our workers and that’s what makes their dedication soar to the
            maximum. You are getting not only the best possible product, but
            also our love for paper (completely free of charge).
          </p>
          <blockquote class="text-center mb-10">
            <p class="text-lg font-semibold mb-2">
              "I would say I kind of have an unfair advantage, because I watch
              reality dating shows like a hawk, and I learn. I absorb
              information from the strategies of the winners and the losers.
              Actually, I probably learn more from the losers."
            </p>
            <footer class="text-gray-400">Michael Scott</footer>
          </blockquote>
          <p>Because the real business is done on paper.</p>
        </div>
      </article>
      <Footer language={language}></Footer>
    </div>
  );
}
