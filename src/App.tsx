import { Router } from "./app/router";
import { AppProvider } from "./app/provider";

const App = () => (
	<AppProvider>
		<Router />
	</AppProvider>
);

export default App;