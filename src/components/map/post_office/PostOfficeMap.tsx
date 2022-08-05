import { FC, useMemo } from 'react';

import { VectorTile as VectorTileSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';

import { GSIMap } from '../gsi/GSIMap';
import { CityLayer } from './CityLayer';
import { EPSG_WEB_MERCATOR, MapProps } from '../definitions';
import { PostOfficeLayer, POST_OFFICE_LAYER_URL } from './PostOfficeLayer';
import { PostOfficeSelectedLayer } from './PostOfficeSelectedLayer';
import { PostOfficeOverlay } from './PostOfficeOverlay';
import { PrefectureLayer } from './PrefectureLayer';

const PostOfficeMap: FC<MapProps> = (props) => {
  const postOfficeSource = useMemo(
    () =>
      new VectorTileSource({
        url: POST_OFFICE_LAYER_URL,
        format: new GeoJSON({
          dataProjection: EPSG_WEB_MERCATOR,
        }),
      }),
    [],
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <GSIMap {...props}>
      <PrefectureLayer />
      <CityLayer />
      <PostOfficeLayer source={postOfficeSource} />
      <PostOfficeSelectedLayer source={postOfficeSource} />
      <PostOfficeOverlay />
    </GSIMap>
  );
};

export default PostOfficeMap;
