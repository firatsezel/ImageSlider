import React, {useState,useEffect} from 'react';
import {View} from 'react-native';
import Swiper from './src/components/Swiper';

import apiObject from './integration-config.json';

const App = () => {
  
  const [api, setApi] = useState(apiObject.api_array[parseInt(apiObject.api)-1]);
  const [imageList, setImageList] = useState([]);

  const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  const getImages = () => {
    if(Array.isArray(api)){
      if(api.length>1){
        setImageList(api);
      }else{
        api.map((item, index) => (
          setApi(item)
        ))
      } 
    }else{
      for (const property in api) {
        setApi(api[property]);
      }
    }
  };

  useEffect(() => {
    for (const property in api) {
      if (!isEmpty(api[property])) {
        try {
          getImages();
        } catch(err) { 
          alert(err);
        }
      }else{
        alert("Please check your API!");
      }
    }
  }, [api,imageList]);

  return (
    <View style={{ flex: 1}}>
      { imageList.length !== 0 ? <Swiper images = {imageList}/> : null}
    </View>
  );
};

export default App;

