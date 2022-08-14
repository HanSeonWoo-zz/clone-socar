import React, { useEffect, useState } from 'react';
import { Keyboard, TextStyle, TouchableOpacity, Platform, ViewStyle, View, Text, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SCREEN_WIDTH, normalize, Colors } from './styles';

interface FixedButton {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  isLoading?: boolean;
}

export function FixedButton(props: FixedButton): React.ReactElement {
  const { title, disabled, onPress, containerStyle, titleStyle, isLoading = false } = props;
  const [visible, setVisible] = useState(true);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const show = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow', () => {
      setVisible(false);
    });
    const hide = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide', () => {
      setVisible(true);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  if (!visible) return <></>;
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      disabled={disabled || isLoading}
      onPress={onPress}
      style={[
        {
          width: SCREEN_WIDTH,
          height: normalize(64, 'height') + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: !disabled ? Colors.Main : '#ccc',
          borderColor: !disabled ? undefined : '#ccc',
          borderWidth: !disabled ? undefined : 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        !disabled ? containerStyle : null,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={'#eee'} size={'small'} />
      ) : (
        <Text style={[{ fontWeight: '600', fontSize: normalize(18), lineHeight: normalize(26), color: '#fff' }, titleStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
type FixedTwoButton = {
  leftTitle: string;
  rightTitle: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  leftContainerStyle?: ViewStyle;
  rightContainerStyle?: ViewStyle;
  leftStyle?: TextStyle;
  rightStyle?: TextStyle;
  disabled?: boolean;
};
export function FixedTwoButton(props: FixedTwoButton): React.ReactElement {
  const { leftTitle, rightTitle, onPressLeft, onPressRight, leftContainerStyle, rightContainerStyle, leftStyle, rightStyle, disabled } = props;
  const [visible, setVisible] = useState(true);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const show = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow', () => {
      setVisible(false);
    });
    const hide = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide', () => {
      setVisible(true);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  if (!visible) return <></>;
  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        height: normalize(64, 'height') + insets.bottom,
        paddingBottom: insets.bottom,
        flexDirection: 'row',
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.4}
        onPress={onPressLeft}
        style={[
          {
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: !disabled ? Colors.Main : '#ccc',
          },
          leftContainerStyle,
        ]}>
        <Text style={[{ fontSize: normalize(18), lineHeight: normalize(26), color: !disabled ? Colors.Main : '#ccc' }, leftStyle]}>{leftTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.4}
        onPress={onPressRight}
        style={[
          {
            flex: 1,
            backgroundColor: !disabled ? Colors.Main : '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: !disabled ? Colors.Main : '#ccc',
          },
          rightContainerStyle,
        ]}>
        <Text style={[{ fontSize: normalize(18), lineHeight: normalize(26), color: '#fff' }, rightStyle]}>{rightTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}
interface LargeButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  type?: 'solid' | 'clear' | 'outline';
  size?: 'low' | 'middle' | 'high';
  isLoading?: boolean;
}

export function LargeButton(props: LargeButtonProps): React.ReactElement {
  const { title, onPress, disabled, titleStyle, containerStyle, type = 'solid', size = 'low', isLoading = false } = props;
  const height = size === 'low' ? normalize(48) : size === 'middle' ? normalize(56) : normalize(64);
  const fontSize = size === 'low' ? normalize(14) : size === 'middle' ? normalize(16) : normalize(18);
  const lineHeight = size === 'low' ? normalize(22) : size === 'middle' ? normalize(24) : normalize(26);
  const getBackgroundColor = () => {
    if (type === 'solid') {
      return !disabled ? Colors.Main : '#ccc';
    }
    return '#fff';
  };
  const getColor = () => {
    if (type === 'solid') {
      return '#fff';
    }
    return !disabled ? Colors.Main : '#ccc';
  };
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={onPress}
      style={[
        {
          height,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          backgroundColor: getBackgroundColor(),
          borderColor: !disabled ? Colors.Main : '#ccc',
          borderWidth: type === 'outline' ? 1 : 0,
        },
        containerStyle,
      ]}>
      {isLoading ? <ActivityIndicator color={'#eee'} size={'small'} /> : <Text style={[{ fontSize, lineHeight, color: getColor() }, titleStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
}
interface FlexibleButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  type?: 'solid' | 'clear' | 'outline';
  size?: 'low' | 'middle' | 'high';
}

export function FlexibleButton(props: FlexibleButtonProps): React.ReactElement {
  const { title, onPress, disabled, titleStyle, containerStyle, type = 'solid', size = 'low' } = props;
  const height = size === 'low' ? normalize(32) : size === 'middle' ? normalize(40) : normalize(48);
  const fontSize = size === 'low' ? normalize(13) : size === 'middle' ? normalize(14) : normalize(14);
  const lineHeight = size === 'low' ? normalize(20) : size === 'middle' ? normalize(22) : normalize(22);
  const getBackgroundColor = () => {
    if (type === 'solid') {
      return !disabled ? Colors.Main : '#ccc';
    }
    return '#fff';
  };
  const getColor = () => {
    if (type === 'solid') {
      return '#fff';
    }
    return !disabled ? Colors.Main : '#ccc';
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          minWidth: normalize(104),
          paddingHorizontal: 16,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          backgroundColor: getBackgroundColor(),
          borderColor: !disabled ? Colors.Main : '#ccc',
          borderWidth: type === 'outline' ? 1 : 0,
        },
        containerStyle,
      ]}>
      <Text style={[{ fontSize, lineHeight, color: getColor() }, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
