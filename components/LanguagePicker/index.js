import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, GlobeAltIcon } from '@heroicons/react/outline'
import { useEffect, Fragment, useState } from 'react';
import { useRouter } from 'next/router';

const LanguagePicker = ({ language }) => {

    const router = useRouter();
    
    const locales = [
      "en",
    ]

    const [activeLanguage, 
           setActiveLanguage
          ] = useState("en")


    return (
        <div className="md:flex">
        <Listbox value={activeLanguage} onChange={setActiveLanguage}>
          <div className="relative">
            <Listbox.Button className="relative pr-10 text-left rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{language.languages[activeLanguage]}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <GlobeAltIcon
                  className="w-5 h-5"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition 
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options  className="absolute w-[150px] top-[-80px] cursor-pointer py-1 mt-1 font-inter overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {locales.map((locale) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `${active ? 'text-black bg-tech/20' : 'text-gray-900'}
                            cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    key={locale}
                    value={locale}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                        >
                          {language.languages[locale]}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? 'text-tech-700' : 'text-black'
                            }
                                  absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        </div>
    )
}


export default LanguagePicker;