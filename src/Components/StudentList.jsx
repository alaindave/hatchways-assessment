import React from 'react';
import axios from 'axios';
import Student from './Student';

export default class StudentsList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            students:[],
            key_word:'',
            on:false,
        }
    }

componentDidMount(){
    axios.get( 'https://hatchways.io/api/assessment/students ')
        .then(res=>{
            this.setState({students:res.data.students});        
        }) ;
}

searchHandler = (e) => {

    this.setState({key_word:e.target.value}) ;
}

searchStudents = (keyWord) => {
    return x=>{
        return x.firstName.toLowerCase().includes(keyWord.toLowerCase())||x.lastName.toLowerCase().includes(keyWord.toLowerCase()) || !keyWord;
    }
}

render(){

        return(
                    <div>
                        <form>
                            <input type="text"  onChange={this.searchHandler} placeholder="Search by name..." 
                            value={this.state.key_word}/>
                        </form>
                        {this.state.students.filter(this.searchStudents(this.state.key_word)).map(student=>{
                        return (
                        <Student pic={student.pic} firstName={student.firstName} lastName={student.lastName}
                        email={student.email} company={student.company} skill={student.skill} grades={student.grades} />    
                    )
                    })
                         }
                    </div>
        )
        }

}