import React, { useContext } from "react";
import { AppContext } from "./context";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
function List() {
  const { items } = useContext(AppContext);
  return (
    <>
      <Typography variant="h5">Search Results</Typography>
      {items.map((t) => (
        <Card key={t.objectID} sx={{ mx: 1, my: 2 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {t.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Author :{t.author}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href={t.url}>
              Link
            </Button>
            <Button size="small" component={Link} to={"/details/" + t.objectID}>
              Details
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

export default List;
