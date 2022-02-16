import React from 'react';
import { Typography } from '@material-ui/core';
import ReactFreezeframe from 'react-freezeframe';


class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openDialog: false }
  }

  render() {
    const vid = this.props.vid;

    return (
      <div class='videoContainer'>
        <Typography variant="body1" color="text.secondary">
          {vid.dataset}
        </Typography>
        <Typography variant="body2" color="text.primary">
          N = {vid.N}, K = {vid.K}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          n_filters = {vid.nFilters}, lambda_cycle = {vid.lambdaCycle}, lambda_cls = {vid.lambdaCls}
        </Typography>

        <video
          onMouseOver={event => event.target.play()}
          onMouseOut={event => event.target.pause()}
          loop>
          <source src={vid.path} type='video/mp4'/>
        </video>

        {/* <Card>
          <CardActionArea onClick={() => {this.setState(state => ({ openDialog: true }));}}>
            {/* <ReactFreezeframe
                src={vid.path}
                options={{
                    overlay: false
                }}
            /> 
          </CardActionArea>
        </Card> */}
      </div>
    )
  }
}

export default ImageComponent;