import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

function SettingPage() {
  const [isDarkmodeEnabled, setIsDarkmodeEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        <Text style={{marginRight: '1%', marginTop: '1.5%'}}>다크 모드</Text>
        <Switch 
          trackColor={{false: '#767577', true: '#81C147'}}
          thumbColor={'#fff'}
          ios_backgroundColor= '#3e3e3e'
          onValueChange={() => setIsDarkmodeEnabled(!isDarkmodeEnabled)}
          value={isDarkmodeEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    flexDirection: 'row'
  }
});

export default SettingPage;