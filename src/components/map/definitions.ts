import { ReactNode } from 'react';

export const EPSG_WEB_MERCATOR = 'EPSG:3857';

export type MapProps = {
  style?: React.CSSProperties;
  children?: ReactNode;
  center?: number[];
  zoom?: number;
};
