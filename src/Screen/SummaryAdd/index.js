import React from 'react';
import {Row, Col, Card, Modal, Button, Table} from 'react-bootstrap';
import axios from 'axios';
import jwt, { decode } from 'jsonwebtoken';
import { withCookies, Cookies } from 'react-cookie';

import Aux from "../../hoc/_Aux";
import url from '../../url';

class SummaryAdd extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            comingDate: '',
            districtName:'',
            villageName:'',
            publicServiceCenterType: '',
            publicServiceCenterName: '',
            motherName: '',
            babyDate: '',
            babyName: '',
            babyAge: '',
            babyGender: '',
            babyClinicalIssue: '',
            babyHeight: '',
            babyWeight: '',
            babyLika: '',
            babyLila: '',
            babyIntervencyFormat: '',
            babyFormatTypeTwo: '',
        };
        this.onHandleClose = this.onHandleClose.bind(this)
        this.onHandleShow = this.onHandleShow.bind(this)
        this.addData = this.addData.bind(this)
        this.addDataAgain = this.addDataAgain.bind(this)
        this.saveData = this.saveData.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    //component didmount
    componentDidMount(){
        const token = this.props.cookies.get('token')
        const decode_token = decode(token)
        const babyData = this.props.location.state || {};

        const coming_date_raw = new Date(babyData.coming_date)
        const coming_date_new = coming_date_raw.toLocaleDateString('en-GB').split('/').reverse().join('-');
        console.log(coming_date_new)

        const baby_date_raw = new Date(babyData.baby_date)
        const baby_date_new = baby_date_raw.toLocaleDateString('en-GB').split('/').reverse().join('-');
        console.log(baby_date_new)

        this.setState({
            user_id: decode_token.id, 
            ...babyData,
            coming_date: coming_date_new,
            baby_date: baby_date_new
        })
        
    }
        

        

    onHandleClose() {
        this.setState({
            show: false
        })
    }

    onHandleShow(babyData) {
        this.setState({
            show: true,
            selectSave: babyData
        })
    }

    addData(navigateTo){
        axios.post(`${url}/add-data`, {
            user_id: this.state.user_id,
            coming_date: this.state.comingDate,
            district_name: this.state.districtName,
            village_name: this.state.villageName,
            public_service_center_type: this.state.publicServiceCenterType,
            public_service_center_name: this.state.publicServiceCenterName,
            baby_date: this.state.babyDate,
            mother_name: this.state.motherName,
            baby_name: this.state.babyName,
            baby_age: parseInt(this.state.babyAge),
            baby_gender: this.state.babyGender,
            baby_clinical_issue: this.state.babyClinicalIssue,
            baby_height: parseFloat(this.state.babyHeight),
            baby_weight: parseInt(this.state.babyWeight),
            baby_lika: parseFloat(this.state.babyLika),
            baby_lila: parseFloat(this.state.babyLila),
            baby_intervency_format: this.state.babyIntervencyFormat,
            baby_format_type_two: this.state.babyFormatTypeTwo
        })
        .then((response) => {
            if (response.data.status == "OK") {
                this.props.history.push(navigateTo)
            }
        })
        .catch((error) => {
                alert("Data yang dimasukkan kurang!")
                console.log(error)
        });
    }

    addDataAgain(){
        this.addData('/tambah-data')
    }

    saveData(){
        this.addData('/akses-data')
    }

    goBack(){
        this.props.history.goBack();
    }

    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Detail Data yang Dimasukkan</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table striped responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>{this.state.id}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Tanggal Kunjungan Tenaga Kesehatan</td>
                                            <td>{this.state.comingDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Kecamatan</td>
                                            <td>{this.state.districtName}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Desa</td>
                                            <td>{this.state.villageName}</td>
                                        </tr>
                                        <tr>
                                            <td>Tipe Pelayanan Kesehatan</td>
                                            <td>{this.state.publicServiceCenterType}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Pelayanan Kesehatan</td>
                                            <td>{this.state.publicServiceCenterName}</td>
                                        </tr>
                                        <tr>
                                            <td>Tanggal Lahir Balita</td>
                                            <td>{this.state.babyDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Ibu Balita</td>
                                            <td>{this.state.motherName}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Balita</td>
                                            <td>{this.state.babyName}</td>
                                        </tr>
                                        <tr>
                                            <td>Umur Balita</td>
                                            <td>{this.state.babyAge}</td>
                                        </tr>
                                        <tr>
                                            <td>Jenis Kelamin Balita</td>
                                            <td>{this.state.babyGender}</td>
                                        </tr>
                                        <tr>
                                            <td>Tinggi Badan Balita</td>
                                            <td>{this.state.babyHeight}</td>
                                        </tr>
                                        <tr>
                                            <td>Berat Badan Balita</td>
                                            <td>{this.state.babyWeight}</td>
                                        </tr>
                                        <tr>
                                            <td>Lingkar Kaki Balita</td>
                                            <td>{this.state.babyLika}</td>
                                        </tr>
                                        <tr>
                                            <td>Lingkar Kepala Balita</td>
                                            <td>{this.state.babyLila}</td>
                                        </tr>
                                        <tr>
                                            <td>Kelainan Klinis pada Balita</td>
                                            <td>{this.state.babyClinicalIssue}</td>
                                        </tr>
                                        <tr>
                                            <td>Intervensi yang dilakukan</td>
                                            <td>{this.state.babyIntervencyFormat}</td>
                                        </tr>
                                        <tr>
                                            <td>Intervensi lanjutan yang dilakukan</td>
                                            <td>{this.state.babyFormatTypeTwo}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Button variant="primary" onClick={() => { this.onHandleShow(this.state.babyData)}}>
                                    Simpan
                                </Button>
                                <Button variant="secondary" onClick={this.goBack}>
                                    Kembali
                                </Button>
                            </Card.Body>


                            <Modal show={this.state.show} onHide={this.onHandleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Menyimpan Data</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Apakah anda akan memasukkan data kembali?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.addDataAgain}>
                                        Ya
                                    </Button>
                                    <Button variant="primary" onClick={this.saveData}>
                                        Tidak, Simpan
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Card>
                    </Col>
                    
                </Row>
            </Aux>
        );
    }
}

export default withCookies(SummaryAdd);
