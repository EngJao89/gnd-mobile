import { Pressable, Text, type PressableProps, type ViewStyle } from 'react-native';

import { styles, type ButtonColorStyle, getButtonStyles } from './styles';

type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title: string;
  color?: ButtonColorStyle;
  uppercase?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export default function Button({
  title,
  color = 'PRIMARY',
  uppercase = true,
  style,
  ...rest
}: ButtonProps) {
  const buttonStyles = getButtonStyles(color);

  return (
    <Pressable style={[...buttonStyles.container, style]} {...rest}>
      <Text style={[buttonStyles.label, !uppercase && styles.labelNormalCase]}>{title}</Text>
    </Pressable>
  );
}
