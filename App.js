import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AddDeck from './components/AddDeck';
import AddQuestion from './components/AddQuestion';
import { createStore , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Decks from './components/Decks';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { purple, white } from './utils/colors';
import Constants from 'expo-constants';
import DeckDetail from './components/DeckDetail';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/helpers'


function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const RouteConfigs = {
  Decks: {
    name: 'Decks',
    component: Decks,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
      ),
      title: 'Decks',
    },
  },
  AddDeck: {
    component: AddDeck,
    name: 'Add Deck',
    options: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='plus-square' size={30} color={tintColor} />
      ),
      title: 'Add Deck',
    },
  },
 
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: white,
    style: {
      height: 56,
      backgroundColor:  purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
    indicatorStyle: {
      backgroundColor: 'yellow',
    },
  },
};

const Tab = createMaterialTopTabNavigator();

const TabNav = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs['Decks']} />
    <Tab.Screen {...RouteConfigs['AddDeck']} />
  </Tab.Navigator>
);

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: 'screen',
};
const StackConfig = {
  TabNav: {
    name: 'Home',
    component: TabNav,
    options: { headerShown: false },
  },
  DeckDetail: {
    name: 'DeckDetail',
    component: DeckDetail,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: 'Deck Detail',
    },
  },
  AddQuestion: {
      name: 'AddQuestion',
      component: AddQuestion,
      options: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
        title: 'Add Question',
      }
    },
  Quiz: {
      name: 'Quiz',
      component: Quiz,
      options: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
        title: 'Quiz',
      }
    },
  
};
const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['DeckDetail']} />
    <Stack.Screen {...StackConfig['AddQuestion']} />
    <Stack.Screen {...StackConfig['Quiz']} />
  </Stack.Navigator>
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    const store = createStore(
      reducer /* preloadedState, */,
      applyMiddleware(thunk)
    );
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light' />
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});