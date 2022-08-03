import { FC, ReactNode } from 'react';

import { OlMap } from '../openlayers/OlMap';
import GSILayerSelector from './GSILayerSelector';
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
}) => (
  <>
    <GSILayerSelector />
    <OlMap style={mapStyle} center={center} zoom={zoom}>
      {children}
      <GSIStandardLayer options={{ visible: false }} />
      <GSIPaleLayer options={{ visible: false }} />
      <GSIBlankLayer options={{ visible: false }} />
      <GSIPhotoLayer options={{ visible: true }} />
    </OlMap>
  </>
);

GSIMap.defaultProps = {
  children: undefined,
  center: undefined,
  zoom: undefined,
};

export default GSIMap;
