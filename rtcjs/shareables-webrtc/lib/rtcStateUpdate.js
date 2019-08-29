import closeCall from './closeCall'
import createAnswer from './createAnswer'
import destroyRTC from './destroyRTC'
const compWillUpdate = ({ self, nextProps, answer, offer, sendAnswer, autoAnswer = false }) => {
  if (self.rtcPeerConnection !== undefined && self.rtcPeerConnection !==null) {
    if (nextProps.closeConnection) {
      closeCall({ self })

   
    }
    if (nextProps.answer !== null && answer === null) {
      self.rtcPeerConnection.setRemoteDescription(
        new RTCSessionDescription(nextProps.answer)
      );
    }
    if (nextProps.offer !== null && offer === null && autoAnswer) {
      const { offer } = nextProps
      createAnswer({ offer, self: self, sendAnswer })
    }
    if (self.rtcPeerConnection && self.rtcPeerConnection.remoteDescription !== null) {
      if (nextProps.candidate !== undefined && nextProps.candidate !==null) {
        self.rtcPeerConnection.addIceCandidate(
          new RTCIceCandidate(nextProps.candidate)
        );
      }
    }
  }
}
export default compWillUpdate