import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions, Image, ActivityIndicator, Button, TouchableOpacity, } from 'react-native';
import StarRating from 'react-native-star-rating';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const numColumns = 3;
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May',
  'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'
  ];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, format: 1};
  }

  // Header
  // componentWillMount() {
  //   this.props.navigation.setParams({doChangeFormat: this.changeFormat});
  //   this.props.navigation.setParams({currentFormat: this.state.format});
  // }
  changeFormat = () => {
    this.setState({
      format: this.state.format * -1
    }, () => {
      this.props.navigation.setParams({currentFormat: this.state.format});
    });
    //this.setState({format: this.state.format * -1});
  };
  static navigationOptions = ({navigation}) => {
    return {
      title: '電影',
      headerStyle: {
        backgroundColor: '#111',
      },
      headerTintColor: '#CCC',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <MaterialCommunityIcons 
          onPress={
            navigation.getParam('doChangeFormat')
          }
          name= {navigation.getParam('currentFormat')===1? "format-list-bulleted" : "view-grid"}
          style={{marginRight:15}}
          size={23}
          color="#FFF"
        />
      ),
    };
  };

  // Fetch data
  componentDidMount() {
    this.props.navigation.setParams({doChangeFormat: this.changeFormat});
    this.props.navigation.setParams({currentFormat: this.state.format});
    return fetch('https://api.hkmovie6.com/hkm/movies?type=showing')
      .then(response => response.json())
      .then(responseData => {
        if (responseData) {
          this.setState({
            isLoading: false,
            dataSource: responseData,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Render
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <FlatList
          key={this.state.format===1? 'Grid' : 'List'}
          data={this.state.dataSource}
          style={Styles.container}
          renderItem={this.state.format===1? this.GridRenderItem : this.ListRenderItem}
          numColumns={this.state.format===1? numColumns : 1}
          keyExtractor = { (item, index) => index.toString() }

        />
      </View>
    );
  }

  // Render Format
  GridRenderItem = ({item, index}) => {
    return (
      <View style={GridStyles.item}><TouchableOpacity onPress={() => this.openDetail(item)}>
        {/* poster */}
        <Image source={{uri: item.thumbnail}} style={GridStyles.itemPoster} />

        {/* //movie_title */}
        <View style={GridStyles.VerticalWrapper}>
          <Text style={GridStyles.itemTitle} numberOfLines={2}>{item.chiName}</Text>
        </View>

        {/* rating */}
        {item.rating !== undefined && <View style={GridStyles.itemRating}>
          <MaterialCommunityIcons name="star-outline" size={13} color="#FFF"/>
            <Text style={GridStyles.SmallYellowText}>{(item.rating/100).toFixed(1)}</Text>
            <MaterialCommunityIcons name="heart-outline" size={13} color="#FFF"/>
            <Text style={GridStyles.SmallYellowText}>{item.favCount}</Text>
            <MaterialCommunityIcons name="comment-outline" size={13} color="#FFF"/>
            <Text style={GridStyles.SmallYellowText}>{item.commentCount}</Text>
          </View>}
        {item.rating === undefined && <View style={GridStyles.itemRating}>
            <Text style={GridStyles.SmallYellowText}>--</Text>
          </View>}
          
      </TouchableOpacity></View>
    );
  };
  ListRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this.openDetail(item)}><View style={ListStyles.item}>
        {/* poster */}
        <Image source={{uri: item.thumbnail}} style={ListStyles.itemPoster} />

        {/* rating */}
        {item.rating !== undefined && <View style={ListStyles.itemRating}>
            <Text style={ListStyles.YellowText}>{(item.rating/100).toFixed(1)}</Text>
            <StarRating
              disabled={true}
              halfStar='star-half-full'
              emptyStar='star'
              fullStarColor="#f9d849"
              emptyStarColor='#636363'
              starSize={12}
              maxStars={5}
              rating={Math.floor(item.rating/100*2)/2}
            />
          </View>}
        {item.rating === undefined && <View style={ListStyles.itemRating}>
            <Text style={ListStyles.YellowText}>--</Text>
          </View>}

        {/* //movie_title */}
        <View style={ListStyles.itemTitle}>
          <Text style={{fontSize: 17, color: '#FFF', fontWeight: 'bold'}}>{item.chiName}</Text>
          <View style={ListStyles.itemInfo}>
            <MaterialCommunityIcons name="heart-outline" size={13} color="#FFF"/>
            <Text style={ListStyles.SmallYellowText}>{item.favCount}</Text>
            <MaterialCommunityIcons name="comment-outline" size={13} color="#FFF"/>
            <Text style={ListStyles.SmallYellowText}>{item.commentCount}</Text>
          </View>
          <Text style={{fontSize: 12, color: '#FFF', }}>{item.openDate.split(' ')[3]}年{months.indexOf(item.openDate.split(' ')[2])+1}月{item.openDate.split(' ')[1]}日</Text>
        </View>
      </View></TouchableOpacity>
    );
  };

  // Go to detail page
  openDetail = (item) => {
    this.props.navigation.navigate('Detail',  {item: item})
  }

}

// Styles
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
const GridStyles = StyleSheet.create({
  item: {
    //backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  VerticalWrapper: {
    marginTop: 5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    //backgroundColor: '#FF00FF',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemRating: {
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    //backgroundColor: '#00FFFF',
  },
  SmallYellowText: {
    fontSize: 11, 
    color: '#f9d849', 
    fontWeight: 'bold',
    marginLeft:1,
    marginRight:4,
  },
  itemPoster: {
    aspectRatio: 816 / 1204,
    width: '100%',
  },
});
const ListStyles = StyleSheet.create({
  item: {
    //backgroundColor: '#4D243D',
    flexDirection: 'row',
    height: 80,
    width: '100%',
    flex: 1,
    margin: 1,
  },
  itemTitle: {
    //backgroundColor: '#FF00FF',
    width:250,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemInfo: {
    //backgroundColor: '#FF00FF',
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 1,
    //justifyContent: 'center',
  },
  itemRating: {
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#00FFFF',
  },
  YellowText: {
    color: '#f9d849',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  SmallYellowText: {
    fontSize: 13, 
    color: '#f9d849', 
    fontWeight: 'bold',
    marginLeft:2,
    marginRight:5,
  },
  itemPoster: {
    aspectRatio: 816 / 1204,
    height: '100%',
  },
});
