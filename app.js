const React = require('react');
const ReactDOMServer = require('react-dom/server');

function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

function App() {
  return <Greeting name="world" />;
}

console.log(ReactDOMServer.renderToString(<App />));