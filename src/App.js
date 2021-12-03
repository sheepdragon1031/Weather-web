import React, { useState, useRef, useEffect } from 'react';
// import './App.css';
import { Parallax } from 'react-parallax';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Popover from '@mui/material/Popover';
import CityList from './components/cityList';
import Fade from '@mui/material/Fade';
import WeatherChart from './components/weather';
import axios from "axios" 

const bgImg = () => {
  const date = new Date()
  const hr = date.getHours()
  const srcImg = [
    'b8MIyTq','Mb6opiQ','BbT6hdm','EjRom87','rK0xVGW','eXN42RN','OuGrrYU','JjoCNC3'
  ]
  const imgur = (src) =>{
	
    return  `https://i.imgur.com/${src}.jpg`
  }
  for(let i = 0; i < 7 ; i++){
	const x = (i*2 + 5)
	const y = ((i + 1) * 2 + 5)
    if(hr >= x  && hr <= y){
      return imgur(srcImg[i])
    }
  }
  return imgur(srcImg[7])
  
}
function App() {
	const [Location, setLocation] = useState('');
	
	const [query, setQuery] = useState([]);
	const [woeid, setWoeid] = useState(false);
	const [Weather, setWeather] = useState(false);
	const [CanvasWidth, setCanvasWidth] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const id = open ? 'listPopover' : undefined;
	const SearchBar = useRef(null);
	const handleChangeLocation = (event) => {
		setLocation(event.target.value);
	  };
	const handleSearchLocation = (event) =>{
		
		// console.log(Location);
		axios.get(`https://www.metaweather.com/api/location/search/?query=${Location}`)
		.then(res => {
		  const persons = res.data;
			setQuery(persons)
			setAnchorEl(SearchBar.current);
		})		
	}
	const handleKeyPress = (event) => {
		if(event.key === 'Enter'){
			handleSearchLocation()
		}
	}
	const handleClose = () => {
		setAnchorEl(null);
	};
	const PaperWidth = useRef(null);
    useEffect(() => {
      if(PaperWidth.current){
          setCanvasWidth(PaperWidth.current.offsetWidth)
      }
    }, [PaperWidth, Weather])
	useEffect(() => {
		document.title = "React Weather App"
	 }, []);
	
  return (
    <div className="App">
        <Parallax blur={0} bgImage={bgImg()} bgImageAlt="bg" strength={200}>
            <Container  sx={{ height: '100vh' , minHeight: '800px'}}>
				<Stack
				 	sx={{ height: '80vh' }}
					direction="column"
					justifyContent="center"
					alignItems="center"
					style={{minHeight: '-webkit-fill-available'}}
					spacing={2}
				>
					<Paper ref={PaperWidth}  sx={{ width: '80%', borderRadius: '.5rem', minWidth: 320}}>
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
								onKeyPress={handleKeyPress}
							/>
						
							<IconButton
								aria-describedby={id}  
								sx={{ p: '10px' }} 
								aria-label="search" 
								onClick={handleSearchLocation} 
								>
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
								setWeather={setWeather}
								onClose={setAnchorEl}
								
								/>
						</Popover>
					</Paper>
					<Fade in={woeid !== false}>
						<Paper sx={{ width: CanvasWidth < 330? '100%':'80%', borderRadius: '.5rem'}}>
							<WeatherChart dataWeather={Weather} width={CanvasWidth}  />
						</Paper>
					</Fade>
             	</Stack>
          </Container>
        </Parallax>
      
    </div>
  );
}

export default App;
