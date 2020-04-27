import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';

import { Container, Content, Card, CardHeader, CardContent, CardFooter, Title, Description, Annotation, SafeAreaView } from './styles';

export default function Main() {
  let offset = 0;
  const translateY = new Animated.Value(0.01);

  useEffect(() => {
    setTimeout(() => {
      console.log("Teste")
      Animated.event(
        [
          {
            nativeEvent: {
              translationY: translateY,
            },
          },
        ],
        { useNativeDriver: true },
      );
    },5000)
  });

  const animatedEvent = () => null

  function onHandlerStateChanged(event) {
    if(event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const {translationY} = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setValue(offset);
        translateY.setOffset(0);
      })
    }
  }

  return (
    <SafeAreaView>
      <Container>
        <Header />
        <Content>
          <Menu translateY={translateY} />

          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}
          >
            <Card style={{
              transform: [{
                translateY: translateY.interpolate({
                  inputRange: [-350, 0, 380],
                  outputRange: [-50, 0, 380],
                  extrapolate: 'clamp',
                }),
              }]
            }}>
              <CardHeader>
                <Icon name="attach-money" size={28} color="#666" />
                <Icon name="visibility-off" size={28} color="#666" />
              </CardHeader>
              <CardContent>
                <Title>Saldo disponível</Title>
                <Description>R$ 283.467.267,76</Description>
              </CardContent>
              <CardFooter>
                <Annotation>
                  Transferencia de R$ 150.000,00 recebida de Wesley Almeida hoje as 9:30h
                </Annotation>
              </CardFooter>
            </Card>
          </PanGestureHandler>  
        </Content>

        <Tabs translateY={translateY} />
      </Container>
    </SafeAreaView>
  );
}
