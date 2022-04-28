import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileStackNavigator} from '../../../../../utils/navigation.types';

import Display from './Display';
import Edit from './Edit';

const Stack = createNativeStackNavigator<ProfileStackNavigator>();

const Profile: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Display"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Display" component={Display} />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
};

export default Profile;
