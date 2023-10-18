import { colors } from './colors';
import { fontSizes } from './fontSizes';
import { fontWeights } from './fontWeights';
import { lineHeights } from './lineHeights';

export const theme = {
  colors,
  fontWeights,
  fontSizes,
  lineHeights,
};

type PickAnyValue<T> = T & Record<string, any>;

export type Theme = {
  colors: PickAnyValue<(typeof theme)['colors']>;
  fontWeights: PickAnyValue<(typeof theme)['fontWeights']>;
  lineHeights: PickAnyValue<(typeof theme)['lineHeights']>;
  fontSizes: PickAnyValue<(typeof theme)['fontSizes']>;
};
