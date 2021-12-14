import React, { useState } from 'react'
import './OptionMenu.css';

import { IconButton, Stack, FormControl, Select, InputLabel, MenuItem, Button, TextField, ToggleButton } from '@mui/material'
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
        <>
            <ToggleButton selected={isOpen} onChange={() => setIsOpen(prev=>!prev)}>
                <TuneIcon color="grey"/>
            </ToggleButton>
            {isOpen ? (<div className="option-flex-col">
                <DateTimePicker label="Start Date" dateValue={startDate} handleDateChange={setStartDate} />
                <DateTimePicker label="End Date" dateValue={endDate} handleDateChange={setEndDate}/>
                <SortSelection setSortType={setSortType} sortType={sortType}/>
                <Button variant="contained" onClick={() => setFilterSort(prev => !prev)}>Apply</Button>
            </div>
            ) : <></>}
        </>      
    )
}
