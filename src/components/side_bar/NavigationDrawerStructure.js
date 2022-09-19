import * as React from "react";

export default function NavigationDrawerStructure(props) {
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
