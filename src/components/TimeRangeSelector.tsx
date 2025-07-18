// src/components/TimeRangeSelector.tsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Props {
    onChange: (value: '1week' | '2weeks' | '1month') => void;
}

const TimeRangeSelector: React.FC<Props> = ({ onChange }) => {
    const [value, setValue] = React.useState<'1month'>('1month');

    const handleChange = (event: any) => {
        setValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Time Range</InputLabel>
            <Select value={value} label="Time Range" onChange={handleChange}>
                <MenuItem value="1week">1 Week</MenuItem>
                <MenuItem value="2weeks">2 Weeks</MenuItem>
                <MenuItem value="1month">1 Month</MenuItem>
            </Select>
        </FormControl>
    );
};

export default TimeRangeSelector;
