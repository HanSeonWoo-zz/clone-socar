import {Dimensions, PixelRatio, Platform, StyleSheet} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

// based on iPhone 11 Pro, X
const wscale: number = SCREEN_WIDTH / 375;
const hscale: number = SCREEN_HEIGHT / 812;
export function normalize(size: number, based: 'width' | 'height' = 'width') {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    // return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}
export enum Colors {
  Main = '#00C17C',
  Trans = '#0000',
  Green = '#00B272',
  Mint = '#00CD9B', // mint 4.0
  Red = '#FF3F62',
  Blue = '#516CFA',
  Yellow = '#F4BE00',
  Orange = '#FF6E30',
  Black = '#111111',
  White = '#FFFFFF',
  Gray3 = '#333333',
  Gray6 = '#666666',
  Gray9 = '#999999',
  GrayC = '#CCCCCC',
  GrayD = '#DDDDDD',
  GrayE = '#EEEEEE',
  GrayF8 = '#F8F8F8',
  GrayFA = '#FAFAFA',
  Dim06 = 'rgba(0,0,0,0.6)',
  Dim04 = 'rgba(0,0,0,0.4)',
}

export const globalStyles = StyleSheet.create({
  border: {borderColor: '#fff', borderWidth: 1, borderRadius: 16},
  shadow: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: Colors.Dim04,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
