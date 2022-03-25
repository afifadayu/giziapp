import React from 'react';
import {
    Row, Col, Card, Table, Button, Pagination, Modal
} from 'react-bootstrap';
import axios from 'axios';
import { CSVLink } from "react-csv";

import url from '../../url';
import Aux from "../../hoc/_Aux";

class AksesData extends React.Component {
    constructor(){
        super()
        this.state = {
            show: false,
            showDownload: false,
            selectDelete: {},
            data: [],
            isLoading: true,
            page: 1,
            count: 0,
            csv: [],
            limit: 50
        }
        this.onHandleClose = this.onHandleClose.bind(this)
        this.onHandleShow = this.onHandleShow.bind(this)
        this.onHandleCloseDownload = this.onHandleCloseDownload.bind(this)
        this.onHandleShowDownload = this.onHandleShowDownload.bind(this)
        this.deleteData = this.deleteData.bind(this)
        this.onHandleClickPaggination = this.onHandleClickPaggination.bind(this)
        this.prepareDownload = this.prepareDownload.bind(this)
    }

    
    componentDidMount() {
        axios.get(`${url}/get-data?page=1`)
            .then(response => {
                this.setState({
                    data: response.data.data,
                    isLoading: false,
                    count: response.data.count,
                    page: Number(response.data.page)
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: true
                })
            });
    }

    onHandleClose(){
        this.setState({
            show:false
        })
    }

    onHandleShow(dataListBaby){
        this.setState({
            show:true,
            selectDelete:dataListBaby
        })
    }

    onHandleCloseDownload() {
        this.setState({
            showDownload: false
        })
    }

    onHandleShowDownload() {
        this.setState({
            showDownload: true,
        })
    }


    onHandleClickPaggination(page){
        this.setState({
            isLoading: true
        })
        axios.get(`${url}/get-data?page=${page}`)
            .then(response => {
                this.setState({
                    data: response.data.data,
                    isLoading: false,
                    count: response.data.count,
                    page: Number(response.data.page)
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: true
                })
            });        
    }

    deleteData(id){
        axios.delete(`${url}/delete-data`, { data: { id: this.state.selectDelete.id }})
            .then(response => {
                const dataStore = [...this.state.data] //duplicate data
                const index = dataStore.findIndex((element) => element.id == this.state.selectDelete.id);
                dataStore.splice(index, 1);

                this.setState({
                    data: dataStore,
                    show: false
                })
            }).catch((error) => {
            });

    }

    async prepareDownload(){
        try {
            const response = await axios.get(`${url}/get-data`)
            this.setState({
                csv:response.data.data
            },() => 
                this.onHandleShowDownload()
            )
        } catch (error) {
            alert("Tidak bisa mengunduh data!")   
        }
    }

    render() {
        let active = this.state.page;
        let activeItems = [];
        let maxPage = Math.ceil(this.state.count/this.state.limit);
        let startPage = this.state.page >= 3 ? this.state.page-2 : 1
        let countPage = maxPage

        if(maxPage >= 3 && this.state.page >= maxPage-2){
            startPage = maxPage-4
            countPage = startPage+4
        }
        for (let number = startPage; number <= countPage; number++) {
            activeItems.push(
                <Pagination.Item key={number} active={number === active} onClick={() => this.onHandleClickPaggination(number)}>
                    {number}
                </Pagination.Item>
            );
        }

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Tabel Balita dalam Operasi Timbang 2022</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                
                                <Button variant="primary" onClick={this.prepareDownload}>
                                    Unduh Data
                                </Button>
                                
                                <Table striped responsive>
                                    <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Nama Balita</th>
                                        <th>Tipe Pusat Kesehatan</th>
                                        <th>Nama Pusat Kesehatan</th>
                                        <th>Status Gizi (BB/TB)</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {/* { this.state.isLoading ? <h1>Loading...</h1> :   */}
                                            { this.state.data && this.state.data.map((dataListBaby, index) => {
                                            return(<tr key={`listData-${dataListBaby.id}`}>
                                                <th scope="row">{(index+1)+((this.state.page-1)*50)}</th>
                                                <td>{dataListBaby.baby_name}</td>
                                                <td>{dataListBaby.public_service_center_type}</td>
                                                <td>{dataListBaby.public_service_center_name}</td>
                                                <td>{dataListBaby.baby_nutrition_bb_tb}</td>
                                                <td>
                                                    <i 
                                                        className="feather icon-info" 
                                                        style={{ fontSize: 20, color: '#3ebfea' }} 
                                                        onClick={() => this.props.history.push('/detail-data', dataListBaby)}
                                                    />
                                                    <i
                                                        className="feather icon-edit"
                                                        style={{ marginLeft: 12, fontSize: 20, color: '#748892' }}
                                                        onClick={() => this.props.history.push('/edit-data', dataListBaby)}
                                                    />
                                                    <i
                                                        className="feather icon-trash"
                                                        style={{ marginLeft: 12, fontSize: 20, color: '#f44236' }}
                                                        onClick={() => this.onHandleShow(dataListBaby)}
                                                    />
                                                </td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                            <div style={{ alignSelf: 'flex-end', padding: 20 }}>
                                <Pagination>
                                    <Pagination.First disabled={this.state.page == 1} onClick={() => this.onHandleClickPaggination(1)} />
                                    <Pagination.Prev disabled={this.state.page == 1} onClick={() => this.onHandleClickPaggination(this.state.page - 1)} />
                                    {activeItems}
                                    <Pagination.Next disabled={maxPage == this.state.page} onClick={() => this.onHandleClickPaggination(this.state.page + 1)} />
                                    <Pagination.Last disabled={maxPage == this.state.page} onClick={() => this.onHandleClickPaggination(Math.ceil(this.state.count / this.state.limit))} />
                                </Pagination>
                            </div>
                            
                            <Modal show={this.state.show} onHide={this.onHandleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Hapus Data</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Anda yakin menghapus {this.state.selectDelete.babyName}?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.onHandleClose}>
                                        Tutup
                                    </Button>
                                    <Button variant="primary" onClick={this.deleteData}>
                                        Hapus
                                    </Button> 
                                </Modal.Footer>
                            </Modal>

{/* //CSV */}
                            <Modal show={this.state.showDownload} onHide={this.onHandleCloseDownload}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Unduh Data</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Anda yakin mengunduh Data?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.onHandleCloseDownload}>
                                        Tutup
                                    </Button>
                                    <CSVLink
                                        data={this.state.csv}
                                        // asyncOnClick={true}
                                        filename='gizi_app_data'
                                        // onClick={(event, done) => {
                                        //     console.log('kepanggil')
                                        //     axios.get(`${url}/get-data`).then((response) => {
                                        //         console.log('kepanggil didalam axios', response.data.data)
                                        //         this.setState({
                                        //             csv: response.data.data
                                        //         })
                                        //         done(true)
                                        //     });
                                        // }}
                                        onClick={() => this.onHandleCloseDownload()}
                                    >
                                    <Button variant="primary">
                                            Unduh
                                    </Button>
                                    </CSVLink>
                                </Modal.Footer>
                            </Modal>

                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default AksesData;