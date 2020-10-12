import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  clockRunning,
  cond,
  debug,
  divide,
  eq,
  floor,
  not,
  set,
  useCode,
} from "react-native-reanimated";
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from "react-native-redash";


const { width, height } = Dimensions.get("window");


const Swiper = (props) => {

  const dispatch = useDispatch();
  const image_array = useSelector(state => state.image_array);
  const updateImage = () => dispatch({type: 'UPDATE_IMG', payload: props.images});

  console.log('props.images', props.images);
  const snapPoints = props.images.map((_, i) => i * -width);
  console.log('snapPoints', snapPoints);

  const clock = useClock();
  const index = useValue(0);
  const offsetX = useValue(0);
  const translateX = useValue(0);

  const {
    gestureHandler,
    state,
    velocity,
    translation,
  } = usePanGestureHandler();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          set(index, floor(divide(translateX, -width))),
          debug("index", index),
        ]),
      ]),
    ],
    []
  );

  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={{width: width * props.images.length, height: height, flexDirection: "row", transform: [{ translateX }] }}>
            {props.images.map((source,index) => (
              <View key={index} style={styles.picture}>
                <Image style={styles.image} source={{uri: source.url}} />
              </View>
            ))}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Swiper;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  picture: {
    width,
    height,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});