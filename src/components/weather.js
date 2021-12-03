import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Canvas from './canvas';
const Item = styled(Paper)(({ theme }) => ({
    boxShadow: 'none',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const WeatherChart = props =>{
    const locationData = props.dataWeather
    const [CanvasWidth, setCanvasWidth] = useState(props.width);
   
    useEffect(() => {
      setCanvasWidth(props.width)
    }, [props])
   
    return (
      locationData ? 
        <Box sx={{ flexGrow: 1 }}  >
           <Grid item xs={12}>
              <Item>
                <Typography variant="h5" gutterBottom component="div">
                  {locationData.title}
							</Typography>
              </Item>
            </Grid>
      
          <Grid container spacing={0} x={{ p: 2 }} >
            {
                locationData.consolidated_weather.map((val, index)=>
                    {
                        return (
                            <Grid item xs={2}    sx={{boxShadow: 'none'}} key={val.id} >
                                <Item>
                                <Typography variant="h6" component="div">
                                   {
                                       index === 0 ?
                                       'Today':  new Date(val.applicable_date).toLocaleDateString("en-US",{ weekday: 'short'})
                                   }
                                </Typography>
                                <img
                                style={{maxWidth: 100}} 
                                alt="weather icon"
                                src={`https://www.metaweather.com/static/img/weather/${val.weather_state_abbr}.svg`}/>
                                </Item>
                            </Grid>
                        )
                    }
                )
            }
             <Grid item xs={12}>
              <Item>
                <Typography variant="h6" gutterBottom component="div">
                  Min.Temp. - Max.Temp. C°
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <Canvas 
                data = {locationData.consolidated_weather}
                width = {CanvasWidth}
                height = {270}/>
              </Item>
            </Grid>
             <Grid item xs={12}>
              <Item>
                <Typography variant="h6" gutterBottom component="div">
                      Humidity percentage
                </Typography>
              </Item>
            </Grid>
          </Grid>
        </Box>
        :
        <></>
    )
}
export default WeatherChart;