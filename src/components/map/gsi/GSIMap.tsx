import { FC, useState } from 'react';

import { RadioChangeEvent } from 'antd';
import { MapProps } from '../definitions';
import { OlMap } from '../openlayers/OlMap';
import GSILayerSelector, { GSILayerName } from './GSILayerSelector';
import {
  GSIBlankLayer,
  GSIPaleLayer,
  GSIPhotoLayer,
  GSIStandardLayer,
} from './GSILayers';

import 'ol/ol.css';

const mapStyle = { height: '100vh', width: '100%', paddingBottom: '2rem' };

// 国土地理院マップコンポーネント
export const GSIMap: FC<MapProps> = ({
  children = undefined,
  center = undefined,
  zoom = undefined,
}) => {
  const [visibleLayer, setVisibleLayer] = useState<GSILayerName>('pale');

  const onLayerChanged = (e: RadioChangeEvent) => {
    setVisibleLayer(e.target.value as GSILayerName);
  };

  return (
    <>
      <GSILayerSelector layer={visibleLayer} onLayerChanged={onLayerChanged} />
      <OlMap style={mapStyle} center={center} zoom={zoom}>
        {children}
        <GSIStandardLayer options={{ visible: visibleLayer === 'standard' }} />
        <GSIPaleLayer options={{ visible: visibleLayer === 'pale' }} />
        <GSIBlankLayer options={{ visible: visibleLayer === 'blank' }} />
        <GSIPhotoLayer options={{ visible: visibleLayer === 'photo' }} />
      </OlMap>
    </>
  );
};

GSIMap.defaultProps = {
  children: undefined,
};

export default GSIMap;
