import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,500;7..72,700&family=Space+Grotesk:wght@400;500;700&display=swap');

  :root {
    color-scheme: light;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: 'Space Grotesk', sans-serif;
    background:
      radial-gradient(circle at top left, rgba(239, 108, 62, 0.18), transparent 28%),
      radial-gradient(circle at top right, rgba(109, 143, 114, 0.18), transparent 24%),
      linear-gradient(180deg, #fff9f1 0%, #f6efe6 45%, #efe3d4 100%);
    color: ${({ theme }) => theme.colors.ink};
    min-height: 100vh;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(rgba(16, 35, 58, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 35, 58, 0.03) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.65), transparent);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }

  h1, h2, h3, h4 {
    font-family: 'Literata', serif;
    margin: 0;
    letter-spacing: -0.03em;
  }

  p {
    margin: 0;
  }
`;