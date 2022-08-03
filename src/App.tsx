import { FC, useState } from 'react';

import { GSIMap } from './components/map/gsi/GSIMap';

export const MAP_INITIAL_VIEW_CENTER = [15255409.474963477, 4273332.695848511];
export const MAP_INITIAL_VIEW_ZOOM = 9;

const App: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [center, setCenter] = useState(MAP_INITIAL_VIEW_CENTER);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoom, setZoom] = useState(MAP_INITIAL_VIEW_ZOOM);

  return <GSIMap center={center} zoom={zoom} />;
};

export default App;
