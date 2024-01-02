// App.js
import { BrowserRouter } from 'react-router-dom'

import Router from './Router'
import './index.css'

const App = () => (
	<>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
		{/* <Cursor /> */}
	</>
)

export default App
