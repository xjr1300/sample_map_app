import { FC } from 'react';

import { GSIMap } from '../gsi/GSIMap';
import { CityLayer } from './CityLayer';
import { MapProps } from '../definitions';

const PostOfficeMap: FC<MapProps> = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GSIMap {...props}>
    <CityLayer />
  </GSIMap>
);

export default PostOfficeMap;
