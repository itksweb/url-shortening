# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
- The `input` field is empty

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [solution URL](https://github.com/itksweb/url-shortening)
- Live Site URL: [live site URL](https://url-shortening-api-puce.vercel.app/)

## My process

### Built with

- [React](https://reactjs.org) - JS library
- [Tailwind CSS](https://tailwindcss.com) 
- [Vite](https://vite.dev)

### What I learned

```js
const handleCopy = () => {
  setCopied(shortened);
  navigator.clipboard.writeText(shortened);
  setTimeout(() => setCopied(""), 3000);
};
```

```js
const UseScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return screenWidth;
};
```

### Useful resources

## Author

- WhatsApp - [here](https://wa.me/2348060719978)
- LinkedIn - [here](https://www.linkedin.com/in/kingsleyikpefan)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/itksweb)
