import { AnimatePresence } from 'framer-motion';
import Game from './components/Game';
import Home from './components/Home';
import Settings from './components/Settings';
import Toasts from './components/Toast/Toasts';
import { Screen, useApp } from './stores/app';

export default function App() {
  const screen = useApp(state => state.screen);
  const route = {
    [Screen.Home]: <Home key="home" />,
    [Screen.Game]: <Game key="game" />,
  }[screen];

  return (
    <>
      <Toasts />
      <Settings />
      <AnimatePresence mode="wait">{route}</AnimatePresence>
    </>
  );
}
