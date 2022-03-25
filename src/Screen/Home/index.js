import React from 'react';
import axios from 'axios';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import jwt, { decode } from 'jsonwebtoken';
import { withCookies, Cookies } from 'react-cookie';

import Aux from "../../hoc/_Aux";
import url from '../../url';

class Analysis extends React.Component {
    constructor(props){
        super(props)
        // this.handleSubmitAdd = this.handleSubmitAdd.bind(this)
        this.state = {
            user_id: '',
            baby_breastfeed: '',
            mom_consult: '',
            baby_pheum: '',
            baby_posyandu: '',
            mom_pregnant: '',
            teen_ttd: '',
            malnutrition_pred: '',
            show: false
        };
        this.onbabyBreastFeedInput = this.onbabyBreastFeedInput.bind(this);
        this.onMomConsultInput = this.onMomConsultInput.bind(this);
        this.onBabyPheumInput = this.onBabyPheumInput.bind(this);
        this.onBabyPosyanduInput = this.onBabyPosyanduInput.bind(this);
        this.onMomPregnantInput = this.onMomPregnantInput.bind(this);
        this.onTeenTTDInput = this.onTeenTTDInput.bind(this);
        this.handleSubmitPredict = this.handleSubmitPredict.bind(this);
        this.onHandleClose = this.onHandleClose.bind(this);
        this.onHandleShow = this.onHandleShow.bind(this);
    }

    componentDidMount(){
        const token = this.props.cookies.get('token')
        const decode_token = decode(token)
        this.setState({
            user_id: decode_token.id
        })
    }

    //event choose
    onbabyBreastFeedInput(event) {
        this.setState({
            baby_breastfeed: event.target.value,
        })
    }
    
    onBabyPheumInput(event) {
        this.setState({
            baby_pheum: event.target.value,
        })
    }

    onMomConsultInput(event) {
        this.setState({
            mom_consult: event.target.value,
        })
    }

    onBabyPosyanduInput(event) {
        this.setState({
            baby_posyandu: event.target.value,
        })
    }

    onMomPregnantInput(event) {
        this.setState({
            mom_pregnant: event.target.value,
        })
    }

    onTeenTTDInput(event) {
        this.setState({
            teen_ttd: event.target.value,
        })
    }

    onHandleClose() {
        this.setState({
            show: false,
            baby_breastfeed: '',
            mom_consult: '',
            baby_pheum: '',
            baby_posyandu: '',
            mom_pregnant: '',
            teen_ttd: '',
            malnutrition_pred: ''
        }, () =>
            this.props.history.push('/analisis-data')
        )
    }

    onHandleShow() {
        this.setState({
            show: true,
        })
    }

    handleSubmitPredict() {
        const exp_malnut_pred = 0.6767122-(0.0291475*this.state.baby_breastfeed)
                + (0.0029861*this.state.mom_consult)
                - (0.02402*this.state.baby_pheum) 
                + (0.0030224*this.state.baby_posyandu)
                + (0.0117866*this.state.mom_pregnant)
                - (0.0004679 *this.state.teen_ttd)
        const malnut_pred = Math.ceil(Math.exp(exp_malnut_pred))

       if (!this.state.baby_breastfeed) {
            alert("Wajib mengisi Jumlah Balita yang mendapat Asi Ekslusif!")
            return;
        }
        if (!this.state.mom_consult) {
            alert("Wajib mengisi Jumlah Sasaran Ibu yang dikonseling!")
            return;
        }
        if (!this.state.baby_pheum) {
            alert("Wajib mengisi Jumlah Balita dengan Pneumonia!")
            return;
        }
        if (!this.state.baby_posyandu) {
            alert("Wajib mengisi Jumlah Balita yang hadir di posyandu!")
            return;
        }
        if (!this.state.mom_pregnant) {
            alert("Wajib mengisi Jumlah Ibu Hamil yang Mengikuti Kelas!")
            return;
        }
        if (!this.state.teen_ttd) {
            alert("Wajib mengisi Jumlah remaja putri mendapatkan TTD – Tablet Tambah Darah!")
            return;
        }
        if (Number(this.state.baby_breastfeed) < 0 || Number(this.state.mom_consult) < 0
            || Number(this.state.baby_pheum) < 0 || Number(this.state.baby_posyandu) < 0
            || Number(this.state.mom_pregnant) < 0 || Number(this.state.teen_ttd) < 0) {
            alert("Angka yang diisi harus lebih dari 0!")
            return;
        }
        if (this.state.baby_breastfeed.includes(',') === true || this.state.baby_breastfeed.includes('.') === true
            || this.state.mom_consult.includes(',') === true || this.state.mom_consult.includes('.') === true
            || this.state.baby_pheum.includes(',') === true || this.state.baby_pheum.includes('.') === true
            || this.state.baby_posyandu.includes(',') === true || this.state.baby_posyandu.includes('.') === true
            || this.state.mom_pregnant.includes(',') === true || this.state.mom_pregnant.includes('.') === true
            || this.state.teen_ttd.includes(',') === true || this.state.baby_breastfeed.includes('.') === true) {
            alert("Tidak boleh berisi koma!")
            return;
        }

        const body = {
            user_id: parseInt(this.state.user_id),
            baby_breastfeed: parseInt(this.state.baby_breastfeed),
            mom_consult: parseInt(this.state.mom_consult),
            baby_pheum: parseInt(this.state.baby_pheum),
            baby_posyandu: parseInt(this.state.baby_posyandu),
            mom_pregnant: parseInt(this.state.mom_pregnant),
            teen_ttd: parseInt(this.state.teen_ttd),
            malnutrition_pred: malnut_pred,
        }
        console.log(body, '<---body')
        axios.post(`${url}/predict-data`, {
            user_id: body.user_id,
            baby_breastfeed: body.baby_breastfeed,
            mom_consult: body.mom_consult,
            baby_pheum: body.baby_pheum,
            baby_posyandu: body.baby_posyandu,
            mom_pregnant: body.mom_pregnant,
            teen_ttd: body.teen_ttd, 
            malnutrition_pred: body.malnutrition_pred
        })
        
        .then((response) => {
            console.log(response, "<<<-RESPONSE")
            if (response.data.status == "OK") {
            }
        })
        .catch((error) => {
            console.log(error, "<<== error")
        });
              
        this.setState({
            malnut_pred: malnut_pred
        }, () =>
                this.onHandleShow()
        )

    }

    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Selamat Datang di GiziApp</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div style={{ marginBottom: 30, lineHeight: 1.5 }}>
                                    <h6>Aplikasi berbasis <i>website</i> bernama <b>GiziApp</b> adalah Aplikasi yang dirancang untuk memprediksi Jumlah Kasus Balita Gizi Buruk menggunakan
                                    Analisis Statistik dengan metode Regresi <i>Zero-Inflated Poisson</i> dan melakukan Operasi Timbang di Rote Ndao, Nusa Tenggara Timur.</h6>
                                    <h6>Apabila ada pertanyaan, dapat ajukan ke: <b>08111666344 (Afifa)</b>.</h6>
                                </div>
                                <Row>
                                    <Col md={8} style={{ marginBottom: 30}}>
                                        <h6><b>Tata Cara Penggunaan Aplikasi GiziApp</b></h6>
                                        <h6>Terdapat 2 Bagian untuk GiziApp, yaitu:</h6>
                                        <ol>
                                            <b><li>Prediksi Kasus Gizi Buruk</li></b>
                                            <ul>
                                                <li>Masuk ke Halaman <a href="/analisis-data">Prediksi Kasus Gizi Buruk</a></li>
                                                <li>Masukkan Angka dari yang menjadi Faktor Kenaikan Jumlah Kasus Balita Gizi Buruk (Untuk melihat Faktor-faktor, Anda dapat menuju ke Halaman <a href="/laporan">Laporan Gizi Balita</a></li>
                                                <li>Tekan tombol <b>Prediksi</b></li>
                                                <li>Untuk kembali ke halaman, Anda dapat menekan tombol <b>Kembali</b></li>
                                            </ul>
                                            <b><li>Melakukan Pengisian Data dan Mengakses Data pada Operasi Timbang</li></b>
                                            <ul>   
                                                <li>Masuk ke Halaman <a href="/tambah-data">Masukkan Data</a></li>
                                                <li>Masukkan <i>entry</i> data yang sesuai</li>
                                                <li>Tekan tombol <b>Tambah Data</b></li>
                                                <li>Anda akan melihat <b>Ringkasan Data</b> yang telah Anda masukkan, dan dapat menekan Tombol <b>Kembali</b> atau <b>Simpan</b></li>
                                                <li>Apabila telah selesai, Anda akan menuju <a href="/akses-data">Akses Data Balita</a> atau kembali ke Halaman <a href="/tambah-data">Masukkan Data Balita</a></li>
                                                <li>Jika Anda masuk ke halaman Akses Data, anda dapat <b>Melihat Ringkasan</b>, <b>Mengedit</b>, <b>Menghapus</b>, dan <b>Mengunduh</b> Data</li>
                                                <li>Untuk melihat laporan, Anda dapat menekan tombol <a href="/laporan">Laporan Gizi Balita</a></li>
                                            </ul>
                                        </ol>
                                    </Col>
                                    <Col md={4} style={{ marginBottom: 30 }}>
                                        <h6><b>Halaman pada Aplikasi GiziApp</b></h6>
                                        <Button onClick={() => this.props.history.push('/laporan')}>Laporan Gizi</Button>
                                        <Button onClick={() => this.props.history.push('/analisis-data')}>Prediksi Kasus Balita Gizi Buruk</Button>
                                        <Button onClick={() => this.props.history.push('/tambah-data')}>Masukkan Data Operasi Timbang</Button>
                                        <Button onClick={() => this.props.history.push('/akses-data')}>Akses Data Operasi Timbang</Button>
                                    </Col>
                                </Row>
                                

                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default  withCookies(Analysis);
