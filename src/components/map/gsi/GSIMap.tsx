import { FC, ReactNode, useState } from 'react';

import { RadioChangeEvent } from 'antd';
import { OlMap } from './openlayers/OlMap';
import GSILayerSelector, { GSILayerName } from './GSILayerSelector';
import {
  GSIBlankLayer,
  GSIPaleLayer,
  GSIPhotoLayer,
  GSIStandardLayer,
} from './GSILayers';

import 'ol/ol.css';

type Props = {
  children?: ReactNode;
  center?: number[];
  zoom?: number;
};

const mapStyle = { height: '100vh', width: '100%', paddingBottom: '2rem' };

// 国土地理院マップコンポーネント
export const GSIMap: FC<Props> = ({
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
  center: undefined,
  zoom: undefined,
};

export default GSIMap;
