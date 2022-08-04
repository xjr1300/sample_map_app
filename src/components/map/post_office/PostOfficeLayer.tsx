import { FC, useContext, useEffect } from 'react';

import { FeatureLike } from 'ol/Feature';
import { VectorTile as VectorTileLayer } from 'ol/layer';
import { VectorTile as VectorTileSource } from 'ol/source';

import {
  LAYER_IDENTIFY_KEY,
  POST_OFFICE_LAYER_IDENTIFY,
  SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION,
} from '../definitions';
import { MapContext } from '../openlayers/OlMap';
import { postOfficeBaseStyle } from './post_office_styles';

export const POST_OFFICE_LAYER_URL =
  'http://localhost:8080/tiled_post_offices/{z}/{x}/{y}';
const POST_OFFICE_LAYER_Z_INDEX = 20;

const postOfficeStyle = (feature: FeatureLike) =>
  postOfficeBaseStyle(
    feature,
    'images/map/post_office.svg',
    0.4,
    12,
    'rgba(255, 255, 255, 0.75)',
    12,
    12,
    'black',
    'white',
  );

type Props = {
  source?: VectorTileSource;
};

// eslint-disable-next-line import/prefer-default-export
export const PostOfficeLayer: FC<Props> = ({ source }) => {
  const map = useContext(MapContext);

  useEffect(() => {
    if (!map) return undefined;

    const layer = new VectorTileLayer({
      source,
      style: postOfficeStyle,
      zIndex: POST_OFFICE_LAYER_Z_INDEX,
      maxResolution: SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION,
    });
    layer.set(LAYER_IDENTIFY_KEY, POST_OFFICE_LAYER_IDENTIFY);
    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, source]);

  return null;
};

PostOfficeLayer.defaultProps = {
  source: undefined,
};
