import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, NotFound } from './Components/default';
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Cart/Checkout'; // Naya import
import Success from './Components/Cart/Success';   // Naya import
import { Box } from '@material-ui/core'

function App() {
  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Box style={{marginTop: 54}}>
            <Switch>
              <Route exact path= '/' component={Home} />
              <Route exact path= '/cart' component={Cart} />
              
              {/* 1. Checkout Page Route */}
              <Route exact path= '/checkout' component={Checkout} />
              
              {/* 2. Success/Confirmation Page Route */}
              <Route exact path= '/success' component={Success} />

              <Route exact path= '/product/:id' component={DetailView} />
              
              <Route component={NotFound} />
            </Switch>
          </Box>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;