import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";

// Constants
import { icons } from "../../constants";

// Context
import { useGlobalContext } from "../../context/GlobalProvider";

//Components
import { EmptyState, InfoBox, VideoCard } from "../../components";

// Api Calls
import { logout } from "../../service/api";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const posts = [
    {
      "id": 1,
      "title": "Exploring React Native",
      "thumbnail": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      "video": "https://example.com/videos/react-native.mp4",
      "creator": {
        "username": "TechGuru",
        "avatar": "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_1280.png"
      }
    },
    // {
    //   "id": 2,
    //   "title": "Mastering .NET 9",
    //   "thumbnail": "https://cdn.pixabay.com/photo/2016/11/29/09/32/laptop-1867768_1280.jpg",
    //   "video": "https://example.com/videos/dotnet9.mp4",
    //   "creator": {
    //     "username": "CodeMaster",
    //     "avatar": "https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2027366_1280.png"
    //   }
    // },
    // {
    //   "id": 3,
    //   "title": "Xamarin vs React Native",
    //   "thumbnail": "https://cdn.pixabay.com/photo/2015/05/15/14/47/computer-768696_1280.jpg",
    //   "video": "https://example.com/videos/xamarin-react.mp4",
    //   "creator": {
    //     "username": "MobileDev",
    //     "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    //   }
    // },
    // {
    //   "id": 4,
    //   "title": "Introduction to Expo",
    //   "thumbnail": "https://cdn.pixabay.com/photo/2014/05/02/21/50/home-office-336377_1280.jpg",
    //   "video": "https://example.com/videos/expo.mp4",
    //   "creator": {
    //     "username": "DevJourney",
    //     "avatar": "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_1280.png"
    //   }
    // },
    // {
    //   "id": 5,
    //   "title": "Building APIs with .NET",
    //   "thumbnail": "https://cdn.pixabay.com/photo/2015/01/09/02/45/office-593378_1280.jpg",
    //   "video": "https://example.com/videos/dotnet-api.mp4",
    //   "creator": {
    //     "username": "BackendNinja",
    //     "avatar": "https://cdn.pixabay.com/photo/2017/01/31/13/13/avatar-2027363_1280.png"
    //   }
    // },
    // {
    //   "id": 6,
    //   "title": "Advanced React Patterns",
    //   "thumbnail": "https://cdn.pixabay.com/photo/2016/11/29/03/53/code-1869236_1280.jpg",
    //   "video": "https://example.com/videos/react-patterns.mp4",
    //   "creator": {
    //     "username": "ReactPro",
    //     "avatar": "https://cdn.pixabay.com/photo/2017/01/31/13/12/avatar-2027362_1280.png"
    //   }
    // },
    // {
    //   "id": 7,
    //   "title": "State Management in React Native",
    //   "thumbnail": "https://cdn.pixabay.com/photo/2015/05/15/14/47/computer-768696_1280.jpg",
    //   "video": "https://example.com/videos/state-management.mp4",
    //   "creator": {
    //     "username": "StateWizard",
    //     "avatar": "https://cdn.pixabay.com/photo/2017/01/31/13/11/avatar-2027361_1280.png"
    //   }
    // },
    // {
    //   "id": 8,
    //   "title": "Deploying .NET Applications",
    //   "thumbnail": "https://cdn.pixabay.com/photo/2016/11/29/09/32/laptop-1867768_1280.jpg",
    //   "video": "https://example.com/videos/deploy-dotnet.mp4",
    //   "creator": {
    //     "username": "DevOpsKing",
    //     "avatar": "https://cdn.pixabay.com/photo/2017/01/31/13/10/avatar-2027360_1280.png"
    //   }
    // }
  ]
  
  const logout = async () => {
    // await signOut();
    // setUser(null);
    // setIsLogged(false);
    console.log(user);
    router.navigate("/profile");
  };

  if (!user) {
    return <Text>Loading...</Text>;  // You can replace this with a proper loading indicator
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={logout}
              style={styles.logoutButton}>
              <Image
                source={icons.logout}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user.imageUrl || 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' }}
                style={styles.avatar}
              />
            </View>

            <InfoBox
              title={user?.fullName}
              containerStyles={{ marginTop: 5 }}
              titleStyles={styles.infoBoxTitle}
            />

            <View style={styles.postsRow}>
              <InfoBox
                title={posts.length || 0}
                subtitle="Favuorites"
                titleStyles={styles.infoBoxTitle}
                containerStyles={styles.postInfoBox}
              />
              <InfoBox
                title="12"
                subtitle="Orders"
                titleStyles={styles.infoBoxTitle}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ // Add this styles object
  container: {
    backgroundColor: '#161622',
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 48,
    paddingHorizontal: 16,
  },
  logoutButton: {
    alignSelf: 'flex-end',
    marginBottom: 40,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderColor: 'rgb(255 160 0)',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '90%',
    height: '90%',
    borderRadius: 8,
  },
  infoBoxTitle: {
    fontSize: 18,
  },
  infoBoxSubtitle: {
    fontSize: 16,
  },
  postsRow: {
    marginTop: 20,
    flexDirection: 'row',
  },
  postInfoBox: {
    marginRight: 40,
  },
});

export default Profile;