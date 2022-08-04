import { FC, useContext, useEffect } from 'react';

import { FeatureLike } from 'ol/Feature';
import { VectorTile as VectorTileLayer } from 'ol/layer';
import { VectorTile as VectorTileSource } from 'ol/source';
import { Circle, Fill, Icon, Stroke, Text } from 'ol/style';
import Style from 'ol/style/Style';
import GeoJSON from 'ol/format/GeoJSON';

import {
  EPSG_WEB_MERCATOR,
  SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION,
} from '../definitions';
import { MapContext } from '../openlayers/OlMap';

const POST_OFFICE_LAYER_URL =
  'http://localhost:8080/tiled_post_offices/{z}/{x}/{y}';
const POST_OFFICE_LAYER_Z_INDEX = 20;

const postOfficeStyleText = (
  feature: FeatureLike,
  fontSize: number,
  labelOffsetY: number,
  labelFillColor: string,
  labelStrokeColor: string,
): Text =>
  new Text({
    font: `${fontSize}px "Noto Sans JP","Hiragino Kaku Gothic ProN",Meiryo,sans-serif`,
    overflow: true,
    text: feature.get('name') as string,
    textAlign: 'center',
    justify: 'center',
    textBaseline: 'top',
    offsetY: labelOffsetY,
    fill: new Fill({
      color: labelFillColor,
    }),
    stroke: new Stroke({
      color: labelStrokeColor,
      width: 4,
    }),
  });

const postOfficeBaseStyle = (
  feature: FeatureLike,
  imageSrc: string,
  imageScale: number,
  circleRadius: number,
  circleFillColor: string,
  fontSize: number,
  labelOffsetY: number,
  labelFillColor: string,
  labelStrokeColor: string,
) => [
  new Style({
    image: new Circle({
      fill: new Fill({
        color: circleFillColor,
      }),
      radius: circleRadius,
    }),
  }),
  new Style({
    image: new Icon({
      scale: imageScale,
      src: imageSrc,
      declutterMode: 'obstacle',
    }),
    text: postOfficeStyleText(
      feature,
      fontSize,
      labelOffsetY,
      labelFillColor,
      labelStrokeColor,
    ),
  }),
];

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

export const postOfficeSelectedStyle = (feature: FeatureLike) =>
  postOfficeBaseStyle(
    feature,
    'images/map/post_office_selected.svg',
    0.5,
    14,
    'rgba(255, 255, 224, 1.0)',
    12,
    12,
    '#ffffe0',
    '#009944',
  );

// eslint-disable-next-line import/prefer-default-export
export const PostOfficeLayer: FC = () => {
  const map = useContext(MapContext);

  useEffect(() => {
    if (!map) return undefined;

    const source = new VectorTileSource({
      url: POST_OFFICE_LAYER_URL,
      format: new GeoJSON({
        dataProjection: EPSG_WEB_MERCATOR,
      }),
    });
    const layer = new VectorTileLayer({
      renderMode: 'vector',
      source,
      style: postOfficeStyle,
      zIndex: POST_OFFICE_LAYER_Z_INDEX,
      maxResolution: SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION,
    });
    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map]);

  return null;
};
