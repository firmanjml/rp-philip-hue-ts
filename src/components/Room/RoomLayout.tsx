import React, { useState, useCallback } from 'react';
import { TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import Text from '../Text';
import Block from '../Block';
import Card from '../Card';
import Badge from '../Badge';
import { GroupTypes } from '../../types';
import { useDispatch } from 'react-redux';
import { GetRoomList } from '../../redux/actions';
import { useNavigation } from 'react-navigation-hooks';

interface RoomLayoutProps {
    styles: any;
    theme: any;
    textcolor: any;
    groups: GroupTypes;
    refreshtextcolor: any;
}
function RoomLayout({
    styles,
    theme,
    textcolor,
    groups,
    refreshtextcolor
}: RoomLayoutProps) {
    const [refresh, setRefresh] = useState(false);
    
    const dispatch = useDispatch();
    const getRoomList = useCallback(() => dispatch(GetRoomList()), [dispatch]);
    const { navigate } = useNavigation();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingVertical: theme.sizes.base }}
            refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    title={"Swipe to refresh...."}
                    titleColor={refreshtextcolor}
                    onRefresh={() => {
                        setRefresh(true);
                        getRoomList();
                        setRefresh(false);
                    }} />
            }>
            <Block flex={false} row space="between" style={[styles.categories]}>
                {
                    Object.entries(groups).length === 0 && groups.constructor === Object ?
                        <Block middle center>
                            <Text h1 bold style={[textcolor]}>
                                No Room created
                            </Text>
                            <TouchableOpacity>
                                <Text h2 googlebold style={{ marginTop: 5, color: '#20D29B' }}>Add Rooms</Text>
                            </TouchableOpacity>
                        </Block>
                        :
                        Object.keys(groups).map((key) => (
                            <TouchableOpacity key={key}>
                                <Card center middle shadow style={styles.category}>
                                    <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                                        <Image style={{ width: 34, height: 34 }} source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAGEUlEQVRYw71YaVBTVxRm2r+dttNfnWnHGf3TvT+rM/1BJWE6046tQdAEFFksgra22oobiwuCVG1FIRGSIKBs4m5dcGMJyUskIWEJECNLgsRsPCGKsj1O7720MTsBHO/MmbfkvPu+d853z/luQkJcRl1o6LsSNnvR2aioN0OCGLcLo96R8COWYMPnIQsdTcuXfyRjsW7JwsIYisUCdLRTbPZOyMx8w9Wv/kTkFzIh97BczOukxLyh5rJYW0tVAjF8ju9RxTwtJVqTW8fnfD4nEPLw8MVUWJgVAZlGVouAiNBxAANCdgL7SAoiVshE3E5lRTxtlKUzL4wnAejTPu254SQYpRmMsiKORs9oGwo43wcFBIEoJ1FgsWJdUvQWupZjcIO1GXTbheRhx8Pjfl/uzxz6PFBVJtBSEbdJJoj8IDAQFotGYNo977fvjxNggKaynXMG4GlWzSEGpdTamL9qqV8g91msJYrQ0Pdd7xka0w7Yrh2YxkDMVWkLBoJttI8P8pK1tLRwNTeoVJnk+5PGDcJpzfpVIP82HMa6BW4TMrYSxAMBTJhEs7580lwMz3ryYdwkJNf4GXlxzJMGPicsIIjuO398OWYoYrS/rcVEBaNgm9ukuhvbQHkmDjoub4aWqkR41lvgF8S0vRTU1Rug88ovxLe1JomAws9IhVy7pDBqkV8gdNsRe+e2WAJCv/cngKEyMumUtYRMZlZloeuyeaVm5MEx8hGj/XywIM5QiMA+QQxSe/f1HtpEQHSnxsG0tdRlkjwYVOxfME9GdGge+T5yrqpKoOsFEd95R4M69IJis6A9mesGwpMfvXVpoKn5GXQ3d8D4YFHA1PQ3ZhDf7pupMPaoyGNpHweZmOe+Wo2yfZyhG1nQEr0S6FvZvidGaWo9txkG1BdgzGEFq14CyoqNfkhbBu0XfwVjczW8cFjA3qsgvmMDhW5+uOg1CiI/dQKxaXKls4XVrMqBnib0VWj09BmAYRiw6Org4d3dXr62tj/hQV0e8e3rN8Lk5BQBo6tNdfMzStMZqYiX7QQy3P23w3ouAzo28cAhO+oTSNf1VHhq6wWZQgVffbMCSivOwTQzhSpnspev/tYuGB7Ugqa9E5Yu/wH4QkRwmAZleZJHOxAAVRz9Mj1051/jrfGRhKg9Wck+gbSe3wITz4ehpLyGANmRkUO+uPlMkpdv++Wt8Hz4MVSfv0p8t2zPJL7KihTCHVdf1I9oAkImjHyvX7L7KX07G3R7EmFU47undCNyOix6aOvogmVhP0LNpWvATI4j9qd4R+TObngy0Ab6nj74ms2B8rMXSfQwTzx976OuTSQELizqqg3W2Thia0V5v3eMfJnD8ZQcB9v+gb6GdC9fuusodNXORGzE4SBHi+6eTz6pqxKtpLgFCwSvBO3VrdDbJAaHWQePNFegpToFJi3FviN4fTvo6wtgBPma2m8QLk2YxP6B4NTcPx1rC6Yg4SU8qDhAiNtXn44q7qmAwE3NWTO+KGqTZrFPP2dqiBRAyupVdNj5GJIH9EtNUhytxcrqdYPAy1d+KqbNCQQVlVxcXF43kJmCtjrLCUSSv+ozrEeDnWDisRhVz1zovbsTtLjNVyagwsQDRck6UJSuQ61gI+LQLtTy8wPOg7oxXV+w8hO3fiMT8ToC6dJRAx8MjXtAVREPzafXg772dzArD5LO7NpvcMHCIce/YQ3ScWkzao5Cn3qWEvE0Xt0Xq20sdD07qEWdDRokcLDIeURlenXR2cyO+g4GjsG53ldVxtN+NSwqt1IsdP93Huo4DD13U4mYWQgXcKRp7RHntUWdw6BU3var0OryOB+iFJkDScCF2oxUXGPH7wqoW3G4FEhtByOO52pBi2fnKhKuiZaXxDzBW4BXFom+AgICzz2nrWi9gBMuLeIOWVw4M1/DnMDpQJt19rw257gZoRIswasJL7d5bTlRfcLEnHXLGczASxvXGeUZtAlvSmM8l6Jn2TY2pU/hYkWJY9QSPmdZyKseuArKirg5qDd1/Pe3hF1VmWjFhs9xA8O9QyrmHqwrjPg45HUNeV7M2w3HIxdjw+cLmetf2SlWfPWh8IMAAAAASUVORK5CYII=" }} />
                                    </Badge>
                                    <Text googlemedium height={30} style={styles.roomText}>{groups[key].name}</Text>
                                    <Text gray googleregular caption>{groups[key].lights.length} bulbs</Text>
                                </Card>
                            </TouchableOpacity>
                        ))
                }
            </Block>
        </ScrollView>
    )
}

export default RoomLayout;