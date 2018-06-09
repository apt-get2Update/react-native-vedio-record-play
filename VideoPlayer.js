import React from 'react';
import { Video,Camera,Permissions } from 'expo';
import { Platform,Button, StatusBar, StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default class VideoPlayer extends React.Component {
  state = {
    useNativeControls: true,
    toggleOnInstance: false,
    shouldPlay: true,
    vedioUrl:this.props.vedioUrl
  };

  handleVideoRef = ref => {
    this.videoInstance = ref;
  };

  handleLoadStart = () => console.log('Loading...');
  handleLoaded = params => console.log('Video loaded:', params);
  handleProgress = params => console.log('Video status change:', params);
  handleError = error => console.error(error);

  toggleOnInstance = async () => {
    if (this.videoInstance) {
      if (this.state.shouldPlay) {
        await this.videoInstance.pauseAsync();
        this.setState({ shouldPlay: false });
      } else {
        await this.videoInstance.playAsync();
        this.setState({ shouldPlay: true });
      }
    }
  };
  toggleShouldPlay = () => this.setState({ shouldPlay: !this.state.shouldPlay });

  renderPlayPauseButton = () =>
    !this.state.useNativeControls ? (
      <TouchableHighlight
        style={styles.button}
        underlayColor="rgba(0,0,0,0.5)"
        onPress={this.state.toggleOnInstance ? this.toggleOnInstance : this.toggleShouldPlay}>
        <Text style={styles.buttonText}>{this.state.shouldPlay ? '⏸' : '▶️'}</Text>
      </TouchableHighlight>
    ) : null;

  render() {
    return (
      <View style={styles.container}>
        {this.props.vedioUrl &&  <Video
          resizeMode="contain"
          style={styles.video}
          ref={this.handleVideoRef}
          onLoad={this.handleLoaded}
          onError={this.handleError}
          shouldPlay={this.state.shouldPlay}
          onLoadStart={this.handleLoadStart}
          onPlaybackStatusUpdate={this.handleProgress}
          useNativeControls={this.state.useNativeControls}
          source={this.props.vedioUrl}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    position: 'absolute',
    height: 100,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 80,
  },
});
