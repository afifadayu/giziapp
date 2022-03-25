import React from 'react';
import {Row, Col, Card, Form, Button, Table} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";

class SummaryView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            baby_age: '',
            baby_clinical_issue: '',
            baby_date: '',
            baby_format_type_two: '',
            baby_gender: '',
            baby_height: '',
            baby_intervency_format: '',
            baby_lika: '',
            baby_lila: '',
            baby_name: '',
            baby_nutrition_bb_tb: '',
            baby_nutrition_bbu: '',
            baby_nutrition_tbu: '',
            baby_weight: '',
            coming_date: '',
            district_name: '',
            id: '',
            mother_name: '',
            public_service_center_name: '',
            public_service_center_type: '',
            user_id: '',
            village_name: ''
        };
    }

    //component didmount
    componentDidMount() {
        const babyData = this.props.location.state || {};

        const coming_date_raw = new Date(babyData.coming_date)
        const coming_date_new = coming_date_raw.toLocaleDateString('en-GB').split('/').reverse().join('-');
        console.log(coming_date_new)

        const baby_date_raw = new Date(babyData.baby_date)
        const baby_date_new = baby_date_raw.toLocaleDateString('en-GB').split('/').reverse().join('-');
        console.log(baby_date_new)

        this.setState({
            ...babyData,
            coming_date: coming_date_new,
            baby_date: baby_date_new
        })

    }

    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Detail Data</Card.Title>
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
                                            <th>Status Gizi - BB/U</th>
                                            <th>{this.state.baby_nutrition_bbu}</th>
                                        </tr>
                                        <tr>
                                            <th>Status Gizi - TB/U atau PB/U</th>
                                            <th>{this.state.baby_nutrition_tbu}</th>
                                        </tr>
                                        <tr>
                                            <th>Status Gizi - BB/TB atau PB/TB</th>
                                            <th>{this.state.baby_nutrition_bb_tb}</th>
                                        </tr>
                                        <tr>
                                            <td>Tanggal Kunjungan Tenaga Kesehatan</td>
                                            <td>{this.state.coming_date}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Kecamatan</td>
                                            <td>{this.state.district_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Desa</td>
                                            <td>{this.state.village_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Tipe Pelayanan Kesehatan</td>
                                            <td>{this.state.public_service_center_type}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Pelayanan Kesehatan</td>
                                            <td>{this.state.public_service_center_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Tanggal Lahir Balita</td>
                                            <td>{this.state.baby_date}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Ibu Balita</td>
                                            <td>{this.state.mother_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Balita</td>
                                            <td>{this.state.baby_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Umur Balita</td>
                                            <td>{this.state.baby_age} Bulan</td>
                                        </tr>
                                        <tr>
                                            <td>Jenis Kelamin Balita</td>
                                            <td>{this.state.baby_gender}</td>
                                        </tr>
                                        <tr>
                                            <td>Tinggi Badan Balita</td>
                                            <td>{this.state.baby_height} CM</td>
                                        </tr>
                                        <tr>
                                            <td>Berat Badan Balita</td>
                                            <td>{this.state.baby_weight} KG</td>
                                        </tr>
                                        <tr>
                                            <td>Lingkar Lengkan Atas Balita</td>
                                            <td>{this.state.baby_lila} CM</td>
                                        </tr>
                                        <tr>
                                            <td>Lingkar Kepala Balita</td>
                                            <td>{this.state.baby_lika} CM</td>
                                        </tr>
                                        <tr>
                                            <td>Kelainan Klinis pada Balita</td>
                                            <td>{this.state.baby_clinical_issue}</td>
                                        </tr>
                                        <tr>
                                            <td>Intervensi yang dilakukan</td>
                                            <td>{this.state.baby_intervency_format}</td>
                                        </tr>
                                        <tr>
                                            <td>Intervensi lanjutan yang dilakukan</td>
                                            <td>{this.state.baby_format_type_two}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default SummaryView;
