import React from 'react';
import './App.scss';

import { Typography } from '@material-ui/core';
import { Container, Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { FormControl, FormGroup, FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import ImageComponent from './ImageComponent';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#703fb5',
    },
    secondary: {
      main: '#f50057',
    },
  },

  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),
    fontSize: 15,
    h3: {
      fontWeight: 700,
      fontSize: '2.2rem'
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem'
    },
    h5: {
      fontWeight: 500
    },
    h6: {
      fontWeight: 500,
    },
    body2: {
      fontSize: '0.9rem',
      color: 'rgba(0, 0, 0, 0.55)'
    }
  },
});

var allVids = [];
const datasetOpts = [
  'OpeningAngle_64x64_0.20-0.39',
  'OpeningAngle_64x64_0.39-0.59',
  'OpeningAngle_64x64_0.59-0.79',
  'OpeningAngle_64x64_0.79-0.98',
  'OpeningAngle_64x64_0.98-1.18',
  'OpeningAngle_64x64_1.18-1.37',
];
const NOpts = ['2'];
const KOpts = ['1', '2'];
const nFiltersOpts = ['64'];
const lambdaCycleOpts = ['100.0'];
const lambdaClsOpts = ['0.0', '0.1'];
const genOpts = ['G', 'F'];


function parseVidFn(fullVidFn) {
  // {dataset}_{imageSize}_{datasetRange}_N={N}_K={K}_filters={nFilters}_lcycle={lambdaCycle}_lcls={lambcsCls}_{F|G}.{bunchofnumbers}.mp4
  const vidFn = fullVidFn.split('/').reverse()[0]; // gets basename
  const substrings = vidFn.split('_');
  const vidDataset = substrings[0] + '_' + substrings[1] + '_' + substrings[2]; 
    // {dataset}_{imageSize}_{scaleStart-scaleStop}
  const vidN = substrings[3].split('=')[1];  // N={N}
  const vidK = substrings[4].split('=')[1];  // K={K}
  const vidNFilters = substrings[5].split('=')[1];  // filters={nFilters}
  const vidLambdaCycle = substrings[6].split('=')[1];  // lcycle={lambdaCycle}
  const vidLambdaCls = substrings[7].split('=')[1];  // lcls={lambdaCls}
  const vidGen = substrings[8][0]; // G.mp4 or F.mp4
  return {
    path: fullVidFn, fn: vidFn, dataset: vidDataset, N: vidN, K: vidK,
    nFilters: vidNFilters, lambdaCycle: vidLambdaCycle,
    lambdaCls: vidLambdaCls, gen: vidGen
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);

    // Get all MP4s and their info.
    const allVidFns = this.importAll(require.context('/public/videos/', true, /\.(mp4)$/));
    allVids = allVidFns.map((x) => parseVidFn(x));

    this.state = {
      showVids: [],
      datasetSels: [],
      NSels: [],
      KSels: [],
      nFiltersSels: [],
      lambdaCycleSels: [],
      lambdaClsSels: [],
      genSels: []
    };

    console.log(allVids)
  }

  importAll(r) {
    return r.keys().map(r);
  }

  isSelectedVid = vid => {
    return (this.state.datasetSels.includes(vid.dataset) && 
      this.state.NSels.includes(vid.N) && 
      this.state.KSels.includes(vid.K) &&
      this.state.nFiltersSels.includes(vid.nFilters) &&
      this.state.lambdaCycleSels.includes(vid.lambdaCycle) &&
      this.state.lambdaClsSels.includes(vid.lambdaCls) &&
      this.state.genSels.includes(vid.gen))
  }

  updateVids() {
    this.setState({ showVids: allVids.filter(this.isSelectedVid) })
    // this.state.showVids = allVids.filter(this.isSelectedVid);
    console.log(this.state.showVids)
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
    this.updateVids();
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
    this.updateVids();
  }

  handleKChange = event => {
    var sels = this.state.KSels;
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
    this.setState({ KSels: sels });
    this.updateVids();
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
    this.updateVids();
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
    this.updateVids();
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
    this.updateVids();
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
    this.updateVids();
  }

  renderGrid() {
    return (
      <div class='grid'>
      {
        this.state.showVids.map(
          (vid) => <ImageComponent key={vid.fn} vid={vid}/>
        )
      }
      </div>
    )
  }

  renderDatasetCheckbox() {
    return (
      <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
        {/* <FormLabel component='legend'>Dataset</FormLabel> */}
        <Typography>Dataset</Typography>
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
    )
  }

  renderNCheckbox() {
    return (
      <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
        <Typography>N</Typography>
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
    )
  }

  renderKCheckbox() {
    return (
      <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
        <Typography>K</Typography>
        <FormGroup>
          {
            KOpts.map(
              K => <FormControlLabel key={K}
                control={
                  <Checkbox checked={this.state.KSels.includes(K)}
                    onChange={this.handleKChange} name={K} />
                }
                label={K} />
            )
          }
        </FormGroup>
      </FormControl>
    )
  }

  renderNFiltersCheckbox() {
    return (
      <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
        <Typography>n_filters</Typography>
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
    )
  }

  renderLambdaCycleCheckbox() {
    return (
      <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
        <Typography>lambda_cycle</Typography>
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
    )
  }

  renderLambdaClsCheckbox() {
    return (
      <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
        <Typography>lambda_cls</Typography>
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
    )
  }

  renderGenCheckbox() {
    return (
      <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
        <Typography>Generator</Typography>
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
    )
  }

  render() {
    return (
      <div className='App'>
        <ThemeProvider theme={theme}>
          <Container maxWidth='md' padding={10}>
            <Box m={2} pt={2}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div class='formBox'>{this.renderDatasetCheckbox()}</div>
                </Grid>
                <Grid item xs={3}>
                  <div class='formBox'>{this.renderNCheckbox()}</div>
                </Grid>
                <Grid item xs={3}>
                  <div class='formBox'>{this.renderKCheckbox()}</div>
                </Grid>
                <Grid item xs={3}>
                  <div class='formBox'>{this.renderNFiltersCheckbox()}</div>
                </Grid>
                <Grid item xs={3}>
                  <div class='formBox'>{this.renderLambdaCycleCheckbox()}</div>
                </Grid>
                <Grid item xs={3}>
                  <div class='formBox'>{this.renderLambdaClsCheckbox()}</div>
                </Grid>
                <Grid item xs={3}>
                  <div class='formBox'>{this.renderGenCheckbox()}</div>
                </Grid>
              </Grid>
            </Box>
          </Container>
          
          <Box m={6} pt={2}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Results
            </Typography>
            <hr />
            {this.renderGrid()}
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
