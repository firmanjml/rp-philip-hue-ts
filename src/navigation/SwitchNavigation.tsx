import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import TestScreen from '../screen/Test/TestScreen';
import DiscoveryNavigation from './DiscoveryNavigation';
import ListRoomScreen from '../screen/Room/ListRoomScreen';

const SwitchNavigator = createSwitchNavigator(
    {
        Test: {
            screen: TestScreen
        },
        Discovery: {
            screen: DiscoveryNavigation
        },
        Room: {
            screen: ListRoomScreen
        }
    },
    {
        initialRouteName: 'Discovery'
    }
);

export default createAppContainer(SwitchNavigator);