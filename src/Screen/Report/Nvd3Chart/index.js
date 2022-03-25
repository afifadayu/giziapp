import React from 'react';
import axios from 'axios'
import { Row, Col, Card, Button, Table, Tabs, Tab } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux/index";
import MultiBarChart from "./MultiBarChart";
import PieDonutChart from "./PieDonutChart";
import url from '../../../url';

import DEMO from "../../../store/constant";
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';

class Nvd3Chart extends React.Component {
    constructor(){
        super();
        this.state = {
            max: '',
            min: '',
            avg: '',
            maxH: '',
            minH: '',
            avgH: '',
            topEight: [],
            nutritionStatus: []
        }
    }

    componentDidMount() {
        axios.get(`${url}/max-weight`)
            .then(response => {
                this.setState({
                    max: response.data.max
                })
            })
            .catch((error) => {
            });
        
        axios.get(`${url}/min-weight`)
            .then(response => {
                this.setState({
                    min: response.data.min
                })
            })
            .catch((error) => {
            });

        axios.get(`${url}/avg-weight`)
            .then(response => {
                this.setState({
                    avg: response.data.avg
                })
            })
            .catch((error) => {
            });

        axios.get(`${url}/max-height`)
            .then(response => {
                this.setState({
                    maxH: response.data.max
                })
            })
            .catch((error) => {
            });

        axios.get(`${url}/min-height`)
            .then(response => {
                this.setState({
                    minH: response.data.min
                })
            })
            .catch((error) => {
            });

        axios.get(`${url}/avg-height`)
            .then(response => {
                this.setState({
                    avgH: response.data.avg
                })
            })
            .catch((error) => {
            });

        axios.get(`${url}/top-eight`)
            .then(response => {
                this.setState({
                    topEight: response.data
                })
            })
            .catch((error) => {
            });

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
        const tabContent = (
            <Aux>
                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Faktor-Faktor yang mempengaruhi Jumlah Gizi Buruk di Rote Ndao, Nusa Tenggara Timur</Card.Title>
                                <p>Faktor ini berdasarkan Data per Desember 2020 dan dianalisis pada bulan Oktober 2021 menggunakan Regresi <i>Zero-Inflated Poisson</i></p>
                            </Card.Header>
                            <Card.Body>
                                <div className="text-center">
                                    <Button disabled>Jumlah Balita yang mendapat Asi Ekslusif</Button>
                                    {/* <Button disabled>Jumlah Balita yang hadir di posyandu</Button> */}
                                    <Button disabled>Jumlah Sasaran Ibu yang dikonseling</Button>
                                    {/* <Button disabled>Jumlah Ibu Hamil yang Mengikuti Kelas</Button> */}
                                    {/* <Button disabled>Jumlah Balita dengan Pneumonia</Button> */}
                                    <Button disabled>Jumlah remaja putri mendapatkan Tablet Tambah Darah</Button>
                                </div>
                                <div>
                                    <h6 style={{marginTop: 20}}>Anda dapat memprediksi Jumlah Kasus Balita Gizi Buruk dengan menekan Tombol <a href="/analisis-data">Prediksi Kasus Gizi Buruk</a></h6>
                                    <p style={{marginTop: 5}}>
                                        *Tahapan selanjutnya adalah melakukan Operasi Timbang di Pusat Kesehatan Rote Ndao, Nusa Tenggara Timur pada bulan Februari dan Oktober 2022
                                    </p> 
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Tinggi Badan Terbesar Balita</Card.Title>
                                <p>yang hadir di Operasi Timbang</p>
                            </Card.Header>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5" />
                                            {this.state.maxH}
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <h6 className="m-b-0">cm</h6>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Tinggi Badan Terkecil Balita</Card.Title>
                                <p>yang hadir di Operasi Timbang</p>
                            </Card.Header>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5" />
                                            {this.state.minH}
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <h6 className="m-b-0">cm</h6>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Rata-rata Tinggi Badan Balita</Card.Title>
                                <p>yang hadir di Operasi Timbang</p>
                            </Card.Header>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {Number(this.state.avgH).toFixed(2)}
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <h6 className="m-b-0">cm</h6>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Berat Badan Terbesar Balita</Card.Title>
                                <p>yang hadir di Operasi Timbang</p>
                            </Card.Header>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5" />
                                            {this.state.max}
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <h6 className="m-b-0">kg</h6>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Berat Badan Terkecil Balita</Card.Title>
                                <p>yang hadir di Operasi Timbang</p>
                            </Card.Header>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5" />
                                            {this.state.min}
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <h6 className="m-b-0">kg</h6>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Rata-rata Berat Badan Balita</Card.Title>
                                <p>yang hadir di Operasi Timbang</p>
                            </Card.Header>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {Number(this.state.avg).toFixed(2)}
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <h6 className="m-b-0">kg</h6>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Proporsi Status Gizi Balita</Card.Title>
                                BB/TB
                            </Card.Header>
                            <Card.Body className="text-center">
                                <PieDonutChart />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Balita dengan Gizi Buruk Terbanyak</Card.Title>
                                     BB/TB (Tiap Kecamatan)
                                     {/* Saat ini Masih Obesitas */}
                            </Card.Header>
                            <Card.Body>
                                {this.state.topEight.map(topEight => {
                                    return (
                                        <div key={`topEight-key${topEight.district_name}`} className="media friendlist-box align-items-center justify-content-center m-b-15">
                                            <div className="media-body">
                                                <h6 className="m-0 d-inline">{topEight.district_name}</h6>
                                                <span className="float-right d-flex  align-items-center">
                                                    {topEight.count}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })

                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
        return (
            <Col md={12} xl={12} className='m-b-20'>
                {tabContent}
            </Col>
        );
    }
}

export default Nvd3Chart;