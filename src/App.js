import React, { useState, useRef } from 'react';
import './App.css';
import { Parallax } from 'react-parallax';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import Popover from '@mui/material/Popover';
import CityList from './components/cityList';
const bgImg = () => {
  const date = new Date()
  const hr = date.getHours()
  const srcImg = [
    'b8MIyTq','Mb6opiQ','BbT6hdm','EjRom87','rK0xVGW','eXN42RN','OuGrrYU','JjoCNC3'
  ]
  const imgur = (src) =>{
    return `https://imgur.com/${src}.jpg`
  }
  for(let i = 0; i < 7 ; i++){
    console.log(hr >= (i*2 + 5) , hr <= ((i + 1) * 2 + 5 ), (i*2 + 5));
    if(hr >= (i*2 + 5)  && hr <= ((i + 1) * 2 + 5 )){
      return imgur(srcImg[i])
    }
  }
  return imgur(srcImg[7])
  
}
function App() {
	const [Location, setLocation] = useState('');
	const data = '[{"title":"Mountain View","location_type":"City","woeid":2455920,"latt_long":"37.39999,-122.079552"},{"title":"Taipei","location_type":"City","woeid":2306179,"latt_long":"25.085960,121.561478"}]'

	const [query, setQuery] = useState(JSON.parse(data));
	const [woeid, setWoeid] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const id = open ? 'listPopover' : undefined;
	const SearchBar = useRef(null);

	const handleChangeLocation = (event) => {
		setLocation(event.target.value);
	  };
	const handleSearchLocation = (event) =>{
		console.log(SearchBar);
		setAnchorEl(SearchBar.current);
		// console.log(Location);
		// axios.get(`https://www.metaweather.com/api/location/search/?query=${Location}`)
		// .then(res => {
		//   const persons = res.data;
		// 	console.log(persons);
		// })		
	}
	const handleClose = () => {
		setAnchorEl(null);
	};
	console.log(query);
  return (
    <div className="App">
        <Parallax blur={0} bgImage={bgImg()} bgImageAlt="bg" strength={200}>
            <Container  sx={{ height: '100vh' }}>
				<Stack
				 	sx={{ height: '80vh' }}
					direction="column"
					justifyContent="center"
					alignItems="center"
					spacing={2}
				>
					<Paper sx={{ width: '60%', borderRadius: '.5rem'}}>
						<Stack
							spacing={0} direction="row">
							 <IconButton disabled sx={{ p: '10px' }} aria-label="AddLocation">
								<LocationOnIcon />
							</IconButton>
							<InputBase
							 	ref={SearchBar}
								sx={{ ml: 1, flex: 1 }}
								placeholder="Search Location"
								inputProps={{ 'aria-label': 'Search Location' }}
								value={Location} onChange={handleChangeLocation}
							/>
							
							
							
							<IconButton
								aria-describedby={id}  
								sx={{ p: '10px' }} 
								aria-label="search" 
								onClick={handleSearchLocation} >
								<SearchIcon />
							</IconButton>
							
							
						</Stack>
						<Popover
								id={id}
								anchorEl={anchorEl} 
								open={open}
								onClose={handleClose}
								sx={{ mt: .5 }}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								  }}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
								>
								<CityList 
								fullWidth = {SearchBar.current? SearchBar.current.clientWidth: 300}
								listData = {query}
								setCity={setWoeid}
								onClose={setAnchorEl}
								/>
						</Popover>
					</Paper>
					<Paper sx={{ width: '80%', borderRadius: '.5rem'}}>
						{woeid}
					</Paper>
             	</Stack>
          </Container>
        </Parallax>
      
    </div>
  );
}

export default App;
