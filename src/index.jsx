import ReactDOM from 'react-dom';

import App from './components/App';

async function main() {
    ReactDOM.render(<App />, document.querySelector('#mount'));
}

main();
