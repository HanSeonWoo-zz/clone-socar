import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {Colors, normalize} from './styles';
/**
 * Wrapped Text
 */
interface WTextProps extends TextProps {
  b?: boolean; // bold
  m?: boolean; // medium
  r?: boolean; // regular
  style?: TextStyle;
  children?: React.ReactNode;
}
// return <Word {...this.props}>{this.props.children}</Word>;
export const WText = (props: WTextProps): React.ReactElement => {
  const {style, b, m, r} = props;
  return (
    <Text
      {...props}
      style={[
        {...styles.base},
        {...style},
        b && {fontWeight: '700'},
        m && {fontWeight: '500'},
        r && {fontWeight: '400'},
        {
          fontSize: !!style?.fontSize
            ? normalize(style.fontSize)
            : normalize(14),
        },
        {
          lineHeight: !!style?.lineHeight
            ? normalize(style.lineHeight)
            : !!style?.fontSize
            ? normalize(style.fontSize + 4)
            : normalize(18),
        },
      ]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {letterSpacing: -0.3, fontWeight: '400', color: Colors.Black},
});
