import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IntroductionScreen from '../screen/Discovery/IntroductionScreen';
import BridgeListScreen from '../screen/Discovery/BridgeListScreen';
import ManualLinkScreen from '../screen/Discovery/ManualLinkScreen';
import { theme } from '../constants';
import TutorialScreen from '../screen/Discovery/TutorialScreen';

const MainNavigator = createStackNavigator(
    {
        Intro: {
            screen: IntroductionScreen
        },
        BridgeList: {
            screen: BridgeListScreen
        },
        ManualLink: {
            screen: ManualLinkScreen
        },
        Tutorial: {
            screen: TutorialScreen
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