import { FC, useContext, useEffect } from 'react';

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Stroke, Fill, Text } from 'ol/style';
import { FeatureLike } from 'ol/Feature';
import Style, { StyleFunction } from 'ol/style/Style';
import GeoJSON from 'ol/format/GeoJSON';

import { MapContext } from '../openlayers/OlMap';
import { ATTRIBUTION } from '../gsi/GSILayers';
import {
  EPSG_WEB_MERCATOR,
  SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION,
} from '../definitions';

const CITY_LAYER_URL = 'http://localhost:8080/cities';
const CITY_LAYER_Z_INDEX = 10;
const CITY_LABEL_FONT =
  '12px "Noto Sans JP","Hiragino Kaku Gothic ProN",Meiryo,sans-serif';
const CITY_FILL_COLOR = 'rgba(128, 128, 128, 0.3)';

const cityStyleStroke = (): Stroke =>
  new Stroke({
    color: '#666',
    lineCap: 'round',
    lineJoin: 'round',
    lineDash: [30, 10, 1, 10],
    width: 3,
  });

const cityStyleFill = (resolution: number): Fill | undefined =>
  resolution > SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION
    ? new Fill({
        color: CITY_FILL_COLOR,
      })
    : undefined;

const cityLabelText = (
  feature: FeatureLike,
  resolution: number,
): string | undefined => {
  if (SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION < resolution) {
    return feature.get('name') as string;
  }

  return undefined;
};

const cityStyleText = (feature: FeatureLike, resolution: number): Text =>
  new Text({
    font: CITY_LABEL_FONT,
    overflow: true,
    text: cityLabelText(feature, resolution),
    fill: new Fill({
      color: 'black',
    }),
    stroke: new Stroke({
      color: 'white',
      width: 4,
    }),
  });

const cityStyle: StyleFunction = (feature: FeatureLike, resolution: number) =>
  new Style({
    stroke: cityStyleStroke(),
    fill: cityStyleFill(resolution),
    text: cityStyleText(feature, resolution),
  });

// eslint-disable-next-line import/prefer-default-export
export const CityLayer: FC = () => {
  const map = useContext(MapContext);

  useEffect(() => {
    if (!map) return undefined;
    const source = new VectorSource({
      attributions: ATTRIBUTION,
      url: CITY_LAYER_URL,
      format: new GeoJSON({
        dataProjection: EPSG_WEB_MERCATOR,
      }),
    });
    const layer = new VectorLayer({
      source,
      style: cityStyle,
      zIndex: CITY_LAYER_Z_INDEX,
    });
    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map]);

  return null;
};
