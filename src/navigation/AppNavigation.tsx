import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DefaultScreen from '../screen/Room/DefaultScreen';
import ControlBulbScreen from '../screen/Light/ControlBulbScreen';


const AppNavigation = createStackNavigator(
    {
        Rooms: {
            screen: DefaultScreen
        },
        ControlBulb : {
            screen : ControlBulbScreen
        }
    },
    {
        initialRouteName: 'Rooms',
        defaultNavigationOptions: {
            header: null
        }
    }
)

export default createAppContainer(AppNavigation);