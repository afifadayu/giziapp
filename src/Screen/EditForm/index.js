import React from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import axios from 'axios';

import Aux from "../../hoc/_Aux";
import url from '../../url';

class EditForm extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
        this.state = {
            coming_date: '',
            district_name:'',
            village_name:'',
            public_service_center_type: '',
            public_service_center_name: '',
            mother_name: '',
            baby_date: '',
            baby_name: '',
            baby_age: '',
            baby_gender: '',
            baby_clinical_issue: '',
            baby_height: '',
            baby_weight: '',
            baby_lika: '',
            baby_lila: '',
            baby_intervency_format: '',
            baby_format_type_two: ''
        };
        this.onComingDateInput = this.onComingDateInput.bind(this);
        this.ondistrictNameInput = this.ondistrictNameInput.bind(this);
        this.onvillageNameInput = this.onvillageNameInput.bind(this);
        this.onPublicServiceCenterTypeInputPuskesmas = this.onPublicServiceCenterTypeInputPuskesmas.bind(this);
        this.onPublicServiceCenterTypeInputPosyandu = this.onPublicServiceCenterTypeInputPosyandu.bind(this);
        this.onPublicServiceCenterName = this.onPublicServiceCenterName.bind(this);
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

    //component didmount
    componentDidMount(){
        const babyData = this.props.location.state || {};
        console.log(babyData)
        
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
    
    //event choose
    onComingDateInput(event) {
        this.setState({
            coming_date: event.target.value,
        })
    }

    ondistrictNameInput(event) {
        this.setState({
            district_name: event.target.value,
        })
    }

    onvillageNameInput(event) {
        this.setState({
            village_name: event.target.value,
        })
    }

    onPublicServiceCenterTypeInputPuskesmas(event) {
        if(event.target.value === "on") {
            this.setState({
                public_service_center_type: "Puskesmas",
            })
        }   
    }

    onPublicServiceCenterTypeInputPosyandu(event) {
        if (event.target.value === "on") {
            this.setState({
                public_service_center_type: "Posyandu",
            })
        }
    }

    onPublicServiceCenterName(event) {
        this.setState({
            public_service_center_name: event.target.value,
        })
    }

    onBabyDateInput(event) {
        function calculateAge(birthDate, otherDate) {
            birthDate = new Date(birthDate);
            otherDate = new Date(otherDate);

            var diffTime = otherDate.getTime() - birthDate.getTime();
            var diffDays = diffTime / (1000 * 3600 * 24);

            var age = Math.floor(diffDays / 30)

            return age;
        }

        const newDate = new Date();
        const dob = event.target.value;

        let babyAgeCalculation = calculateAge(dob, newDate);

        this.setState({
            baby_date: event.target.value,
            baby_age: babyAgeCalculation
        })
    }
    
    onMotherNameInput(event) {
        this.setState({
            mother_name: event.target.value,
        })
    }

    onBabyNameInput(event) {
        this.setState({
            baby_name: event.target.value,
        })
    }

    onBabyAgeInput(event) {
        this.setState({
            baby_age: event.target.value,
        })
    }

    onBabyGenderInputMale(event) {
        if (event.target.value === "on") {
            this.setState({
                baby_gender: "Laki-laki",
            })
        }
    }

    onBabyGenderInputFemale(event) {
        if (event.target.value === "on") {
            this.setState({
                baby_gender: "Perempuan",
            })
        }
    }

    onBabyClinicalIssueInput(event) {
        this.setState({
            baby_clinical_issue: event.target.value,
        })
    }

    onBabyHeightInput(event) {
        this.setState({
            baby_height: event.target.value,
        })
    }

    onBabyWeightInput(event) {
        this.setState({
            baby_weight: event.target.value,
        })
    }

    onBabyLikaInput(event) {
        this.setState({
            baby_lika: event.target.value,
        })
    }

    onBabyLilaInput(event) {
        this.setState({
            baby_lila: event.target.value,
        })
    }

    onBabyIntervencyFormatInput(event) {
        this.setState({
            baby_intervency_format: event.target.value,
        })
    }

    onBabyFormatTypeTwoInputRujuk(event) {
        if (event.target.value === "on") {
            this.setState({
                baby_format_type_two: "Rujuk",
            })
        }
    }

    onBabyFormatTypeTwoInputPGBT(event) {
        if (event.target.value === "on") {
            this.setState({
                baby_format_type_two: "PGBT",
            })
        }
    }
    
    //handling
    handleSubmitEdit() {
        if (!this.state.coming_date) {
            alert("Tanggal kunjungan tidak boleh kosong!")
            return;
        }
        if (!this.state.baby_date) {
            alert("Tanggal Lahir Balita tidak boleh kosong!")
            return;
        }
        if (!this.state.mother_name) {
            alert("Nama Ibu tidak boleh kosong!")
            return;
        }
        if (!this.state.baby_name) {
            alert("Nama Balita tidak boleh kosong!")
            return;
        }
        if (!this.state.baby_gender) {
            alert("Jenis Kelamin Balita tidak boleh kosong!")
            return;
        }
        if (!this.state.baby_height) {
            alert("Tinggi badan balita tidak boleh kosong!")
            return;
        }
        if (!this.state.baby_weight) {
            alert("Berat badan balita tidak boleh kosong!")
            return;
        }

        // let newBabyWeight = this.state.baby_weight
        // let newBabyHeight = this.state.baby_height
        // let newBabyLila = this.state.baby_lila
        // let newBabyLika = this.state.baby_lika

        // if (this.state.baby_weight.includes(',') === true) {
        //     newBabyWeight = this.state.baby_weight.replace(/,/g, '.')
        // }
        // if (this.state.baby_height.includes(',') === true) {
        //     newBabyHeight = this.state.baby_height.replace(/,/g, '.')
        // }
        // if (this.state.baby_lila.includes(',') === true) {
        //     newBabyLika = this.state.baby_lila.replace(/,/g, '.')
        // }
        // if (this.state.baby_lika.includes(',') === true) {
        //     newBabyLila = this.state.baby_lika.replace(/,/g, '.')
        // }

        // validasi tinggi badan
        if (Number(this.state.baby_age) >= 24 && (Number(this.state.baby_height) < 65 || Number(this.state.baby_height) > 120)) {
            alert("Tinggi badan bayi harus diantara 65 - 120cm")
            return;
        }
        if (Number(this.state.baby_age) < 24 && (Number(this.state.baby_height) < 45 || Number(this.state.baby_height) > 110)) {
            alert("Tinggi badan bayi harus diantara 45 - 110cm")
            return;
        }
        axios.put(`${url}/update-data`, {
            id: this.state.id,
            coming_date: this.state.coming_date,
            district_name: this.state.district_name,
            village_name: this.state.village_name,
            public_service_center_type: this.state.public_service_center_type,
            public_service_center_name: this.state.public_service_center_name,
            baby_date: this.state.baby_date,
            mother_name: this.state.mother_name,
            baby_name: this.state.baby_name,
            baby_age: parseInt(this.state.baby_age),
            baby_gender: this.state.baby_gender,
            baby_clinical_issue: this.state.baby_clinical_issue,
            baby_height: parseFloat(this.state.baby_height),
            baby_weight: parseInt(this.state.baby_weight),
            baby_lika: parseFloat(this.state.baby_lika),
            baby_lila: parseFloat(this.state.baby_lila),
            baby_intervency_format: this.state.baby_intervency_format,
            baby_format_type_two: this.state.baby_format_type_two
        }).then((response) => {
            if (response.data.status == "OK") {
                this.props.history.push('/akses-data', {
                    ...this.state
                })
            }
        }).catch((error) => {
        });       
    }
    
    villageList(district_name){
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

        if (district_name == "LANDUL LEKO") {
            return LANDULLEKO
        }
        else if (district_name == "LOAHOLU") {
            return LOAHOLU
        }
        else if (district_name == "LOBALAIN") {
            return LOBALAIN
        }
        else if (district_name == "NDAO NUSE") {
            return NDAONUSE
        }
        else if (district_name == "PANTAI BARU") {
            return PANTAIBARU
        }
        else if (district_name == "ROTE BARAT") {
            return ROTEBARAT
        }
        else if (district_name == "ROTE BARAT DAYA") {
            return ROTEBARATDAYA
        }
        else if (district_name == "ROTE BARAT LAUT") {
            return ROTEBARATLAUT
        }
        else if (district_name == "ROTE SELATAN") {
            return ROTESELATAN
        }
        else if (district_name == "ROTE TENGAH") {
            return ROTETENGAH
        }
        else if (district_name == "ROTE TIMUR") {
            return ROTETIMUR
        }
        return []
    }


    publicServiceCenterList(public_service_center_name, district_name, village_name){
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
        const POS_EDALODE = ['DENELAIN','MAMEN','NAUINA','SUA']
        const POS_FAIFUA = ['BATUIDU','DETEASA 2','MANUOEN','OESOSOLE','PETIDAEN']
        const POS_FATELILO = ['BUEAIN','FALANOEN','LELILO']
        const POS_FUAFUNI = ['CEMPAKA 1','CEMPAKA 2','CEMPAKA 3']
        const POS_HELEBEIK = ['LEKIK','LEKONAK','NOANDALE','OETEAS 1','OETEAS 2']
        const POS_HOLOAMA = ['MONDO','NUNUAMA','OESAMBOKA','TASIOEN','TILONISI']
        const POS_HOLULAI = ['BUBUNIBUNA','HOLOTULA','LASILAI/OEMASI','TUABUNA']
        const POS_HUNDIHOPO = ['BAIOEN','BUSADALAEN','DETEASA 1','FAA','TOKOBATUN']
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
        const POS_SANGGAOEN = ['NEE', 'OENOAS', 'SANGGAOEN', 'SASANDO', 'TAKAI']
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
        if (public_service_center_name == "Puskesmas" && district_name == "LANDUL LEKO" && village_name != null) {
            return PUS_LANDULLEKO
        }
        else if (public_service_center_name == "Puskesmas" && district_name == "LOAHOLU" && village_name != null) {
            return PUS_LOAHOLU
        }
        else if (public_service_center_name == "Puskesmas" && district_name == "LOBALAIN" && village_name != null) {
            return PUS_LOBALAIN
        }
        else if (public_service_center_name == "Puskesmas" && district_name == "NDAO NUSE" && village_name != null) {
            return PUS_NDAONUSE
        }
        else if (public_service_center_name == "Puskesmas" && district_name == "PANTAI BARU" && village_name != null) {
            return PUS_PANTAIBARU
        }
        else if (public_service_center_name == "Puskesmas" && district_name == "ROTE BARAT" && village_name != null) {
            return PUS_ROTEBARAT
        }
        else if (public_service_center_name == "Puskesmas" && district_name == "ROTE BARAT DAYA" && village_name != null) {
            return PUS_ROTEBARATDAYA
        }
        else if (public_service_center_name == "Puskesmas" && district_name == "ROTE BARAT LAUT" && village_name != null) {
            return PUS_ROTEBARATLAUT
        }
        else if (public_service_center_name == "Puskesmas" && district_name == "ROTE SELATAN" && village_name != null) {
            return PUS_ROTESELATAN
        }
        else if (public_service_center_name == "Puskesmas" && district_name == "ROTE TENGAH" && village_name != null) {
            return PUS_ROTETENGAH
        }
        else if (public_service_center_name == "Puskesmas" && district_name == "ROTE TIMUR" && village_name != null) {
            return PUS_ROTETIMUR
        }
        //posyandu
        else if (public_service_center_name == "Posyandu" && village_name == "ANARAE" && district_name != null) {
            return POS_ANARAE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BAADALE") {
            return POS_BAADALE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BALAOLI") {
            return POS_BALAOLI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BATEFALU") {
            return POS_BATEFALU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BATULILOK") {
            return POS_BATULILOK
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BATUTUA") {
            return POS_BATUTUA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BEBALAIN") {
            return POS_BEBALAIN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BOA") {
            return POS_BOA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BOLATENA") {
            return POS_BOLATENA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BONI") {
            return POS_BONI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BUSALANGGA") {
            return POS_BUSALANGGA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BUSALANGGA BARAT") {
            return POS_BUSALANGGABARAT
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BUSALANGGA TIMUR") {
            return POS_BUSALANGGATIMUR
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "DAIAMA") {
            return POS_DAIAMA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "DALEHOLU") {
            return POS_DALEHOLU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "DALEK ESA") {
            return POS_DALEKESA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "DAUDOLU") {
            return POS_DAUDOLU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "DAURENDALE") {
            return POS_DAURENDALE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "DODAEK") {
            return POS_DODAEK
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "DOLASI") {
            return POS_DOLASI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "EDALODE") {
            return POS_EDALODE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "FAIFUA") {
            return POS_FAIFUA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "FATELILO") {
            return POS_FATELILO
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "FUAFUNI") {
            return POS_FUAFUNI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "HELEBEIK") {
            return POS_HELEBEIK
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "HOLOAMA") {
            return POS_HOLOAMA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "HOLULAI") {
            return POS_HOLULAI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "HUNDI HOPO") {
            return POS_HUNDIHOPO
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "HUNDIHUK") {
            return POS_HUNDIHUK
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "INAOE") {
            return POS_INAOE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "INGGUINAK") {
            return POS_INGGUINAK
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "KEOEN") {
            return POS_KEOEN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "BAADALE") {
            return POS_KOLOBOLON
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "KULI") {
            return POS_KULI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "KULI AISELE") {
            return POS_KULIAISELE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LAKAMOLA") {
            return POS_LAKAMOLA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LALUKOEN") {
            return POS_LALUKOEN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LANDU") {
            return POS_LANDU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LEKIK") {
            return POS_LEKIK
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LEKONA") {
            return POS_LEKONA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LEKUNIK") {
            return POS_LEKUNIK
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LENGUSELU") {
            return POS_LENGUSELU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LENTERA") {
            return POS_LENTERA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LENUPETU") {
            return POS_LENUPETU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LIDABESI") {
            return POS_LIDABESI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LIDAMANU") {
            return POS_LIDAMANU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LIDOR") {
            return POS_LIDOR
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LIFULEO") {
            return POS_LIFULEO
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LIMAKOLI") {
            return POS_LIMAKOLI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LOLEOEN") {
            return POS_LOLEOEN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "LONDALUSI") {
            return POS_LONDALUSI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MATANAE") {
            return POS_MATANAE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MATASIO") {
            return POS_MATASIO
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MAUBESI") {
            return POS_MAUBESI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MBALI LENDEIKI") {
            return POS_MBALILENDEIKI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MBIU LOMBO") {
            return POS_MBIULOMBO
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MBOKAK") {
            return POS_MBOKAK
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MBUEAIN") {
            return POS_MBUEAIN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MEOAIN") {
            return POS_MEOAIN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "METINA") {
            return POS_METINA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MODOSINAL") {
            return POS_MODOSINAL
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MOKDALE") {
            return POS_MOKDALE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MUKEKUKU") {
            return POS_MUKEKUKU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "MUNDEK") {
            return POS_MUNDEK
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "NAMODALE") {
            return POS_NAMODALE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "NDAO NUSE") {
            return POS_NDAONUSE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "NEMBERALA") {
            return POS_NEMBERALA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "NETENAEN") {
            return POS_NETENAEN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "NGGELODAE") {
            return POS_NGGELODAE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "NGGODIMEDA") {
            return POS_NGGODIMEDA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "NUSAKDALE") {
            return POS_NUSAKDALE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "NUSE") {
            return POS_NUSE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OEBAFFOK") {
            return POS_OEBAFFOK
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OEBATU") {
            return POS_OEBATU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OEBAU") {
            return POS_OEBAU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OEBELA") {
            return POS_OEBELA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OEBOLE") {
            return POS_OEBOLE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OEBOU") {
            return POS_OEBOU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OEHANDI") {
            return POS_OEHANDI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OELASIN") {
            return POS_OELASIN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OELEDO") {
            return POS_OELEDO
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OELEKA") {
            return POS_OELEKA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OELOLOT") {
            return POS_OELOLOT
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OELUA") {
            return POS_OELUA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OELUNGGU") {
            return POS_OELUNGGU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OEMATAMBOLI") {
            return POS_OEMATAMBOLI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OENGGAE") {
            return POS_OENGGAE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OENGGAUT") {
            return POS_OENGGAUT
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OENITAS") {
            return POS_OENITAS
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OESELI") {
            return POS_OESELI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OETEFFU") {
            return POS_OETEFFU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OETUTULU") {
            return POS_OETUTULU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OFALANGGA") {
            return POS_OFALANGGA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "OLAFULIHAA") {
            return POS_OLAFULIHAA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "ONATALI") {
            return POS_ONATALI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "PAPELA") {
            return POS_PAPELA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "PENGODUA") {
            return POS_PENGODUA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "PILASUE") {
            return POS_PILASUE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "PUKUAFU") {
            return POS_PUKUAFU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "SAINDULE") {
            return POS_SAINDULE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "SAKUBATUN") {
            return POS_SAKUBATUN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "SANGAH NDOLU") {
            return POS_SANGAHNDOLU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "SANGGAOEN") {
            return POS_SANGGAOEN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "SEDEOEN") {
            return POS_SEDEOEN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "SERUBEBA") {
            return POS_SERUBEBA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "SIOMEDA") {
            return POS_SIOMEDA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "SONIMANU") {
            return POS_SONIMANU
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "SOTIMORI") {
            return POS_SOTIMORI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "SUEBELA") {
            return POS_SUEBELA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "SUELAIN") {
            return POS_SUELAIN
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "TASILO") {
            return POS_TASILO
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "TEBOLE") {
            return POS_TEBOLE
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "TEMAS") {
            return POS_TEMAS
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "TENALAI") {
            return POS_TENALAI
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "TESABELA") {
            return POS_TESABELA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "TOLAMA") {
            return POS_TOLAMA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "TUALIMA") {
            return POS_TUALIMA
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "TUANATUK") {
            return POS_TUANATUK
        }
        else if (public_service_center_name == "Posyandu" && district_name != null && village_name == "TUNGANAMO") {
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
                                <Card.Title as="h5">Ubah Data</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <h5>Pelaksanaan Operasi Timbang di Kabupaten Rote Ndao</h5>
                                <h6><span style={{ color: '#cc3300' }}>*</span>) Tanda wajib diisi</h6>
                                <hr/>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formNakesDate">
                                            <Form.Label>Tanggal Kunjungan Nakes <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                            <Form.Control 
                                                type="date" 
                                                name="nakesdate" 
                                                placeholder="Pilih tanggal kunjungan Nakes" 
                                                value={this.state.coming_date}
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
                                            <Form.Group controlId="district_name">
                                                <Form.Label>Nama Kecamatan</Form.Label>
                                                <Form.Control 
                                                    disabled
                                                    as="select"
                                                    value={this.state.district_name}
                                                    onChange={this.ondistrictNameInput}
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
                                                <Form.Label>Tipe Lokasi Pusat Pelayanan</Form.Label>
                                                <Form.Check
                                                    custom
                                                    disabled
                                                    type="radio"
                                                    label="Puskesmas"
                                                    name="formLocationType"
                                                    id="locationpuskesmas"
                                                    checked={this.state.public_service_center_type === "Puskesmas"}
                                                    onChange={this.onPublicServiceCenterTypeInputPuskesmas}
                                                />
                                                <Form.Check
                                                    custom
                                                    disabled
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
                                            <Form.Group controlId="village_name">
                                                <Form.Label>Nama Desa</Form.Label>
                                                <Form.Control 
                                                    // disabled={this.state.district_name === "---"}
                                                    as="select"
                                                    value={this.state.village_name}
                                                    onChange={this.onvillageNameInput}
                                                >
                                                    <option>---</option>
                                                    {this.villageList(
                                                        this.state.district_name
                                                    ).map(village => {
                                                        return <option key={`villageKey-${village}`}>{village}</option>
                                                    })}
                                                </Form.Control>
                                            </Form.Group>

                                                <Form.Group controlId="formlocationName">
                                                    <Form.Label>Nama Lokasi Pusat Pelayanan</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        disabled
                                                        value={this.state.public_service_center_name}
                                                        onChange={this.onPublicServiceCenterName}
                                                    >
                                                    { this.state.public_service_center_type == ''
                                                       ? (<>
                                                            <option>---</option>
                                                       </>) 
                                                       : null
                                                    }
                                                    <option>---</option>
                                                    {this.publicServiceCenterList(
                                                        this.state.public_service_center_type,
                                                        this.state.district_name,
                                                        this.state.village_name,
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
                                                    value={this.state.baby_date}
                                                    onChange={this.onBabyDateInput}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formMotherName">
                                                <Form.Label>Nama Ibu <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    placeholder="Tulis nama Ibu" 
                                                    value={this.state.mother_name}
                                                    onChange={this.onMotherNameInput}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formBabyName">
                                                <Form.Label>Nama Balita <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    placeholder="Tulis nama Balita"
                                                    value={this.state.baby_name}
                                                    onChange={this.onBabyNameInput}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formBabyAge">
                                                <Form.Label>Umur Balita</Form.Label>
                                                <Form.Control
                                                    disabled
                                                    type="text"
                                                    value={this.state.baby_age}
                                                    onChange={this.onBabyAgeInput}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Jenis Kelamin Balita <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                                <Form.Check
                                                    custom
                                                    type="radio"
                                                    label="Laki-laki"
                                                    name="genderRadio"
                                                    id="genderRadioMale"
                                                    checked={this.state.baby_gender === "Laki-laki"}
                                                    onChange={this.onBabyGenderInputMale}
                                                />
                                                <Form.Check
                                                    custom
                                                    type="radio"
                                                    label="Perempuan"
                                                    name="genderRadio"
                                                    id="genderRadioFemale"
                                                    checked={this.state.baby_gender === "Perempuan"}
                                                    onChange={this.onBabyGenderInputFemale}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formBabyClinicalIssue">
                                                <Form.Label>Kelainan Klinis</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={this.state.baby_clinical_issue}
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
                                                    value={this.state.baby_intervency_format}
                                                    onChange={this.onBabyIntervencyFormatInput}
                                                >
                                                    <option>---</option>
                                                    <option>Format 1: Tatalaksana</option>
                                                    <option>Format 2: Kunjungan Rumah dan PMT</option>
                                                </Form.Control>
                                            </Form.Group>

                                            {this.state.baby_intervency_format == "Format 2: Kunjungan Rumah dan PMT"
                                                ? (<Form.Group>
                                                    <Form.Label>Form Lanjutan</Form.Label>
                                                    <Form.Check
                                                        custom
                                                        type="radio"
                                                        label="Rujuk"
                                                        name="type2format"
                                                        id="rujuk"
                                                        checked={this.state.baby_format_type_two === "Rujuk"}
                                                        onChange={this.onBabyFormatTypeTwoInputRujuk}
                                                    />
                                                    <Form.Check
                                                        custom
                                                        type="radio"
                                                        label="PGBT"
                                                        name="type2format"
                                                        id="pgbt"
                                                        checked={this.state.baby_format_type_two === "PGBT"}
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
                                                placeholder="Tulis tinggi badan dalam CM"
                                                value={this.state.baby_height}
                                                onChange={this.onBabyHeightInput}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBabyWeight">
                                            <Form.Label>Berat Badan Balita <span style={{ color: '#cc3300' }}>*</span></Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="Tulis berat badan dalam GR"
                                                value={this.state.baby_weight}
                                                onChange={this.onBabyWeightInput}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBabyLika">
                                            <Form.Label>Lingkar Kepala Balita</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="Tulis lingkar kepala dalam CM"
                                                value={this.state.baby_lika}
                                                onChange={this.onBabyLikaInput}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBabyLila">
                                            <Form.Label>Lingkar Lengan Atas</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="Tulis lingkar lengan atas dalam CM"
                                                value={this.state.baby_lila}
                                                onChange={this.onBabyLilaInput}
                                            />
                                        </Form.Group>

                                    </Col>
                                </Row>

                                <Button variant="primary" onClick={this.handleSubmitEdit}>
                                    Simpan Data
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default EditForm;
