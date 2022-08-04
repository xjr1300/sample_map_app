import { ReactNode } from 'react';

export const EPSG_WEB_MERCATOR = 'EPSG:3857';

export const SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION = 30;

export type MapProps = {
  style?: React.CSSProperties;
  children?: ReactNode;
  center?: number[];
  zoom?: number;
};
