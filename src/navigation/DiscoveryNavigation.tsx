import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IntroductionScreen from '../screen/Discovery/IntroductionScreen';
import BridgeListScreen from '../screen/Discovery/BridgeListScreen';
import ManualSearchScreen from '../screen/Discovery/ManualSearchScreen';
import { theme } from '../constants';
import TutorialScreen from '../screen/Discovery/TutorialScreen';
import BridgePairingScreen from '../screen/Discovery/BridgePairingScreen';

const MainNavigator = createStackNavigator(
    {
        Intro: {
            screen: IntroductionScreen
        },
        BridgeList: {
            screen: BridgeListScreen
        },
        ManualLink: {
            screen: ManualSearchScreen
        },
        Tutorial: {
            screen: TutorialScreen
        },
        PairBridge: {
            screen: BridgePairingScreen
        }
    },
    
    {
        initialRouteName: 'Intro',
        defaultNavigationOptions: {
            header: null
        }
    }
)

export default createAppContainer(MainNavigator);