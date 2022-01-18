import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
import { List, ListItem } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import ReactFreezeframe from 'react-freezeframe';


class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openDialog: false }
  }

  render() {
    const gif = this.props.gif;
    const N = parseInt(gif.N);
    var K = 0;
    if (N == 2) {
        K = 4;
    }
    if (N == 3) {
        K = 2;
    }
    if (N == 5) {
        K = 1;
    }

    return (
      <Grid item xs={2}>
        <Dialog 
          open={this.state.openDialog}
          onClose={() => {this.setState(state => ({ openDialog: false }));}}
        >
          <DialogTitle>{gif.dataset} ({gif.gen})</DialogTitle>
          <List>
            {/* GIF info */}
            <ListItem>N = {gif.N}, K = {K}</ListItem>
            <ListItem>n_filters = {gif.nFilters}</ListItem>
            <ListItem>lambda_cycle = {gif.lambdaCycle}</ListItem>
            <ListItem>lambda_cls = {gif.lambdaCls}</ListItem>
          </List>
        </Dialog>

        <Card>
          <CardActionArea onClick={() => {this.setState(state => ({ openDialog: true }));}}>
            <ReactFreezeframe
                src={gif.path}
                options={{
                    overlay: false
                }}
            />
          </CardActionArea>
        </Card>
      </Grid>
    )
  }
}

export default ImageComponent;