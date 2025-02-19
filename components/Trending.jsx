import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      style={styles.trendingItem}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.touchable}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            <Image
              source={icons.play}
              style={styles.playIcon}
              resizeMode="contain"
            />
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
    
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

const styles = StyleSheet.create({
  trendingItem: {
    marginRight: 20,
  },
  video: {
    width: 208,
    height: 288,
    borderRadius: 33,
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  touchable: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: 208,
    height: 288,
    borderRadius: 33,
    marginVertical: 20,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  playIcon: {
    width: 48,
    height: 48,
    position: 'absolute',
  },
});

export default Trending;
