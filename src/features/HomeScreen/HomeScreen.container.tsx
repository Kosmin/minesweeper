import React, { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as HomeActions from './actions';
import { errorSelector, loadingSelector, userNameSelector } from './selectors';

export const HomeScreen = memo(() => {
  const [tempUserName, setTempUserName] = useState('');
  const [level, setLevel] = React.useState(1);
  const error = useAppSelector(errorSelector);
  const loading = useAppSelector(loadingSelector);
  const userName = useAppSelector(userNameSelector);
  const dispatch = useAppDispatch();
  const startGame = () => dispatch(HomeActions.startGame({
    name: tempUserName || userName,
    level,
  }));

  const nameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempUserName(event.target.value)
  }

  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(parseInt(event.target.value, 10));
  };

  useEffect(() => setTempUserName(userName), [])

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" noWrap component="div" sx={{ mt: 3, textAlign: 'center' }}>
        Welcome to Minesweeper
      </Typography>
      <Typography variant="subtitle1" noWrap component="div" sx={{ mt: 3, textAlign: 'center' }}>
        Please enter your name to start playing:
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ textAlign: 'center' }}>
        <TextField id="outlined-basic" label="Your name" variant="outlined" sx={{ mt: 3, width: "40%" }} value={tempUserName} onChange={nameChanged} /><br/>
        <FormControl sx={{ my: 2, width: "40%" }}>
          <InputLabel id="level-label">Level</InputLabel>
          <Select
            labelId="level-label"
            value={level.toString()}
            label="Level"
            onChange={handleLevelChange}
          >
            <MenuItem value={1}>Easy</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>Hard</MenuItem>
            <MenuItem value={4}>Very Hard</MenuItem>
          </Select>
        </FormControl><br/>
        <Button variant="outlined" sx={{ mt: 1 }} onClick={startGame}>
          {!loading && (<>Play!</>)}
          {loading && (<CircularProgress size={20} />)}
        </Button>
        {error && (
          <Typography variant="body2" noWrap component="div" sx={{ mt: 2, textAlign: 'center', color: 'red' }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  )
});

export default HomeScreen;
