import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';

const wikipediaAPIUrl = 'https://en.wikipedia.org/w/api.php';

const App = () => {
  const [url, setUrl] = useState();
  const [data, setData] = useState();
  const [input, setInput] = useState();
  
useEffect(() =>{
  fetch(wikipediaAPIUrl)
  .then(() => setUrl(`${wikipediaAPIUrl}?action=query&list=search&srsearch=${input}&format=json`));
  
 },  [input]);



  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => setData(json.query.search))
    .catch((error) => alert(error))
  }, [url]);

  const ListEmptyComponent = () => {
    return <View>
      <Text style={styles.emptyComponent} >No Results Found</Text>
    </View>
  }
  





  return (
    <SafeAreaView stlyle={styles.background}>
      <View>
        <Text style={styles.title}>Searchify</Text>
        <TextInput value ={input} onChangeText={setInput} placeholder="Search Wikipedia" placeholderTextColor="grey" maxLength={35} style={styles.searchInput}>

        </TextInput>
      </View>
      <FlatList
      data={data}
      renderItem={({ item }) => (
        <View>
        <TouchableOpacity
            onPress={() =>
              Linking.openURL(`https://en.wikipedia.org/?curid=${item.pageid}`)
            }>
            <Text style={styles.header}>{`${item.title}`}</Text>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent= {ListEmptyComponent}
      style={styles.flatList} /> 


    </SafeAreaView>
  )
};

const styles = StyleSheet.create ({
  title:{
    fontSize: 30,
    fontWeight: "bold",
    color: "#00CCCC",
    alignSelf: "center",
    marginTop: 40,

  },
  searchInput: {
    marginTop: 20,
    marginHorizontal: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#00CCCC",
  },
  flatList: {
    marginTop: 30,
    borderTopWidth: 2,
    borderColor: "#00CCCC",
  },
  flatListText:{
    

  },
  emptyComponent: {
    fontSize: 20,
    color: "#00CCCC",
    alignSelf: "center",
    marginTop: 10,
  }

});
    




export default App;
