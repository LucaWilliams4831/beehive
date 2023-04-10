import React from 'react';
import BeehivePlot from './BeehivePlot';
const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const App = () => {
  return (
    <div>
      <h1>Beehive Plot Example</h1>
      <BeehivePlot data={data} />
    </div>
  );
};
export default App;