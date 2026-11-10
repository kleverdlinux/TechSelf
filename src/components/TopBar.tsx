import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { languages, currencies } from '../data/storeData';

export default function TopBar() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isCurrOpen, setIsCurrOpen] = useState(false);
  const [selectedCurr, setSelectedCurr] = useState(currencies[0]);

  const langRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (currRef.current && !currRef.current.contains(e.target as Node)) {
        setIsCurrOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-100 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex sm:flex-row gap-2 justify-between flex-col items-center">
        <div className="gap-5 order-2 sm:order-1 hidden lg:flex">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center cursor-pointer gap-2 w-full font-medium text-left text-base text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5.91748 10.001C5.91748 9.40261 5.94713 8.81689 6.00146 8.25098H3.26416C3.1193 8.8101 3.0425 9.39658 3.04248 10.001C3.04248 10.6053 3.11936 11.1919 3.26416 11.751H6.00146C5.94712 11.185 5.91749 10.5994 5.91748 10.001ZM7.74365 13.251C7.89637 13.9668 8.09628 14.609 8.33154 15.1533C8.60881 15.7947 8.91999 16.2668 9.22705 16.5674C9.49289 16.8275 9.72558 16.9329 9.91943 16.9551L10.0005 16.959C10.2092 16.9588 10.4694 16.8644 10.7729 16.5674C11.0801 16.2668 11.3911 15.7948 11.6685 15.1533C11.9038 14.609 12.1036 13.9668 12.2563 13.251H7.74365ZM3.84814 13.251C4.59227 14.6569 5.80273 15.7778 7.2749 16.4053C7.16112 16.1968 7.05433 15.9775 6.95557 15.749C6.64224 15.0242 6.39133 14.1784 6.21436 13.251H3.84814ZM13.7866 13.251C13.6096 14.1784 13.3588 15.0242 13.0454 15.749C12.9465 15.9777 12.8381 16.1966 12.7241 16.4053C14.1967 15.7779 15.4076 14.6572 16.1519 13.251H13.7866ZM12.7251 3.59668C12.839 3.80526 12.9466 4.02438 13.0454 4.25293C13.3588 4.97776 13.6096 5.82354 13.7866 6.75098H16.1519C15.4077 5.34517 14.1972 4.22403 12.7251 3.59668ZM10.0005 3.04297C9.79162 3.04297 9.53076 3.13745 9.22705 3.43457C8.91994 3.73502 8.60886 4.20719 8.33154 4.84863C8.09626 5.39295 7.89638 6.03514 7.74365 6.75098H12.2563C12.1036 6.03513 11.9038 5.39295 11.6685 4.84863C11.3911 4.20719 11.0801 3.73503 10.7729 3.43457C10.4695 3.13772 10.2093 3.04311 10.0005 3.04297ZM7.27393 3.59668C5.80218 4.22411 4.59217 5.34544 3.84814 6.75098H6.21436C6.39133 5.82357 6.6422 4.97774 6.95557 4.25293C7.05428 4.02463 7.16021 3.80506 7.27393 3.59668ZM7.41748 10.001C7.41749 10.6071 7.4496 11.193 7.5083 11.751H12.4917C12.5504 11.193 12.5825 10.6071 12.5825 10.001C12.5825 9.39494 12.5504 8.80886 12.4917 8.25098H7.5083C7.44962 8.80885 7.41748 9.39496 7.41748 10.001ZM14.0825 10.001C14.0825 10.5994 14.0539 11.185 13.9995 11.751H16.7358C16.8806 11.1919 16.9575 10.6053 16.9575 10.001C16.9575 9.39658 16.8807 8.81011 16.7358 8.25098H13.9995C14.0539 8.81687 14.0825 9.40263 14.0825 10.001ZM18.4575 10.001C18.4575 10.9599 18.2955 11.8809 18.0015 12.7402C17.9946 12.7606 17.9895 12.7813 17.981 12.8008C16.8254 16.0956 13.6899 18.4588 10.0005 18.459C6.31425 18.459 3.18117 16.0998 2.02295 12.8096C2.00326 12.7662 1.98727 12.7212 1.97607 12.6738C1.69634 11.8335 1.54248 10.9352 1.54248 10.001C1.54251 9.06918 1.69575 8.17338 1.97412 7.33496C1.98548 7.28485 2.00211 7.23715 2.02295 7.19141C3.18153 3.90185 6.31473 1.54297 10.0005 1.54297L10.4351 1.55371C13.9342 1.73103 16.8707 4.03621 17.981 7.2002C17.99 7.2209 17.9952 7.24302 18.0024 7.26465C18.2959 8.12317 18.4575 9.04309 18.4575 10.001Z"
                  fill="currentColor"
                />
              </svg>
              <span>{selectedLang.code}</span>
              <svg
                className={isLangOpen ? 'rotate-180' : ''}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
              >
                <path
                  d="M4.79163 7.39648L9.99996 12.6048L15.2083 7.39648"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isLangOpen && (
              <ul className="absolute mt-1 p-1 w-full bg-white rounded-xl shadow-lg z-50">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLangOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                  >
                    <span className="text-sm">{lang.code}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative" ref={currRef}>
            <button
              type="button"
              onClick={() => setIsCurrOpen(!isCurrOpen)}
              className="gap-2 items-center inline-flex cursor-pointer text-sm font-medium text-gray-900"
            >
              <img
                src={selectedCurr.img}
                className="rounded-full w-5 h-5"
                alt={selectedCurr.code}
              />
              <span>{selectedCurr.code}</span>
              <svg
                className={isCurrOpen ? 'rotate-180' : ''}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
              >
                <path
                  d="M4.79163 7.39648L9.99996 12.6048L15.2083 7.39648"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isCurrOpen && (
              <ul className="absolute mt-1 p-1 w-full bg-white rounded-xl shadow-lg z-50">
                {currencies.map((curr) => (
                  <li
                    key={curr.code}
                    onClick={() => {
                      setSelectedCurr(curr);
                      setIsCurrOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                  >
                    <img
                      src={curr.img}
                      className="rounded-full w-5 h-5"
                      alt={curr.code}
                    />
                    <span className="text-sm">{curr.code}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="text-gray-900 text-sm font-medium order-1 sm:order-2">
          Flash Sale Live – 30% Off Everything
        </p>

        <div className="hidden sm:block order-3">
          <Link
            to="/"
            className="flex gap-2 text-sm items-center font-medium text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.3289 3.875C11.6009 3.87514 12.6316 4.90664 12.6316 6.17871C12.6315 7.45067 11.6008 8.48131 10.3289 8.48145C9.05679 8.48145 8.0253 7.45075 8.02516 6.17871C8.02516 4.90655 9.05671 3.875 10.3289 3.875ZM10.3289 9.98145C12.4293 9.98131 14.1315 8.2791 14.1316 6.17871C14.1316 4.07821 12.4293 2.37514 10.3289 2.375C8.22828 2.375 6.52516 4.07812 6.52516 6.17871C6.5253 8.27918 8.22836 9.98145 10.3289 9.98145ZM15.9504 16.7449V17.033C15.9504 17.4472 16.2862 17.783 16.7004 17.783C17.1145 17.7828 17.4504 17.4471 17.4504 17.033V16.7449C17.4504 13.5889 14.8915 11.03 11.7356 11.03H8.9231C5.76714 11.03 3.20825 13.5889 3.20825 16.7449V17.033C3.20825 17.4472 3.54404 17.783 3.95825 17.783C4.37247 17.783 4.70825 17.4472 4.70825 17.033V16.7449C4.70825 14.4174 6.59557 12.53 8.9231 12.53H11.7356C14.0631 12.53 15.9504 14.4174 15.9504 16.7449Z"
                fill="currentColor"
              />
            </svg>
            Sign In / Register
          </Link>
        </div>
      </div>
    </div>
  );
}
