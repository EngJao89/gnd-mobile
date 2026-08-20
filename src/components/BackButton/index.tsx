import { useRouter } from 'expo-router';
import { type PressableProps, type ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import { type ButtonColorStyle } from '@/components/Button/styles';

type BackButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title?: string;
  color?: ButtonColorStyle;
  uppercase?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export default function BackButton({
  title,
  color = 'PRIMARY',
  uppercase = false,
  style,
  onPress,
  ...rest
}: BackButtonProps) {
  const router = useRouter();
  const { t } = useTranslation();

  let extraStyles: ViewStyle[] = [];
  if (Array.isArray(style)) {
    extraStyles = style;
  } else if (style) {
    extraStyles = [style];
  }

  return (
    <Button
      title={title ?? t('common.back')}
      color={color}
      uppercase={uppercase}
      style={[{ marginTop: 0 }, ...extraStyles]}
      onPress={onPress ?? (() => router.back())}
      {...rest}
    />
  );
}
