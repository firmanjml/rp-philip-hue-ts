import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import TestScreen from '../screen/Test/TestScreen';
import DiscoveryNavigation from './DiscoveryNavigation';
import ListRoomScreen from '../screen/Room/DefaultScreen';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

const SwitchNavigator = createSwitchNavigator(
    {
        Test: {
            screen: TestScreen
        },
        Discovery: {
            screen: DiscoveryNavigation
        },
        App: {
            screen: AppNavigation
        },
        Auth: {
            screen: AuthNavigation
        }
    },
    {
        initialRouteName: 'Auth'
    }
);

export default createAppContainer(SwitchNavigator);