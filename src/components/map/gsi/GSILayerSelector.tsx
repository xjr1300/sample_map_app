import { FC } from 'react';

import { Radio } from 'antd';
import styled from 'styled-components';
import { RadioChangedEvent } from '../../../types';

// 国土地理院地図レイヤ名
export type GSILayerName = 'standard' | 'pale' | 'blank' | 'photo';

const Div = styled.div`
  padding-left: 1rem;
  height: 2rem;
`;

const GSILayerRadioGroup = styled(Radio.Group)`
  vertical-align: middle;
`;

type Props = {
  layer?: GSILayerName;
  onLayerChanged?: RadioChangedEvent;
};

const GSILayerSelector: FC<Props> = ({
  layer = undefined,
  onLayerChanged = undefined,
}) => (
  <Div>
    <GSILayerRadioGroup onChange={onLayerChanged} value={layer}>
      <Radio value="standard">標準地図</Radio>
      <Radio value="pale">淡色地図</Radio>
      <Radio value="blank">白地図</Radio>
      <Radio value="photo">写真</Radio>
    </GSILayerRadioGroup>
  </Div>
);

GSILayerSelector.defaultProps = {
  layer: undefined,
  onLayerChanged: undefined,
};

export default GSILayerSelector;
