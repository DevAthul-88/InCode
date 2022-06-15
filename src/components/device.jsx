import { Center } from '@mantine/core'
import React from 'react'
import "../device.css";

function device({srcDoc , device}) {
  return (
    <Center mt="sm">
    <div className={`device ${device}`}>
      <div className="device-frame">
      <iframe
      className="paness"
      srcDoc={srcDoc}
      title="output"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      frameBorder="0"
      width="100%"
      height="100%"
    />
      </div>
      <div className="device-stripe"></div>
      <div className="device-header"></div>
      <div className="device-sensors"></div>
      <div className="device-btns"></div>
      <div className="device-power"></div>
    </div>
  </Center>
  )
}

export default device