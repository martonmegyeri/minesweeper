import styles from './App.module.scss';
import Footer from './components/Footer';
import Game from './components/Game';
import Home from './components/Home';
import Settings from './components/Settings';
import Toasts from './components/Toast/Toasts';
import { Screen, useApp } from './stores/app';

export default function App() {
  const screen = useApp(state => state.screen);

  return (
    <div className={styles.app}>
      <Toasts />
      <Settings />
      {screen === Screen.Game && <Game />}
      {screen === Screen.Home && <Home />}
      <Footer />
    </div>
  );
}
