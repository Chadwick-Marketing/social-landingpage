import Head from 'next/head';
import { useRouter } from 'next/router';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ChevronUpIcon, CogIcon } from '@heroicons/react/outline';

import en from '../locales/en';

import { Disclosure } from '@headlessui/react';

export default function Legal() {
  const router = useRouter();

  const { locale } = router;

  const language = en;
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation language={language} />
      <main className="max-w-screen-md m-auto px-10 pb-20">
        <h1 className="text-5xl font-serif mt-10 block pb-32">
          Legal documents
        </h1>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full text-2xl pb-10 border-gray border-b font-serif font-medium text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Legal disclosure</span>
                <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''} w-5 h-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-10 font-inter text-xl leading-9">
                <div>
                  <div className="-legal-subtitle">
                    Legal information according to German law (§5 TMG){' '}
                  </div>
                  <div className="-legal-paragraph">
                    Chadwick Marketing
                    <br />
                    Ulrike Chadwick
                    <br />
                    Hauptdorfweg 10a
                    <br />
                    31234 Edemissen
                    <br />
                  </div>
                  <div className="-legal-subtitle">Contact </div>
                  <div className="-legal-paragraph">
                    Phone:{' '}
                    <a
                      className="-link -underline -black"
                      href="tel:01785202120"
                    >
                      +49 (0) 178 5202120{' '}
                    </a>
                    (No Support) <br />
                    Email:{' '}
                    <a
                      className="-link -underline -black"
                      href="mailto:legal@chadwick.marketing"
                    >
                      legal@chadwick.marketing
                    </a>
                    <br />
                  </div>
                  <div className="-legal-subtitle">Disclaimer </div>
                  <div className="-legal-paragraph">
                    Despite careful control of the content, we assume no
                    liability for external links. The operators of the linked
                    pages are solely responsible for their content.{' '}
                  </div>
                  <div className="-legal-subtitle">Copyright </div>
                  <div className="-legal-paragraph">
                    All offered contents and works on these sites may - also in
                    extracts - only be redistributed or otherwise published with
                    written permission.{' '}
                  </div>
                  <div className="-legal-subtitle">
                    Online dispute resolution{' '}
                  </div>
                  <div className="-legal-paragraph">
                    The European Commission has established a platform for
                    online dispute resolution:{' '}
                    <a
                      target="_blank"
                      className="-link -underline -black"
                      href="https://ec.europa.eu/consumers/odr/"
                    >
                      https://ec.europa.eu/consumers/odr/.{' '}
                    </a>
                    Consumers have the option of using this platform to resolve
                    their disputes.
                  </div>
                  <div className="-legal-subtitle">
                    Settlement of consumer disputes{' '}
                  </div>
                  <div
                    className="-legal-paragraph"
                    style={{ marginBottom: '50px' }}
                  >
                    We are neither willing nor obligated to participate in a
                    dispute resolution procedure before a consumer arbitration
                    board.{' '}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full text-2xl pt-10 pb-10 border-gray border-b font-serif font-medium text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Privacy policy</span>
                <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''} w-5 h-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-10 font-inter text-xl leading-9">
                <div>
                  <div className="-legal-subtitle" id="s1">
                    Introduction{' '}
                  </div>
                  <div className="-legal-paragraph">
                    With the following data protection declaration, we would
                    like to inform you about the types of your personal data
                    (hereinafter also referred to as "data") that we process,
                    for what purposes and to what extent. The data protection
                    declaration applies to all processing of personal data
                    carried out by us, both as part of the provision of our
                    services and, in particular, on our websites, in mobile
                    applications and within external online presences, such as
                    our social media profiles (hereinafter collectively referred
                    to as "online offer"). The terms used are not
                    gender-specific.{' '}
                  </div>
                  <div className="-legal-subtitle">Table of contents </div>
                  <div className="-legal-paragraph">
                    <ul className="-index">
                      <li>
                        <a className="index-link" href="#s1">
                          Introduction
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s2">
                          Responsibility
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s3">
                          Processing overview
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s4">
                          Relevant legal bases
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s5">
                          Safety measures
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s6">
                          Data processing in third countries
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s7">
                          Use of cookies
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s8">
                          Commercial and business services
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s9">
                          Use of online marketplaces for e-commerce
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s10">
                          Provision of the online offer and web hosting
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s11">
                          Contact
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s19">
                          Chatbots and chat functions
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s12">
                          Onlinemarketing
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s13">
                          Presence in social networks (social media)
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s20">
                          Registration, login and user account
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s14">
                          Plugins and embedded functions and content
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s15">
                          Data deletion
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s16">
                          Modification and update of the privacy policy
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s17">
                          Rights of the data subjects
                        </a>
                      </li>
                      <li>
                        <a className="index-link" href="#s18">
                          Definitions
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="-legal-subtitle" id="s2">
                    Responsibility{' '}
                  </div>
                  <div className="-legal-paragraph">
                    Chadwick Marketing
                    <br />
                    Ulrike Chadwick
                    <br />
                    Hauptdorfweg 10a
                    <br />
                    31234 Edemissen
                    <br />
                    <br />
                    Phone:{' '}
                    <a
                      className="-link -underline -black"
                      href="tel:01785202120"
                    >
                      +49 (0) 178 5202120{' '}
                    </a>
                    <br />
                    Email:{' '}
                    <a
                      className="-link -underline -black"
                      href="mailto:legal@chadwick.marketing"
                    >
                      legal@chadwick.marketing
                    </a>
                    <br />
                  </div>
                  <div className="-legal-subtitle" id="s3">
                    Processing overview{' '}
                  </div>
                  <div className="-legal-paragraph">
                    The following overview summarizes the types of data
                    processed and the purposes of their processing and refers to
                    the data subjects.{' '}
                  </div>
                  <div className="-legal-subtitle">
                    Types of data processed{' '}
                  </div>
                  <div className="-legal-paragraph">
                    <ul>
                      <li>Inventory data (e.g. names, addresses).</li>
                      <li>Content data (e.g. entries in online forms).</li>
                      <li>Contact data (e.g. e-mail, telephone numbers).</li>
                      <li>
                        Meta/communication data (e.g. device information, IP
                        addresses).
                      </li>
                      <li>
                        Use data (e.g. websites visited, interest in content,
                        access times).
                      </li>
                      <li>
                        Contract data (e.g. subject of contract, term, customer
                        category).
                      </li>
                      <li>
                        Payment data (e.g. bank details, invoices, payment
                        history).
                      </li>
                    </ul>
                  </div>
                  <div className="-legal-subtitle">
                    Categories of affected persons{' '}
                  </div>
                  <div className="-legal-paragraph">
                    <ul>
                      <li>Business and contractual partners.</li>
                      <li>Interested parties.</li>
                      <li>Communication partners.</li>
                      <li>Customers.</li>
                      <li>
                        Users (e.g., website visitors, users of online
                        services).
                      </li>
                    </ul>
                  </div>
                  <div className="-legal-subtitle">Processing purposes </div>
                  <div className="-legal-paragraph">
                    <ul>
                      <li>
                        Provision of our online offer and user-friendliness.{' '}
                      </li>
                      <li>
                        Conversion measurement (measurement of the effectiveness
                        of marketing measures).{' '}
                      </li>
                      <li>Office and organizational procedures. </li>
                      <li>Interest-based and behavioral marketing. </li>
                      <li>Contact inquiries and communication. </li>
                      <li>Profiling (creation of user profiles). </li>
                      <li>Remarketing. </li>
                      <li>
                        Range measurement (e.g. access statistics, recognition
                        of returning visitors).{' '}
                      </li>
                      <li>Security measures. </li>
                      <li>
                        Tracking (e.g. interest / behavior-based profiling, use
                        of cookies).{' '}
                      </li>
                      <li>
                        Provision of contractual services and customer service.{' '}
                      </li>
                      <li>Management and answering of inquiries. </li>
                    </ul>
                  </div>
                  <div className="-legal-subtitle" id="s4">
                    Relevant legal bases{' '}
                  </div>
                  <div className="-legal-paragraph">
                    In the following, we share the legal basis of the General
                    Data Protection Regulation (GDPR) on the basis of which we
                    process personal data. Please note that in addition to the
                    provisions of the GDPR, the national data protection
                    provisions in your or our country of residence and domicile
                    may apply. Furthermore, should more specific legal bases be
                    relevant in individual cases, we will inform you of these in
                    the privacy policy. <br />
                    <br />
                    <ul>
                      <li>
                        Consent (Art. 6 (1) p. 1 lit. a. GDPR) - The data
                        subject has given his/her consent to the processing of
                        personal data concerning him/her for a specific purpose
                        or purposes.
                      </li>
                      <br />
                      <li>
                        Contract performance and pre-contractual enquiries (Art.
                        6(1) p. 1 lit. b. GDPR) - Processing is necessary for
                        the performance of a contract to which the data subject
                        is party or for the performance of pre-contractual
                        measures taken at the data subject's request.
                      </li>
                      <br />
                      <li>
                        Legal obligation (Art. 6 para. 1 p. 1 lit. c. GDPR) -
                        Processing is necessary for compliance with a legal
                        obligation to which the controller is subject to.
                      </li>
                      <br />
                      <li>
                        Legitimate interests (Art. 6(1) p. 1 lit. f. GDPR) -
                        Processing is necessary for the purposes of the
                        legitimate interests of the controller or a third party,
                        except where such interests are overridden by the
                        interests or fundamental rights and freedoms of the data
                        subject which require the protection of personal data.{' '}
                      </li>
                    </ul>
                    <br />
                    <br />
                    National data protection regulations in Germany: In addition
                    to the data protection regulations of the General Data
                    Protection Regulation, national regulations on data
                    protection apply in Germany. These include, in particular,
                    the Act on Protection against Misuse of Personal Data in
                    Data Processing (Federal Data Protection Act - BDSG). In
                    particular, the BDSG contains special regulations on the
                    right to information, the right to erasure, the right to
                    object, the processing of special categories of personal
                    data, the processing for other purposes and the transmission
                    as well as automated decision-making in individual cases
                    including profiling. Furthermore, it regulates data
                    processing for employment purposes (Section 26 BDSG), in
                    particular with regard to the establishment, performance or
                    termination of employment relationships as well as the
                    consent of employees. Furthermore, state data protection
                    laws of the individual federal states may apply.
                  </div>
                  <div className="-legal-subtitle" id="s5">
                    Safety measures{' '}
                  </div>
                  <div className="-legal-paragraph">
                    We take appropriate technical and organisational measures in
                    accordance with the law, taking into account the state of
                    the art, the cost of implementation and the nature, scope,
                    circumstances and purposes of the processing, as well as the
                    different probabilities of occurrence and the level of risk
                    to the rights and freedoms of natural persons, in order to
                    ensure a level of protection appropriate to the risk. <br />
                    <br />
                    The measures include, in particular, ensuring the
                    confidentiality, integrity and availability of data by
                    controlling physical and electronic access to the data as
                    well as access to, input of, disclosure of, assurance of
                    availability of and segregation of the data. We also have
                    procedures in place to ensure the exercise of data subjects'
                    rights, the deletion of data, and responses to data
                    compromise. Furthermore, we take the protection of personal
                    data into account as early as the development or selection
                    of hardware, software and processes in accordance with the
                    principle of data protection. <br />
                    <br />
                    <strong>Shortening of the IP address:</strong>
                    If it is possible for us to do so or if it is not necessary
                    to store the IP address, we shorten or have your IP address
                    shortened. In the case of IP address shortening, also known
                    as "IP masking", the last octet, i.e. the last two numbers
                    of an IP address, is deleted (in this context, the IP
                    address is an identifier individually assigned to an
                    Internet connection by the online access provider). The
                    shortening of the IP address is intended to prevent or make
                    it significantly more difficult to identify a person by
                    their IP address. <br />
                    <br />
                    <strong>SSL encryption (https):</strong>
                    In order to protect your data transmitted via our online
                    offer, we use SSL encryption. You can recognise such
                    encrypted connections by the prefix https:// in the address
                    line of your browser.
                  </div>
                  <div className="-legal-subtitle" id="s6">
                    Data processing in third countries{' '}
                  </div>
                  <div className="-legal-paragraph">
                    If we process data in a third country (i.e., outside the
                    European Union (EU), the European Economic Area (EEA)) or
                    the processing takes place in the context of the use of
                    third-party services or the disclosure or transfer of data
                    to other persons, entities or companies, this is only done
                    in accordance with the legal requirements. <br />
                    <br />
                    Subject to express consent or contractually or legally
                    required transfer, we process or have the data processed
                    only in third countries with a recognized level of data
                    protection, contractual obligation by so-called standard
                    protection clauses of the EU Commission, in the presence of
                    certifications or binding internal data protection
                    regulations (Art. 44 to 49 GDPR, information page of the EU
                    Commission:{' '}
                    <a
                      target="_blank"
                      className="-link -underline -black"
                      href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de"
                    >
                      https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de
                    </a>
                    .).
                  </div>
                  <div className="-legal-subtitle" id="s7">
                    Use of cookies{' '}
                  </div>
                  <div className="-legal-paragraph">
                    We use cookies. For information, see the{' '}
                    <a className="-link -black -underline" href="#cookies">
                      "Cookies" section below.
                    </a>
                  </div>
                  <div className="-legal-subtitle" id="s8">
                    Commercial and business services{' '}
                  </div>
                  <div className="-legal-paragraph">
                    We process data of our contractual and business partners,
                    e.g. customers and interested parties (collectively referred
                    to as "contractual partners") in the context of contractual
                    and comparable legal relationships as well as related
                    measures and in the context of communication with
                    contractual partners (or pre-contractual), e.g. to answer
                    inquiries. <br />
                    <br />
                    We process this data to fulfil our contractual obligations,
                    to secure our rights and for the purposes of the
                    administrative tasks associated with this information as
                    well as the corporate organisation. We only disclose the
                    data of the contractual partners to third parties within the
                    framework of the applicable law to the extent that this is
                    necessary for the aforementioned purposes or for the
                    fulfilment of legal obligations or with the consent of the
                    persons concerned (e.g. to participating telecommunications,
                    transport and other auxiliary services as well as
                    subcontractors, banks, tax and legal advisors, payment
                    service providers or tax authorities). The contractual
                    partners will be informed about further forms of processing,
                    e.g. for marketing purposes, within the scope of this data
                    protection declaration. <br />
                    <br />
                    We inform the contractual partners of the data required for
                    the above-mentioned purposes before or in the course of data
                    collection, e.g. in online forms, by means of special
                    marking (e.g. colours) or symbols (e.g. asterisks or
                    similar), or in person. <br />
                    <br />
                    We delete the data after the expiry of legal warranty and
                    comparable obligations, i.e., in principle after 4 years,
                    unless the data is stored in a customer account, e.g., as
                    long as it must be kept for legal archiving reasons (e.g.,
                    for tax purposes usually 10 years). We delete data disclosed
                    to us by the contractual partner within the scope of an
                    order in accordance with the specifications of the order, in
                    principle after the end of the order. <br />
                    <br />
                    Insofar as we use third-party providers or platforms to
                    provide our services, the terms and conditions and data
                    protection notices of the respective third-party providers
                    or platforms apply in the relationship between the users and
                    the providers. <br />
                    <br />
                    <strong>Customer account:</strong>
                    Contractual partners can create an account within our online
                    offer (e.g. customer or user account, in short "customer
                    account"). If registration of a customer account is
                    required, contractual partners will be informed of this as
                    well as of the details required for registration. Customer
                    accounts are not public and cannot be indexed by search
                    engines. Within the scope of registration and subsequent
                    logins and uses of the customer account, we store the IP
                    addresses of the customers together with the access times in
                    order to prove the registration and to prevent any misuse of
                    the customer account. If customers have terminated their
                    customer account, the data relating to the customer account
                    will be deleted, unless their retention is required for
                    legal reasons. It is the customer's responsibility to back
                    up their data upon termination of the customer account.{' '}
                    <br />
                    <br />
                    <strong>Shop and e-commerce:</strong>
                    We process the data of our customers to enable them to
                    select, purchase or order the selected products, goods and
                    associated services, as well as their payment and delivery
                    or execution. If necessary for the execution of an order, we
                    use service providers, in particular postal, forwarding and
                    shipping companies, to carry out the delivery or execution
                    to our customers. For the processing of payment
                    transactions, we use the services of banks and payment
                    service providers. The required information is marked as
                    such in the context of the order or comparable purchase
                    process and includes the information needed for delivery, or
                    provision and billing, as well as contact information, so
                    that any consultation can be held. <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Types of data processed:</strong>
                        inventory data (e.g. names, addresses), payment data
                        (e.g. bank details, invoices, payment history), contact
                        data (e.g. e-mail, telephone numbers), contract data
                        (e.g. subject matter of contract, term, customer
                        category), usage data (e.g. websites visited, interest
                        in content, access times), meta/communication data (e.g.
                        device information, IP addresses).
                      </li>
                      <br />
                      <li>
                        <strong>People concerned:</strong>
                        Interested parties, business and contractual partners,
                        customers.
                      </li>
                      <br />
                      <li>
                        <strong>Purposes of processing:</strong>
                        provision of contractual services and customer service,
                        contact requests and communication, office and
                        organizational procedures, management and response to
                        requests, security measures
                      </li>
                      <br />
                      <li>
                        <strong>Legal basis:</strong>
                        Contract fulfilment and pre-contractual enquiries (Art.
                        6 para. 1 p. 1 lit. b. GDPR), Legal obligation (Art. 6
                        para. 1 p. 1 lit. c. GDPR), Legitimate interests (Art. 6
                        para. 1 p. 1 lit. f. GDPR).
                      </li>
                    </ul>
                  </div>
                  <div className="-legal-subtitle" id="s9">
                    Use of online marketplaces for e-commerce{' '}
                  </div>
                  <div className="-legal-paragraph">
                    We offer our services on online platforms operated by other
                    service providers. In this context, the data protection
                    notices of the respective platforms apply in addition to our
                    data protection notices. This applies in particular with
                    regard to the reach measurement and interest-based marketing
                    methods used on the platforms. <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Types of data processed:</strong>
                        Inventory data (e.g. names, addresses), payment data
                        (e.g. bank details, invoices, payment history), contact
                        data (e.g. e-mail, telephone numbers), contract data
                        (e.g. subject of contract, term, customer category),
                        Usage data (e.g. websites visited, interest in content,
                        access times), Meta/communication data (e.g. device
                        information, IP addresses).
                      </li>
                      <br />
                      <li>
                        <strong>People concerned:</strong>
                        Customers.
                      </li>
                      <br />
                      <li>
                        <strong>Purposes of processing:</strong>
                        Provision of contractual services and customer service.
                      </li>
                      <br />
                      <li>
                        <strong>Legal basis:</strong>
                        Contract performance and pre-contractual requests (Art.
                        6 para. 1 S. 1 lit. b. GDPR), Legitimate Interests (Art.
                        6 para. 1 p. 1 lit. f. GDPR).
                      </li>
                    </ul>
                    <br />
                    <br />
                    Services used and service providers: <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Freemius.com:</strong>
                        Online e-commerce marketplace; service provider:
                        Freemius.com Inc., 4023 Kennett Pike, Wilmington, 19807
                        DE, USA.; website:{' '}
                        <a href="https://Freemius.com/" target="_blank">
                          https://Freemius.com/
                        </a>
                        ; Privacy policy:{' '}
                        <a href="https://Freemius.com/privacy/" target="_blank">
                          https://Freemius.com/privacy/
                        </a>
                        .
                      </li>
                    </ul>
                  </div>
                  <div className="-legal-subtitle" id="s10">
                    Provision of online offers and web hosting{' '}
                  </div>
                  <div className="-legal-paragraph">
                    In order to provide our online offer securely and
                    efficiently, we use the services of one or more web hosting
                    providers from whose servers (or servers managed by them)
                    the online offer can be accessed. For these purposes, we may
                    use infrastructure and platform services, computing
                    capacity, storage space and database services as well as
                    security services and technical maintenance services. <br />
                    <br />
                    The data processed in the context of the provision of the
                    hosting offer may include all information relating to the
                    users of our online offer, which is generated in the context
                    of use and communication. This regularly includes the IP
                    address, which is necessary to be able to deliver the
                    contents of online offers to browsers, and all entries made
                    within our online offer or from websites. <br />
                    <br />
                    <strong>Email sending and hosting:</strong>
                    The web hosting services we use also include the sending,
                    receiving and storing of e-mails. For these purposes, the
                    addresses of the recipients and senders as well as further
                    information regarding the e-mail dispatch (e.g. the
                    providers involved) and the contents of the respective
                    e-mails are processed. The aforementioned data may also be
                    processed for the purpose of identifying SPAM. Please note
                    that e-mails on the Internet are generally not sent in
                    encrypted form. As a rule, e-mails are encrypted in transit,
                    but (unless a so-called end-to-end encryption method is
                    used) not on the servers from which they are sent and
                    received. We can therefore not assume any responsibility for
                    the transmission path of the e-mails between the sender and
                    the reception on our server. <br />
                    <br />
                    <strong>Collection of access data and log files:</strong>
                    We ourselves (or our web hosting provider) collect data on
                    each access to the server (so-called server log files). The
                    server log files may include the address and name of the web
                    pages and files accessed, date and time of access, data
                    volumes transferred, notification of successful access,
                    browser type and version, the user's operating system,
                    referrer URL (the previously visited page) and, as a rule,
                    IP addresses and the requesting provider. <br />
                    <br />
                    The server log files can be used for security purposes, e.g.
                    to avoid overloading the servers (especially in the case of
                    abusive attacks, so-called DDoS attacks) and to ensure the
                    utilization of the servers and their stability. <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Types of data processed:</strong>
                        Content data (e.g. entries in online forms), Usage data
                        (e.g. websites visited, interest in content, access
                        times), Meta/communication data (e.g. device
                        information, IP addresses).
                      </li>
                      <br />
                      <li>
                        <strong>People concerned:</strong>
                        users (e.g. website visitors, users of Online services).
                      </li>
                      <br />
                      <li>
                        <strong>Purposes of processing:</strong>
                        Provision of contractual services and customer service.
                      </li>
                      <br />
                      <li>
                        <strong>Legal basis:</strong>
                        Legitimate interests (Art. 6 para 1 p. 1 lit. f. GDPR).
                      </li>
                    </ul>
                    <br />
                    <br />
                    Services used and service providers <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>1 &amp;1 IONOS:</strong>
                        Hosting platform for e-commerce / websites; Service
                        provider: 1 &amp;1.IONOS SE, Elgendorfer Str. 57, 56410
                        Montabaur, Germany; website:{' '}
                        <a href="https://www.ionos.de" target="_blank">
                          https://www.ionos.de
                        </a>
                        ; Privacy policy:{' '}
                        <a
                          href="https://www.ionos.de/terms-gtc/terms-privacy"
                          target="_blank"
                        >
                          https://www.ionos.de/terms-gtc/terms-privacy
                        </a>
                        .
                      </li>
                    </ul>
                  </div>
                  <div className="-legal-subtitle" id="s11">
                    Contact{' '}
                  </div>
                  <div className="-legal-paragraph">
                    When contacting us (e.g. via contact form, email, telephone
                    or via social media), the information of the inquiring
                    persons is processed insofar as this is necessary to answer
                    the contact inquiries and any requested measures. <br />
                    <br />
                    The answering of contact requests in the context of
                    contractual or pre-contractual relations is carried out for
                    the fulfilment of our contractual obligations or for the
                    answering of (pre)contractual requests and, moreover, on the
                    basis of the legitimate interests in answering the requests.{' '}
                    <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Types of data processed:</strong>
                        inventory data (e.g. names, addresses), contact data
                        (e.g. e-mail, telephone numbers), content data (e.g.
                        input in online forms).
                      </li>
                      <br />
                      <li>
                        <strong>People concerned:</strong>
                        communication partners.
                      </li>
                      <br />
                      <li>
                        <strong>Purposes of processing:</strong>
                        contact requests and communications.
                      </li>
                      <br />
                      <li>
                        <strong>Legal basis:</strong>
                        Contract fulfilment and pre-contractual enquiries (Art.
                        6 para. 1 p. 1 lit. b. GDPR), Legitimate Interests (Art.
                        6 para. 1 p. 1 lit. f. GDPR). .
                      </li>
                    </ul>
                  </div>
                  <div className="-legal-paragraph">
                    We offer online chat and chatbot features (collectively,
                    "Chat Services") as a communication option. A chat is an
                    online conversation conducted with some degree of
                    timeliness. A chatbot is software that answers users'
                    questions or notifies them of messages. When you use our
                    chat features, we may process your personal data. <br />
                    <br />
                    If you use our chat services within an online platform, your
                    identification number will also be stored within the
                    respective platform. We may also collect information about
                    which users interact with our chat services and when.
                    Furthermore, we store the content of your conversations via
                    the chat services and log registration and consent processes
                    in order to be able to prove these in accordance with legal
                    requirements. <br />
                    <br />
                    We would like to point out to users that the respective
                    platform provider can find out that and when users
                    communicate with our chat services as well as collect
                    technical information about the device used by the users
                    and, depending on the settings of their device, also
                    location information (so-called metadata) for the purpose of
                    optimising the respective services and for security
                    purposes. Likewise, the metadata of the communication via
                    chat services (i.e., for example, the information about who
                    communicated with whom) could be used by the respective
                    platform providers in accordance with their provisions, to
                    which we refer for further information, for marketing
                    purposes or to display advertising tailored to users. <br />
                    <br />
                    If users agree with a chatbot to activate information with
                    regular messages, they have the option to unsubscribe from
                    the information at any time in the future. The chatbot
                    informs users how and with which terms they can unsubscribe
                    from the messages. By unsubscribing from the chatbot
                    messages, users' data is deleted from the list of message
                    recipients. <br />
                    <br />
                    We use the foregoing information to operate our chat
                    services, such as to personally address users, to respond to
                    their inquiries, to deliver any requested content, and also
                    to improve our chat services (e.g., to "teach" chatbots
                    answers to frequently asked questions or to recognize
                    unanswered inquiries). <br />
                    <br />
                    Notes on legal basis: We use chat services on the basis of
                    consent if we have previously obtained users' permission to
                    process their data within the scope of our chat services
                    (this applies to cases where users are asked for consent,
                    e.g. for a chatbot to send them messages on a regular
                    basis). Where we use chat services to respond to users'
                    queries about our services or our business, this is for
                    contractual and pre-contractual communication. Otherwise, we
                    use chat services on the basis of our legitimate interests
                    in optimising the chat services, their operational
                    efficiency and increasing the positive user experience.{' '}
                    <br />
                    <br />
                    Revocation, objection and deletion: You can revoke a given
                    consent or object to the processing of your data within the
                    scope of our chat services at any time. <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Types of data processed:</strong>
                        Contact data (e.g. e-mail, telephone numbers), Content
                        data (e.g. entries in online forms), Usage data (e.g.
                        websites visited, interest in content, access times),
                        meta/communication data (e.g. device information, IP
                        addresses).
                      </li>
                      <br />
                      <li>
                        <strong>People concerned:</strong>
                        communication partners.
                      </li>
                      <br />
                      <li>
                        <strong>Purposes of processing:</strong>
                        contact requests and communication, direct marketing.
                        (e.g. by e-mail or postal mail).
                      </li>
                      <br />
                      <li>
                        <strong>Legal basis:</strong>
                        Consent (Art. 6 para. 1 p. 1 lit. a. GDPR), Legitimate.
                        Interests (Art. 6 para. 1 p. 1 lit. f. GDPR).
                      </li>
                      <br />
                      <br />
                      Services used and service providers: <br />
                      <br />
                      <ul className="m-elements">
                        <li>
                          <strong>Userlike:</strong>
                          Chatbot and assistance software and associated
                          services; Service provider: Userlike UG
                          (haftungsbeschränkt), Probsteigasse 44-46, 50670
                          Cologne, Germany; website:{' '}
                          <a href="https://www.userlike.com/">
                            https://www.userlike.com/
                          </a>
                          ; privacy policy:{' '}
                          <a href="https://www.userlike.com/de/terms#privacy-policy">
                            https://www.userlike.com/de/terms#privacy-policy
                          </a>
                          .
                        </li>
                      </ul>
                    </ul>
                  </div>
                  <div className="-legal-subtitle" id="s19">
                    Onlinemarketing{' '}
                  </div>
                  <div className="-legal-paragraph">
                    We process personal data for online marketing purposes,
                    which includes, in particular, the marketing of advertising
                    space or display of promotional and other content
                    (collectively, "Content") based on the potential interests
                    of users and measuring its effectiveness. <br />
                    <br />
                    For these purposes, so-called user profiles are created and
                    stored in a file (so-called "cookie") or similar procedures
                    are used, by means of which the information about the user
                    relevant for the presentation of the aforementioned content
                    is stored. This information may include, for example,
                    content viewed, websites visited, online networks used, but
                    also communication partners and technical information such
                    as the browser used, the computer system used and
                    information on usage times. If users have consented to the
                    collection of their location data, this may also be
                    processed. <br />
                    <br />
                    The IP addresses of the users are also stored. However, we
                    use available IP masking procedures (i.e., pseudonymization
                    by shortening the IP address) to protect users. In general,
                    no clear user data (such as e-mail addresses or names) is
                    stored as part of the online marketing process, but
                    pseudonyms. This means that we as well as the providers of
                    the online marketing procedures do not know the actual
                    identity of the users, but only the information stored in
                    their profiles. <br />
                    <br />
                    The information in the profiles is usually stored in the
                    cookies or by means of similar procedures. These cookies can
                    later generally also be read on other websites that use the
                    same online marketing procedure and analysed for the purpose
                    of displaying content as well as supplemented with further
                    data and stored on the server of the online marketing
                    procedure provider. <br />
                    <br />
                    Exceptionally, clear data may be associated with the
                    profiles. This is the case, for example, if the users are
                    members of a social network whose online marketing
                    procedures we use and the network links the profiles of the
                    users with the aforementioned data. We ask you to note that
                    users can make additional agreements with the providers,
                    e.g. by giving their consent as part of the registration
                    process. <br />
                    <br />
                    In principle, we only receive access to summarized
                    information about the success of our advertisements.
                    However, in the context of so-called conversion
                    measurements, we can check which of our online marketing
                    methods have led to a so-called conversion, i.e., for
                    example, to a conclusion of a contract with us. The
                    conversion measurement is used solely to analyse the success
                    of our marketing measures. <br />
                    <br />
                    Unless otherwise stated, we ask you to assume that cookies
                    used will be stored for a period of two years. <br />
                    <br />
                    Notes on legal bases: Where we ask users for their consent
                    to use third-party providers, the legal basis for processing
                    data is consent. Otherwise, users' data is processed on the
                    basis of our legitimate interests (i.e. interest in
                    efficient, economic and recipient-friendly services). In
                    this context, we would also like to refer you to the
                    information on the use of cookies in this privacy policy.{' '}
                    <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Types of data processed:</strong>
                        Usage data (e.g. web pages visited, interest in content,
                        access times), meta/communication data (e.g. device
                        information, IP addresses).
                      </li>
                      <br />
                      <li>
                        <strong>People concerned:</strong>
                        users (e.g. website visitors, users of Online services),
                        interested parties.
                      </li>
                      <br />
                      <li>
                        <strong>Purposes of processing:</strong>
                        tracking (e.g., interest/behavioral Profiling, use of
                        cookies), remarketing, conversion measurement
                        (measurement of the effectiveness of Marketing
                        measures), interest-based and behavioral marketing,
                        profiling (creating of user profiles), reach measurement
                        (e.g. access statistics, recognition of returning
                        Visitors).
                      </li>
                      <br />
                      <li>
                        <strong>Security measures:</strong>
                        IP masking (pseudonymization of the IP address).
                      </li>
                      <br />.
                      <li>
                        <strong>Legal basis:</strong>
                        Consent (Art. 6 para. 1 p. 1 lit. a. GDPR), Legitimate.
                        Interests (Art. 6 para. 1 p. 1 lit. f. GDPR).
                      </li>
                      <br />
                      <li>
                        <strong>Opposition (Opt-Out):</strong>
                        You have a right of withdrawal. You can withdraw your
                        consent in the{' '}
                        <a className="-link -black -underline" href="#cookies">
                          "Cookies" area below.
                        </a>
                        below at any time without giving a reason.
                      </li>
                    </ul>
                    <br />
                    Services used and service providers: <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Google Analytics:</strong>
                        online marketing and web analytics; service provider:
                        Google Ireland Limited, Gordon House, Barrow Street,
                        Dublin 4, Ireland, parent company: Google LLC, 1600
                        Amphitheatre Parkway, Mountain View, CA 94043, USA;
                        website:{' '}
                        <a
                          href="https://marketingplatform.google.com/intl/de/about/analytics/"
                          target="_blank"
                        >
                          https://marketingplatform.google.com/intl/de/about/analytics/
                        </a>
                        ; Privacy Policy:{' '}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                        >
                          https://policies.google.com/privacy
                        </a>
                        ; Opt-out: Opt-Out Plugin:{' '}
                        <a
                          href="https://tools.google.com/dlpage/gaoptout?hl=de"
                          target="_blank"
                        >
                          https://tools.google.com/dlpage/gaoptout?hl=de
                        </a>
                        ; settings for the Display of ads:{' '}
                        <a
                          href="https://adssettings.google.com/authenticated"
                          target="_blank"
                        >
                          https://adssettings.google.com/authenticated
                        </a>
                        .
                      </li>
                    </ul>
                  </div>
                  <div className="-legal-subtitle" id="s13">
                    Presence in social networks{' '}
                  </div>
                  <div className="-legal-paragraph">
                    We maintain online presences within social networks and
                    process user data in this context in order to communicate
                    with users active there or to offer information about us.{' '}
                    <br />
                    <br />
                    We would like to point out that user data may be processed
                    outside the European Union. This may result in risks for the
                    users, because, for example, the enforcement of the rights
                    of the users could be made more difficult. <br />
                    <br />
                    Furthermore, user data within social networks is usually
                    processed for market research and advertising purposes. For
                    example, usage profiles can be created based on the usage
                    behavior and resulting interests of the users. The usage
                    profiles can in turn be used, for example, to place
                    advertisements within and outside of the networks that are
                    presumably correspond to the interests of the users. For
                    these purposes, cookies are usually stored on the computers
                    of the users, in which the usage behaviour and the interests
                    of the users are stored. Furthermore, data may also be
                    stored in the usage profiles regardless of the devices used
                    by the users (especially if the users are members of the
                    respective platforms and are logged in to them). <br />
                    <br />
                    For a detailed description of the respective forms of
                    processing and the possibilities of objection (opt-out), we
                    refer to the data protection declarations and information
                    provided by the operators of the respective networks. <br />
                    <br />
                    Also in the case of requests for information and the
                    assertion of data subject rights, we point out that these
                    can be asserted most effectively with the providers. Only
                    the providers have access to the users' data and can take
                    appropriate measures and provide information directly. If
                    you still need help, you can contact us. <br />
                    <br />
                    Facebook: We are jointly responsible with Facebook Ireland
                    Ltd for collecting (but not further processing) data from
                    visitors to our Facebook page (known as a "Fan Page"). This
                    data includes information about the types of content users
                    view or interact with, or the actions they take (see "Things
                    You and Others Do and Provide" in the Facebook Data Policy:
                    https://www.facebook.com/policy), as well as information
                    about the devices users use (e.g., IP addresses, operating
                    system, browser type, language settings, cookie data; see
                    "Device Information" in the Facebook Data Policy Statement:
                    https://www.facebook.com/policy). As explained in the
                    Facebook Privacy Policy under "How Do We Use This
                    Information?", Facebook also collects and uses information
                    to provide analytics services, called "Page Insights," to
                    Page operators to provide them with insights into how people
                    interact with their Pages and the content associated with
                    them. We have entered into a special agreement with Facebook
                    ("Page Insights Information",
                    https://www.facebook.com/legal/terms/page_controller_addendum),
                    which in particular regulates which security measures
                    Facebook must observe and in which Facebook has agreed to
                    fulfil the data subject rights (i.e. users can, for example,
                    send information or deletion requests directly to Facebook).
                    The rights of users (in particular to information, deletion,
                    objection and complaint to the competent supervisory
                    authority), are governed by the agreements with  Facebook
                    not restricted. Further information can be found in the
                    "Information on Page Insights"
                    (https://www.facebook.com/legal/terms/information_about_page_insights_data).{' '}
                    <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Types of data processed:</strong>
                        inventory data (e.g. names, addresses), contact data
                        (e.g. e-mail, telephone numbers), content data (e.g.
                        entries in online forms), usage data (e.g. websites
                        visited, interest in content, access times),
                        meta/communication data (e.g. device information, IP
                        addresses).
                      </li>
                      <br />
                      <li>
                        <strong>People concerned:</strong>
                        users (e.g. website visitors, users of Online services).
                      </li>
                      <br />
                      <li>
                        <strong>Purposes of processing:</strong>
                        contact requests and communication, tracking (eg.
                        Interest/behavioral profiling, use of cookies),
                        remarketing, Reach measurement (e.g. access statistics,
                        recognition of returning visitors).
                      </li>
                      <br />
                      <li>
                        <strong>Legal basis:</strong>
                        Legitimate interests (Art. 6 para. 1 p. 1 lit. f. GDPR).
                      </li>
                    </ul>
                    <br />
                    <br />
                    Services used and service providers: <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Instagram:</strong>
                        social network; service provider: Instagram Inc, 1601
                        Willow Road, Menlo Park, CA, 94025, USA; parent company:
                        Facebook, 1 Hacker Way, Menlo Park, CA 94025, USA;
                        Website:{' '}
                        <a href="https://www.instagram.com" target="_blank">
                          https://www.instagram.com
                        </a>
                        ; Privacy Policy:{' '}
                        <a
                          href="https://instagram.com/about/legal/privacy"
                          target="_blank"
                        >
                          https://instagram.com/about/legal/privacy
                        </a>
                        .
                      </li>
                      <br />
                      <li>
                        <strong>Facebook:</strong>
                        social network; service provider: Facebook Ireland Ltd,
                        4 Grand Canal Square, Grand Canal Harbour, Dublin 2,
                        Ireland, parent company: Facebook, 1 Hacker Way, Menlo
                        Park, CA 94025, USA; website:{' '}
                        <a href="https://www.facebook.com" target="_blank">
                          https://www.facebook.com
                        </a>
                        ; Privacy policy:{' '}
                        <a
                          href="https://www.facebook.com/about/privacy"
                          target="_blank"
                        >
                          https://www.facebook.com/about/privacy
                        </a>
                        ; Opt-out. (Opt-Out): advertising preferences:{' '}
                        <a
                          href="https://www.facebook.com/settings?tab=ads"
                          target="_blank"
                        >
                          https://www.facebook.com/settings?tab=ads
                        </a>
                        .
                      </li>
                      <br />
                      <li>
                        <strong>LinkedIn:</strong>
                        social network; service provider: LinkedIn Ireland
                        Unlimited Company, Wilton Place, Dublin 2, Ireland;
                        Website:{' '}
                        <a href="https://www.linkedin.com" target="_blank">
                          https://www.linkedin.com
                        </a>
                        ; Privacy policy:{' '}
                        <a
                          href="https://www.linkedin.com/legal/privacy-policy"
                          target="_blank"
                        >
                          https://www.linkedin.com/legal/privacy-policy
                        </a>
                        ; Opt-out. (Opt-Out):{' '}
                        <a
                          href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out"
                          target="_blank"
                        >
                          https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out
                        </a>
                        .
                      </li>
                      <br />
                      <li>
                        <strong>Twitter:</strong>
                        social network; service provider: Twitter International
                        Company, One Cumberland Place, Fenian Street, Dublin 2
                        D02 AX07, Ireland, parent company: Twitter Inc, 1355
                        Market Street, Suite 900, San Francisco, CA 94103, USA;
                        privacy policy:{' '}
                        <a
                          href="https://twitter.com/de/privacy"
                          target="_blank"
                        >
                          https://twitter.com/de/privacy
                        </a>
                        , (settings){' '}
                        <a
                          href="https://twitter.com/personalization"
                          target="_blank"
                        >
                          https://twitter.com/personalization
                        </a>
                        .
                      </li>
                    </ul>
                  </div>
                  <div className="-legal-subtitle" id="s20">
                    Registration, login and user account{' '}
                  </div>
                  <div className="-legal-paragraph">
                    Users can create a user account. In the course of
                    registration, users are provided with the required mandatory
                    data and processed for the purpose of providing the user
                    account on the basis of contractual obligation. The
                    processed data includes in particular the login information
                    (password as well as an e-mail address). <br />
                    <br />
                    n the context of the use of our registration and login
                    functions as well as the use of the user account, we store
                    the IP address and the time of the respective user action.
                    The storage is based on our legitimate interests as well as
                    those of the users in protection against misuse and other
                    unauthorized use. As a matter of principle, this data is not
                    passed on to third parties unless it is necessary for the
                    pursuit of our claims or there is a legal obligation to do
                    so. <br />
                    <br />
                    Users may be informed by e-mail about processes relevant to
                    their user account, such as technical changes. <br />
                    <br />
                    <strong>Registration with pseudonyms:</strong>
                    Users may instead of plain names use pseudonyms as user
                    names <br />
                    <br />
                    <strong>Deletion of data after termination:</strong>
                    If users have terminated their user account, their data with
                    regard to the user account will be deleted, subject to any
                    legal permission, obligation or consent of the users. <br />
                    <br />
                    It is the responsibility of users to back up their data upon
                    termination prior to the end of the contract. We are
                    entitled to irretrievably delete all user data stored during
                    the term of the contract.
                  </div>
                  <div className="-legal-subtitle" id="s14">
                    Plugins and embedded features and content{' '}
                  </div>
                  <div className="-legal-paragraph">
                    We integrate functional and content elements into our online
                    offer that are obtained from the servers of their respective
                    providers (hereinafter referred to as "third-party
                    providers"). These can be, for example, graphics, videos or
                    social media buttons and posts (hereinafter uniformly
                    referred to as "content"). <br />
                    <br />
                    The integration always requires that the third-party
                    providers of this content process the IP address of the
                    user, as without the IP address they could not send the
                    content to their browser. The IP address is thus essential
                    for the display of this content or functions required. We
                    strive to use only such content whose respective providers
                    use the IP address only for the delivery of the content.
                    Third-party providers may also use so-called pixel tags
                    (invisible graphics, also known as "web beacons") for
                    statistical or marketing purposes. The "pixel tags" can be
                    used to evaluate information such as visitor traffic on the
                    pages of this website. The pseudonymous information may also
                    be stored in cookies on the user's device and may contain,
                    among other things, technical information about the browser
                    and operating system, referring websites, time of visit and
                    other information about the use of our online offer as well
                    as be linked to such information from other sources. <br />
                    <br />
                    Notes on legal bases: Where we ask users for their consent
                    to use third-party providers, the legal basis for processing
                    data is consent. Otherwise, users' data is processed on the
                    basis of our legitimate interests (i.e. interest in
                    efficient, economic and recipient-friendly services). In
                    this context, we would also like to refer you to the
                    information on the use of cookies in this privacy policy.{' '}
                    <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Types of data processed:</strong>
                        Usage data (e.g. web pages visited, interest in content,
                        access times), meta/communication data (e.g. device
                        information, IP addresses). .
                      </li>
                      <br />
                      <li>
                        <strong>Data subjects:</strong>
                        Users (e.g. website visitors, users of online services).
                      </li>
                      <br />
                      <li>
                        <strong>Purposes of the processing:</strong>
                        Provision of our online offer and user-friendliness,
                        provision of contractual services and customer service.
                      </li>
                      <li>
                        <strong>Legal basis:</strong>
                        Legitimate interests (Art. 6 para. 1 p. 1 lit. f. GDPR).
                      </li>
                    </ul>
                    <br />
                    <br />
                    Services used and service providers: <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Google Fonts:</strong>
                        We integrate the fonts ("Google Fonts") of the provider
                        Google, whereby the user data is used solely for the
                        purpose of displaying the fonts in the user's browser.
                        The integration is based on our legitimate interests in
                        a technically secure, maintenance-free and efficient use
                        of fonts, their uniform display, as well as taking into
                        account possible licensing restrictions for their
                        integration. Service provider: Google Ireland Limited,
                        Gordon House, Barrow Street, Dublin 4, Ireland, parent
                        company: Google LLC, 1600 Amphitheatre Parkway, Mountain
                        View, CA 94043, USA; website:{' '}
                        <a href="https://fonts.google.com/" target="_blank">
                          https://fonts.google.com/
                        </a>
                        ; Privacy policy:{' '}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                        >
                          https://policies.google.com/privacy
                        </a>
                        .
                      </li>
                    </ul>
                  </div>
                  <div className="-legal-subtitle" id="s15">
                    Data deletion{' '}
                  </div>
                  <div className="-legal-paragraph">
                    The data processed by us will be deleted in accordance with
                    the legal requirements as soon as their consents permitted
                    for processing are revoked or other permissions cease to
                    apply (e.g. if the purpose of processing this data has
                    ceased to apply or it is not required for the purpose).{' '}
                    <br />
                    <br />
                    If the data are not deleted because they are required for
                    other and legally permissible purposes, their processing
                    will be limited to these purposes. That is, the data is
                    blocked and not processed for other purposes. This applies,
                    for example, to data that must be retained for reasons of
                    commercial or tax law or whose storage is necessary for the
                    assertion, exercise or defence of legal claims or for the
                    protection of the rights of another natural or legal person.{' '}
                    <br />
                    <br />
                    Further information on the deletion of personal data can
                    also be found in the individual data protection notices of
                    this data protection declaration.
                  </div>
                  <div className="-legal-subtitle" id="s16">
                    Modification and update of the privacy policy{' '}
                  </div>
                  <div className="-legal-paragraph">
                    We ask you to regularly inform yourself about the content of
                    our data protection declaration. We adapt the data
                    protection declaration as soon as the changes in the data
                    processing carried out by us make this necessary. We will
                    inform you as soon as the changes require an act of
                    cooperation on your part (e.g. consent) or other individual
                    notification. <br />
                    <br />
                    If we provide addresses and contact information of companies
                    and organisations in this data protection declaration,
                    please note that the addresses may change over time and
                    please check the information before contacting us.
                  </div>
                  <div className="-legal-subtitle" id="s17">
                    Rights of the data subjects{' '}
                  </div>
                  <div className="-legal-paragraph">
                    As a data subject, you are entitled to various rights under
                    the GDPR, which arise in particular from Articles 15 to 21
                    GDPR: <br />
                    <br />
                    <ul>
                      <li>
                        <strong>
                          Right to object: You have the right to object at any
                          time, on grounds relating to your particular
                          situation, to the processing of personal data relating
                          to you which is carried out on the basis of Article
                          6(1)(e) or (f) GDPR; this also applies to profiling
                          based on these provisions. If we process your personal
                          data for the purpose of direct marketing, you have the
                          right to object at any time to the processing of
                          personal data concerning you for the purpose of such
                          marketing; this also applies to profiling insofar as
                          it is associated with such direct marketing.{' '}
                        </strong>
                      </li>
                      . <br />
                      <li>
                        <strong>Right of withdrawal for consents:</strong>
                        You have the right to revoke any consent you have given
                        at any time.
                      </li>
                      <br />
                      <li>
                        <strong>Right of access:</strong>
                        You have the right to obtain confirmation as to whether
                        or not personal data in question is being processed and
                        to be informed of such data and to obtain further
                        information and a copy of the data in accordance with
                        the law.
                      </li>
                      <br />
                      <li>
                        <strong>Right to rectification:</strong>
                        In accordance with the statutory provisions, you have
                        the the right to obtain the completion of data
                        concerning you or the rectification of the inaccurate
                        data concerning you.
                      </li>
                      <br />
                      <li>
                        <strong>
                          Right to erasure and restriction of processing:
                        </strong>
                        You have the right, in accordance with the law, to
                        request that data relating to you be erased immediately
                        or, alternatively, to request restriction of the
                        processing of the data in accordance with the law.
                      </li>
                      <br />
                      <li>
                        <strong>Right to data portability:</strong>
                        You have the right to receive data concerning you, which
                        you have provided to us, in a structured, common and
                        machine-readable format in accordance with the legal
                        requirements, or to demand that it be transferred to
                        another person responsible.
                      </li>
                      <br />
                      <li>
                        <strong>Complaint with supervisory authority:</strong>
                        YYou also have the right, in accordance with the law, to
                        lodge a complaint with a supervisory authority, in
                        particular in the Member State of your habitual
                        residence, place of work or place of the alleged
                        infringement, if you consider that the processing of
                        personal data relating to you infringes the GDPR.
                      </li>
                    </ul>
                  </div>
                  <div className="-legal-subtitle" id="s18">
                    Definitions of terms{' '}
                  </div>
                  <div className="-legal-paragraph">
                    This section provides an overview of the terms used in this
                    privacy statement. Terms. Many of the terms are taken from
                    the law and defined primarily in Article 4 of the GDPR. The
                    legal definitions are binding. The following explanations,
                    on the other hand, are intended primarily serve the
                    understanding. The terms are sorted alphabetically. <br />
                    <br />
                    <ul className="glossary">
                      <li>
                        <strong>IP masking:</strong>
                        "IP masking" refers to a method in which the last octet,
                        i.e., the last two numbers of an IP address, is deleted
                        so that the IP address can no longer be used to uniquely
                        identify a person. Therefore, IP masking is a means of
                        pseudonymizing processing procedures, especially in
                        online marketing
                      </li>
                      <br />
                      <li>
                        <strong>
                          Interest-based and behavioral marketing:
                        </strong>
                        Interest-based and/or behavioural marketing is when the
                        potential interests of users in advertisements and other
                        content are determined as precisely as possible. This is
                        done on the basis of information about their previous
                        behaviour (e.g. visiting certain websites and staying on
                        them, buying behaviour or interaction with other users),
                        which is stored in a so-called profile. Cookies are
                        generally used for these purposes.
                      </li>
                      <br />
                      <li>
                        <strong>Conversion measurement:</strong>
                        Conversion measurement (also referred to as "visit
                        action evaluation") is a procedure that can be used to
                        determine the effectiveness of marketing measures. For
                        this purpose, a cookie is usually stored on the users'
                        devices within the websites on which the marketing
                        measures take place and then retrieved again on the
                        target website. For example, this allows us to track
                        whether the ads we have placed on other websites have
                        been successful.
                      </li>
                      <br />
                      <li>
                        <strong>Personal data:</strong>
                        "Personal data" means any information relating to an
                        identified or identifiable natural person (hereinafter
                        "data subject"); an identifiable natural person is one
                        who can be identified, directly or indirectly, in
                        particular by reference to an identifier such as a name,
                        an identification number, location data, an online
                        identifier (e.g. cookie) or to one or more factors
                        specific to the physical, physiological, genetic,
                        mental, economic, cultural or social identity of that
                        natural person.
                      </li>
                      <br />
                      <li>
                        <strong>Profiling:</strong>
                        "Profiling" is any form of automated processing of
                        personal data which consists in using such personal data
                        to determine certain personal aspects, (depending on the
                        type of profiling, this includes information regarding
                        age, gender, location data and movement data,
                        interaction with websites and their content, shopping
                        behavior, social interactions with other people) or to
                        predict them (e.g. interests in certain content or
                        products, click behavior on a website or location).
                        Cookies and web beacons are often used for profiling
                        purposes.
                      </li>
                      <br />
                      <li>
                        <strong>Reach measurement:</strong>
                        Reach measurement (also referred to as web analytics) is
                        used to evaluate the flow of visitors to an online
                        offering and can include visitors' behavior or interests
                        in certain information, such as website content. With
                        the help of reach analysis, website owners can see, for
                        example, at what time visitors visit their website and
                        what content they are interested in. This enables them,
                        for example, to better adapt the content of the website
                        to the needs of their visitors. For the purposes of
                        reach analysis, pseudonymous cookies and web beacons are
                        often used to recognize returning visitors and thus
                        obtain more precise analyses of the use of an online
                        offer.
                      </li>
                      <br />
                      <li>
                        <strong>Remarketing:</strong>
                        One speaks of "remarketing" or "retargeting" when, for
                        example, to advertising purposes, which products a user
                        has chosen on a website. website has interested the user
                        on other websites to these products, e.g. in
                        advertisements.
                      </li>
                      <br />
                      <li>
                        <strong>Tracking:</strong>
                        We speak of "tracking" when the behaviour of users can
                        be traced across several online services. As a rule,
                        behavioural and interest information with regard to the
                        online offers used is stored in cookies or on servers of
                        the providers of the tracking technologies (so-called
                        profiling). This information can then be used, for
                        example, to display advertisements to users that are
                        likely to correspond to their interests.
                      </li>
                      <br />
                      <li>
                        <strong>Responsible:</strong>
                        Natural or legal person, public authority, agency or
                        other body which alone or jointly with others determines
                        the purposes and means of the processing of personal
                        data.
                      </li>
                      <br />
                      <li>
                        <strong>Processing:</strong>
                        means any operation or set of operations which is
                        performed with or without the aid of automated means in
                        relation to personal data. The term is wide-ranging and
                        covers practically every handling of data, be it
                        collection, evaluation, storage, transmission or
                        deletion.
                      </li>
                    </ul>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full text-2xl pt-10 pb-10 border-gray border-b font-serif font-medium text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Cookies</span>
                <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''} w-5 h-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-10 font-inter text-xl leading-9">
                <div>
                  <div className="-legal-subtitle">Cookies </div>
                  <div className="-legal-paragraph">
                    <a
                      className="text-tech flex font-bold"
                      onClick={() =>
                        document
                          .getElementById('usercentrics-root')
                          .shadowRoot.querySelector(
                            '[data-testid=uc-privacy-button]'
                          )
                          .click()
                      }
                    >
                      <CogIcon className="w-5 mr-2"></CogIcon>Edit cookie
                      settings
                    </a>
                    <br></br>
                    Our website uses cookies. Cookies are text files that
                    contain data from visited websites or domains and are stored
                    by a browser on the user's computer. The primary purpose of
                    a cookie is to store information about a user during or
                    after his visit within an online offer. Stored information
                    may include, for example, language settings on a website,
                    login status, a shopping cart, or where a video was watched.
                    The term cookies also includes other technologies that
                    perform the same functions as cookies (e.g., when user
                    information is stored using pseudonymous online identifiers,
                    also referred to as "user IDs"). <br />
                    <br />
                    The following cookie types and functions are distinguished:{' '}
                    <br />
                    <br />
                    <ul>
                      <li>
                        <strong>
                          Temporary cookies (also: session cookies):
                        </strong>
                        Temporary cookies are deleted at the latest after a user
                        has left an online offer and closed his browser.
                      </li>
                      <br />
                      <li>
                        <strong>Permanent cookies:</strong>
                        Permanent cookies remain stored even after the browser
                        is closed. For example, the login status can be saved or
                        preferred content can be displayed directly when the
                        user visits a website again. Likewise, the interests of
                        users used for reach measurement or marketing purposes
                        can be stored in such a cookie.
                      </li>
                      <br />
                      <li>
                        <strong>First-party cookies:</strong>
                        First-party cookies are set by ourselves.
                      </li>
                      <br />
                      <li>
                        <strong>
                          Third-party cookies (also: third-party cookies)
                        </strong>
                        :Third-party cookies are mainly used by advertisers
                        (so-called third parties) to process user information.
                      </li>
                      <br />
                      <li>
                        <strong>
                          Necessary (also: essential or absolutely necessary)
                          cookies:
                        </strong>
                        On the one hand, cookies may be absolutely necessary for
                        the operation of a website (e.g. to store logins or
                        other user input or for security reasons). <br />
                        <br />
                      </li>
                      <br />
                      <li>
                        <strong>
                          Statistics, marketing and personalization cookies:
                        </strong>
                        Furthermore, cookies are usually also used in the
                        context of range measurement and when a user's interests
                        or behavior (e.g. viewing certain content, using
                        functions, etc.) on individual websites are stored in a
                        user profile. Such profiles are used, for example, to
                        show users content that matches their potential
                        interests. This process is also referred to as
                        "tracking", i.e., tracking the potential interests of
                        users. Insofar as we use cookies or "tracking"
                        technologies, we will inform you separately in our
                        privacy policy or in the context of obtaining consent.{' '}
                        <br />
                        <br />
                      </li>
                      <br />
                    </ul>
                    <strong>Notes on legal bases:</strong>
                    The legal basis on which we process your personal data using
                    cookies depends on whether we ask you for consent. If this
                    is the case and you consent to the use of cookies, the legal
                    basis for the processing of your data is the declared
                    consent. Otherwise, the data processed with the help of
                    cookies is processed on the basis of our legitimate
                    interests (e.g. in a business operation of our online offer
                    and its improvement) or, if the use of cookies is necessary
                    to fulfill our contractual obligations. <br />
                    <br />
                    <strong>
                      General information on revocation and objection (opt-out):{' '}
                    </strong>
                    Depending on whether the processing is based on consent or
                    legal permission, you have the option at any time to revoke
                    any consent given or to object to the processing of your
                    data by cookie technologies (collectively referred to as
                    "opt-out"). You can initially declare your objection by
                    means of your browser settings, e.g. by deactivating the use
                    of cookies (whereby this may also restrict the functionality
                    of our online offer). An objection to the use of cookies for
                    online marketing purposes can also be declared by means of a
                    variety of services, especially in the case of tracking, via
                    the websites https://optout.aboutads.info and
                    https://www.youronlinechoices.com/. In addition, we offer
                    above the option to disable cookies for non-functional
                    purposes. In addition, you can obtain further instructions
                    on how to object in the context of the information on the
                    service providers and cookies used. <br />
                    <br />
                    <strong>
                      Processing of cookie data on the basis of consent:
                    </strong>
                    We use a cookie consent management procedure in which the
                    consent of users to the use of cookies or the processing and
                    providers named in the cookie consent management procedure
                    can be obtained and managed and revoked by the users. In
                    this context, the declaration of consent is stored in order
                    not to have to repeat its request and to be able to prove
                    the consent in accordance with the legal obligation. The
                    storage can take place on the server side and/or in a cookie
                    (so-called opt-in cookie, or with the help of comparable
                    technologies), in order to be able to assign the consent to
                    a user or their device. Subject to individual information on
                    the providers of cookie management services, the following
                    information applies: The duration of the storage of consent
                    can be up to two years. A pseudonymous user identifier is
                    created and stored with the time of consent, information on
                    the scope of consent (e.g., which categories of cookies
                    and/or service providers), as well as the browser, system
                    and end device used. <br />
                    <br />
                    <ul className="m-elements">
                      <li>
                        <strong>Types of data processed:</strong>
                        Usage data (e.g. web pages visited, interest in content,
                        access times), meta/communication data (e.g. device
                        information, IP addresses).
                      </li>
                      <br />
                      <li>
                        <strong>People concerned:</strong>
                        users (e.g. website visitors, users of Online services).
                      </li>
                      <br />
                      <li>
                        <strong>Legal basis:</strong>
                        Consent (Art. 6 para. 1 p. 1 lit. a. GDPR), Legitimate
                        Interests (Art. 6 para. 1 p. 1 lit. f. GDPR).
                      </li>
                    </ul>
                    <br />
                    <br />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full text-2xl pt-10 pb-10 border-gray border-b font-serif font-medium text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Terms of use</span>
                <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''} w-5 h-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-10 font-inter text-xl leading-9">
                <div>
                  <div className="-legal-subtitle">Preface </div>
                  <div className="-legal-paragraph">
                    1.1 Chadwick Marketing (hereinafter: the operator)
                    distributes and develops the software Social, an application
                    for the management and distribution of web links. The
                    subject matter of the contract is the provision of the
                    software as a service.{' '}
                  </div>
                  <div className="-legal-subtitle">
                    Subject matter of the contract{' '}
                  </div>
                  <div className="-legal-paragraph">
                    2.1 The operator shall provide the contractual services, the
                    temporary and non-exclusive use of Social (hereinafter: the
                    software), in accordance with the rights of use described in
                    item 3 of this contract. The scope of services, the nature,
                    the intended use and the conditions of use of the software
                    can be found in the service description at
                    socialwp.io/pricing. <br />
                    <br />
                    2.1 The operator shall provide the contractual services, the
                    temporary and non-exclusive use of Social (hereinafter: the
                    software), in accordance with the rights of use described in
                    item 3 of this contract. The scope of services, the nature,
                    the intended use and the conditions of use of the software
                    can be found in the service description at
                    socialwp.io/pricing. <br />
                    <br />
                    2.3 Deviating terms and conditions of the customer shall not
                    come into effect without prior written confirmation by the
                    operator. Individual agreements always have priority.
                  </div>
                  <div className="-legal-subtitle">Rights of use </div>
                  <div className="-legal-paragraph">
                    3.1 The customer acquires the non-exclusive right, limited
                    to the term of the contract, to use the software worldwide
                    for internal or personal use within the scope of the
                    selected tariff. <br />
                    <br />
                    3.2 The customer is not permitted to exceed the scope of use
                    defined by the selected tariff or to make the software
                    available to third parties. Furthermore, the customer is
                    prohibited from selling, renting, lending or otherwise
                    reproducing the software or parts thereof. <br />
                    <br />
                    3.3 The contractual partner for all orders is
                    [Freemius.com](http://Freemius.com/) (online marketplace for
                    e-commerce; service provider:
                    [Freemius.com](http://Freemius.com/) Inc., 4023 Kennett
                    Pike, Wilmington, 19807 DE, USA.). You will also be invoiced
                    via the payment provider. Furthermore,
                    [Freemius.com](http://Freemius.com/) handles all support
                    requests and returns.
                  </div>
                  <div className="-legal-subtitle">
                    Rights and obligations of the customer{' '}
                  </div>
                  <div className="-legal-paragraph">
                    4.1 All access to the software (e.g. passwords, licence keys
                    or downloads) must be kept secret by the customer. <br />
                    <br />
                    4.2 The customer is prohibited from taking any actions that
                    jeopardise the operation of the software. In particular, the
                    customer is not permitted to scan the software for errors
                    and misuse any, to bypass encrypted access systems or to
                    introduce other viruses into the software.
                  </div>
                  <div className="-legal-subtitle">Free test phase </div>
                  <div className="-legal-paragraph">
                    5.1 The operator offers the customer a one-week free and
                    non-binding test phase. During these 7 days, termination is
                    possible at any time and no contractual obligation is
                    created. The test phase is limited to one user, one IP
                    address, one device, one address and one e-mail. The
                    provider is entitled to charge the customer for damages
                    after the first 7 days in case of misuse of multiple orders
                    of a test phase. Furthermore, the provider reserves the
                    right to block the respective user account including the
                    licence in the event of misuse of the test phase as well as
                    in the event of an attempt at deception.{' '}
                  </div>
                  <div className="-legal-subtitle">Duration of contract </div>
                  <div className="-legal-paragraph">
                    6.1 This contract begins with the registration of a user
                    account. It is thus concluded for an indefinite period. The
                    respective minimum contract period (see point 6.2) shall
                    begin anew at the same time. <br />
                    <br />
                    6.2 This contract can be terminated in writing or digitally
                    at the end of the respective billing period, subject to a
                    one-month notice period. A written notice of termination
                    shall be sent by post, a digital notice of termination shall
                    be sent directly in the "Dashboard" area of the user account
                    at my.social.de.com. Any termination will take effect on the
                    day following the last day of the billing period. <br />
                    <br />
                    6.3 If there is an important reason, the operator can
                    terminate this contract with immediate effect. Good cause
                    shall be deemed to exist if <br />
                    <br />
                    6.3.1. the customer violates contractual provisions and does
                    not cease any behaviour contrary to the contract within a
                    one-week period of time even after a written request to do
                    so; <br />
                    <br />
                    6.3.2. the customer is in arrears with an amount of at least
                    two monthly or, depending on the plan chosen, one annual
                    payment.
                  </div>
                  <div className="-legal-subtitle">Payment terms </div>
                  <div className="-legal-paragraph">
                    7.1 Charges for recurring services are due before the start
                    of the relevant billing period. Depending on the plan, the
                    billing period begins on the day the contract is concluded
                    and ends either after one month (monthly payment) or after
                    one year (annual payment). <br />
                    <br />
                    7.2 A final activation of the customer licence takes place
                    when the current fee has been paid in full. If the customer
                    is in arrears with payment to the operator, the operator is
                    entitled to prevent further use of the software and to
                    discontinue all contractual services. <br />
                    <br />
                    7.4 Unless claims of the customer have been legally
                    established by a court, the customer is not entitled to
                    offset claims against the operator.
                  </div>
                  <div className="-legal-subtitle">Warranty and liability </div>
                  <div className="-legal-paragraph">
                    8.1 The operator guarantees the function of the software
                    within the scope of the service description according to
                    point 2.1 or socialwp.io/pricing. Excluded are claims of the
                    customer due to defects that result in an only insignificant
                    reduction of the functionality of the software. Furthermore,
                    the operator shall not be liable, regardless of fault, for
                    defects that were already present at the time of the
                    conclusion of the contract. <br />
                    <br />
                    8.2 The software is operated self-hosted on the customer's
                    own website. The operator does not assume any liability for
                    corresponding server settings of the customer or
                    availability of the website. <br />
                    <br />
                    8.3 The operator is only liable for lost profits and other
                    indirect damages if the cause of the damage is based on
                    gross negligence or intent on the part of the operator.
                  </div>
                  <div className="-legal-subtitle">
                    Confidentiality and data protection{' '}
                  </div>
                  <div className="-legal-paragraph">
                    9.1 If the customer processes personal data in connection
                    with this contract (in particular use and collection), he
                    guarantees that he is authorised to do so under data
                    protection law. In the event of a breach, the customer shall
                    indemnify the Provider against any claims by third parties.
                    The customer thus remains the responsible party under data
                    protection law. <br />
                    <br />
                    9.2 The customer can obtain supplementary information on the
                    data protection regulations of the provider at
                    socialwp.io/legal.
                  </div>
                  <div className="-legal-subtitle">Final provisions </div>
                  <div className="-legal-paragraph">
                    10.1 The contractual language is German. The authoritative
                    text of the contract is the text written in German. <br />
                    <br />
                    10.2 Legal disputes between the operator and the customer
                    are subject to the law of the Federal Republic of Germany.{' '}
                    <br />
                    <br />
                    10.3 If the customer is a legal entity under public law, a
                    merchant or a special fund under public law, the place of
                    jurisdiction shall be the registered office of the operator.{' '}
                    <br />
                    <br />
                    10.4 If individual provisions of this contract are or become
                    invalid, this shall not result in the invalidity of the
                    entire contract. In this case, the customer undertakes to
                    agree on a provision in place of the invalid provision that
                    comes as close as possible in economic terms to the original
                    purpose of the invalid provision in question. <br />
                    <br />
                    10.5 The operator is entitled to use the logo and the
                    company name of the customer for marketing purposes. The
                    customer may object to this provision at any time. <br />
                    <br />
                    <br />
                    <br />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </main>
      <Footer language={language}></Footer>
    </>
  );
}
