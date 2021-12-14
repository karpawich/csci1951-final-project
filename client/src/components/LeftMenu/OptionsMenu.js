import React, {useState} from 'react'

import { IconButton, Stack, FormControl, Select, InputLabel, MenuItem, Button, TextField } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import KeyboardDateTimePicker from '@mui/lab/DateTimePicker'

export const SortSelection = (props) => {
    const { setSortType, sortType } = props

    return (
        <FormControl fullWidth>
        <InputLabel id="sort-select-label">Sort Type</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortType}
          label="Sort Type"
          onChange={(e) => setSortType(e.target.value)}
        >
          <MenuItem value={'new->old'}>Newest to Oldest</MenuItem>
          <MenuItem value={'old->new'}>Oldest to Newest</MenuItem>
        </Select>
      </FormControl>)
}

export const DateTimePicker = (props) => {
    const { label, handleDateChange, dateValue } = props

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <KeyboardDateTimePicker
                variant="inline"
                renderInput={(props) => <TextField {...props} />}
                label={label}
                value={dateValue}
                onChange={handleDateChange}
                onError={console.log}
                format="yyyy/MM/dd HH:mm"
            />
        </LocalizationProvider>
        )
}

export const OptionsMenu = (props) => {
    const {startDate, setStartDate, endDate, setEndDate, setFilterSort, setSortType, sortType } = props


    const [isOpen, setIsOpen] = useState(false)
    
    return (
        !isOpen ? (
            <IconButton onClick={() => setIsOpen(true)}>
                <TuneIcon color="grey"/>
            </IconButton>)
            : (
            <Stack spacing={2} direction="row">
                <IconButton onClick={() => setIsOpen(false)}>
                    <TuneIcon color="red"/>
                </IconButton> 
                <DateTimePicker label="Start Date" dateValue={startDate} handleDateChange={setStartDate} />
                <DateTimePicker label="End Date" dateValue={endDate} handleDateChange={setEndDate}/>
                    <SortSelection setSortType={setSortType} sortType={sortType}/>
                <Button variant="contained" onClick={() => setFilterSort(prev => !prev)}>Apply</Button>
            </Stack>
            )   
    )
}
