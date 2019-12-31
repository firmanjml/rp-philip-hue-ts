import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import TestScreen from '../screen/Test/TestScreen';
import DiscoveryNavigation from './DiscoveryNavigation';

const SwitchNavigator = createSwitchNavigator(
    {
        Test: {
            screen: TestScreen
        },
        Discovery: {
            screen: DiscoveryNavigation
        }
    },
    {
        initialRouteName: 'Discovery'
    }
);

export default createAppContainer(SwitchNavigator);