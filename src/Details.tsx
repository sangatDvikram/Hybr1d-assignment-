import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Typography, Paper, Divider,Backdrop,CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import parser from "html-react-parser";
export default function Details() {
  const location = useParams();
  const [details, setDetails] = React.useState<any>({});
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(true);
    fetch("http://hn.algolia.com/api/v1/items/" + location.id)
      .then((result) => result.json())
      .then((d) => {
        setDetails(d);
        setOpen(false);
      });
    return () => {
      setDetails({});
    };
  }, []);
  const handleClose = () =>{
    setOpen(false);
  }
  const childrens = () => {
    const childs = details.children;
    if (!childs) {
      return null;
    }
    return (
      <Box>
        <Typography>Comments:</Typography>
        {details.children
          .filter((d: any) => d.text)
          .map((d: any) => (
            <Paper sx={{ mx: 1, my: 2 }}>
              <Typography variant="body2" sx={{ m: 1 }}>
                <strong>Author: {d.author}</strong>
              </Typography>
              <Typography variant="body1" sx={{ m: 1 }}>
                {parser(d.text)}
              </Typography>
            </Paper>
          ))}
      </Box>
    );
  };
  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h5">{details.title}</Typography>
      <Typography variant="caption">Points: {details.points}</Typography>
      <Divider sx={{ mx: 1 }}></Divider>
      {childrens()}
    </Box>
  );
}
