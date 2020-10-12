import React, {useState,useEffect} from 'react';
import {View} from 'react-native';
import Swiper from './src/components/Swiper';

import apiObject from './integration-config.json';

const App = () => {
  
  const [api, setApi] = useState(apiObject.api_array[parseInt(apiObject.api)-1]);
  const [imageList, setImageList] = useState([]);

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
    getImages();
  }, [api,imageList]);

  return (
    <View style={{ flex: 1}}>
      { imageList.length !== 0 ? <Swiper images = {imageList}/> : null}
    </View>
  );
};

export default App;
