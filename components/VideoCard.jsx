import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { icons } from "../constants";

export const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.creatorContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.titleText} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.creatorText} numberOfLines={1}>
              {creator}
            </Text>
          </View>

        </View>

        <View style={styles.menuContainer}>
          <Image source={icons.menu} style={styles.menuIcon} resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          style={styles.videoPlayer}
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
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={styles.thumbnailContainer}
        >
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 56,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 100,
    alignItems: 'space-between',
  },
  creatorContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 46,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3B3B3B', // secondary color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    gap: 4,
  },
  titleText: {
    fontSize: 14,
    fontFamily: 'PSemiBold',
    color: '#FFFFFF',
  },
  creatorText: {
    fontSize: 12,
    fontFamily: 'PRegular',
    color: '#F1F1F1',
  },
  menuContainer: {
    paddingTop: 8,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  videoPlayer: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginTop: 12,
  },
  thumbnailContainer: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    position: 'absolute',
  },
  playIcon: {
    width: 48,
    height: 48,
  },
});

export default VideoCard;
