import React from 'react';
import axios from 'axios';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import jwt, { decode } from 'jsonwebtoken';
import { withCookies, Cookies } from 'react-cookie';

import Aux from "../../hoc/_Aux";

class InputForm extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this)
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
            babyFormatTypeTwo: ''
        };
        this.onComingDateInput = this.onComingDateInput.bind(this);
        this.onDistrictNameInput = this.onDistrictNameInput.bind(this);
        this.onVillageNameInput = this.onVillageNameInput.bind(this);
        this.onPublicServiceCenterTypeInputPuskesmas = this.onPublicServiceCenterTypeInputPuskesmas.bind(this);
        this.onPublicServiceCenterTypeInputPosyandu = this.onPublicServiceCenterTypeInputPosyandu.bind(this);
        this.onPublicServiceCenterNameInput = this.onPublicServiceCenterNameInput.bind(this);
        this.onMotherNameInput = this.onMotherNameInput.bind(this);
        this.onBabyDateInput = this.onBabyDateInput.bind(this);
        this.onBabyNameInput = this.onBabyNameInput.bind(this);
        this.onBabyAgeInput = this.onBabyAgeInput.bind(this);
        this.onBabyGenderInputMale = this.onBabyGenderInputMale.bind(this);
        this.onBabyGenderInputFemale = this.onBabyGenderInputFemale.bind(this);
        this.onBabyClinicalIssueInput = this.onBabyClinicalIssueInput.bind(this);
        this.onBabyHeightInput = this.onBabyHeightInput.bind(this);
        this.onBabyWeightInput = this.onBabyWeightInput.bind(this);
        this.onBabyLilaInput = this.onBabyLilaInput.bind(this);
        this.onBabyLikaInput = this.onBabyLikaInput.bind(this);
        this.onBabyIntervencyFormatInput = this.onBabyIntervencyFormatInput.bind(this);
        this.onBabyFormatTypeTwoInputRujuk = this.onBabyFormatTypeTwoInputRujuk.bind(this);
        this.onBabyFormatTypeTwoInputPGBT = this.onBabyFormatTypeTwoInputPGBT.bind(this);
    }

    componentDidMount() {
        const token = this.props.cookies.get('token')
        const decode_token = decode(token)
        const public_service_center_type = decode_token.village_name ? "Posyandu" : "Puskesmas"
        this.setState({
            user_id: decode_token.id,
            publicServiceCenterType: public_service_center_type,
            districtName: decode_token.district_name ? decode_token.district_name:"",
            publicServiceCenterName: decode_token.public_service_center_name ? decode_token.public_service_center_name:"",
            // publicServiceCenterType: decode_token.public_service_center_type ? decode_token.public_service_center_type:"",
            villageName: decode_token.village_name ? decode_token.village_name:""
        })
    }

    onComingDateInput(event) {
        this.setState({
            comingDate: event.target.value,
        })
    }

    onDistrictNameInput(event) {
        this.setState({
            districtName: event.target.value,
        })
    }

    onVillageNameInput(event) {
        this.setState({
            villageName: event.target.value,
        })
    }

    onPublicServiceCenterTypeInputPuskesmas(event) {
        if(event.target.value === "on") {
            this.setState({
                publicServiceCenterType: "Puskesmas",
            })
        }   
    }

    onPublicServiceCenterTypeInputPosyandu(event) {
        if (event.target.value === "on") {
            this.setState({
                publicServiceCenterType: "Posyandu",
            })
        }
    }

    onPublicServiceCenterNameInput(event) {
        this.setState({
            publicServiceCenterName: event.target.value,
        })
    }

    onBabyDateInput(event) {
        function calculateAge(birthDate, otherDate) {
            birthDate = new Date(birthDate);
            otherDate = new Date(otherDate);

            var diffTime = otherDate.getTime() - birthDate.getTime();
            var diffDays = diffTime / (1000 * 3600 * 24);

            var age = Math.floor(diffDays/30)
            
            return age;
        }

        const newDate = new Date();
        const dob = event.target.value;

        let babyAgeCalculation = calculateAge(dob, newDate);
        
        this.setState({
            babyDate: event.target.value,
            babyAge: babyAgeCalculation
        })
    }
    
    onMotherNameInput(event) {
        this.setState({
            motherName: event.target.value,
        })
    }

    onBabyNameInput(event) {
        this.setState({
            babyName: event.target.value,
        })
    }

    onBabyAgeInput(event) {
        this.setState({
            babyAge: event.target.value,
        })
    }

    onBabyGenderInputMale(event) {
        if (event.target.value === "on") {
            this.setState({
                babyGender: "Laki-laki",
            })
        }
    }

    onBabyGenderInputFemale(event) {
        if (event.target.value === "on") {
            this.setState({
                babyGender: "Perempuan",
            })
        }
    }

    onBabyClinicalIssueInput(event) {
        this.setState({
            babyClinicalIssue: event.target.value,
        })
    }

    onBabyHeightInput(event) {
        this.setState({
            babyHeight: event.target.value,
        })
    }

    onBabyWeightInput(event) {
        this.setState({
            babyWeight: event.target.value,
        })
    }

    onBabyLikaInput(event) {
        this.setState({
            babyLika: event.target.value,
        })
    }

    onBabyLilaInput(event) {
        this.setState({
            babyLila: event.target.value,
        })
    }

    onBabyIntervencyFormatInput(event) {
        this.setState({
            babyIntervencyFormat: event.target.value,
        })
    }

    onBabyFormatTypeTwoInputRujuk(event) {
        if (event.target.value === "on") {
            this.setState({
                babyFormatTypeTwo: "Rujuk",
            })
        }
    }

    onBabyFormatTypeTwoInputPGBT(event) {
        if (event.target.value === "on") {
            this.setState({
                babyFormatTypeTwo: "PGBT",
            })
        }
    }
    
    //handling
    handleSubmitAdd() {
        //...tidak boleh kosong
        //tgl kunjungan
        //tgl pencatatan,
        //nama ibu, nama bayi, umur bayi,jenis kelamin,tinggi badan, berat badan
    
        if(!this.state.comingDate){
            alert("Tanggal kunjungan tidak boleh kosong!")
            return;
        }
        if (!this.state.babyDate) {
            alert("Tanggal lahir Balita tidak boleh kosong!")
            return;
        }
        if (!this.state.motherName) {
            alert("Nama Ibu tidak boleh kosong!")
            return;
        }
        if (!this.state.babyName) {
            alert("Nama Balita tidak boleh kosong!")
            return;
        }
        if (!this.state.babyGender) {
            alert("Jenis Kelamin Balita tidak boleh kosong!")
            return;
        }
        if (!this.state.babyHeight) {
            alert("Tinggi badan balita tidak boleh kosong!")
            return;
        }
        if (!this.state.babyWeight) {
            alert("Berat badan balita tidak boleh kosong!")
            return;
        }
    
        let newBabyWeight = this.state.babyWeight
        let newBabyHeight = this.state.babyHeight
        let newBabyLila = this.state.babyLila
        let newBabyLika = this.state.babyLika

        if (this.state.babyWeight.includes(',') === true) {
            newBabyWeight = this.state.babyWeight.replace(/,/g,'.')
        }
        if (this.state.babyHeight.includes(',') === true) {
            newBabyHeight = this.state.babyHeight.replace(/,/g, '.')
        }
        if (this.state.babyLika.includes(',') === true) {
            newBabyLika = this.state.babyLika.replace(/,/g, '.')
        }
        if (this.state.babyLila.includes(',') === true) {
            newBabyLila = this.state.babyLila.replace(/,/g, '.')
        }

        // validasi tinggi badan
        if (Number(this.state.babyAge) >= 24 && (Number(newBabyHeight) < 65 || Number(newBabyHeight) > 120)) {
            alert("Tinggi badan bayi harus diantara 65 - 120cm")
            return;
        }    
        if (Number(this.state.babyAge) < 24 && (Number(newBabyHeight) < 45 || Number(newBabyHeight) > 110)) {
            alert("Tinggi badan bayi harus diantara 45 - 110cm")
            return;
        }


        this.props.history.push('/detail-tambah-data', {
            ...this.state,
            babyWeight: newBabyWeight,
            babyHeight: newBabyHeight,
            babyLila: newBabyLila,
            babyLika: newBabyLika,
        })
    }

    villageList(districtName){
        const LANDULLEKO = ['BOLATENA','DAIAMA','DAURENDALE','LIFULEO','PUKUAFU','SOTIMORI','TENALAI']
        const LOAHOLU = ['BALAOLI', 'BONI', 'HOLULAI', 'LIDOR', 'MUNDEK', 'OEBELA', 'OEBOLE', 'OELUA', 'TASILO', 'TOLAMA']
        const LOBALAIN = ['BAADALE', 'BEBALAIN', 'HELEBEIK', 'HOLOAMA', 'KOLOBOLON', 'KULI', 'KULI AISELE', 'LEKUNIK', 'LOLEOEN', 'METINA', 'MOKDALE', 'NAMODALE', 'OELEKA', 'OELUNGGU', 'OEMATAMBOLI', 'SANGGAOEN', 'SUELAIN', 'TUANATUK']
        const NDAONUSE = ['ANARAE', 'MBALI LENDEIKI', 'MBIU LOMBO', 'NDAO NUSE', 'NUSE']
        const PANTAIBARU = ['BATULILOK', 'EDALODE', 'FATELILO', 'KEOEN', 'LEKONA', 'LENUPETU', 'NUSAKDALE', 'OEBAU', 'OELEDO', 'OENGGAE', 'OFALANGGA', 'OLAFULIHAA', 'SONIMANU', 'TESABELA', 'TUNGANAMO']
        const ROTEBARAT = ['BOA', 'MBUEAIN', 'NEMBERALA', 'OELOLOT', 'OENGGAUT', 'OENITAS', 'SEDEOEN']
        const ROTEBARATDAYA = ['BATUTUA', 'DALEK ESA', 'DOLASI', 'FUAFUNI', 'LALUKOEN', 'LANDU', 'LEKIK', 'LENTERA', 'MBOKAK', 'MEOAIN', 'OEBAFFOK', 'OEBATU', 'OEBOU', 'OEHANDI', 'OELASIN', 'OESELI', 'OETEFFU', 'SAKUBATUN', 'SANGAH NDOLU']
        const ROTEBARATLAUT = ['BUSALANGGA', 'BUSALANGGA BARAT', 'BUSALANGGA TIMUR', 'DAUDOLU', 'HUNDIHUK', 'INGGUINAK', 'MODOSINAL', 'NETENAEN', 'OETUTULU', 'SAINDULE', 'TEMAS', 'TUALIMA']
        const ROTESELATAN = ['DALEHOLU', 'DODAEK', 'INAOE', 'LENGUSELU', 'NGGELODAE', 'PILASUE', 'TEBOLE']
        const ROTETENGAH = ['LIDABESI', 'LIDAMANU', 'LIMAKOLI', 'MAUBESI', 'NGGODIMEDA', 'ONATALI', 'SIOMEDA', 'SUEBELA']
        const ROTETIMUR = ['BATEFALU', 'FAIFUA', 'HUNDI HOPO', 'LAKAMOLA', 'LONDALUSI', 'MATANAE', 'MATASIO', 'MUKEKUKU', 'PAPELA', 'PENGODUA', 'SERUBEBA']

        if (districtName == "LANDUL LEKO") {
            return LANDULLEKO
        }
        else if (districtName == "LOAHOLU") {
            return LOAHOLU
        }
        else if (districtName == "LOBALAIN") {
            return LOBALAIN
        }
        else if (districtName == "NDAO NUSE") {
            return NDAONUSE
        }
        else if (districtName == "PANTAI BARU") {
            return PANTAIBARU
        }
        else if (districtName == "ROTE BARAT") {
            return ROTEBARAT
        }
        else if (districtName == "ROTE BARAT DAYA") {
            return ROTEBARATDAYA
        }
        else if (districtName == "ROTE BARAT LAUT") {
            return ROTEBARATLAUT
        }
        else if (districtName == "ROTE SELATAN") {
            return ROTESELATAN
        }
        else if (districtName == "ROTE TENGAH") {
            return ROTETENGAH
        }
        else if (districtName == "ROTE TIMUR") {
            return ROTETIMUR
        }
        return []
    }

    publicServiceCenterList(publicServiceCenterName, districtName, villageName){
        //posyandu
        const POS_ANARAE = ['ANALAU','RAEKENDO']
        const POS_BAADALE = ['BAADALE','NDUDALE','SAMBUKU']
        const POS_BALAOLI = ['BALAOLI BARAT','BALAOLI OEELO','BALAOLI TIMUR']
        const POS_BATEFALU = ['BATULA','FUKADALE','LOKODELA','NITAPANE','UFA']
        const POS_BATULILOK = ['BATULILOK','BODAFUAN','FENGOLEN','LAMADALE']
        const POS_BATUTUA = ['BERINGIN JAYA 1','BERINGIN JAYA 2','BERINGIN JAYA 3']
        const POS_BEBALAIN = ['BEBALAIN','DALEK ESA']
        const POS_BOA = ['FLAMBOYAN 1','FLAMBOYAN 2','FLAMBOYAN 3']
        const POS_BOLATENA = ['KARAFAO','LOENDOLU','NORDALE','RUINALAKAN']
        const POS_BONI = ['ADUOEN','BONI','PALATEN']
        const POS_BUSALANGGA = ['BUSALANGGA']
        const POS_BUSALANGGABARAT = ['MBAOEN','OMBOK']
        const POS_BUSALANGGATIMUR = ['FEUBUEN','KOLI','LONGGO']
        const POS_DAIAMA = ['BAKAROLEAN','NAULAOR','NISITA','SOAO 1','SOAO 2']
        const POS_DALEHOLU = ['DILABOIANA','FAFALU','OELE']
        const POS_DALEKESA = ['KENARI 4','KENARI 5','KENARI 6']
        const POS_DAUDOLU = ['DAUDOLU','LAKI','MANAMOLO','OESEDA']
        const POS_DAURENDALE = ['DAEURENDALE','MOKDALE','OEBAFIK','OENDUI']
        const POS_DODAEK = ['FOLAOEN','SOIOEDALE']
        const POS_DOLASI = ['PUTRA GAWANG 1','PUTRA GAWANG 2','PUTRA GAWANG 3','PUTRA GAWANG 4']
        const POS_EDALODE = ['DENELAIN', 'MAMEN', 'NAUINA',"SUA"]
        const POS_FAIFUA = ['BATUIDU','DETEASA 2','MANUOEN','OESOSOLE','PETIDAEN']
        const POS_FATELILO = ['BUEAIN','FALANOEN','LELILO']
        const POS_FUAFUNI = ['CEMPAKA 1','CEMPAKA 2','CEMPAKA 3']
        const POS_HELEBEIK = ['LEKIK','LEKONAK','NOANDALE','OETEAS 1','OETEAS 2']
        const POS_HOLOAMA = ['MONDO','NUNUAMA','OESAMBOKA','TASIOEN','TILONISI']
        const POS_HOLULAI = ['BUBUNIBUNA','HOLOTULA','LASILAI/OEMASI','TUABUNA']
        const POS_HUNDIHOPO = ['BAIOEN', 'BUSADALAEN', 'DETEASA 1',"FAA",'TOKOBATUN']
        const POS_HUNDIHUK = ['FULAKMOAN','HUNDIHUK BARAT','HUNDIHUK TIMUR']
        const POS_INAOE = ['DAELONI','NUSAK']
        const POS_INGGUINAK = ['INGGUINAK','KOTAFEUK','LIUK','MONEOEN','TAKAOEN']
        const POS_KEOEN = ['KEOEN','MAMALUK','NUNUOE','OEHU','OEMATA','OEUTUK']
        const POS_KOLOBOLON = ['KOLOBOLON','MODOPEDAK/TUABUNA 1','TUABUNA 2']
        const POS_KULI = ['LUTTU','NAMODALE','TIMULASI']
        const POS_KULIAISELE = ['AISELE','LEMULIK','TRANSLOK']
        const POS_LAKAMOLA = ['KILBAKOE','LALAO','OENGUNI','OESUKU']
        const POS_LALUKOEN = ['BOGENVILE 1','BOGENVILE 2','BOGENVILE 3','BOGENVILE 4']
        const POS_LANDU = ['MUTIARA 1','MUTIARA 2','MUTIARA 3']
        const POS_LEKIK = ['GLORIA 1','GLORIA 2','GLORIA 3','GLORIA 4']
        const POS_LEKONA = ['LEKONA BARAT', 'LEKONA TIMUR']
        const POS_LEKUNIK = ['LEKUNIK', 'NAHADUOEN']
        const POS_LENGUSELU = ['DAEMEALAIN', 'POKODANON', 'TRANSLOK']
        const POS_LENTERA = ['RAJAWALI 3', 'RAJAWALI 4', 'RAJAWALI 5', 'TERATAI 3']
        const POS_LENUPETU = ['DAPEKOEN', 'KAKAEK', 'NGALAMON']
        const POS_LIDABESI = ['BAUBAFAN', 'BUSALATE', 'MOLADALE', 'OLABATU']
        const POS_LIDAMANU = ['BATULELI', 'MOKLAIN', 'OENDULE', 'PUAMATA']
        const POS_LIDOR = ['LIDOR', 'OEINE']
        const POS_LIFULEO = ['BUNGA MAWAR', 'FAJAR', 'SELEAI', 'SUKAMAJU/OEMASI']
        const POS_LIMAKOLI = ['NITANGOEN', 'OEBAAN', 'TAIOEN']
        const POS_LOLEOEN = ['AILILO', 'BANDU', 'OELANGGA']
        const POS_LONDALUSI = ['EAHUN 1', 'EAHUN 2', 'EAHUN 3']
        const POS_MATANAE = ['DAIHUTI', 'NIOEN', 'OEBOLOKLAIN']
        const POS_MATASIO = ['FOLODALE', 'LETEKLAIN', 'NULAINA 1', 'NULAINA 2', 'OESUTI 1', 'OESUTI 2']
        const POS_MAUBESI = ['BAUDALE', 'GELAMALOLE', 'HOILEDO', 'HUNULAIN', 'HUTU']
        const POS_MBALILENDEIKI = ['MBALI 1', 'MBALI 2']
        const POS_MBIULOMBO = ['LOMBO', 'MBIU']
        const POS_MBOKAK = ['ANGKASA 1', 'ANGKASA 2']
        const POS_MBUEAIN = ['INGGUDIK MBATA', 'INGGUMURIK', 'SAY', 'TONGGA']
        const POS_MEOAIN = ['RAJAWALI 1', 'RAJAWALI 2']
        const POS_METINA = ['GANG TUJUH JAYA', 'KANTOR LURAH', 'TONDAO', 'TULANDALE']
        const POS_MODOSINAL = ['AMALO', 'DALAKUMEN', 'LANDEOE', 'OEOKO']
        const POS_MOKDALE = ['ALUKAMA', 'JALAN ABRI', 'MOKDALE', 'NUSAKLAIN', 'PEDANGGADI', 'TUABOLOK']
        const POS_MUKEKUKU = ['DANALON', 'LUNDALE', 'OEBOKA', 'OEULU']
        const POS_MUNDEK = ['MUNDEK', 'NGENIOEN']
        const POS_NAMODALE = ['BLOK M', 'KAMPUNG BARU', 'LETELANGGA', 'SEBELAH KALI']
        const POS_NDAONUSE = ['FATULA', 'OLY 1', 'OLY 2',]
        const POS_NEMBERALA = ['MAWAR 1', 'MAWAR 2', 'MAWAR 3']
        const POS_NETENAEN = ['NETENAEN', 'OENGGELAK']
        const POS_NGGELODAE = ['DAEDULU', 'LOPOLAIN', 'NGGELAK']
        const POS_NGGODIMEDA = ['KOLA', 'OENITAS', 'PEDALAIN']
        const POS_NUSAKDALE = ['BENGUBELAN 1', 'BENGUBELAN 2', 'MEAKOEN', 'NUSAKDALE', 'OENUSA']
        const POS_NUSE = ['NUSE']
        const POS_OEBAFFOK = ['PALAPA 1', 'PALAPA 2', 'PALAPA 3', 'PALAPA 4']
        const POS_OEBATU = ['KENARI 1', 'KENARI 2', 'KENARI 3']
        const POS_OEBAU = ['LADAOEN', 'LETUAK', 'NGAEK', 'OEBAUDALE', 'OEKUPI']
        const POS_OEBELA = ['DUPEMOK', 'LOEDIK', 'OEBELA', 'OELUFA']
        const POS_OEBOLE = ['OEBOLE 1', 'OEBOLE 2']
        const POS_OEBOU = ['METEOR 1', 'METEOR 2', 'METEOR 3', 'METEOR 4']
        const POS_OEHANDI = ['TERATAI 1', 'TERATAI 2', 'TERATAI 4']
        const POS_OELASIN = ['PURNAMA RAYA 1', 'PURNAMA RAYA 2', 'PURNAMA RAYA 3', 'PURNAMA RAYA 4', 'PURNAMA RAYA 5']
        const POS_OELEDO = ['BEBENGU', 'OELEDO 1', 'OELEDO 2']
        const POS_OELEKA = ['BATU KAMBA', 'LUWE', 'OEHUNIK']
        const POS_OELOLOT = ['ADEK', 'FEDOK', 'LASI', 'LENAOEN', 'OELOLOT']
        const POS_OELUA = ['OEDAI', 'OELABA', 'OELUA', 'SOTI']
        const POS_OELUNGGU = ['LEKIK 1', 'LEKIK 2', 'OELUNGGU']
        const POS_OEMATAMBOLI = ['BAUBAFAN', 'LASUAMA', 'MAKU']
        const POS_OENGGAE = ['OENGGAE DARAT', 'OENGGAE PANTAI']
        const POS_OENGGAUT = ['ANGGREK 1', 'ANGGREK 2', 'ANGGREK 3']
        const POS_OENITAS = ['MELATI 1', 'MELATI 2', 'MELATI 3', 'MELATI 4', 'MELATI 5', 'MELATI 6']
        const POS_OESELI = ['MELATI 1', 'MELATI 2', 'MELATI 3', 'MELATI 4', 'MELATI 5']
        const POS_OETEFFU = ['MERPATI 1', 'MERPATI 2', 'MERPATI 3', 'MERPATI 4', 'MERPATI 5']
        const POS_OETUTULU = ['HENULAIN', 'OEMILAL', 'OETUTULUL']
        const POS_OFALANGGA = ['DEAOEN', 'MENGGEDANON']
        const POS_OLAFULIHAA = ['LEKI', 'UMAKAPA']
        const POS_ONATALI = ['BAPALAMA', 'LELY', 'NAMODALE', 'NGGOFALAIK', 'OLALAIN']
        const POS_PAPELA = ['PAPELA 1', 'PAPELA 2', 'PAPELA 3', 'TANJUNG']
        const POS_PENGODUA = ['KIMADALE', 'POKOBATUN']
        const POS_PILASUE = ['BALOKAMA', 'BAULEN', 'SEDA 1', 'SEDA 2']
        const POS_PUKUAFU = ['MAEOE 1', 'MAEOE 2', 'ROTEDALE']
        const POS_SAINDULE = ['TOIU']
        const POS_SAKUBATUN = ['BERINGIN JAYA 4', 'BERINGIN JAYA 5']
        const POS_SANGAHNDOLU = ['HARAPAN 1', 'HARAPAN 2', 'HARAPAN 3']
        const POS_SANGGAOEN = ["NEE", 'OENOAS', 'SANGGAOEN', 'SASANDO', 'TAKAI']
        const POS_SEDEOEN = ['SEROJA 1', 'SEROJA 2', 'SEROJA 3', 'SEROJA 4', 'SEROJA 5']
        const POS_SERUBEBA = ['BOIDANON', 'HAELEAN', 'OERAKENING', 'PENAOEN', 'RARANO']
        const POS_SIOMEDA = ['HALLA', 'POLBONGHUN', 'SOSADALE']
        const POS_SONIMANU = ['BONGODALE', 'BUNILAIN', 'OEKIMA', 'PUAN']
        const POS_SOTIMORI = ['INALO', 'KENAMOEN', 'SIPUK',]
        const POS_SUEBELA = ['HO', 'LEFA', 'PANAMAMEN', 'SAENDALE']
        const POS_SUELAIN = ['DANOLAIN', 'NAUTASIK', 'SOKA', 'SOKTUANAN']
        const POS_TASILO = ['NDEO', 'TASILO']
        const POS_TEBOLE = ['DAEKI', 'KOPEDAK', 'LOIOEN', 'NGGELABITI', 'NGGOLOINA']
        const POS_TEMAS = ['FAEANAK', 'FATUNAO', 'FEAMA']
        const POS_TENALAI = ['AIRANI', 'USU']
        const POS_TESABELA = ['BIUK', 'DANODALE']
        const POS_TOLAMA = ['BULEK', 'LUTULAE', 'TELUNULU', 'TOLAMA']
        const POS_TUALIMA = ['NDAU', 'TRANSLOK']
        const POS_TUANATUK = ['OEMAULAIN', 'TODAN', 'TUANATUK']
        const POS_TUNGANAMO = ['DAEOSIN', 'KOKADALE', 'LALOLIK']
        
        //puskesmas
        const PUS_LANDULLEKO = ['SOTIMORI']
        const PUS_LOAHOLU = ['OELABA']
        const PUS_LOBALAIN = ['BAA']
        const PUS_NDAONUSE = ['NDAO']
        const PUS_PANTAIBARU = ['KORBAFO','SONIMANU']
        const PUS_ROTEBARAT = ['DELHA']
        const PUS_ROTEBARATDAYA = ['BATUTUA']
        const PUS_ROTEBARATLAUT = ['BUSALANGGA']
        const PUS_ROTESELATAN = ['OELE']
        const PUS_ROTETENGAH = ['FEAPOPI']
        const PUS_ROTETIMUR = ['EAHUN']


        //puskesmas
        if (publicServiceCenterName == "Puskesmas" && districtName == "LANDUL LEKO" && villageName != null) {
            return PUS_LANDULLEKO
        }
        else if (publicServiceCenterName == "Puskesmas" && districtName == "LOAHOLU" && villageName != null) {
            return PUS_LOAHOLU
        }
        else if (publicServiceCenterName == "Puskesmas" && districtName == "LOBALAIN" && villageName != null) {
            return PUS_LOBALAIN
        }
        else if (publicServiceCenterName == "Puskesmas" && districtName == "NDAO NUSE" && villageName != null) {
            return PUS_NDAONUSE
        }
        else if (publicServiceCenterName == "Puskesmas" && districtName == "PANTAI BARU" && villageName != null) {
            return PUS_PANTAIBARU
        }
        else if (publicServiceCenterName == "Puskesmas" && districtName == "ROTE BARAT" && villageName != null) {
            return PUS_ROTEBARAT
        }
        else if (publicServiceCenterName == "Puskesmas" && districtName == "ROTE BARAT DAYA" && villageName != null) {
            return PUS_ROTEBARATDAYA
        }
        else if (publicServiceCenterName == "Puskesmas" && districtName == "ROTE BARAT LAUT" && villageName != null) {
            return PUS_ROTEBARATLAUT
        }
        else if (publicServiceCenterName == "Puskesmas" && districtName == "ROTE SELATAN" && villageName != null) {
            return PUS_ROTESELATAN
        }
        else if (publicServiceCenterName == "Puskesmas" && districtName == "ROTE TENGAH" && villageName != null) {
            return PUS_ROTETENGAH
        }
        else if (publicServiceCenterName == "Puskesmas" && districtName == "ROTE TIMUR" && villageName != null) {
            return PUS_ROTETIMUR
        }
        //posyandu
        else if (publicServiceCenterName == "Posyandu" && villageName == "ANARAE" && districtName != null) {
            return POS_ANARAE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BAADALE") {
            return POS_BAADALE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BALAOLI") {
            return POS_BALAOLI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BATEFALU") {
            return POS_BATEFALU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BATULILOK") {
            return POS_BATULILOK
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BATUTUA") {
            return POS_BATUTUA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BEBALAIN") {
            return POS_BEBALAIN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BOA") {
            return POS_BOA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BOLATENA") {
            return POS_BOLATENA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BONI") {
            return POS_BONI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BUSALANGGA") {
            return POS_BUSALANGGA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BUSALANGGA BARAT") {
            return POS_BUSALANGGABARAT
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BUSALANGGA TIMUR") {
            return POS_BUSALANGGATIMUR
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "DAIAMA") {
            return POS_DAIAMA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "DALEHOLU") {
            return POS_DALEHOLU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "DALEK ESA") {
            return POS_DALEKESA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "DAUDOLU") {
            return POS_DAUDOLU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "DAURENDALE") {
            return POS_DAURENDALE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "DODAEK") {
            return POS_DODAEK
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "DOLASI") {
            return POS_DOLASI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "EDALODE") {
            return POS_EDALODE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "FAIFUA") {
            return POS_FAIFUA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "FATELILO") {
            return POS_FATELILO
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "FUAFUNI") {
            return POS_FUAFUNI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "HELEBEIK") {
            return POS_HELEBEIK
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "HOLOAMA") {
            return POS_HOLOAMA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "HOLULAI") {
            return POS_HOLULAI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "HUNDI HOPO") {
            return POS_HUNDIHOPO
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "HUNDIHUK") {
            return POS_HUNDIHUK
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "INAOE") {
            return POS_INAOE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "INGGUINAK") {
            return POS_INGGUINAK
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "KEOEN") {
            return POS_KEOEN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "BAADALE") {
            return POS_KOLOBOLON
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "KULI") {
            return POS_KULI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "KULI AISELE") {
            return POS_KULIAISELE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LAKAMOLA") {
            return POS_LAKAMOLA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LALUKOEN") {
            return POS_LALUKOEN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LANDU") {
            return POS_LANDU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LEKIK") {
            return POS_LEKIK
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LEKONA") {
            return POS_LEKONA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LEKUNIK") {
            return POS_LEKUNIK
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LENGUSELU") {
            return POS_LENGUSELU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LENTERA") {
            return POS_LENTERA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LENUPETU") {
            return POS_LENUPETU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LIDABESI") {
            return POS_LIDABESI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LIDAMANU") {
            return POS_LIDAMANU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LIDOR") {
            return POS_LIDOR
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LIFULEO") {
            return POS_LIFULEO
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LIMAKOLI") {
            return POS_LIMAKOLI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LOLEOEN") {
            return POS_LOLEOEN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "LONDALUSI") {
            return POS_LONDALUSI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MATANAE") {
            return POS_MATANAE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MATASIO") {
            return POS_MATASIO
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MAUBESI") {
            return POS_MAUBESI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MBALI LENDEIKI") {
            return POS_MBALILENDEIKI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MBIU LOMBO") {
            return POS_MBIULOMBO
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MBOKAK") {
            return POS_MBOKAK
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MBUEAIN") {
            return POS_MBUEAIN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MEOAIN") {
            return POS_MEOAIN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "METINA") {
            return POS_METINA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MODOSINAL") {
            return POS_MODOSINAL
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MOKDALE") {
            return POS_MOKDALE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MUKEKUKU") {
            return POS_MUKEKUKU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "MUNDEK") {
            return POS_MUNDEK
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "NAMODALE") {
            return POS_NAMODALE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "NDAO NUSE") {
            return POS_NDAONUSE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "NEMBERALA") {
            return POS_NEMBERALA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "NETENAEN") {
            return POS_NETENAEN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "NGGELODAE") {
            return POS_NGGELODAE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "NGGODIMEDA") {
            return POS_NGGODIMEDA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "NUSAKDALE") {
            return POS_NUSAKDALE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "NUSE") {
            return POS_NUSE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OEBAFFOK") {
            return POS_OEBAFFOK
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OEBATU") {
            return POS_OEBATU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OEBAU") {
            return POS_OEBAU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OEBELA") {
            return POS_OEBELA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OEBOLE") {
            return POS_OEBOLE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OEBOU") {
            return POS_OEBOU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OEHANDI") {
            return POS_OEHANDI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OELASIN") {
            return POS_OELASIN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OELEDO") {
            return POS_OELEDO
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OELEKA") {
            return POS_OELEKA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OELOLOT") {
            return POS_OELOLOT
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OELUA") {
            return POS_OELUA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OELUNGGU") {
            return POS_OELUNGGU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OEMATAMBOLI") {
            return POS_OEMATAMBOLI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OENGGAE") {
            return POS_OENGGAE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OENGGAUT") {
            return POS_OENGGAUT
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OENITAS") {
            return POS_OENITAS
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OESELI") {
            return POS_OESELI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OETEFFU") {
            return POS_OETEFFU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OETUTULU") {
            return POS_OETUTULU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OFALANGGA") {
            return POS_OFALANGGA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "OLAFULIHAA") {
            return POS_OLAFULIHAA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "ONATALI") {
            return POS_ONATALI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "PAPELA") {
            return POS_PAPELA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "PENGODUA") {
            return POS_PENGODUA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "PILASUE") {
            return POS_PILASUE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "PUKUAFU") {
            return POS_PUKUAFU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "SAINDULE") {
            return POS_SAINDULE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "SAKUBATUN") {
            return POS_SAKUBATUN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "SANGAH NDOLU") {
            return POS_SANGAHNDOLU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "SANGGAOEN") {
            return POS_SANGGAOEN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "SEDEOEN") {
            return POS_SEDEOEN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "SERUBEBA") {
            return POS_SERUBEBA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "SIOMEDA") {
            return POS_SIOMEDA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "SONIMANU") {
            return POS_SONIMANU
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "SOTIMORI") {
            return POS_SOTIMORI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "SUEBELA") {
            return POS_SUEBELA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "SUELAIN") {
            return POS_SUELAIN
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "TASILO") {
            return POS_TASILO
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "TEBOLE") {
            return POS_TEBOLE
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "TEMAS") {
            return POS_TEMAS
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "TENALAI") {
            return POS_TENALAI
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "TESABELA") {
            return POS_TESABELA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "TOLAMA") {
            return POS_TOLAMA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "TUALIMA") {
            return POS_TUALIMA
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "TUANATUK") {
            return POS_TUANATUK
        }
        else if (publicServiceCenterName == "Posyandu" && districtName != null && villageName == "TUNGANAMO") {
            return POS_TUNGANAMO
        }
        return []
        
    }

    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Masukkan Data Balita di Operasi Timbang 2022</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <h5>Pelaksanaan Operasi Timbang di Kabupaten Rote Ndao</h5>
                                <h6><span style={{ color: '#cc3300' }}>*</span>) Tanda wajib diisi</h6>
                                <hr/>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formNakesDate">
                                            <Form.Label>Tanggal Kunjungan <span style={{ color: '#cc3300'}}>*</span></Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="nakesdate"
                                                placeholder="Pilih tanggal kunjungan Nakes"
                                                value={this.state.comingDate}
                                                onChange={this.onComingDateInput}
                                            />
                                        </Form.Group>                                        
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Body>
                                <h5>Data Lokasi Pelayanan di Kabupaten Rote Ndao</h5>
                                <hr/>
                                <Row>
                                    <Col md={6}>
                                        <Form>
                                            <Form.Group controlId="districtName">
                                                <Form.Label>Nama Kecamatan</Form.Label>
                                                <Form.Control 
                                                    disabled
                                                    as="select"
                                                    value={this.state.districtName}
                                                    onChange={this.onDistrictNameInput}
                                                    >
                                                    <option>---</option>
                                                    <option>LANDUL LEKO</option>
                                                    <option>LOAHOLU</option>
                                                    <option>LOBALAIN</option>
                                                    <option>NDAO NUSE</option>
                                                    <option>PANTAI BARU</option>
                                                    <option>ROTE BARAT</option>
                                                    <option>ROTE BARAT DAYA</option>
                                                    <option>ROTE BARAT LAUT</option>
                                                    <option>ROTE SELATAN</option>
                                                    <option>ROTE TENGAH</option>
                                                    <option>ROTE TIMUR</option >
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Tipe Lokasi Pusat Pelayanan <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                                <Form.Check
                                                    custom
                                                    type="radio"
                                                    label="Puskesmas"
                                                    name="formLocationType"
                                                    id="locationpuskesmas"
                                                    checked={this.state.publicServiceCenterType === "Puskesmas"}
                                                    onChange={this.onPublicServiceCenterTypeInputPuskesmas}
                                                />
                                                <Form.Check
                                                    custom
                                                    type="radio"
                                                    label="Posyandu"
                                                    name="formLocationType"
                                                    id="locationposyandu"
                                                    checked={this.state.publicServiceCenterType === "Posyandu"}
                                                    onChange={this.onPublicServiceCenterTypeInputPosyandu}
                                                />
                                            </Form.Group>
                                        </Form>
                                        
                                    </Col>

                                    <Col md={6}>
                                        <Form>
                                            <Form.Group controlId="villageName">
                                                <Form.Label>Nama Desa</Form.Label>
                                                <Form.Control 
                                                    // disabled
                                                    as="select"
                                                    value={this.state.villageName}
                                                    onChange={this.onVillageNameInput}
                                                >
                                                    <option>---</option>
                                                    {this.villageList(
                                                        this.state.districtName
                                                    ).map(village => {
                                                        return <option key={`villageKey-${village}`}>{village}</option>
                                                    })}
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="formlocationName">
                                                <Form.Label>Nama Lokasi Pusat Pelayanan</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={this.state.publicServiceCenterName}
                                                    onChange={this.onPublicServiceCenterNameInput}
                                                >
                                                { this.state.publicServiceCenterType == ''
                                                    ? (<>
                                                        <option>---</option>
                                                    </>) 
                                                    : null
                                                }
                                                <option>---</option>
                                                {this.publicServiceCenterList(
                                                    this.state.publicServiceCenterType,
                                                    this.state.districtName,
                                                    this.state.villageName,
                                                ).map(serviceCenter => {
                                                    return <option key={`serviceCenterKey-${serviceCenter}`}>{serviceCenter}</option>
                                                })}
                                                </Form.Control>
                                            </Form.Group>

                                        </Form>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Body>
                                <h5>Pengisian Data Balita di Kabupaten Rote Ndao</h5>
                                <hr/>
                                <Row>
                                    <Col md={6}>
                                        <Form>
                                            <Form.Group controlId="formBabyDate">
                                                <Form.Label>Tanggal Lahir Balita <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    value={this.state.babyDate}
                                                    onChange={this.onBabyDateInput}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formMotherName">
                                                <Form.Label>Nama Ibu <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    placeholder="Tulis nama Ibu" 
                                                    value={this.state.motherName}
                                                    onChange={this.onMotherNameInput}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formBabyName">
                                                <Form.Label>Nama Balita <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    placeholder="Tulis nama Balita"
                                                    value={this.state.babyName}
                                                    onChange={this.onBabyNameInput}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formBabyAge">
                                                <Form.Label>Umur Balita </Form.Label>
                                                <Form.Control
                                                    disabled
                                                    type="text"
                                                    value={this.state.babyAge}
                                                    onChange={this.onBabyDateInput}
                                                />
                                                <Form.Text className="text-muted">
                                                    Harus mengisi Tanggal Lahir Balita
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Jenis Kelamin Balita <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                                <Form.Check
                                                    custom
                                                    type="radio"
                                                    label="Laki-laki"
                                                    name="genderRadio"
                                                    id="genderRadioMale"
                                                    checked={this.state.babyGender === "Laki-laki"}
                                                    onChange={this.onBabyGenderInputMale}
                                                />
                                                <Form.Check
                                                    custom
                                                    type="radio"
                                                    label="Perempuan"
                                                    name="genderRadio"
                                                    id="genderRadioFemale"
                                                    checked={this.state.babyGender === "Perempuan"}
                                                    onChange={this.onBabyGenderInputFemale}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formBabyClinicalIssue">
                                                <Form.Label>Kelainan Klinis</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={this.state.babyClinicalIssue}
                                                    onChange={this.onBabyClinicalIssueInput}
                                                >
                                                    <option>---</option>
                                                    <option>Marasmus</option>
                                                    <option>Kwashiorkor</option>
                                                    <option>M+K</option>
                                                    <option>Kelainan Klinis</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="formIntervention">
                                                <Form.Label>Intervensi yang Dilakukan</Form.Label>
                                                <Form.Control 
                                                    as="select"
                                                    value={this.state.babyIntervencyFormat}
                                                    onChange={this.onBabyIntervencyFormatInput}
                                                >
                                                    <option>---</option>
                                                    <option>Format 1: Tatalaksana</option>
                                                    <option>Format 2: Kunjungan Rumah dan PMT</option>
                                                </Form.Control>
                                            </Form.Group>

                                            {this.state.babyIntervencyFormat == "Format 2: Kunjungan Rumah dan PMT"
                                                ? (<Form.Group>
                                                    <Form.Label>Form Lanjutan</Form.Label>
                                                    <Form.Check
                                                        custom
                                                        type="radio"
                                                        label="Rujuk"
                                                        name="type2format"
                                                        id="rujuk"
                                                        checked={this.state.babyFormatTypeTwo === "Rujuk"}
                                                        onChange={this.onBabyFormatTypeTwoInputRujuk}
                                                    />
                                                    <Form.Check
                                                        custom
                                                        type="radio"
                                                        label="PGBT"
                                                        name="type2format"
                                                        id="pgbt"
                                                        checked={this.state.babyFormatTypeTwo === "PGBT"}
                                                        onChange={this.onBabyFormatTypeTwoInputPGBT}
                                                    />
                                                </Form.Group>)
                                                : null
                                            }
                                        </Form>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formBabyHeight">
                                            <Form.Label>Tinggi Badan Balita <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="contoh: 95"
                                                value={this.state.babyHeight}
                                                onChange={this.onBabyHeightInput}
                                            />
                                            <Form.Text className="text-muted">
                                                Hanya menulis angka saja
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBabyWeight">
                                            <Form.Label>Berat Badan Balita <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="contoh: 14.3"
                                                value={this.state.babyWeight}
                                                onChange={this.onBabyWeightInput}
                                            />
                                            <Form.Text className="text-muted">
                                                Hanya menulis angka saja
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBabyLika">
                                            <Form.Label>Lingkar Kepala Balita</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="contoh: 16.7"
                                                value={this.state.babyLika}
                                                onChange={this.onBabyLikaInput}
                                            />
                                            <Form.Text className="text-muted">
                                                Hanya menulis angka saja
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBabyLila">
                                            <Form.Label>Lingkar Lengan Atas Balita</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="contoh: 5.7"
                                                value={this.state.babyLila}
                                                onChange={this.onBabyLilaInput}
                                            />
                                            <Form.Text className="text-muted">
                                                Hanya menulis angka saja                                            
                                            </Form.Text>
                                            </Form.Group>
                                    </Col>
                                </Row>

                                <Button variant="primary" onClick={this.handleSubmitAdd}>
                                    Tambahkan Data
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default withCookies(InputForm);
