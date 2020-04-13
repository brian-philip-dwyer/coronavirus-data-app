import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import { Container, Column, Row } from "react-bootstrap-grid-component";
import NumberFormat from 'react-number-format';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import './App.css';
import LineChart from './charts/LineChart.js';
import BarChart from './charts/BarChart.js'
import ShareBar from './misc components/ShareBar.js'
import Select from './material-ui/Select.js';
import Table from './material-ui/Table.js';

class App extends React.Component {

    state = {
        states: [],
        counties: [],
        selectedState: '',
        selectedCounty: '',
        stateSelectIsDisabled: false,
        countySelectIsDisabled: true,

        selectedStateData_JSON: [],
        USData_JSON: [],

        pageTitle: 'Select a State and County',
        isLoading: true,
        cfr: 0,

        casesByDay_Title: 'Cases by Day',
        deathsByDay_Title: 'Deaths by Day',
        casesByDay_Data: [],
        casesByDay_Labels: [],
        deathsByDay_Data: [],
        deathsByDay_Labels: [],

        casesPerDay_Title: 'Cases per Day',
        deathsPerDay_Title: 'Deaths per Day',
        casesPerDay_Data: [],
        casesPerDay_Labels: [],
        deathsPerDay_Data: [],
        deathsPerDay_Labels: [],

        delta_casesByDay_Title: 'Rate of Change in Cases by Day',
        delta_deathsByDay_Title: 'Rate of Change in Deaths by Day',
        delta_casesByDay_Data: [],
        delta_casesByDay_Labels: [],
        delta_deathsByDay_Data: [],
        delta_deathsByDay_Labels: [],

        tableTitle: "",
        tableData: [],
        populationByState: [],

        projectedCases_Title: "Projected Cases by Day",
        projectedCases_Data: [],
        projectedCases_Labels: [],

        projectedDeaths_Title: "Projected Deaths by Day",
        projectedDeaths_Data: [],
        projectedDeaths_Labels: [],
    };

    componentDidMount() {

        this.getCountyData();
        this.getStateData();
        this.getZipCodeData();
    }

    render() {
        const { isLoading } = this.state;
        if (!isLoading) {
            return (
                <div className="App">
                    <AppBar>
                        <Toolbar>
                            <Container className="share-bar">
                                <Row>
                                    <Column size={9}>
                                        <div className="page-title">Coronavirus Data: {this.state.pageTitle}</div>
                                    </Column>
                                    <Column size={3}>
                                        <div className="share-bar-container">
                                            <ShareBar
                                                title="My title"
                                                shareUrl="https://github.com/brian-philip-dwyer/coronavirus-data-app"
                                            />
                                        </div>
                                    </Column>
                                </Row>
                            </Container>
                        </Toolbar>
                    </AppBar><br></br><br></br><br></br><br></br>

                    <Container className="container">
                        {/* Filter row */}
                        <Row className="filter-row">
                            <Column size={2}>
                                <div className="state-filter">
                                    <Select className="state-selection"
                                        id="1"
                                        options={this.state.states}
                                        isDisabled={this.state.stateSelectIsDisabled}
                                        placeholder="State"
                                        onSelectionChange={this.onSelectionChange}
                                    />
                                </div>
                            </Column>
                            <Column size={2}>
                                <div className="county-filter">
                                    <Select
                                        id="2"
                                        options={this.state.counties}
                                        isDisabled={this.state.countySelectIsDisabled}
                                        placeholder="County"
                                        onSelectionChange={this.onSelectionChange}
                                    />
                                </div>
                            </Column>
                            <Column size={8}></Column>
                        </Row><br></br><br></br>
                        <Row>
                            <Column size={4}>
                                <Card>
                                    <div className="card-title">Total Cases</div>
                                    <div className="card-content"><NumberFormat value={this.state.casesByDay_Data[this.state.casesByDay_Data.length - 1]} thousandSeparator={true} displayType={'text'}></NumberFormat></div>
                                </Card>
                            </Column>
                            <Column size={4}>
                                <Card>
                                    <div className="card-title">Total Deaths</div>
                                    <div className="card-content"><NumberFormat value={this.state.deathsByDay_Data[this.state.deathsByDay_Data.length - 1]} thousandSeparator={true} displayType={'text'}></NumberFormat></div>
                                </Card>
                            </Column>
                            <Column size={4}>
                                <Card>
                                    <div className="card-title">CFR, %<Tooltip title="Case Fatality Rate (Deaths / Cases)"><InfoIcon className="info-icon"></InfoIcon></Tooltip></div>
                                    <div className="card-content">{this.state.cfr}</div>
                                </Card>
                            </Column>
                        </Row><br></br><br></br>
                        
                        {/* Cases charts */}
                        <Row>
                            <Column md={6} xs={12}>
                                <div className="chart-title">Total Cases by Day<Tooltip title="The cumulative amount of confirmed COVID-19 cases, by day."><InfoIcon className="info-icon"></InfoIcon></Tooltip></div>
                            </Column>
                            <Column md={6} xs={12}>
                                <div className="chart-title">Cases per Day<Tooltip title="The count of newly confirmed COVID-19 cases, by day."><InfoIcon className="info-icon"></InfoIcon></Tooltip></div>
                            </Column>
                        </Row>
                        <Row>
                            <Column md={6} xs={12}>
                                <div>
                                    <Card>
                                        <LineChart
                                            data={this.state.casesByDay_Data}
                                            labels={this.state.casesByDay_Labels}
                                            title={this.state.casesByDay_Title}
                                            color="#476685"
                                            legend="Cases"
                                            yAxisPosition="right"
                                        />
                                    </Card>
                                </div>
                            </Column>
                            <Column md={6} xs={12}>
                                <div>
                                    <Card>
                                        <BarChart
                                            data={this.state.casesPerDay_Data}
                                            labels={this.state.casesPerDay_Labels}
                                            title={this.state.casesPerDay_Title}
                                            color="#476685"
                                            legend="Cases"
                                            yAxisPosition="right"
                                        />
                                    </Card>
                                </div>
                            </Column>
                        </Row ><br></br><br></br><br></br>

                        {/* Deaths charts */}
                        <Row>
                            <Column size={6}>
                                <div className="chart-title">Total Deaths by Day<Tooltip title="The cumulative amount of confirmed COVID-19 deaths, by day."><InfoIcon className="info-icon"></InfoIcon></Tooltip></div>
                            </Column>
                            <Column size={6}>
                                <div className="chart-title">Deaths per Day<Tooltip title="The count of newly confirmed COVID-19 deaths, by day."><InfoIcon className="info-icon"></InfoIcon></Tooltip></div>
                            </Column>
                        </Row>
                        <Row>
                            <Column md="6">
                                <div>
                                    <Card>
                                        <LineChart
                                            data={this.state.deathsByDay_Data}
                                            labels={this.state.deathsByDay_Labels}
                                            title={this.state.deathsByDay_Title}
                                            color="#476685"
                                            legend="Deaths"
                                            yAxisPosition="right"
                                        />
                                    </Card>
                                </div>
                            </Column>
                            <Column md="6">
                                <div>
                                    <Card>
                                        <BarChart
                                            data={this.state.deathsPerDay_Data}
                                            labels={this.state.deathsPerDay_Labels}
                                            title={this.state.deathsPerDay_Title}
                                            color="#476685"
                                            legend="Cases"
                                            yAxisPosition="right"
                                        />
                                    </Card>
                                </div>
                            </Column>
                        </Row ><br></br><br></br><br></br>

                        {/* Rate of change row */}
                        {/* <Row>
                            <Column size={6}>
                                <div className="chart-title">Change in Cases by Day<Tooltip title='The rate of increase (positive slope) or decrease (negative slope) in the amount of confirmed cases, by day. This graph is a good indication of whether or not your selected region is "flattening the curve."'><InfoIcon className="info-icon"></InfoIcon></Tooltip></div>
                            </Column>
                            <Column size={6}>
                                <div className="chart-title">Change in Deaths by Day<Tooltip title="The rate of increase (positive slope) or decrease (negative slope) in the amount of confirmed deaths, by day"><InfoIcon className="info-icon"></InfoIcon></Tooltip></div>
                            </Column>
                        </Row>
                        <Row>
                            <Column md="6">
                                <div>
                                    <Card>
                                        <LineChart
                                            data={this.state.delta_casesByDay_Data}
                                            labels={this.state.delta_casesByDay_Labels}
                                            title={this.state.delta_casesByDay_Title}
                                            color="#476685"
                                            legend="Rate of Change in Cases"
                                            yAxisPosition="right"
                                        />
                                    </Card>
                                </div>
                            </Column>
                            <Column md="6">
                                <div>
                                    <Card>
                                        <LineChart
                                            data={this.state.delta_deathsByDay_Data}
                                            labels={this.state.delta_deathsByDay_Labels}
                                            title={this.state.delta_deathsByDay_Title}
                                            color="#476685"
                                            legend="Rate of Change in Deaths"
                                            yAxisPosition="right"
                                        />
                                    </Card>
                                </div>
                            </Column>
                        </Row ><br></br><br></br> */}

                        <div className="chart-title">{this.state.tableTitle}</div>
                        <Row>
                            <Column md={12} xs={12}>
                                <Table
                                    tableData={this.state.tableData}
                                />
                            </Column>
                        </Row><br></br><br></br><br></br>

                        {/* Footer */}
                        <Divider />
                        <footer><br></br>
                            <p className="footer-text">Data source: <a href="https://github.com/nytimes/covid-19-data" target="_blank" rel="noopener noreferrer">New York Times Coronavirus (Covid-19) Data in the United States</a></p>
                            <p className="footer-text">Project GitHub repo: <a href="https://github.com/brian-philip-dwyer/coronavirus-data-app" target="_blank" rel="noopener noreferrer">https://github.com/brian-philip-dwyer/coronavirus-data-app</a></p>
                        </footer>
                    </Container>
                </div>
            );
        }
        else {
            return (
                <div className="App">
                </div>
            );
        }
    }

    /* 
    ----------------------------------------------------
                    View Logic and Helpers
    ---------------------------------------------------- 
    */

    // Select-element callback
    onSelectionChange = ((selection, id) => {
        if (parseInt(id) === 1) {
            if (selection === "United States") {
                this.setState({ countySelectIsDisabled: true })
                this.renderUSCharts();
                return;
            }
            this.getCountyList(selection);
            this.setState({
                selectedState: selection,
                countySelectIsDisabled: false
            });
            var stateJSON = _.filter(this.state.USData_JSON, item => { return item.state === selection });
            this.getSelectedData(stateJSON, selection, false);
        }
        else if (parseInt(id) === 2) {
            this.setState({
                selectedCounty: selection
            });
            var countiesJSON = _.filter(this.state.selectedStateData_JSON, item => { return item.state === this.state.selectedState });
            var selectedCountyJSON = _.filter(countiesJSON, item => { return item.county === selection });
            selectedCountyJSON = JSON.parse(JSON.stringify(selectedCountyJSON));
            this.getSelectedData(selectedCountyJSON, selection, true);
        }
    });

    // Renders 4 line charts with data
    getSelectedData(json, selection, isCounty) {
        var pageTitle = "";
        var tableTitle = "";
        var caseData = [];
        var deathData = [];
        var caseLabels = [];
        var deathLabels = [];
        var delta_caseData = [];
        var delta_deathData = [];
        var delta_caseLabels = [];
        var delta_deathLabels = [];
        var casesPerDayData = [];
        var deathsPerDayData = [];

        // Per day data
        for (var i = 1; i < json.length; i++) {
            casesPerDayData.push(json[i].cases - json[i - 1].cases);
            deathsPerDayData.push(json[i].deaths - json[i - 1].deaths);
        }
        casesPerDayData.unshift(0);
        deathsPerDayData.unshift(0);

        // By day and delta data
        json.forEach(day => {
            var dayLabel = this.dateLabelHelper(day.date);

            var deltaCases = day.cases - caseData[caseData.length - 1];
            var deltaDeaths = day.deaths - deathData[deathData.length - 1];

            caseData.push(day.cases);
            caseLabels.push(dayLabel);
            deathData.push(day.deaths);
            deathLabels.push(dayLabel);
            delta_caseLabels.push(dayLabel);
            delta_deathLabels.push(dayLabel);

            if (!Number.isFinite(deltaCases))
                delta_caseData.push(0);
            else
                delta_caseData.push(deltaCases);
            if (!Number.isFinite(deltaDeaths))
                delta_deathData.push(0);
            else
                delta_deathData.push(deltaDeaths);
        });

        // Page titles
        if (isCounty) {
            if (selection === "New York City") pageTitle = selection + ", " + this.state.selectedState;
            else pageTitle = selection + " County, " + this.state.selectedState;
            tableTitle = "Statistics: By County"
        }
        else {
            this.getTableData(selection);
            pageTitle = selection;
            if (selection !== "United States of America") tableTitle = "Statistics: By County"
            else tableTitle = "Statistics: By State"
        }

        var cfr = ((deathData[deathData.length - 1] / caseData[caseData.length - 1]) * 100).toFixed(2) + "%";

        this.setState({
            isLoading: false,
            pageTitle: pageTitle,
            cfr: cfr,
            tableTitle: tableTitle,
            casesByDay_Data: caseData,
            casesByDay_Labels: caseLabels,
            deathsByDay_Data: deathData,
            deathsByDay_Labels: deathLabels,
            delta_casesByDay_Data: delta_caseData,
            delta_casesByDay_Labels: delta_caseLabels,
            delta_deathsByDay_Data: delta_deathData,
            delta_deathsByDay_Labels: delta_deathLabels,
            casesPerDay_Data: casesPerDayData,
            casesPerDay_Labels: caseLabels,
            deathsPerDay_Data: deathsPerDayData,
            deathsPerDay_Labels: deathLabels
        });

        //this.getProjectedData();
    }

    getTableData(selection) {
        var groupedJSON = [];
        if (selection === "United States of America") {
            groupedJSON = _.groupBy(this.state.USData_JSON, state => { return state.state });
        }
        else {
            groupedJSON = _.filter(this.state.selectedStateData_JSON, item => { return item.state === selection });
            groupedJSON = _.groupBy(groupedJSON, item => { return item.county });
        }

        var json = [];
        Object.keys(groupedJSON).forEach(item => {
            var cases = Number(groupedJSON[item][groupedJSON[item].length - 1].cases);
            var deaths = Number(groupedJSON[item][groupedJSON[item].length - 1].deaths);
            var cases24hours = 0;
            var deaths24hours = 0;
            if (groupedJSON[item].length > 2) {
                cases24hours = cases - Number(groupedJSON[item][groupedJSON[item].length - 2].cases);
                deaths24hours = deaths - Number(groupedJSON[item][groupedJSON[item].length - 2].deaths);
            }
            json.push({
                name: item,
                cases: cases,
                cases24hours: cases24hours,
                deaths: deaths,
                deaths24hours: deaths24hours,
                cfr: (((deaths / cases) * 100).toFixed(2)) + "%",
                perCapita: 0,
            });
        });

        this.setState({
            tableData: json
        });
    }

    // Renders USA data on init
    renderUSCharts() {
        var filteredByDate = _.groupBy(this.state.USData_JSON, item => { return item.date });
        var json = [];
        Object.keys(filteredByDate).forEach(key => {
            var caseSum = 0;
            var deathSum = 0;
            filteredByDate[key].forEach(row => {
                caseSum += Number(row.cases);
                deathSum += Number(row.deaths);
            })
            json.push({
                date: key,
                cases: caseSum,
                deaths: deathSum
            });
        });
        this.getSelectedData(json, "United States of America", false)
    }

    // Converts CSV format to JSON format
    csvJSON(csv) {
        var lines = csv.split("\n");
        var result = [];
        var headers = lines[0].split(",");
        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    }

    // Helper for date labels
    dateLabelHelper(date) {
        var day = date.substring(8, 10);
        var month = date.substring(5, 7);
        return month + "/" + day;
    }

    // Returns list of counties from selected state
    getCountyList(state) {
        var counties = [];
        var countiesJSON = _.filter(this.state.selectedStateData_JSON, item => { return item.state === state });
        countiesJSON = _.groupBy(countiesJSON, item => { return item.county });
        Object.keys(countiesJSON).forEach(key => counties.push(key));
        counties = counties.sort();
        this.setState({
            counties: counties
        });
    }

    /* 
    ----------------------------------------------------
                        API Calls
    ---------------------------------------------------- 
    */

    getCountyData() {
        axios.get('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv')
            .then((response) => {
                var json = this.csvJSON(response.data);
                var statesJSON = _.groupBy(json, item => { return item.state });
                var states = [];
                Object.keys(statesJSON).forEach(key => states.push(key));
                states = states.sort();
                states.splice(states.indexOf("Northern Mariana Islands"), 1);
                states.unshift("United States");
                this.setState({
                    states: states,
                    selectedStateData_JSON: json
                });
            })
            .then(() => {
                //this.getPopulationData();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getStateData() {
        axios.get('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv')
            .then((response) => {
                var json = this.csvJSON(response.data);
                this.setState({
                    USData_JSON: json
                });
                this.renderUSCharts();
            })
            .catch((error) => {

            });
    }

    getPopulationData() {
        axios.get('https://raw.githubusercontent.com/brian-philip-dwyer/coronavirus-nyc-app/master/public/population_data.csv')
            .then((response) => {
                var json = this.csvJSON(response.data);
                var jsonString = JSON.stringify(json);

                for (var i = 0; i < jsonString.length; i++) {
                    if (jsonString[i] === '\\') {
                        jsonString = jsonString.replace(jsonString[i], "");
                        jsonString = jsonString.replace(jsonString[i], "");
                    }
                }
                jsonString = JSON.parse(jsonString);

                var byState = _.groupBy(jsonString, item => {
                    item.county = item.county.replace(' County', '');
                    return item.state;
                });

                var populationByCounty = [];
                Object.keys(byState).forEach(state => {
                    state.forEach(county => {
                        var x = { state: county.state }
                    });
                    var x = { state: state }
                })






                console.log(byState);

                var populationByState = [];
                Object.keys(byState).forEach(state => {
                    var population = 0;
                    byState[state].forEach(county => {
                        population += parseInt(county.population);
                    });
                    populationByState.push({ state: state, population: Number(population) })
                });

                this.setState = ({
                    populationByState: populationByState
                });
            })
            .catch((error) => {

            });
    }

    getZipCodeData() {
        axios.get('https://raw.githubusercontent.com/nychealth/coronavirus-data/master/tests-by-zcta.csv')
            .then((response) => {
                //var json = this.csvJSON(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default App;