import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import  Button  from './Button';
function MediaCard({name,source,children, ...props}) {
  return (
    <Card style={{ maxWidth: 345 }}>
      <CardMedia
        style={{ height: 140 }}
        image={source}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {children}
        </Typography>
      </CardContent>
      <CardActions>
        <Button backgroundColor={"#D0BCFF"} size="small" label={"save"} />
      
      </CardActions>
    </Card>
  );
}

export default MediaCard;
