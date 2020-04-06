import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import LineChart from './LineChart.js';

import { Container, Column, Row } from "react-bootstrap-grid-component";

import './App.css';
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

        casesByDay_Title: 'Cases by Day',
        deathsByDay_Title: 'Deaths by Day',
        casesByDay_Data: [],
        casesByDay_Labels: [],
        deathsByDay_Data: [],
        deathsByDay_Labels: [],

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
        //this.getPopulationData();
        this.getCountyData();
        this.getStateData();
        this.getZipCodeData();
    }

    render() {
        const { isLoading } = this.state;
        if (!isLoading) {
            return (
                <div className="App">
                    <br></br>
                    <br></br>
                    < Container>
                        
                        <h1 className="page-title">Coronavirus Data: Cases and Death Toll</h1>
                        <h4 className="page-title">{this.state.pageTitle}</h4>
                        <Row>
                            <Column size={1}>
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
                            <Column size={1}>
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
                            <Column md="6">
                                <div>
                                    <LineChart
                                        data={this.state.casesByDay_Data}
                                        labels={this.state.casesByDay_Labels}
                                        title={this.state.casesByDay_Title}
                                        color="#b3b3b3"
                                        legend="Cases"
                                        yAxisPosition="right"
                                    />
                                </div>
                            </Column>
                            <Column md="6">
                                <div>
                                    <LineChart
                                        data={this.state.deathsByDay_Data}
                                        labels={this.state.deathsByDay_Labels}
                                        title={this.state.deathsByDay_Title}
                                        color="#b3b3b3"
                                        legend="Deaths"
                                        yAxisPosition="right"
                                    />
                                </div>
                            </Column>
                        </Row ><br></br><br></br><br></br><br></br>
                        <Row>
                            <Column md="6">
                                <div>
                                    <LineChart
                                        data={this.state.delta_casesByDay_Data}
                                        labels={this.state.delta_casesByDay_Labels}
                                        title={this.state.delta_casesByDay_Title}
                                        color="#b3b3b3"
                                        legend="Rate of Change in Cases"
                                        yAxisPosition="right"
                                    />
                                </div>
                            </Column>
                            <Column md="6">
                                <div>
                                    <LineChart
                                        data={this.state.delta_deathsByDay_Data}
                                        labels={this.state.delta_deathsByDay_Labels}
                                        title={this.state.delta_deathsByDay_Title}
                                        color="#b3b3b3"
                                        legend="Rate of Change in Deaths"
                                        yAxisPosition="right"
                                    />
                                </div>
                            </Column>
                        </Row ><br></br><br></br><br></br>
                        {/* <Row>
                            <Column md="6">
                                <div>
                                    <LineChart
                                        data={this.state.projectedCases_Data}
                                        labels={this.state.projectedCases_Labels}
                                        title={this.state.projectedCases_Title}
                                        color="#b3b3b3"
                                        legend="Projected Cases"
                                        yAxisPosition = "right"
                                    />
                                </div>
                            </Column>
                            <Column md="6">
                                <div>
                                    <LineChart
                                        data={this.state.projectedDeaths_Data}
                                        labels={this.state.projectedDeaths_Labels}
                                        title={this.state.projectedDeaths_Title}
                                        color="#b3b3b3"
                                        legend="Projected Deaths"
                                        yAxisPosition = "right"
                                    />
                                </div>
                            </Column>
                        </Row ><br></br><br></br><br></br><br></br> */}
                        <h1 className="page-title">{this.state.tableTitle}</h1>
                        <Row>
                            <Column size={12}>
                                <Table
                                    tableData={this.state.tableData} >
                                </Table>
                            </Column>
                            {/* <Column size={6}>

                            </Column> */}
                        </Row><br></br><br></br>
                    </Container>
                </div>
            );
        }
        else {
            return (
                <div className="App">
                    <br></br>
                    <br></br>
                    < Container>
                        <Row>
                            <Column size={2}>
                                <Select
                                    id="1"
                                    options={this.state.states}
                                    isDisabled={this.state.stateSelectIsDisabled}
                                    placeholder="State"
                                    onSelectionChange={this.onSelectionChange}
                                />
                            </Column>
                            <Column size={2}>
                                <Select
                                    id="2"
                                    options={this.state.counties}
                                    isDisabled={this.state.countySelectIsDisabled}
                                    placeholder="County"
                                    onSelectionChange={this.onSelectionChange}
                                />
                            </Column>
                            <Column size={8}></Column>
                        </Row>
                        <h1 className="page-title">{this.state.pageTitle}</h1>
                    </ Container>
                </div>
            );
        }
    }

    /* 
    ----------------------------------------------------
                    View Logic and Helpers
    ---------------------------------------------------- 
    */

    // Converts CSV data to JSON data
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

    // Renders 4 line charts with data
    getSelectedData(json, selection, isCounty) {

        var caseData = [];
        var deathData = [];
        var caseLabels = [];
        var deathLabels = [];
        var delta_caseData = [];
        var delta_deathData = [];
        var delta_caseLabels = [];
        var delta_deathLabels = [];

        json.forEach(day => {
            var dayLabel = this.dateLabelHelper(day.date);
            var deltaCases = Number((((day.cases / caseData[caseData.length - 2]) - 1) * 100).toFixed(2));
            var deltaDeaths = Number((((day.deaths / deathData[deathData.length - 2]) - 1) * 100).toFixed(2));

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

        var pageTitle = "";
        var tableTitle = "";
        if (isCounty) {
            pageTitle = selection + " County, " + this.state.selectedState;
            tableTitle = "Statistics: By County"
        }
        else {
            this.getTableData(selection);
            pageTitle = selection;
            if(selection !== "United States of America") tableTitle = "Statistics: By County"
            else tableTitle = "Statistics: By State"
        }

        this.setState({
            isLoading: false,
            pageTitle: pageTitle,
            tableTitle: tableTitle,
            casesByDay_Data: caseData,
            casesByDay_Labels: caseLabels,
            deathsByDay_Data: deathData,
            deathsByDay_Labels: deathLabels,
            delta_casesByDay_Data: delta_caseData,
            delta_casesByDay_Labels: delta_caseLabels,
            delta_deathsByDay_Data: delta_deathData,
            delta_deathsByDay_Labels: delta_deathLabels
        });

        //this.getProjectedData();
    }

    getTableData(selection) {
        var groupedJSON = [];
        var population = [];
        if (selection === "United States of America") {
            groupedJSON = _.groupBy(this.state.USData_JSON, state => { return state.state });
            population = this.state.populationByState;
        }
        else {
            groupedJSON = _.filter(this.state.selectedStateData_JSON, item => { return item.state === selection });
            groupedJSON = _.groupBy(groupedJSON, item => { return item.county });
        }

        var json = [];
        Object.keys(groupedJSON).forEach(item => {
            //var statePopulation = population.filter(x => x.state === item);
            //console.log(population)
            var cases = Number(groupedJSON[item][groupedJSON[item].length - 1].cases);
            var deaths = Number(groupedJSON[item][groupedJSON[item].length - 1].deaths);
            json.push({
                name: item,
                cases: cases,
                deaths: deaths,
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

    getProjectedData() {
        var casesPastWeek = this.state.delta_casesByDay_Data.slice(this.state.delta_casesByDay_Data.length - 8, this.state.delta_casesByDay_Data.length - 1)
        var deathsPastWeek = this.state.delta_deathsByDay_Data.slice(this.state.delta_deathsByDay_Data.length - 8, this.state.delta_deathsByDay_Data.length - 1)

        var casesChangeByDay = [];
        var deathsChangeByDay = [];

        for (var i = 0; i < casesPastWeek.length - 1; i++) {
            casesChangeByDay.push(casesPastWeek[i + 1] - casesPastWeek[i]);
        }
        var caseAverage = 0;
        for (var i = 0; i < casesChangeByDay.length; i++) {
            caseAverage += casesChangeByDay[i];
        }
        caseAverage = caseAverage / casesChangeByDay.length;
        //console.log(caseAverage);]
        console.log(casesPastWeek);

        for (var i = 0; i < deathsPastWeek.length - 1; i++) {
            deathsChangeByDay.push(deathsPastWeek[i + 1] - deathsPastWeek[i]);
        }
        var deathAverage = 0;
        for (var i = 0; i < deathsChangeByDay.length; i++) {
            deathAverage += deathsChangeByDay[i];
        }
        deathAverage = deathAverage / deathsChangeByDay.length;
        //console.log(deathAverage);

        var futureCases = [];
        var futureDeaths = [];

        var casesByDay = this.state.casesByDay_Data;
        var deathsByDay = this.state.deathsByDay_Data;

        var labels = this.state.casesByDay_Labels;

        for (var i = 0; i < 14; i++) {
            var change = (casesByDay[casesByDay.length - 1] - casesByDay[casesByDay.length - 2] * (1 - (caseAverage / 100)));
            console.log(change)
            var newCasePoint = casesByDay[casesByDay.length - 1] + change;

            change = (deathsByDay[deathsByDay.length - 1] - deathsByDay[deathsByDay.length - 2] * (1 - (deathAverage / 100)));
            var newDeathPoint = deathsByDay[deathsByDay.length - 1] + change;

            futureCases.push(Math.round(newCasePoint));
            futureDeaths.push(Math.round(newDeathPoint));

            labels.push("04/" + (i + 6));

            casesByDay.push(Math.round(newCasePoint))
            deathsByDay.push(Math.round(newDeathPoint));
        }

        console.log(this.state.casesByDay_Data)
        // console.log(casesByDay);
        // console.log(deathsByDay);
        // console.log(futureCases);
        // console.log(futureDeaths);

        this.setState({
            projectedCases_Data: casesByDay,
            projectedCases_Labels: labels,
            projectedDeaths_Data: deathsByDay,
            projectedDeaths_Labels: labels,
        });
    }

    /* 
    ----------------------------------------------------
                        API Calls
    ---------------------------------------------------- 
    */

    getPopulationData() {
        axios.get('https://raw.githubusercontent.com/brian-philip-dwyer/coronavirus-nyc-app/master/public/population_data.csv')
            .then((response) => {
                var json = this.csvJSON(response.data);
                var jsonString = JSON.stringify(json);
                for (var i = 0; i < jsonString.length - 1; i++) {
                    if ((jsonString[i] === '\\' && jsonString[i + 1] === "r") || jsonString[i] === '\\') {
                        jsonString = jsonString.replace(jsonString[i + 1], "");
                        jsonString = jsonString.replace(jsonString[i], "");

                    }
                }
                for (var i = 0; i < jsonString.length; i++) {
                    if (jsonString[i] === '\\') {
                        jsonString = jsonString.replace(jsonString[i], "");
                    }
                }
                jsonString = JSON.parse(jsonString);

                var byState = _.groupBy(jsonString, item => {
                    item.county = item.county.replace(' County', '');
                    return item.state
                })

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

    getCountyData() {
        axios.get('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv')
            .then((response) => {
                var json = this.csvJSON(response.data);

                // States array;
                var statesJSON = _.groupBy(json, item => { return item.state });
                var states = [];
                Object.keys(statesJSON).forEach(key => states.push(key));
                //states.splice(states.indexOf("District of Columbia"), 1);
                //states.push("Washington, D.C.");
                states = states.sort();
                states.splice(states.indexOf("Northern Mariana Islands"), 1);
                states.unshift("United States");
                this.setState({
                    states: states,
                    selectedStateData_JSON: json
                });
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

    getZipCodeData() {
        axios.get('https://raw.githubusercontent.com/nychealth/coronavirus-data/master/tests-by-zcta.csv')
            .then((response) => {
                var json = this.csvJSON(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

}

export default App;