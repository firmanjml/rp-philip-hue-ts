import React, { useState } from 'react';
import {
  StyleSheet,
  Slider
} from 'react-native';
import { Block, Text, Button, Input, ToggleSwitch } from '../../components';
import { theme } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default function TestScreen() {
  const [toggle, setToggle] = useState(false);
  const [slider, setSlider] = useState(0);

  return (
    <Block style={styles.container}>
      <Block container>

        <Block center top flex={0.1}>
          <Text h1 center bold white>
            UI Test
          </Text><Ionicons name="md-checkmark-circle" size={32} color="green" />
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Lorem Ipsum
          </Text>
        </Block>

        <Block middle flex={0.3}>
          <Text h1 center bold white>Button</Text>
          <Button shadow>
            <Text center semibold>Press Me</Text>
          </Button>
        </Block>

        <Block middle flex={0.1} center>
          <Text h1 center bold white>Toggle</Text>
          <ToggleSwitch
            offColor="#DDDDDD"
            onColor={theme.colors.secondary}
            isOn={toggle}
            onToggle={() => setToggle(prevState => !prevState)}
            speed={200}
          />
        </Block>

        <Block middle flex={0.3}>
          <Text h1 center bold white>Input</Text>
          <Input
            style={{
              borderColor: 'white',
              color: 'white',
              height: 25,
              borderBottomWidth: 0.5,
              borderRadius: 0,
              borderWidth: 0,
              textAlign: "left",
              paddingBottom: 10
            }}
            placeholder='test'
            placeholderTextColor={theme.colors.gray2}
          />
        </Block>

        <Block middle flex={0.1}>
          <Text h1 center bold white>Slider</Text>
          <Slider
            minimumValue={1}
            maximumValue={254}
            step={1}
            style={{ width: 300, height: 30, borderRadius: 50 }}
            // trackStyle={{ height: 15, borderRadius: 10 }}
            minimumTrackTintColor={theme.colors.secondary}
            maximumTrackTintColor='white'
            thumbTintColor='white'
            // thumbStyle={{
            //   width: theme.sizes.base * 1.3,
            //   height: theme.sizes.base * 1.3,
            //   borderRadius: theme.sizes.base,
            //   borderColor: 'white',
            //   borderWidth: 3,
            //   backgroundColor: 'white'
            // }}
            value={slider}
            onValueChange={value => setSlider(value)}
          />
        </Block>

      </Block>
      <KeyboardSpacer />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background
  },
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  }
});