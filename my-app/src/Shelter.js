import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddSheltModal} from './AddSheltModal';
import {EditSheltModal} from './EditSheltModal';

export class Shelter extends Component{

    constructor(props){
        super(props);
        this.state={shelts:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'shelter')
        .then(response=>response.json())
        .then(data=>{
            this.setState({shelts:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        //this.refreshList();
    }

    deleteShelt(sheltid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'shelter/'+sheltid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {shelts, sheltid,sheltname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ShelterId</th>
                        <th>ShelterName</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shelts.map(shelt=>
                            <tr key={shelt.ShelterId}>
                                <td>{shelt.ShelterId}</td>
                                <td>{shelt.ShelterName}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        sheltid:shelt.ShelterId,sheltname:shelt.ShelterName})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteShelt(shelt.ShelterId)}>
            Delete
        </Button>

        <EditSheltModal show={this.state.editModalShow}
        onHide={editModalClose}
        sheltid={sheltid}
        sheltname={sheltname}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Shelter</Button>

                    <AddSheltModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}