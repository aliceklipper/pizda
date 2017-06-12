import ReactDOM from 'react-dom';
import offline from 'offline-plugin/runtime';

import App from './components/App';

(async () => {
    offline.install();

    ReactDOM.render(<App />, document.querySelector('#mount'));
})();
