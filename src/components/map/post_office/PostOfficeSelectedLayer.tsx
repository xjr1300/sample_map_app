import { FC, useCallback, useContext, useEffect, useState } from 'react';

import { VectorTile as VectorTileSource } from 'ol/source';
import { VectorTile as VectorTileLayer } from 'ol/layer';
import { FeatureLike } from 'ol/Feature';

import BaseEvent from 'ol/events/Event';
import { MapBrowserEvent } from 'ol';
import { Style } from 'ol/style';
import { postOfficeBaseStyle } from './post_office_styles';
import { MapContext } from '../openlayers/OlMap';
import {
  findLayerByIdentify,
  POST_OFFICE_LAYER_IDENTIFY,
  SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION,
} from '../definitions';

const POST_OFFICE_SELECTED_LAYER_Z_INDEX = 21;

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

type Props = {
  source?: VectorTileSource;
};

export const PostOfficeSelectedLayer: FC<Props> = ({ source }) => {
  const map = useContext(MapContext);
  const [selectedPostOfficeId, setSelectedPostOfficeId] = useState<
    string | undefined
  >(undefined);

  const postOfficeSelectedStyleFunc = useCallback(
    (feature: FeatureLike): Style[] | undefined => {
      if ((feature.getId() as string) === selectedPostOfficeId) {
        return postOfficeSelectedStyle(feature);
      }

      return undefined;
    },
    [selectedPostOfficeId],
  );

  useEffect(() => {
    if (!map) return undefined;
    const layer = new VectorTileLayer({
      renderMode: 'vector',
      source,
      style: postOfficeSelectedStyleFunc,
      zIndex: POST_OFFICE_SELECTED_LAYER_Z_INDEX,
      maxResolution: SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION,
    });
    map.addLayer(layer);

    const mapClicked = (event: Event | BaseEvent) => {
      const evt = event as MapBrowserEvent<UIEvent>;
      const foundPostOfficeLayer = findLayerByIdentify(
        evt.map,
        POST_OFFICE_LAYER_IDENTIFY,
      );
      if (!foundPostOfficeLayer) return;
      const postOfficeLayer = foundPostOfficeLayer as VectorTileLayer;

      void postOfficeLayer.getFeatures(evt.pixel).then((foundFeatures) => {
        if (!foundFeatures.length) {
          setSelectedPostOfficeId(undefined);
        } else {
          const foundFeature = foundFeatures[0];
          const fid = foundFeature.getId() as string;
          setSelectedPostOfficeId(fid);
        }
        layer.changed();
      });
    };
    map.on(['click'], mapClicked);

    return () => {
      map.removeLayer(layer);
      map.un(['click'], mapClicked);
    };
  }, [map, source, postOfficeSelectedStyleFunc]);

  return null;
};

PostOfficeSelectedLayer.defaultProps = {
  source: undefined,
};
