import { SET_THEME, SET_3D } from './types';


export const setTheme = (theme) => {
  const classList = [];

  // Remove all classes and save that which is not a theme class
  for (let i = 0; i < document.body.classList.length; i++) {
    const item = document.body.classList[i];
    if (!item.match(/^theme-/)) {
      classList.push(item);
      i--;
    }
    document.body.classList.remove(item);
  }

  // Add theme class
  classList.push(`theme-${theme.toLowerCase()}`);

  // Add midified classlist to body
  classList.forEach(item => {
    document.body.classList.add(item);
  });

  return {
    type: SET_THEME,
    payload: theme
  };
};


export const set3D = (payload) => ({
  type: SET_3D,
  payload
});
