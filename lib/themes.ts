// Colour variants. Token values live in app/globals.css under :root[data-theme='…'].

export const themes = [
  { id: 'blue', label: 'Midnight Blue', swatch: ['#60A5FA', '#1D4ED8'] },
  { id: 'orange', label: 'Sunset Orange', swatch: ['#FDBA74', '#EA580C'] },
  { id: 'emerald', label: 'Emerald', swatch: ['#6EE7B7', '#047857'] },
] as const;

export type ThemeId = (typeof themes)[number]['id'];

export const DEFAULT_THEME: ThemeId = 'blue';
export const THEME_STORAGE_KEY = 'kda-theme';

/** Runs before first paint so a saved theme never flashes the default colours. */
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t&&t!=='${DEFAULT_THEME}'&&['orange','emerald'].indexOf(t)>-1)document.documentElement.setAttribute('data-theme',t)}catch(e){}`;
