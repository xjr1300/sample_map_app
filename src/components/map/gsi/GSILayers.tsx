import { Tile as TileLayer } from 'ol/layer';
import { Options } from 'ol/layer/BaseTile';
import { FC, useContext, useEffect } from 'react';
import TileSourceType from 'ol/source/Tile';
import { XYZ } from 'ol/source';

import { MapContext } from '../openlayers/OlMap';

type BaseProps = {
  url?: string;
  options?: Options<TileSourceType>;
};

const GSILayer: FC<BaseProps> = ({ url, options }) => {
  const map = useContext(MapContext);

  useEffect(() => {
    if (!map) return undefined;
    const source = new XYZ({
      attributions:
        "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
      url,
      projection: 'EPSG:3857',
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

// eslint-disable-next-line import/prefer-default-export
export const GSIStandardLayer: FC<Props> = ({ options }) => {
  const props = {
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
    options,
  };

  return <GSILayer url={props.url} options={props.options} />;
};

GSIStandardLayer.defaultProps = {
  options: undefined,
};

export const GSIPaleLayer: FC<Props> = ({ options }) => {
  const props = {
    url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
    options,
  };

  return <GSILayer url={props.url} options={props.options} />;
};

GSIPaleLayer.defaultProps = {
  options: undefined,
};

export const GSIBlankLayer: FC<Props> = ({ options }) => {
  const props = {
    url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
    options,
  };

  return <GSILayer url={props.url} options={props.options} />;
};

GSIBlankLayer.defaultProps = {
  options: undefined,
};

export const GSIPhotoLayer: FC<Props> = ({ options }) => {
  const props = {
    url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
    options,
  };

  return <GSILayer url={props.url} options={props.options} />;
};

GSIPhotoLayer.defaultProps = {
  options: undefined,
};
