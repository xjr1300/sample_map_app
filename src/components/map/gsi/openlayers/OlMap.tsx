import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Map as InnerMap, View } from 'ol';
import { defaults as defaultControls } from 'ol/control';

import { NullableHTMLDivElement } from '../../../../types';

import 'ol/ol.css';

type OptionalMap = InnerMap | undefined;

// マップコンテキスト
export const MapContext = createContext<OptionalMap>(undefined);

type Props = {
  style: React.CSSProperties;
  children?: ReactNode;
  center?: number[];
  zoom?: number;
};

export const OlMap: FC<Props> = ({
  style = { height: '100vh', width: '100%' },
  children = undefined,
  center = undefined,
  zoom = undefined,
}) => {
  const mapRef = useRef<NullableHTMLDivElement>(null);
  const [map, setMap] = useState<OptionalMap>(undefined);

  useEffect(() => {
    const initialMap = new InnerMap({
      target: mapRef.current as HTMLDivElement,
      view: new View({
        projection: 'EPSG:3857',
        maxZoom: 18,
      }),
      controls: defaultControls({
        attributionOptions: { collapsible: false },
      }),
    });
    setMap(initialMap);

    return () => initialMap.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
  }, [map, center]);

  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom as number);
  }, [map, zoom]);

  return (
    <MapContext.Provider value={map}>
      <div ref={mapRef} className="ol-map" style={style}>
        {children}
      </div>
    </MapContext.Provider>
  );
};

OlMap.defaultProps = {
  children: undefined,
  center: undefined,
  zoom: undefined,
};
