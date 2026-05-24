import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #121214;
    background-image:
      radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px),
      radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px),
      radial-gradient(ellipse 120% 60% at 50% -10%, rgba(0, 179, 126, 0.07) 0%, transparent 60%);
    background-size: 55px 55px, 85px 85px, 100% 100%;
    background-position: 0 0, 27px 27px, 0 0;
    background-attachment: fixed;
    color: #E1E1E6;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  #root {
    width: 100%;
    margin: 0 auto;
    padding: 0 16px 40px;

    @media (min-width: 640px) {
      padding: 0 24px 48px;
    }

    @media (min-width: 1024px) {
      max-width: 960px;
      padding: 0 32px 56px;
    }

    @media (min-width: 1280px) {
      max-width: 1200px;
    }

    @media (min-width: 1536px) {
      max-width: 1440px;
    }
  }

  button {
    cursor: pointer;
  }
`;
