import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Text} from '../../components';
import {
  getMovieById,
  getVideoById,
  fetchAllMoviePopular,
  getReviewById,
} from '../../utils/redux/actions/movie';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WebView} from 'react-native-webview';
import {API_IMAGE} from '@env';

const DetailMovie = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const {itemId} = route.params;

  const {
    movieDetail: item,
    video: youtube,
    movieReviewDetail: stateReview,
    isPending,
  } = useSelector((state) => state.movie);

  useEffect(() => {
    let filteredVideos = '';
    youtube.forEach((video) => {
      if (video.site === 'YouTube') {
        filteredVideos += `https://www.youtube.com/embed/${video.key}?&autoplay=1`;
      }
    });

    setUrl(filteredVideos);
  }, [youtube, url, setUrl]);

  useEffect(() => {
    dispatch(getMovieById(itemId));
    dispatch(getVideoById(itemId));
    dispatch(getReviewById(itemId));
  }, [itemId]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {isPending ? (
            <ActivityIndicator
              size="large"
              color="#00ff00"
              style={{
                width: '100%',
                height: 250,
              }}
            />
          ) : (
            <WebView
              style={{
                width: '100%',
                height: 250,
              }}
              javaScriptEnabled
              domStorageEnabled
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
              source={{uri: url}}
            />
          )}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginHorizontal: '3%',
              marginVertical: 15,
            }}>
            <View style={{width: '30%'}}>
              {isPending ? (
                <ActivityIndicator
                  size="large"
                  color="#00ff00"
                  style={{
                    width: '100%',
                    height: 250,
                  }}
                />
              ) : (
                <Image
                  resizeMode="stretch"
                  source={{uri: `${API_IMAGE}${item.backdrop_path}`}}
                  style={{
                    width: '100%',
                    height: 160,
                    borderRadius: 10,
                    zIndex: 1,
                    marginTop: -70,
                  }}
                />
              )}
            </View>
            <View
              style={{
                width: '70%',
                marginHorizontal: 10,
                height: '100%',
              }}>
              <Text style={styles.titleText} children={item.title} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.detail}>Release {item.release_date}</Text>
                <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                  <Icon name="star" color="#ffd700" size={20} />
                  <Text style={styles.detail}>{item.vote_average}</Text>
                </View>
              </View>
              <Text
                children={`${item.runtime} Minutes`}
                style={styles.textTitle}
              />
            </View>
          </View>
          <View>
            <Text style={styles.overview}>{item.overview}</Text>
          </View>
          <View style={styles.wrapContainer}>
            <Text
              children="Reviews"
              size="xl"
              color="white"
              style={styles.titeText}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.slider}>
              {stateReview &&
                stateReview.map(({id, author, author_details, content}) => {
                  return (
                    <View
                      key={'review ' + id}
                      style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: 'red',
                        paddingHorizontal: 15,
                        paddingBottom: 10,
                        height: 90,
                        width: 270,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        marginHorizontal: 5,
                        justifyContent: 'space-between',
                        flex: 1,
                      }}>
                      <View style={{width: 50}}>
                        <Icon name={'account-circle'} size={30} color="red" />
                      </View>
                      <View style={{width: 150}}>
                        <Text>{author_details.username || 'User'}</Text>
                        <Text ellipsizeMode="tail">{content}</Text>
                      </View>
                      <View style={{flexDirection: 'row', width: 30}}>
                        <Icon name="star" color="#ffd700" size={20} />
                        <Text style={{color: 'black'}}>
                          {author_details.rating || '-'}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailMovie;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width,
    backgroundColor: '#393534',
  },
  detail: {
    color: '#F4F4F4',
    fontSize: 16,
    fontWeight: '800',
  },
  titleText: {
    color: '#F4F4F4',
    fontWeight: '800',
    paddingVertical: '3%',
    fontSize: 20,
  },
  textTitle: {
    color: '#F4F4F4',
    fontSize: 15,
  },
  overview: {
    color: '#f4f4f4',
    fontSize: 15,
    marginHorizontal: '3%',
  },
  wrapTitleText: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  slider: {
    // marginTop: '3%',
    flexDirection: 'row',
  },
  wrapContainer: {
    marginHorizontal: '2%',
    marginVertical: '5%',
  },
  titeText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
