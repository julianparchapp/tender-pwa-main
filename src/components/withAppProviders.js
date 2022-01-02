import Provider from 'react-redux/es/components/Provider';
import store from '../store';
import AppContext from './AppContext';

// const jss = create({
//   ...jssPreset(),
//   plugins: [...jssPreset().plugins, jssExtend(), rtl()],
//   insertionPoint: document.getElementById('jss-insertion-point'),
// });

const withAppProviders = (Component) => (props) => {
  const WrapperComponent = () => (
    <AppContext.Provider value="">
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    </AppContext.Provider>
  );

  return WrapperComponent;
};

export default withAppProviders;
