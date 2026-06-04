import { Pressable, Text, type PressableProps, type ViewStyle } from 'react-native';

import { type ButtonColorStyle, getButtonStyles } from './styles';

type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title: string;
  color?: ButtonColorStyle;
  style?: ViewStyle | ViewStyle[];
};

export default function Button({ title, color = 'PRIMARY', style, ...rest }: ButtonProps) {
  const buttonStyles = getButtonStyles(color);

  return (
    <Pressable style={[...buttonStyles.container, style]} {...rest}>
      <Text style={buttonStyles.label}>{title}</Text>
    </Pressable>
  );
}
