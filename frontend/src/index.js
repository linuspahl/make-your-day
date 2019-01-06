// React app index file
// The app and all its fundamental parts, like middlewares, the router, etc. are capsuled in a seperate components

// libraries
import React from 'react'
import { render } from 'react-dom'

// components
import App from 'AppRoot/AppRoot'

// Initially we will render the app component to the DOM
render(<App />, document.getElementById('root'))
