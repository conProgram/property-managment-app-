import React from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView, FlatList, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire";

export default class Chat extends React.Component {
  state = {
    messages: []
};


//Gets name from previous screen 
get user() {
    return {
        _id: Fire.uid,
        name: this.props.navigation.state.params.name
    };
}

componentDidMount() {
    Fire.shared.getMessages(message =>
        this.setState(previous => ({
            messages: GiftedChat.append(previous.messages, message)
        }))
    );
}

componentWillUnmount() {
    Fire.off();
}

render() {
    const chat = <GiftedChat 
    messages={this.state.messages} //Messages array
    onSend={Fire.send} //send to collection in Fire.js
    user={this.user} //Sets name base on login section
    />;

    return(

      //<SafeAreaView style={{ flex: 1 }}> {chat} </SafeAreaView>
      <Text>hi</Text>
     
     );
}
}
