import React  from 'react'
import { Box, Icon, Button, useTheme, SimpleGrid, IconButton, Tooltip } from '@chakra-ui/react'
import { FaVideoSlash, FaDownload, FaCamera } from 'react-icons/fa'
import ReactPlayer from "react-player";
import { RecordRTCPromisesHandler } from 'recordrtc'
import { saveAs } from "file-saver";


const MainRecorder = () => {
  const theme = useTheme()
  const [recorder, setRecorder] = React.useState()
  const [stream, setStream] = React.useState()
  const [videoBLOB, setVideoBLOB] = React.useState()
  const [type, setType] = React.useState('video')

  const videoRef = React.useRef(null)

  const startRecording = async () => {
    const mediaDevices = navigator.mediaDevices;
    const stream = type === 'video' ? await mediaDevices.getUserMedia({
      video: true,
      audio: true
    }) : await mediaDevices.getDisplayMedia({ video: true, audio: true })
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: 'video'
    })
    await recorder.startRecording()
    let video = videoRef.current
    video.srcObject = stream
    video.play()
    setRecorder(recorder)
    setStream(stream)

    console.log(recorder)

  }


  const stopRecording = async () => {
    if (recorder) {
      await recorder.stopRecording()
      stream.stop()
      const blob = await recorder.getBlob()
      setVideoBLOB(blob)
      setStream(null)
      setRecorder(null)
      console.log(blob)
    }
  }


  const changeType = () => {
    if (type === 'screen') {
      setType('video')
    } else {
      setType('screen')
    }
  }

  const download = () => {
    if (videoBLOB) {
      const nameVideo = window.prompt('Назови свое видео', 'Video')
      saveAs(videoBLOB, nameVideo + '.webm')
    }
  }

  return (
    <SimpleGrid p="5" spacing="5">
      <Box display="flex" justifyContent="center" flexDirection={[
        'column',
        'row',
        'row',
        'row'
      ]}>
        <Tooltip placement='top-start' hasArrow label="Выбери формат записи" bg={theme.colors.blue[500]} color="while">
          <Button m="1" bg={theme.colors.blue[600]} size="lg" color="while" onClick={changeType}>
            {type === 'video' ? 'Веб камера' : 'Экран'}
          </Button>
        </Tooltip>

        <Tooltip placement='top-start' hasArrow label="Начать запись" bg={theme.colors.blue[500]} color="while">
          <IconButton aria-label="start record" m="1" bg={theme.colors.blue[600]} size="lg" color="while" icon={<Icon as={FaCamera} />} onClick={startRecording} disabled={recorder ? true : false} />
        </Tooltip>

        <Tooltip placement='top-start' hasArrow label="Остановить запись" bg={theme.colors.blue[500]} color="while" >
          <IconButton aria-label="stop record" m="1" bg={theme.colors.blue[600]} size="lg" color="while" icon={<Icon as={FaVideoSlash} />} onClick={stopRecording} disabled={recorder ? false : true} />
        </Tooltip>

        <Tooltip placement='top-start' hasArrow label="Скачать запись" bg={theme.colors.blue[500]} color="while">
          <IconButton aria-label="download record" m="1" bg={theme.colors.blue[600]} size="lg" color="while" icon={<Icon as={FaDownload} />} onClick={download} disabled={videoBLOB ? false : true} />
        </Tooltip>

      </Box>
      <Box display="flex" justifyContent="center">
        <Box h="50vh" width={[
          '100%',
          '100%',
          '50vw',
          '50vw'
        ]} bg={!!videoBLOB ? 'inherit' : theme.colors.blackAlpha[800]}>
          {videoBLOB ? (<ReactPlayer url={window.URL.createObjectURL(videoBLOB)} playing={true} width="inherit" height="inherit" controls={true} />) : (
            <video style={{ width: '100%', height: '100%' }} ref={videoRef}></video>
          )}
        </Box>
      </Box>
    </SimpleGrid>
  )
}

export default MainRecorder
