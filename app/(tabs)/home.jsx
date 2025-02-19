import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet } from "react-native";
import { images } from "../../constants";

// Compoenets
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";

// Context
import { useGlobalContext } from "../../context/GlobalProvider";

// Static Data

const VideoCardData = [
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


const Home = () => {
  // const { data: posts, refetch } = useAppwrite(getAllPosts);
  // const { data: latestPosts } = useAppwrite(getLatestPosts);
  const { user } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // one flatlist
  // with list header
  // and horizontal flatlist
  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView style={styles.HomeContainer}>
      <FlatList
        data={VideoCardData}
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
        ListHeaderComponent={() => (
          <View style={{ flex: 1, marginVertical: 6, paddingHorizontal: 4, marginVertical: 6, justifyContent: 'space-between' }}>
            <View style={styles.ListHeaderContainer}>

              <View>
                <Text style={styles.WelcomeBackText}>
                  Welcome Back
                </Text>
                <Text style={styles.ClientName}>
                  {user.fullName}
                </Text>
              </View>


              <View style={{ marginTop: 6 }}>
                <Image
                  source={images.logoSmall}
                  style={{ width: 36, height: 40 }}
                  resizeMode="contain"
                />
              </View>

            </View>
          
            <SearchInput />

            <View style={styles.LatestVideosContainer}>
              <Text style={styles.LatestVideos}>
                Latest Videos
              </Text>

              <Trending posts={VideoCardData}/>
            </View>
          
          </View>  
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
       />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    backgroundColor: '#161622',
    height: '100%',
  },
  ListHeaderContainer:{
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 6,
    padding: 10
  },
  WelcomeBackText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#6B7280'
  },
  ClientName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },
  HomeHeaderImage: {
    
  },
  LatestVideosContainer:{
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 3,
    marginTop: 6
  },
  LatestVideos:{ 
    fontSize: 'lg',
    fontWeight: 'normal',
    fontFamily: 'Poppins-Regular',
    color: '#6B7280'
  }
});

export default Home;
