import { useEffect } from 'react';
import { Screen, useApp } from '~/stores/app';
import Page from '../Page';

export default function ResetScreen() {
  const goToScreen = useApp(state => state.goToScreen);

  useEffect(() => {
    goToScreen(Screen.Game);
  }, []);

  return <Page>{null}</Page>;
}
