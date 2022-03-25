import React from 'react';
import NVD3Chart from 'react-nvd3';
import axios from 'axios'
import url from '../../../url';

class PieDonutChart extends React.Component {
    constructor(){
        super()
        this.state = {
            nutritionStatus: []
        }
    }

    componentDidMount() {
        axios.get(`${url}/nutrition-status`)
            .then(response => {
                this.setState({
                    nutritionStatus: response.data
                })
            })
            .catch((error) => {
            });
    }

    render() {
        const color = ["#286FB4", "#DF4C73", "#B0DDE4", "#3ebfea", "#4F5467", "#E2F0F9", "#a389d4", "#FE8A7D"]

        const datum = this.state.nutritionStatus.map((nutrition,index) => {
            return{
                key: nutrition.baby_nutrition_bb_tb,
                y: nutrition.count,
                color: color[index]
            }
        })
        return <NVD3Chart id="chart" height={300} type="pieChart" datum={datum} x="key" y="y" donut labelType='percent' />
    }
}

export default PieDonutChart;