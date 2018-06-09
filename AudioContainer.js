import React from 'react'
import {Audio} from 'expo';
import {View, Text,TouchableOpacity} from 'react-native';
import VideoPlayer from './VideoPlayer';

export default class AudioContainer extends React.Component{
	recording=null;
	state={
		file:null
	};
	
	componentDidMount(){
		this.recording = new Audio.Recording();	
	}
	recordingAudio = async ()=>{
		try {
		  await this.recording.prepareToRecordAsync(Expo.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
		  let result = await this.recording.startAsync();
		  console.log(result);
		} catch (error) {
			console.log(error)
		}
	};
	stopRecordingAudio = async () =>{
		try {
		  await this.recording.stopAndUnloadAsync();
		  this.setState({file : this.recording.getURI()})
		} catch (error) {
			console.log(error)
		}
	};
	renderAudioPlayer(){
		return <VideoPlayer vedioUrl={{'uri':this.state.file}}/>
	}
	render(){
		return (<View>
			<TouchableOpacity onPress={()=>this.recordingAudio()}>
				<Text>Record</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=>this.stopRecordingAudio()}>
				<Text>stop</Text>
			</TouchableOpacity>
			{this.state.file &&  this.renderAudioPlayer()}
		</View>)
	}
}