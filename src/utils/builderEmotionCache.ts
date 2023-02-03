import createCache from '@emotion/cache';

export const buildEmotionCache = () => {
  return createCache({ key: 'css', });
};
