import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DefaultScreen from '../screen/Room/DefaultScreen';
import ControlBulbScreen from '../screen/Light/ControlBulbScreen';
import ScheduleInfoScreen from '../screen/Schedule/ScheduleInfo';
import SettingListScreen from '../screen/Setting/SettingList';
import BridgeInfoScreen from '../screen/Setting/BridgeInfo';
import ControlRoomScreen from '../screen/Room/ControlRoomScreen';

const AppNavigation = createStackNavigator(
    {
        Rooms: {
            screen: DefaultScreen
        },
        ControlBulb : {
            screen : ControlBulbScreen
        },
        ControlRoom : {
            screen : ControlRoomScreen
        },
        ScheduleInfo : {
            screen : ScheduleInfoScreen
        },
        SettingList : {
            screen : SettingListScreen
        },
        BridgeInfo : {
            screen : BridgeInfoScreen
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