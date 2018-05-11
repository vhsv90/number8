import React, { Component } from 'react';
import { Button, ControlLabel, FieldGroup, FormControl, FormGroup, HelpBlock, Jumbotron } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDays = this.handleChangeDays.bind(this);
    this.handleChangeCountries = this.handleChangeCountries.bind(this);

    this.state = {
      startDate: moment(),
      lastDate: moment(),
      numberOfDays: 0,
      countryCode: '',
      data: [],
    };

  }

  handleChange(date) {
    this.setState({ startDate: date });
  }

  handleChangeDays(e){
    this.setState({ numberOfDays: e.target.value });
    this.setState({ lastDate: moment(this.state.startDate).add(this.state.numberOfDays, 'days') });
  }

  handleChangeCountries(e){
    this.setState({ countryCode: e.target.value });
  }

  async componentDidMount() {

    fetch('https://restcountries.eu/rest/v2/all?fields=name;alpha2Code',{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      this.setState({data: json});
    });

  }

  ResultsItem (item) {
    return <option value={item.alpha2Code}>{item.name}</option>
  }

  render() {
    const selectionRange = {
			startDate: this.state.startDate,
			endDate: this.state.lastDate,
      key: 'selection',
      disabled: true,
      showDateDisplay: true
		}
    return (
      <div className="row">
      <div className="col-sm-6">
        <Jumbotron>
          <h1>Programming Exercise - Number8</h1>
          <p>
            Web-based application that displays a monthly calendar created by Victor Sanchez.
          </p>
          <div className="col-sm-6">
            <form>
              <FormGroup>
                <ControlLabel>Start Date</ControlLabel>
                <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Number of days</ControlLabel>
                <FormControl
                  id="formControlsText"
                  type="number"
                  label="Text"
                  placeholder="Enter text"
                  onChange={this.handleChangeDays}
                  value= {this.state.numberOfDays} />
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Country</ControlLabel>
                <FormControl 
                  componentClass="select" 
                  placeholder="select">
                  {this.state.data.map(d => this.ResultsItem(d))}
                  onChange={this.handleChangeCountries}
                </FormControl>
              </FormGroup>
            </form>
          </div>
        </Jumbotron>
        <div className="col-sm-6">
          <h1>Calendar</h1>
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={this.handleSelect}/>
        </div>        
      </div>      
      </div>      
    );
  }
}

var styles = {
}

export default App;
