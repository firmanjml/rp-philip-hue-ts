import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import TestScreen from '../screen/Test/TestScreen';
import IntroductionScreen from '../screen/Discovery/IntroductionScreen';

const SwitchNavigator = createSwitchNavigator(
    {
        Test: {
            screen: TestScreen
        },
        Intro: {
            screen: IntroductionScreen
        }
    },
    {
        initialRouteName: 'Intro'
    }
);

export default createAppContainer(SwitchNavigator);