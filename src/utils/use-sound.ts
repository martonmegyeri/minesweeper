import { useSettings } from '~/stores/settings';

type UseSoundOptions = {
  volume?: number;
};

/**
 * Plays sound files from the `src/assets/sounds` directory.
 */
export default function useSound(filePath: string, { volume = 1 }: UseSoundOptions = {}) {
  const soundsEnabled = useSettings.getState();
  if (!soundsEnabled) {
    return {
      play: () => {},
    };
  }

  const audio = new Audio(filePath);
  audio.volume = volume;

  return {
    play: audio.play.bind(audio),
  };
}
