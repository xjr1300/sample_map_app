import { FC, useContext, useEffect } from 'react';

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Stroke } from 'ol/style';
import Style, { StyleFunction } from 'ol/style/Style';
import GeoJSON from 'ol/format/GeoJSON';

import { MapContext } from '../openlayers/OlMap';
import { ATTRIBUTION } from '../gsi/GSILayers';
import { EPSG_WEB_MERCATOR } from '../definitions';

const PREFECTURE_LAYER_URL = 'http://localhost:8080/prefectures';
const PREFECTURE_LAYER_Z_INDEX = 20;

const prefectureStyleStroke = (): Stroke =>
  new Stroke({
    color: '#cd5c5c',
    lineCap: 'round',
    lineJoin: 'round',
    width: 5,
  });

const prefectureStyle: StyleFunction = () =>
  new Style({
    stroke: prefectureStyleStroke(),
  });

// eslint-disable-next-line import/prefer-default-export
export const PrefectureLayer: FC = () => {
  const map = useContext(MapContext);

  useEffect(() => {
    if (!map) return undefined;
    const source = new VectorSource({
      attributions: ATTRIBUTION,
      url: PREFECTURE_LAYER_URL,
      format: new GeoJSON({
        dataProjection: EPSG_WEB_MERCATOR,
      }),
    });
    const layer = new VectorLayer({
      source,
      style: prefectureStyle,
      zIndex: PREFECTURE_LAYER_Z_INDEX,
    });
    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map]);

  return null;
};
