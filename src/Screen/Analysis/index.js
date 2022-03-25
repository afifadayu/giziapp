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
                // + (0.02402*this.state.baby_pheum) 
                // + (0.0030224*this.state.baby_posyandu)
                + (0.0117866*this.state.mom_pregnant)
                // - (0.0004679 *this.state.teen_ttd)
        const malnut_before_ceil = Math.exp(exp_malnut_pred).toFixed(2)
        const malnut_pred = Math.ceil(Math.exp(exp_malnut_pred))

       if (!this.state.baby_breastfeed) {
            alert("Wajib mengisi Jumlah Balita yang mendapat Asi Ekslusif!")
            return;
        }
        if (!this.state.mom_consult) {
            alert("Wajib mengisi Jumlah Sasaran Ibu yang dikonseling!")
            return;
        }
        // if (!this.state.baby_pheum) {
        //     alert("Wajib mengisi Jumlah Balita dengan Pneumonia!")
        //     return;
        // }
        // if (!this.state.baby_posyandu) {
        //     alert("Wajib mengisi Jumlah Balita yang hadir di posyandu!")
        //     return;
        // }
        if (!this.state.mom_pregnant) {
            alert("Wajib mengisi Jumlah Ibu Hamil yang Mengikuti Kelas!")
            return;
        }
        // if (!this.state.teen_ttd) {
        //     alert("Wajib mengisi Jumlah remaja putri mendapatkan TTD – Tablet Tambah Darah!")
        //     return;
        // }
        if (Number(this.state.baby_breastfeed) < 0 || Number(this.state.mom_consult) < 0
            // || Number(this.state.baby_pheum) < 0 || Number(this.state.baby_posyandu) < 0
            || Number(this.state.mom_pregnant) < 0) {
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
            malnut_before_ceil: malnut_before_ceil,
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
                                <Card.Title as="h5">Prediksi Kenaikan Jumlah Balita Gizi Buruk</Card.Title>
                                <h6>Prediksi berdasarkan model yang telah dibentuk dari Analisis Statistik dengan Metode Regresi <i>Zero-Inflated Poisson</i>, dengan model prediksi sebagai berikut:</h6>
                                <br/>
                                <p style={{textAlign: "center"}}>log⁡(Jumlah Balita gizi buruk) = 0.6767122 - 0.0291475*Jumlah Balita yang mendapat Asi Ekslusif + 0.0029861*Jumlah Sasaran Ibu yang dikonseling + 0.0117866*Jumlah Ibu Hamil yang Mengikuti Kelas</p>
                                <br/>
                                <p>Catatan: Prediksi ini digunakan untuk melihat Jumlah Balita bergizi buruk di Kabupaten Rote Ndao, Nusa Tenggara Timur</p>
                                <p><span style={{ color: '#cc3300' }}>*</span>) Tanda wajib diisi</p>

                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <Form>
                                            <Form.Group controlId="formASI">
                                                <Form.Label>Jumlah Balita yang mendapat Asi Ekslusif <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Contoh: 60"
                                                    value={this.state.baby_breastfeed}
                                                    onChange={this.onbabyBreastFeedInput}
                                                    />
                                            </Form.Group>
                                            <Form.Group controlId="formConsult">
                                                <Form.Label>Jumlah Sasaran Ibu yang dikonseling <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Contoh: 13"
                                                    value={this.state.mom_consult}
                                                    onChange={this.onMomConsultInput}
                                                />
                                            </Form.Group>
                                            {/* <Form.Group controlId="formPheum">
                                                <Form.Label>Jumlah Balita dengan Pneumonia <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Contoh: 16"
                                                    value={this.state.baby_pheum}
                                                    onChange={this.onBabyPheumInput}
                                                />
                                            </Form.Group> */}
                                        </Form>
                                    </Col>
                                    <Col md={6}>
                                        {/* <Form.Group controlId="formPosy">
                                            <Form.Label>Jumlah Balita yang hadir di posyandu <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Contoh: 20"
                                                value={this.state.baby_posyandu}
                                                onChange={this.onBabyPosyanduInput}
                                            />
                                        </Form.Group> */}
                                        <Form.Group controlId="formPregnant">
                                            <Form.Label>Jumlah Ibu Hamil yang Mengikuti Kelas <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Contoh: 30"
                                                value={this.state.mom_pregnant}
                                                onChange={this.onMomPregnantInput}
                                            />
                                        </Form.Group>
                                        {/* <Form.Group controlId="formTTD">
                                            <Form.Label>Jumlah remaja putri mendapatkan TTD – Tablet Tambah Darah <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Contoh: 10"
                                                value={this.state.teen_ttd}
                                                onChange={this.onTeenTTDInput}
                                            />
                                        </Form.Group> */}
                                    </Col>
                                </Row>
                                <Button variant="primary" onClick={this.handleSubmitPredict}>
                                    Prediksi
                                </Button>
                                <Modal show={this.state.show} onHide={this.onHandleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Hasil Prediksi: {this.state.malnut_before_ceil} ≈ {this.state.malnut_pred}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <h6> Jumlah gizi buruk akan naik sebanyak {this.state.malnut_pred} apabila,
                                        <br/> Jumlah Balita yang mendapat Asi Ekslusif: {this.state.baby_breastfeed}
                                        <br/> Jumlah Sasaran Ibu yang dikonseling: {this.state.mom_consult}
                                        {/* <br/> Jumlah Balita dengan Pneumonia: {this.state.baby_pheum}
                                        <br/> Jumlah Balita yang hadir di posyandu: {this.state.baby_posyandu} */}
                                        <br/> Jumlah Ibu Hamil yang Mengikuti Kelas: {this.state.mom_pregnant}
                                        {/* <br/> Jumlah remaja putri mendapatkan TTD: {this.state.teen_ttd} */}
                                        </h6>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.onHandleClose}>
                                            Tutup
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default  withCookies(Analysis);
