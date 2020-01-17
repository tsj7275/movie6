import React from 'react';
import { View, StyleSheet, Text, Image, Button, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SliderBox } from "react-native-image-slider-box";

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May',
  'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'
  ];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '電影資訊',
    headerStyle: {
      backgroundColor: '#111',
    },
    headerTintColor: '#CCC',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitleVisible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.getParam('item', 'default value')
    };
  }

  // Render
  Myrender = (item) => {
    return (
      <ScrollView style={{flex:1, backgroundColor: '#000'}}>
      <SliderBox images={item.screenShots} />

      <View style={Styles.container}>
        {/* para 1 */}
        <View style={Styles.paraOne}>
          {/* left */}
            {item.rating !== undefined && <View style={Styles.itemRating}>
              <Text style={Styles.YellowText}>{(item.rating/100).toFixed(1)}</Text>
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
            {item.rating === undefined && <View style={Styles.itemRating}>
                <Text style={Styles.YellowText}>--</Text>
            </View>}
          {/* right */}
            <View style={Styles.column}>
              {/* Line 1 */}
              <Text style={{fontSize: 20, color: '#FFF', fontWeight: 'bold', marginBottom:5}}>{item.chiName}</Text>           
              {/* Line 2 */}
              <View style={Styles.row}>
                <MaterialCommunityIcons name="heart-outline" size={15} color="#FFF"/>
                <Text style={Styles.SmallYellowText}>{item.favCount}</Text>
                <MaterialCommunityIcons name="comment-outline" size={15} color="#FFF"/>
                <Text style={Styles.SmallYellowText}>{item.commentCount}</Text>
              </View>
              {/* Line 3 */}
              <View style={Styles.row}>
                <Text style={{fontSize: 13, color: '#FFF', }}>{item.openDate.split(' ')[3]}年{months.indexOf(item.openDate.split(' ')[2])+1}月{item.openDate.split(' ')[1]}日</Text>
                <Text style={{fontSize: 13, color: '#f9d849', }}> | </Text>
                <Text style={{fontSize: 13, color: '#FFF', }}>{item.duration} 分鐘</Text>
                <Text style={{fontSize: 13, color: '#f9d849', }}> | </Text>
                <Text style={{fontSize: 13, color: '#FFF', }}>{item.infoDict.Category} 級</Text>
              </View>
            </View>
        </View>
        {/* end of para 1 */}

        {/* para 2 */}
        <View style={Styles.paraTwo}>
          <Text style={{fontSize: 16, color: '#FFF', lineHeight:23}} numberOfLines={8}>{item.chiSynopsis}</Text>
        </View>
        {/* end of para 2 */}

         {/* para 3 */}
         <View>
           {/* 導演 */}
          <View style={Styles.row}>
            <Text style={Styles.head}>導演</Text>
            <Text style={Styles.tail}>{item.chiInfoDict.導演}</Text>
          </View>
          {/* 演員 */}
          <View style={Styles.row}>
            <Text style={Styles.head}>演員</Text>
            <Text style={Styles.tail}>{item.chiInfoDict.演員}</Text>
          </View>
           {/* 導演 */}
           <View style={Styles.row}>
            <Text style={Styles.head}>類型</Text>
            <Text style={Styles.tail}>{item.chiInfoDict.類型}</Text>
          </View>
           {/* 導演 */}
           <View style={Styles.row}>
            <Text style={Styles.head}>語言</Text>
            <Text style={Styles.tail}>{item.chiInfoDict.語言}</Text>
          </View>
        </View>
        {/* end of para 3 */}

      </View>
      </ScrollView>
    );
  }
  render() {
    return (
      this.Myrender(this.state.item)
    );
  }

}

// Styles
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#000',
  },
  row: {
    flexDirection: 'row',
    marginBottom:2,
  },
  column: {
    //backgroundColor: '#FF00FF',
    marginTop: 13,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paraOne: {
    //backgroundColor: '#F2300F',
    flexDirection: 'row',
    height: 80,
    marginBottom: 10,
    alignItems: 'center',
  },
  paraTwo: {
    marginBottom: 20,
  },
  itemRating: {
    //backgroundColor: '#FF00FF',
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#00FFFF',
  },
  YellowText: {
    //backgroundColor: '#0000FF',
    color: '#f9d849',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  SmallYellowText: {
    fontSize: 15, 
    color: '#f9d849', 
    fontWeight: 'bold',
    marginLeft:2,
    marginRight:5,
  },
  head: {
    //backgroundColor: '#0000FF',
    color: '#AAA',
    fontSize: 16,
    marginRight: 20,
    marginBottom: 12,
  },
  tail: {
    //backgroundColor: '#0000FF',
    width: 300,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 12,
  },
  itemPoster: {
    aspectRatio: 816 / 1204,
    height: '100%',
  },
});
