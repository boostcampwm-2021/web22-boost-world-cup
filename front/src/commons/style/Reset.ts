import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html,
  body,
  div,
  span,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  a,
  img,
  strong,
  ol,
  ul,
  li,
  form,
  label,
  legend,
  table,
  tr,
  th,
  td,
  article,
  canvas,
  details,
  embed,
  footer,
  header,
  menu,
  nav,
  section,
  summary,
  audio,
  video,
  button,
  hr {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input:focus,
  select:focus {
    outline: none;
  }
  li {
    list-style-type: none;
  }
`;
