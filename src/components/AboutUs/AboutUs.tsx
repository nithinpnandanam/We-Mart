import { useTranslation } from "react-i18next";
import { Typography, FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import './AboutUs.css'

const AboutUs = () => {
  const { t, i18n } = useTranslation();

  const [language,setLanguage] = useState('')
  const changeMyLanguage = (event:SelectChangeEvent) => {
    const lng = event.target.value
    setLanguage(lng)
    i18n.changeLanguage(lng);
  };

  return (
    <div>
        <Box className='heading-container'>
        <Typography variant="h4">{t("aboutTitle")}</Typography>
      <FormControl className="select-container">
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Language"
          onChange={changeMyLanguage}
        >
          <MenuItem value={"en"}>English</MenuItem>
          <MenuItem value={"ml"}>Malayalam</MenuItem>
          <MenuItem value={"hi"}>Hindi</MenuItem>
        </Select>
      </FormControl>
        </Box>
      
      <Typography variant="body1" sx={{ mt: 2 }}>
        {t("aboutDescription")}
      </Typography>
    </div>
  );
};

export default AboutUs;
