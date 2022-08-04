import { FC } from 'react';

import { GSIMap } from '../gsi/GSIMap';
import { CityLayer } from './CityLayer';
import { MapProps } from '../definitions';
import { PostOfficeLayer } from './PostOfficeLayer';

const PostOfficeMap: FC<MapProps> = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GSIMap {...props}>
    <CityLayer />
    <PostOfficeLayer />
  </GSIMap>
);

export default PostOfficeMap;
