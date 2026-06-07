import { useRouter } from 'expo-router';
import { type ReactNode } from 'react';
import { Pressable, Text, type PressableProps, type ViewStyle } from 'react-native';

import { type BackButtonColorStyle, getBackButtonStyles } from './styles';

type BackButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title?: string;
  color?: BackButtonColorStyle;
  icon?: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function BackButton({
  title = 'Voltar',
  color = 'PRIMARY',
  icon,
  style,
  onPress,
  ...rest
}: BackButtonProps) {
  const router = useRouter();
  const buttonStyles = getBackButtonStyles(color);

  return (
    <Pressable
      style={[...buttonStyles.container, style]}
      onPress={onPress ?? (() => router.back())}
      {...rest}>
      <Text style={buttonStyles.label}>{title}</Text>
      {icon}
    </Pressable>
  );
}
