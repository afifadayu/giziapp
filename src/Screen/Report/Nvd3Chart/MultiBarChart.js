import React from 'react';
import NVD3Chart from 'react-nvd3';
import axios from 'axios'
import url from '../../../url';

function generateNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

function getDatum() {
    let sin = [],
        sin2 = [],
        sin3 = [];

    const len =  35 + (Math.random() * (70-35));
    for (let i = 0; i < len; i++) {
        sin.push({
            'x': i,
            'y': generateNumber(0, 60)
        });
        sin2.push({
            'x': i,
            'y': generateNumber(0, 100)
        });
        sin3.push({
            'x': i,
            'y': generateNumber(0, 30)
        });
    }
    return [
        {
            values: sin,
            key: 'Buruk & Kurang',
            color: '#A389D4'
        },
        {
            values: sin3,
            key: 'Gizi Baik',
            color: '#04a9f5'
        },
        {
            values: sin2,
            key: 'Lebih & Obesitas',
            color: '#E2F0F9',
            area: true
        }
    ];
}

class MultiBarChart extends React.Component {

    constructor() {
        super()
        this.state = {
            lowStatus: [],
            midStatus: [],
            highStatus: []
        }
    }
    
    componentDidMount() {
        axios.get(`${url}/low-status`)
            .then(response => {
                this.setState({
                    lowStatus: response.data
                })
            })
            .catch((error) => {
            });
        axios.get(`${url}/mid-status`)
            .then(response => {
                this.setState({
                    midStatus: response.data
                })
            })
            .catch((error) => {
            }); 
        
        axios.get(`${url}/high-status`)
            .then(response => {
                this.setState({
                    highStatus: response.data
                })
            })
            .catch((error) => {
            }); 
            
    }

    render() {
        const data = getDatum();
        return <NVD3Chart type="multiBarChart" datum={data} x="x" y="y" height={300} showValues groupSpacing={0.2} />
    }
}

export default MultiBarChart;