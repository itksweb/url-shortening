import { useEffect, useState } from "react";
import ShortenedLink from "./components/ShortenedLink";
import MySvg from "./components/MySvg";
import { shortenLink, isValidUrl, UseScreenWidth } from "./utils";

const App = () => {
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [shortenedLinks, setShortenedLinks] = useState([]);
  const [mobileMenuOpen, setMobilemenuOpen] = useState(false);
  const screenWidth = UseScreenWidth();

  useEffect(() => {
    let sLinks = localStorage.getItem("shortLinks");
    if (sLinks) {
      setShortenedLinks(JSON.parse(sLinks));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = isValidUrl(input.trim());
    if (isValid) {
      const shortened = await shortenLink(input.trim());
      if (shortened) {
        console.log(shortened)
        let sLink = { link: input.trim(), shortened };
        localStorage.setItem(
          "shortLinks",
          JSON.stringify([...shortenedLinks, sLink])
        );
        setShortenedLinks((prev) => [...prev, sLink]);
        setInput("");
      } else {
        console.log("something went wrong");
      }
    } else {
      setInputError("Please provide a valid url that starts with http(s)");
    }
  };
  const handleInputChange = (e) => {
    setInputError("");
    setInput(e.target.value);
  };
  useEffect(() => {
    if (screenWidth >= 768) {
      setMobilemenuOpen(false);
    }
  }, [screenWidth]);

  const Mobilemenu = () => {
    return (
      <div className="px-5 pt-5 w-full sm:px-10">
        <div className="mobile-menu text-Grayy bg-dark-vio rounded-md p-6 w-full">
          <ul className="mb-6 flex flex-col items-center gap-6">
            {["Features", "Pricing", "Resources"].map((li) => (
              <li
                key={li}
                className="cursor-pointer  text-[16px] font-bold hover:text-Gray-vio"
              >
                {li}
              </li>
            ))}
          </ul>
          <div className="font-bold text-[16px] border-t border-Gray-vio flex flex-col items-center pt-3 gap-6">
            <button
              className=" px-7 py-2 rounded-4xl hover:text-Gray-vio cursor-pointer "
              type="button"
            >
              Login
            </button>
            <Button text="Sign Up" />
          </div>
        </div>
      </div>
    );
  };
  const Feature = ({ title, body, alt, cls }) => {
    return (
      <div
        className={`bg-white max-w-[450px] md:min-w-[220px] lg:min-w-[280px] p-7 text-sm relative feature flex flex-col items-center lg:text-left lg:items-start ${
          cls ? cls : ""
        } `}
      >
        <div className="bg-Very-dark-vio rounded-full flex items-center justify-center size-16 absolute -top-8 ">
          <img
            src={`/assets/images/${alt}.svg`}
            alt={alt}
            className="size-6 "
          />
        </div>

        <h3 className="text-xl font-bold mt-11 mb-4 text-Very-dark-vio">
          {title}
        </h3>
        <p className="">{body}</p>
      </div>
    );
  };
  const Button = ({ text, cls }) => {
    return (
      <button
        type="button"
        className={`bg-Cyan font-bold hover:bg-light-cyan cursor-pointer px-7 py-2 rounded-4xl text-white ${
          cls ? cls : ""
        }`}
      >
        {text ? text : "Get Started"}
      </button>
    );
  };
  const FooterMenu = ({ title, items }) => {
    return (
      <div className="text-sm max-md:text-center">
        <h4 className="text-Grayy font-bold mb-5">{title}</h4>
        {items.split(",").map((item) => (
          <p
            key={item.trim()}
            className="my-2  text-Gray-vio hover:text-Cyan cursor-pointer"
          >
            {item.trim()}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className=" flex flex-col pt-8 text-Gray-vio ">
      <header className=" pb-15 ">
        <div className="px-5 sm:px-10 md:px-16 lg:px-24 max-md:grid-cols-2 max-md:flex max-md:justify-between md:grid md:grid-cols-11 items-center gap-5 ">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            className="md:col-span-2"
          />
          <div className=" col-span-9 max-md:hidden top-right flex items-center min-w-[90%] justify-between">
            <ul className="flex gap-5">
              {["Features", "Pricing", "Resources"].map((li) => (
                <li
                  key={li}
                  className="cursor-pointer text-[16px] font-bold hover:text-Very-dark-vio"
                >
                  {li}
                </li>
              ))}
            </ul>
            <div className="font-bold text-[16px]">
              <button
                className=" px-7 py-2 rounded-4xl cursor-pointer "
                type="button"
              >
                Login
              </button>
              <Button text="Sign Up" />
            </div>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMobilemenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <svg
              width="30"
              height="20"
              viewBox="0 0 30 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 2H30" stroke="black" strokeWidth="2" />
              <path d="M0 10H30" stroke="black" strokeWidth="2" />
              <path d="M0 18H30" stroke="black" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <div className="flex overflow-hidden max-md:flex-col-reverse items-center pb-12 justify-between">
          <div className="left sm:max-md:pl-10 md:text-left md:w-1/2 pl-5 md:pl-10 lg:pl-24 flex flex-col text-center md:items-start items-center justify-center">
            <h1 className=" font-bold text-Very-dark-vio text-4xl md:text-[42px] lg:text-5xl/15 xl:text-6xl/18 max-md:mt-3">
              More than just shorter links
            </h1>
            <p className="mt-3.5">
              Build your brand’s recognition and get detailed insights on how
              your links are performing.
            </p>
            <Button cls="mt-7" />
          </div>
          {mobileMenuOpen ? (
            <Mobilemenu />
          ) : (
            <img
              src="/assets/images/illustration-working.svg"
              alt="illustration working"
              className="-mr-10 sm:w-1/2"
            />
          )}
        </div>
      </header>
      <div className="bg-Grayy px-5 sm:px-10 md:px-16 lg:px-24 ">
        <form
          onSubmit={handleSubmit}
          className="shortener p-5  flex flex-col sm:flex-row gap-5 -mt-15 rounded-md items-center justify-center w-full bg-[url(/assets/images/bg-shorten-desktop.svg)] max-sm:bg-[url(/assets/images/bg-shorten-mobile.svg)] bg-Very-dark-blue"
        >
          <div className="flex flex-col sm:w-[70%] w-full">
            <input
              type="url"
              onChange={handleInputChange}

              required
              placeholder="shorten a link here..."
              value={input}
              className={`w-full bg-white px-5 p-2 md:py-4 rounded-sm outline-0 focus:ring-0 focus:border-0 ${
                inputError ? "border-2 border-Red " : ""
              }`}
            />
            {inputError ? (
              <p className="text-Red text-sm mt-0.5 -mb-5">{inputError}</p>
            ) : (
              <></>
            )}
          </div>

          <button className="bg-Cyan cursor-pointer w-full sm:w-[30%] p-2 md:py-4 px-5 rounded-sm text-white">
            Shorten It!
          </button>
        </form>
        <div className="flex flex-col gap-5 mt-5 mb-24 ">
          {shortenedLinks.map((link) => (
            <ShortenedLink key={link.link} data={link} />
          ))}
        </div>
        <div className="text-center ">
          <div className="mb-24">
            <h2 className="text-2xl font-bold text-Very-dark-vio">
              Advanced Statistics
            </h2>
            <p className="mt-4">
              Track how your links are performing across the web <br /> with our
              advanced statistics dashboard.
            </p>
          </div>
          <div className="relative">
            <div className="line absolute top-2/5 w-full bg-Cyan h-2 max-md:h-full max-md:w-2 max-md:top-0 max-md:left-[49.25%]"></div>
            <div className="features bg-transparent grid items-start justify-center min-md:grid-cols-3 gap-18 mb-24">
              <Feature
                title="Brand Recognition"
                body="Boost your brand recognition with each click. Generic links
                don’t mean a thing. Branded links help instil confidence in your
                content."
                alt="icon-brand-recognition"
              />
              <Feature
                title="Detailed Records"
                body="Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions."
                alt="icon-detailed-records"
                cls="md:mt-10"
              />
              <Feature
                title="Fully Customizable"
                body="Improve brand awareness and content discoverability through customizable links, supercharging audience engagement."
                alt="icon-fully-customizable"
                cls="md:mt-20"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="boost w-full bg-[url(/assets/images/bg-boost-desktop.svg)] max-sm:bg-[url(/assets/images/bg-boost-mobile.svg)] bg-cover bg-no-repeat min-h-20  bg-Very-dark-blue flex flex-col items-center justify-center gap-3 px-5 py-15 ">
        <h3 className="text-2xl text-center font-bold text-white">
          Boost your links today
        </h3>
        <Button cls="mt-3" />
      </div>
      <div className="bg-Very-dark-vio p-10 md:py-18 flex flex-col gap-8 lg:flex-row ">
        <h3 className="text-3xl max-md:text-center text-white font-bold lg:w-[30%]">
          Shortly
        </h3>
        <div className="grid gap-8 items-center md:items-start lg:w-[50%] justify-center md:grid-cols-3 ">
          <FooterMenu
            title="Features"
            items="Link Shortening, Branded Links, Analytics"
          />
          <FooterMenu title="Resources" items="Blog, Developers, Support" />
          <FooterMenu
            title="Company"
            items="About, Our Team, Careers, Contact"
          />
        </div>
        <div className="flex gap-4 lg:w-[20%] max-md:self-center ">
          {["facebook", "twitter", "pinterest", "instagram"].map((item) => (
            <MySvg id={item} key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
