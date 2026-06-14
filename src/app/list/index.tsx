import HeaderList from "@/components/HeaderList";
import { View } from "react-native";

export default function List() {
  return (
    <View>
      <HeaderList location="São Paulo, SP" userName="John Doe" logoSource={require('@/assets/images/home-logo.png')} />
    </View>
  )
}
