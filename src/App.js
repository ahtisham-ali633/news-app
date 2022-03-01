import React, {Suspense, Component } from "react";
import NewsContainer from "./containers/News/NewsContainer";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./redux/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={() => <div>loading...</div>}></Suspense>
          <NewsContainer />
        </PersistGate>
      </Provider>
      
    );
  }
}

export default App;
