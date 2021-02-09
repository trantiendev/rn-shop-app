import React, {useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import * as authActions from '../store/actions/auth'
import Colors from '../constants/Colors'
import {useDispatch} from 'react-redux'

const StartupScreen = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')
      if (!userData) {
        props.navigation.navigate('Auth')
        return
      }
      const transformedData = JSON.parse(userData)
      const {token, userId, expiryDate} = transformedData
      const expirationDate = new Date(expiryDate)

      if (expirationDate <= new Date() || !token || !userId) return

      const expirationTime = expirationDate.getTime() - new Date().getTime()

      props.navigation.navigate('Shop')
      dispatch(authActions.authenicate(userId, token, expirationTime))
    }

    tryLogin()
  }, [dispatch])

  return (
    <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primaru}/>
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default StartupScreen
