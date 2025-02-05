import { icons } from '@/constants';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
  ActivityIndicator,
} from 'react-native';

export interface TabObject {
  name: keyof typeof icons;
  title: string;
  isHidden?: boolean;
  image?: string | null;
}

interface Props {
  color: string;
  name: keyof typeof icons;
  title: string;
  focused: boolean;
  handlePress: () => void;
  image?: string | null;
  isFetchingImage?: boolean;
  hasBorder?: boolean;
}

const TabItem = ({
  name,
  color,
  title,
  focused,
  handlePress,
  image,
  hasBorder,
  isFetchingImage,
}: Props) => {
  const [loading, setLoading] = useState(isFetchingImage || !!image);

  function handleImageLoad() {
    setLoading(false);
  }

  return (
    <TouchableOpacity
      className="flex-1 flex items-center justify-center gap-2"
      onPress={handlePress}
    >
      <View
        className={`w-10 h-10 items-center justify-center rounded-full ${
          hasBorder && 'border-2'
        }`}
        style={{ borderColor: color }}
      >
        {loading && <ActivityIndicator size="small" color={color} />}
        <Image
          source={image ? { uri: image } : icons[name]}
          resizeMode="contain"
          tintColor={image ? undefined : color}
          className="w-8 h-8 rounded-full"
          onLoad={handleImageLoad}
          onError={e => console.log('Image failed to load', e.nativeEvent)}
        />
      </View>
      <Text
        className={`${focused ? 'font-bold' : 'font-medium'} text-xs`}
        style={{ color: color }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;
