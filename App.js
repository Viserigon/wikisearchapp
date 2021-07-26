import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
    .then((json) => setData(json.search))
    .catch((error) => alert(error));

  });

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
      <View>
      <FlatList 
      data={data}
      keyExtractor={({id}, index) => id}
      renderItem={({item}) => {
        <TouchableOpacity>
        <Text>{item.title}</Text>
        </TouchableOpacity>
      }}

      ListEmptyComponent= {ListEmptyComponent}
      style={styles.flatList} /> 
      </View>


    </SafeAreaView>
  )
};

const styles = StyleSheet.create ({
  title:{
    fontSize: 30,
    fontFamily: "Goudy Bookletter 1911",
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
  emptyComponent: {
    fontSize: 20,
    color: "#00CCCC",
    alignSelf: "center",
    marginTop: 10,
  }

});
    




export default App;
