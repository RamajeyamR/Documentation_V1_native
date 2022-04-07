
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {Comp1} from "./Comp1/Home"

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
     
        <Stack.Navigator>
          <Stack.Screen name="Comp1" component={Comp1} />
        </Stack.Navigator>
    );
  }