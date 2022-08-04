import { ReactNode } from 'react';

import { Map } from 'ol';
import BaseLayer from 'ol/layer/Base';

export const EPSG_WEB_MERCATOR = 'EPSG:3857';

export const SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION = 30;

export type MapProps = {
  style?: React.CSSProperties;
  children?: ReactNode;
  center?: number[];
  zoom?: number;
};

// レイヤに属性として識別子を追加するキー
export const LAYER_IDENTIFY_KEY = 'layerIdentify';
// 郵便局レイヤの識別子
export const POST_OFFICE_LAYER_IDENTIFY = 'postOffice';

/**
 * マップに追加されているレイヤのうち、属性として追加した識別子が一致するレイヤを検索する。
 * @param map マップ。
 * @param identify 検索するレイヤの識別子。
 * @returns レイヤ。レイヤが見つからなかった場合はundefined。
 */
export const findLayerByIdentify = (
  map: Map,
  identify: string,
): BaseLayer | undefined => {
  const layers = map.getLayers().getArray();

  return layers.find((layer) => {
    const keys = layer.getKeys();
    if (!keys.includes(LAYER_IDENTIFY_KEY)) return false;

    return identify === (layer.get(LAYER_IDENTIFY_KEY) as string);
  });
};
