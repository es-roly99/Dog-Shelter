import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDogModal} from './AddDogModal';
import {EditDogModal} from './EditDogModal';

export class Dog extends Component{

    constructor(props){
        super(props);
        this.state={dogs:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'dog')
        .then(response=>response.json())
        .then(data=>{
            this.setState({dogs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        //this.refreshList();
    }

    deleteDog(dogid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'dog/'+dogid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {dogs, dogid,dogname,shelt,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>DogId</th>
                        <th>DogName</th>
                        <th>Shelter</th>
                        <th>DOJ</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dogs.map(dog=>
                            <tr key={dog.DogId}>
                                <td>{dog.DogId}</td>
                                <td>{dog.DogName}</td>
                                <td>{dog.Shelter}</td>
                                <td>{dog.DateOfJoining}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        dogid:dog.DogId,dogname:dog.DogName,shelt:dog.Shelter,
        photofilename:dog.PhotoFileName,doj:dog.DateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteDog(dog.DogId)}>
            Delete
        </Button>

        <EditDogModal show={this.state.editModalShow}
        onHide={editModalClose}
        dogid={dogid}
        dogname={dogname}
        shelt={shelt}
        photofilename={photofilename}
        doj={doj}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Dog</Button>

                    <AddDogModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}