import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditDogModal extends Component{
    constructor(props){
        super(props);
        this.state={shelts:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'shelter')
        .then(response=>response.json())
        .then(data=>{
            this.setState({shelts:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'dog',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DogId:event.target.DogId.value,
                DogName:event.target.DogName.value,
                Shelter:event.target.Shelter.value,
                DateOfJoining:event.target.DateOfJoining.value,
                PhotoFileName:this.photofilename

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Dog/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Dog
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="DogId">
                        <Form.Label>DogId</Form.Label>
                        <Form.Control type="text" name="DogId" required 
                        placeholder="DogId"
                        disabled
                        defaultValue={this.props.dogid}/>
                    </Form.Group>

                    <Form.Group controlId="DogName">
                        <Form.Label>DogName</Form.Label>
                        <Form.Control type="text" name="DogName" required 
                        defaultValue={this.props.dogname}
                        placeholder="DogName"/>
                    </Form.Group>

                    <Form.Group controlId="Shelter">
                        <Form.Label>Shelter</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.shelt}>
                        {this.state.shelts.map(shelt=>
                            <option key={shelt.ShelterId}>{shelt.ShelterName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="DateOfJoining">
                        <Form.Label>DateOfJoining</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfJoining"
                        required
                        placeholder="DateOfJoining"
                        defaultValue={this.props.doj}
                        />
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Dog
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" 
                src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}