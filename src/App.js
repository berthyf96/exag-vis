import React from 'react';
import './App.css';

import { AppBar, Typography } from '@material-ui/core';
import { Paper, Container, Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { FormControl, FormLabel, FormGroup, FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import ImageComponent from './ImageComponent';


var allGifs = [];
const datasetOpts = [
  'GrowingBlob32x32_1.00-1.50',
  'GrowingBlob32x32_2.00-3.00',
  'GrowingSquareCIFAR32x32_3.00-5.00',
  'PynoisyOpeningAngle64x64_0.79-1.18',
  'PynoisySpatialAngle52x52_0.39-1.18',
  'PynoisySpatialAngle52x52_0.79-0.98',
  'RoundedCornersCircles100x100_0.10-0.30',
  'MNIST28x28_1-7',
];
const NOpts = ['2', '3'];
const nFiltersOpts = ['16', '32', '64'];
const lambdaCycleOpts = ['1.0', '10.0'];
const lambdaClsOpts = ['0.1', '1.0', '10.0'];
const genOpts = ['G', 'F'];


function parseGifFn(fullGifFn) {
  // {datasetName}_{datasetRange}_N={N}_K={K}_filters={nFilters}_lcycle={lambdaCycle}_lcls={lambcsCls}_{F|G}.{bunchofnumbers}.gif
  const gifFn = fullGifFn.split('/').reverse()[0]; // gets basename
  const gifSubstrings = gifFn.split('_');
  const gifDataset = gifSubstrings[0] + '_' + gifSubstrings[1];  // {datasetName}_{scaleMin-scaleMax}
  const gifN = gifSubstrings[2].split('=')[1];  // N={N}
  const gifNFilters = gifSubstrings[4].split('=')[1];  // filters={nFilters}
  const gifLambdaCycle = gifSubstrings[5].split('=')[1];  // lcycle={lambdaCycle}
  const gifLambdaCls = gifSubstrings[6].split('=')[1];  // lcls={lambdaCls}
  const gifGen = gifSubstrings[7][0]; // G.gif or F.gif
  return {
    path: fullGifFn, fn: gifFn, dataset: gifDataset, N: gifN,
    nFilters: gifNFilters, lambdaCycle: gifLambdaCycle,
    lambdaCls: gifLambdaCls, gen: gifGen
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);

    // Get all GIFs and their info.
    const allGifFns = this.importAll(require.context('./images/', true, /\.(gif)$/));
    allGifs = allGifFns.map((x) => parseGifFn(x));

    this.state = {
      showGifs: [],
      datasetSels: [],
      NSels: [],
      nFiltersSels: [],
      lambdaCycleSels: [],
      lambdaClsSels: [],
      genSels: []
    };
  }

  importAll(r) {
    return r.keys().map(r);
  }

  isSelectedGif = gif => {
    return (this.state.datasetSels.includes(gif.dataset) && 
      this.state.NSels.includes(gif.N) && 
      this.state.nFiltersSels.includes(gif.nFilters) &&
      this.state.lambdaCycleSels.includes(gif.lambdaCycle) &&
      this.state.lambdaClsSels.includes(gif.lambdaCls) &&
      this.state.genSels.includes(gif.gen))
  }

  updateGifs() {
    this.state.showGifs = allGifs.filter(this.isSelectedGif);
    console.log(this.state.showGifs)
    this.forceUpdate();
  }

  handleDatasetChange = event => {
    var sels = this.state.datasetSels;
    const checked = event.target.checked;
    const item = event.target.name;
    
    if (checked && !sels.includes(item)) {
      // Item has been checked and need to add to selected datasets.
      sels.push(item)
    }
    if (!checked && sels.includes(item)) {
      // Item has been unchecked and need to remove from selected datasets.
      const idx = sels.indexOf(item);
      sels.splice(idx, 1);
    }
    this.setState({ datasetSels: sels });
    this.updateGifs();
  }

  handleNChange = event => {
    var sels = this.state.NSels;
    const checked = event.target.checked;
    const item = event.target.name;

    if (checked && !sels.includes(item)) { 
      // Item has been checked and need to add to selected datasets.
      sels.push(item)
    }
    if (!checked && sels.includes(item)) {
      // Item has been unchecked and need to remove from selected datasets.
      const idx = sels.indexOf(item);
      sels.splice(idx, 1);
    }
    this.setState({ NSels: sels });
    this.updateGifs();
  }

  handleNFiltersChange = event => {
    var sels = this.state.nFiltersSels;
    const checked = event.target.checked;
    const item = event.target.name;

    if (checked && !sels.includes(item)) { 
      // Item has been checked and need to add to selected datasets.
      sels.push(item)
    }
    if (!checked && sels.includes(item)) {
      // Item has been unchecked and need to remove from selected datasets.
      const idx = sels.indexOf(item);
      sels.splice(idx, 1);
    }
    this.setState({ nFiltersSels: sels });
    this.updateGifs();
  }

  handleLambdaCycleChange = event => {
    var sels = this.state.lambdaCycleSels;
    const checked = event.target.checked;
    const item = event.target.name;

    if (checked && !sels.includes(item)) { 
      // Item has been checked and need to add to selected datasets.
      sels.push(item)
    }
    if (!checked && sels.includes(item)) {
      // Item has been unchecked and need to remove from selected datasets.
      const idx = sels.indexOf(item);
      sels.splice(idx, 1);
    }
    this.setState({ lambdaCycleSels: sels });
    this.updateGifs();
  }

  handleLambdaClsChange = event => {
    var sels = this.state.lambdaClsSels;
    const checked = event.target.checked;
    const item = event.target.name;

    if (checked && !sels.includes(item)) { 
      // Item has been checked and need to add to selected datasets.
      sels.push(item)
    }
    if (!checked && sels.includes(item)) {
      // Item has been unchecked and need to remove from selected datasets.
      const idx = sels.indexOf(item);
      sels.splice(idx, 1);
    }
    this.setState({ lambdaClsSels: sels });
    this.updateGifs();
  }

  handleGenChange = event => {
    var sels = this.state.genSels;
    const checked = event.target.checked;
    const item = event.target.name;

    if (checked && !sels.includes(item)) { 
      // Item has been checked and need to add to selected datasets.
      sels.push(item)
    }
    if (!checked && sels.includes(item)) {
      // Item has been unchecked and need to remove from selected datasets.
      const idx = sels.indexOf(item);
      sels.splice(idx, 1);
    }
    this.setState({ genSels: sels });
    this.updateGifs();
  }

  renderGrid() {
    return (
      <Grid container spacing={2}>
      {
        this.state.showGifs.map(
          (gif) => <ImageComponent key={gif.fn} gif={gif}/>
        )
      }
      </Grid>
    )
  }

  renderDatasetCheckbox() {
    return (
      <Paper elevation={1}>
        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
          <FormLabel component='legend'>Dataset</FormLabel>
          <FormGroup>
            {
              datasetOpts.map(
                (name, i) => <FormControlLabel key={i}
                  control={
                    <Checkbox checked={this.state.datasetSels.includes(name)}
                      onChange={this.handleDatasetChange} name={name} />
                  }
                  label={name} />
              )
            }
          </FormGroup>
        </FormControl>
      </Paper>
    )
  }

  renderNCheckbox() {
    return (
      <Paper elevation={1}>
        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
          <FormLabel component='legend'>N</FormLabel>
          <FormGroup>
            {
              NOpts.map(
                N => <FormControlLabel key={N}
                  control={
                    <Checkbox checked={this.state.NSels.includes(N)}
                      onChange={this.handleNChange} name={N} />
                  }
                  label={N} />
              )
            }
          </FormGroup>
        </FormControl>
      </Paper>
    )
  }

  renderNFiltersCheckbox() {
    return (
      <Paper elevation={1}>
        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
          <FormLabel component='legend'>n_filters</FormLabel>
          <FormGroup>
            {
              nFiltersOpts.map(
                item => <FormControlLabel key={item}
                  control={
                    <Checkbox checked={this.state.nFiltersSels.includes(item)}
                      onChange={this.handleNFiltersChange} name={item} />
                  }
                  label={item} />
              )
            }
          </FormGroup>
        </FormControl>
      </Paper>
    )
  }

  renderLambdaCycleCheckbox() {
    return (
      <Paper elevation={1}>
        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
          <FormLabel component='legend'>lambda_cycle</FormLabel>
          <FormGroup>
            {
              lambdaCycleOpts.map(
                item => <FormControlLabel key={item}
                  control={
                    <Checkbox checked={this.state.lambdaCycleSels.includes(item)}
                      onChange={this.handleLambdaCycleChange} name={item} />
                  }
                  label={item} />
              )
            }
          </FormGroup>
        </FormControl>
      </Paper>
    )
  }

  renderLambdaClsCheckbox() {
    return (
      <Paper elevation={1}>
        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
          <FormLabel component='legend'>lambda_cls</FormLabel>
          <FormGroup>
            {
              lambdaClsOpts.map(
                item => <FormControlLabel key={item}
                  control={
                    <Checkbox checked={this.state.lambdaClsSels.includes(item)}
                      onChange={this.handleLambdaClsChange} name={item} />
                  }
                  label={item} />
              )
            }
          </FormGroup>
        </FormControl>
      </Paper>
    )
  }

  renderGenCheckbox() {
    return (
      <Paper elevation={1}>
        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
          <FormLabel component='legend'>Generator</FormLabel>
          <FormGroup>
            {
              genOpts.map(
                item => <FormControlLabel key={item}
                  control={
                    <Checkbox checked={this.state.genSels.includes(item)}
                      onChange={this.handleGenChange} name={item} />
                  }
                  label={item} />
              )
            }
          </FormGroup>
        </FormControl>
      </Paper>
    )
  }

  render() {
    return (
      <div className='App'>
        <Container maxWidth='md' padding={10}>
          <Box m={2} pt={2}>
            <Grid container spacing={1}>
              <Grid item xs={6}><Box> {this.renderDatasetCheckbox()}</Box></Grid>
              <Grid item xs={3}><Box> {this.renderNCheckbox()}</Box></Grid>
              <Grid item xs={3}><Box> {this.renderGenCheckbox()}</Box></Grid>
              <Grid item xs={3}><Box> {this.renderNFiltersCheckbox()}</Box></Grid>
              <Grid item xs={3}><Box> {this.renderLambdaCycleCheckbox()}</Box></Grid>
              <Grid item xs={3}><Box> {this.renderLambdaClsCheckbox()}</Box></Grid>
            </Grid>
          </Box>
        </Container>
        
        <Box m={6} pt={2}>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Hyperparameter Search Results
          </Typography>
          <hr />
          {this.renderGrid()}
        </Box>
      </div>
    );
  }
  
}

export default App;
