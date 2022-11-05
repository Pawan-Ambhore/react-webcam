import React, { useEffect, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: info.main,
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  // textAlign: 'center',
  // color: theme.palette.text.secondary,
}));


const AllCameras = () => {
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);
  const [select, setSelect] = React.useState('');

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices]
  );
  console.log(devices);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);



  return (
    <>


      <Box>
        <Grid >
          <Grid  >
            <Item>
              <FormControl sx={{ m: 1, minWidth: 250}}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Select Available devices
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={select}
                  onChange={handleChange}
                  autoWidth
                  label="Select Available devices">
                  {devices.map((device, key) => (
                    <div
                      onClick={() => {
                        console.log('Selected key ' + devices[key].deviceId);
                        setDeviceId(devices[key].deviceId);
                      }}>
                      {device.label || `Device ${key + 1}`}
                    </div>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Grid>

          <Grid>
            <Item>
              <Webcam audio={false} videoConstraints={{ deviceId: deviceId }} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default AllCameras;
