/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  ListView,
  View,
  NavigatorIOS,
} = React;

var REQUEST_URL = 'http://app.58.com/api/list/ershouche/?action=getListInfo&appId=3&ct=filter&curVer=6.0.2&isNeedAd=0&localname=bj&os=ios&page=1&tabkey=allcity';

var AwesomeProject = React.createClass({
      render:function() {
        return (
          <NavigatorIOS
            style={{flex : 1,backgroundColor: '#000000'}}
            tintColor='#cccccc'
            barTintColor='#cccccc'
            initialRoute={{
              title: '二手汽车(React Native)',
              component: TmpListView,
          }}/>
        );
    }
});

var TmpListView = React.createClass({
  
  render:function(){
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderUsedCarCell}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderUsedCarCell: function(usedCarData) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: usedCarData.picUrl}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.rightTopPart} numberOfLines={2}>{usedCarData.title}</Text>
          <Text style={styles.rightMiddlePart}>
              {usedCarData.buyTime}－{usedCarData.runDistance}
          </Text>
          <View style={styles.rightBottom}>
              <Text style={styles.rightBottomLeft}>{usedCarData.price}</Text>
              <Image
                source={require('image!list_jingzhun')}
                style={styles.rightBottomRight}
              >
              </Image>
          </View>
        </View>
      </View>
    );
  },

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.result.getListInfo.infolist),
          loaded: true,
        });
      })
      .done();
  },

});

var styles = StyleSheet.create({
  //整个table的样式
  listView: {
    paddingTop: 0,
    backgroundColor: '#F5FCFF',
  },

  //cell的总体样式
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor : '#eeeeee',
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 0.5,
  },
  //左侧大图的样式
  thumbnail: {
    width: 100,
    height: 75,
    marginLeft: 15,
    marginTop: 15,
    marginRight: 10,
  },
  rightContainer:{flex:1,flexDirection : 'column',},
  //cell右上文字区域样式
  rightTopPart: {
    fontSize: 14,
    marginLeft:10,
    marginRight: 10,
    marginTop:15,
    textAlign: 'left',
  },
  rightMiddlePart: {
    marginTop : 5,
    marginBottom : 10,
    marginLeft:10,
    textAlign: 'left',
    color : '#b0b0b0'
  },
  // cell右侧底部样式
  rightBottom : {
    marginLeft:10,
    marginRight: 10,
    marginBottom : 8,
    flexDirection :'row',
    alignItems: 'center',
    justifyContent : 'space-between'
  },
  rightBottomLeft : {
    color : '#c40001'
  },
  rightBottomRight:{
    width: 25,
    height: 14,
  },
  
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);




