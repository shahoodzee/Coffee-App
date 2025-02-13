import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet } from "react-native";
import { images } from "../../constants";

// Compoenets
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";

const Home = () => {
  // const { data: posts, refetch } = useAppwrite(getAllPosts);
  // const { data: latestPosts } = useAppwrite(getLatestPosts);

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
        data={[{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8}]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <text style={{ fontSize: '3xl', color: 'white' }}>{item.id}</text>
          // <VideoCard
          //   title={item.title}
          //   thumbnail={item.thumbnail}
          //   video={item.video}
          //   creator={item.creator.username}
          //   avatar={item.creator.avatar}
          // />
        )}
        ListHeaderComponent={() => (
          <View style={{ flex: 1, marginVertical: 6, paddingHorizontal: 4, marginVertical: 6, justifyContent: 'space-between' }}>
            <View style={styles.ListHeaderContainer}>

              <View>
                <Text style={styles.WelcomeBackText}>
                  Welcome Back
                </Text>
                <Text style={styles.ClientName}>
                  User
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

              <Trending posts={[{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8}] }/>
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
