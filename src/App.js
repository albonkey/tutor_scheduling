import React from 'react';
import './App.scss';
import MyComponent from './components/MyComponent/MyComponent';

function App() {
  return (
    <div className="App">
      <MyComponent
        isTeaching={true}
        subject={'Math'}
        name={'Sara'}
        time={'12:00 - 1:00pm'}
      />
      <MyComponent
        isTeaching={false}
        subject={'History'}
        name={'Alex'}
        time={'2:00 - 3:00pm'}
      />
    </div>
  );
}

export default App;
