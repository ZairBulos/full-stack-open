import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

import { reducer, StateProvider } from "./state";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>,
);