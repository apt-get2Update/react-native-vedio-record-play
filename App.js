import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import VideoPlayer from './VideoPlayer';

export default class App extends React.Component {
  state={
    hasPermission:null,
    recording:false,
    fileUrl: null,
    screen:'player'
  }

  async componentWillMount() {
     let {result} = await Permissions.askAsync(Permissions.CAMERA);
      let {status} = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
     this.setState({hasPermission:status == 'granted'});
  }
recordVideo = async () =>{
  this.setState({recording:true});
   let file = await this.camera.recordAsync({ quality: '4:3' })
    this.setState({ fileUrl: file })
}
stopRecording = async ()=>{
  let data = await this.camera.stopRecording();
  this.setState({recording:false,screen:'player'});
}
renderEmpty = ()=>{
  return <Text>go and record vedio</Text>
}
renderRecorderComponent=()=>{
  return this.state.hasPermission ? (
      <View style={{flex:1,height:400}}>
       <Camera ref={ref => { this.camera = ref; }}
       style = {{flex: 1,justifyContent: 'space-between'}} 
        type={'back'}>
        <View style={{flex:1}}>
        <TouchableOpacity
          style={{flex: 0.3,height: 58,justifyContent: 'center',alignItems: 'center'}}
          onPress={this.state.recording ?() => this.stopRecording() : () => this.recordVideo()}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {this.state.recording ?"stop" : "record"}
                </Text>
        </TouchableOpacity>
        </View>
        </Camera>
       
      </View>
    )
    :(<View style={styles.container}>
        <Text>Some thing Went Wrong</Text>
    </View>)
}
render() {
    return (<View style={{flex:1}}>
      <View style={{
        backgroundColor:'#5c7a0f',
        height:20,
        marginTop:20,
        justifyContent: 'space-between',
        flex: 0.12,
        flexDirection: 'row'}}>
          <TouchableOpacity
          style={{flex: 0.3,height:10,justifyContent: 'center',alignItems: 'center'}}
          onPress = {()=>this.setState({screen:'recorder'})}>
            <Text style={{ fontSize: 18, color: '#000' }}>Recorder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 0.3,height: 10,justifyContent: 'center',alignItems: 'center'}}
            onPress={()=>this.setState({screen:'player'})}>
              <Text style={{ fontSize: 18,color: '#000' }}>Player</Text>
          </TouchableOpacity>
        </View>
        {
          this.state.screen == 'recorder' && this.renderRecorderComponent()
        }{
          (this.state.screen == 'player' && this.state.fileUrl) ? <VideoPlayer vedioUrl = {this.state.fileUrl}/> : this.renderEmpty()
        }
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});