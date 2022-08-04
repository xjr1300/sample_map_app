import { FeatureLike } from 'ol/Feature';

import { Circle, Fill, Icon, Stroke, Text } from 'ol/style';
import Style from 'ol/style/Style';

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

// eslint-disable-next-line import/prefer-default-export
export const postOfficeBaseStyle = (
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
