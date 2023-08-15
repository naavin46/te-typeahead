import React, {useState} from 'react';
import {
  ActivityIndicator,
  View,
  TextInput,
  Image,
  Text,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import useSWR from 'swr';

const {width, height} = Dimensions.get('window');

const fetcher = url => fetch(url).then(res => res.json());

const App = () => {
  const [query, setQuery] = useState('');
  const {data, error, isLoading} = useSWR(
    query ? `https://api.github.com/search/users?q=${query}` : null,
    fetcher,
  );

  const users = data ? data.items : [];

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <View style={styles.container}>
          <TextInput
            style={styles.search}
            placeholder="Search All GitHub Users..."
            onChangeText={text => setQuery(text)}
          />

          {isLoading && <ActivityIndicator />}

          {!error && (
            <FlatList
              data={users}
              keyExtractor={item => item.login}
              renderItem={({item}) => (
                <View style={styles.userList}>
                  <Image
                    source={{uri: item.avatar_url}}
                    style={styles.avatar}
                  />
                  <Text style={styles.username}>{item.login}</Text>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  search: {
    height: height * 0.05,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: height * 0.02,
  },
  userList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    marginRight: width * 0.025,
  },
  username: {
    fontSize: height * 0.02,
  },
});

export default App;
