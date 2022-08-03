import { FC, useContext, useEffect } from 'react';

import { Tile as TileLayer } from 'ol/layer';
import { Options } from 'ol/layer/BaseTile';
import TileSourceType from 'ol/source/Tile';
import { XYZ } from 'ol/source';

import { MapContext } from '../openlayers/OlMap';
import { EPSG_WEB_MERCATOR } from '../constants';

type BaseProps = {
  url?: string;
  options?: Options<TileSourceType>;
};

const ATTRIBUTION =
  "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>";

const GSI_STANDARD_LAYER_URL =
  'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png';
const GSI_PALE_LAYER_URL =
  'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png';
const GSI_BLANK_LAYER_URL =
  'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png';
const GSI_PHOTO_LAYER_URL =
  'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg';

const GSILayer: FC<BaseProps> = ({ url, options }) => {
  const map = useContext(MapContext);

  useEffect(() => {
    if (!map) return undefined;
    const source = new XYZ({
      attributions: ATTRIBUTION,
      url,
      projection: EPSG_WEB_MERCATOR,
    });
    const localOptions = {
      ...options,
      source,
    };
    const layer = new TileLayer(localOptions);
    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, url, options]);

  return null;
};

GSILayer.defaultProps = {
  url: undefined,
  options: undefined,
};

type Props = {
  options?: Options<TileSourceType>;
};

export const GSIStandardLayer: FC<Props> = ({ options }) => {
  const props = {
    url: GSI_STANDARD_LAYER_URL,
    options,
  };

  return <GSILayer url={props.url} options={props.options} />;
};

GSIStandardLayer.defaultProps = {
  options: undefined,
};

export const GSIPaleLayer: FC<Props> = ({ options }) => {
  const props = {
    url: GSI_PALE_LAYER_URL,
    options,
  };

  return <GSILayer url={props.url} options={props.options} />;
};

GSIPaleLayer.defaultProps = {
  options: undefined,
};

export const GSIBlankLayer: FC<Props> = ({ options }) => {
  const props = {
    url: GSI_BLANK_LAYER_URL,
    options,
  };

  return <GSILayer url={props.url} options={props.options} />;
};

GSIBlankLayer.defaultProps = {
  options: undefined,
};

export const GSIPhotoLayer: FC<Props> = ({ options }) => {
  const props = {
    url: GSI_PHOTO_LAYER_URL,
    options,
  };

  return <GSILayer url={props.url} options={props.options} />;
};

GSIPhotoLayer.defaultProps = {
  options: undefined,
};
