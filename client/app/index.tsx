/* NOTE: if you use "module: commonjs" in tsconfig, OR if you have not set value of
   allowSyntheticDefaultImports as true in tsconfig, you must use following syntax to
   for importing from modules which dont export a default module*/
// import * as React from 'react'
// import * as ReactDOM from 'react-dom'

import React from 'react'
import ReactDOM from 'react-dom'

import AwesomeComponent from './AwesomeComponent.jsx';

const App = () => {
  return (
        <div>
            <p> Hello My React!</p>
            <AwesomeComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
