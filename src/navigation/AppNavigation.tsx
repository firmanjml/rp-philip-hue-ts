import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DefaultScreen from '../screen/Room/DefaultScreen';


const AppNavigation = createStackNavigator(
    {
        Rooms: {
            screen: DefaultScreen
        },
    },
    {
        initialRouteName: 'Rooms',
        defaultNavigationOptions: {
            header: null
        }
    }
)

export default createAppContainer(AppNavigation);