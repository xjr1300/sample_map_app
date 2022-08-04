import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { VectorTile as VectorTileLayer } from 'ol/layer';
import { Feature, MapBrowserEvent, Overlay } from 'ol';
import BaseEvent from 'ol/events/Event';

import styled from 'styled-components';

import { Point } from 'ol/geom';
import { toStringHDMS } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';
import {
  findLayerByIdentify,
  cityDictionary,
  POST_OFFICE_LAYER_IDENTIFY,
  facilityCategoryDictionary,
  facilitySubcategoryDictionary,
  postOfficeClassDictionary,
} from '../definitions';
import { MapContext } from '../openlayers/OlMap';

const PopupDiv = styled.div`
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 23px;
  left: -51px;
  min-width: 280px;
  &:after,
  &:before {
    top: 100%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  &:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
`;

const CloserAnchor = styled.a`
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
  &:after {
    content: '✖';
  }
`;

type Props = {
  feature?: Feature;
};

const PostOfficeContent: FC<Props> = ({ feature }) => {
  const cityDict = useMemo(() => cityDictionary(), []);
  const facilityCategoryDict = useMemo(() => facilityCategoryDictionary(), []);
  const facilitySubcategoryDict = useMemo(
    () => facilitySubcategoryDictionary(),
    [],
  );
  const postOfficeClassDict = useMemo(() => postOfficeClassDictionary(), []);

  const cityName = cityDict.get(feature?.get('city_code') as string) as string;
  const address = `岐阜県${cityName}${feature?.get('address') as string}`;
  const categoryName = facilityCategoryDict.get(
    feature?.get('category_code') as string,
  ) as string;
  const subcategoryName = facilitySubcategoryDict.get(
    feature?.get('subcategory_code') as string,
  ) as string;
  const postOfficeClassName = postOfficeClassDict.get(
    feature?.get('post_office_code') as string,
  ) as string;
  const point = feature?.getGeometry() as Point;
  const coordinate = point.getCoordinates();
  const hdms = toStringHDMS(toLonLat(coordinate));

  return (
    <div>
      <div>{feature?.get('name') as string}</div>
      <div>{categoryName}</div>
      <div>{subcategoryName}</div>
      <div>{postOfficeClassName}</div>
      <div>{address}</div>
      <div>{hdms}</div>
    </div>
  );
};

PostOfficeContent.defaultProps = {
  feature: undefined,
};

// eslint-disable-next-line import/prefer-default-export
export const PostOfficeOverlay: FC = () => {
  const map = useContext(MapContext);
  const [overlay, setOverlay] = useState<Overlay>();
  const [feature, setFeature] = useState<Feature>();
  const refPopup = useRef<HTMLDivElement>(null);
  const refCloser = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!map) return undefined;

    const initialOverlay = new Overlay({
      element: refPopup.current as HTMLDivElement,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });
    map.addOverlay(initialOverlay);

    const popupOverlay = (event: Event | BaseEvent) => {
      const evt = event as MapBrowserEvent<UIEvent>;

      const foundPostOfficeLayer = findLayerByIdentify(
        evt.map,
        POST_OFFICE_LAYER_IDENTIFY,
      );
      if (!foundPostOfficeLayer) return;
      const postOfficeLayer = foundPostOfficeLayer as VectorTileLayer;

      void postOfficeLayer.getFeatures(evt.pixel).then((foundFeatures) => {
        if (!foundFeatures.length) {
          setFeature(undefined);
          initialOverlay.setPosition(undefined);
        } else {
          setFeature(foundFeatures[0]);
          initialOverlay.setPosition(evt.coordinate);
        }
      });
    };

    map.on('singleclick', popupOverlay);

    setOverlay(initialOverlay);

    return () => {
      map.removeOverlay(initialOverlay);
      map.un('singleclick', popupOverlay);
    };
  }, [map]);

  const onCloserClicked = () => {
    overlay?.setPosition(undefined);
    refCloser.current?.blur();

    // falseを返却して、Anchor要素のブラウザ既定動作をキャンセル
    return false;
  };

  return (
    <PopupDiv ref={refPopup}>
      <CloserAnchor href="#" onClick={onCloserClicked} ref={refCloser} />
      {feature && <PostOfficeContent feature={feature} />}
    </PopupDiv>
  );
};
