import { useRouter } from 'expo-router';
import { type ReactNode } from 'react';
import { Pressable, Text, type PressableProps, type ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { type BackButtonColorStyle, getBackButtonStyles } from './styles';

type BackButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title?: string;
  color?: BackButtonColorStyle;
  icon?: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function BackButton({
  title,
  color = 'PRIMARY',
  icon,
  style,
  onPress,
  ...rest
}: BackButtonProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const buttonStyles = getBackButtonStyles(color);

  return (
    <Pressable
      style={[...buttonStyles.container, style]}
      onPress={onPress ?? (() => router.back())}
      {...rest}>
      <Text style={buttonStyles.label}>{title ?? t('common.back')}</Text>
      {icon}
    </Pressable>
  );
}
