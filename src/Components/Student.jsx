import React, { Component } from 'react';
import OnEvent from 'react-onevent';
import '../student.css';

export default class Student extends Component {

    constructor(props){
            super(props);
            this.state={
                on:false,
                showPlusButton:true,
                showMinusButton:false,
                tagsInput:'',
                tags:[]
            }
    }

    getAverage=(arr)=>{

        let sum=0;
        let average=0;
        let i;

        for( i=0;i<arr.length;i++){

            arr[i]=parseInt(arr[i]);
            sum+=arr[i];
            average=sum/8 ;

        }
        return average ;
    }

    toggle = () =>{
    
        this.setState({
            on:!this.state.on,
            showPlusButton:!this.state.showPlusButton,
            showMinusButton:!this.state.showMinusButton
        })
    }

    updateTagValue = (value) => {
        if(value === ' ') {
            return;
        }
        this.setState({
            tagsInput: value,
        })
    }

    
    addTag = (tag) => {

        tag = tag.trim();

        if(!(this.state.tags.indexOf(tag) > -1)) {
            let tags = this.state.tags.concat([tag]);
            this.updateTags(tags);
        }
        
	   this.updateTagValue('');
    }

    updateTags = (tags) => {
        this.setState({
            tags
        })
        
    }
    render() { 

        return (
            <div className="each_student row">

                <div className="col-md-6">
                    <img src={this.props.pic} alt="student avatar"/>      
                </div>

                <div className="col-md-6 row">
                    <div className="col-md-6 ">
                        <ul>
                            <li className="student">{this.props.firstName}{" "}{this.props.lastName}</li>
                            <li>Email:{this.props.email}</li>
                            <li>Company:{this.props.company}</li>
                            <li>Skill: {this.props.skill}</li>
                            <li>Average: {
                                    this.getAverage(this.props.grades)
                            }%</li>
                        </ul>

                        {this.state.on &&

                        <div>
                            <ul>
                                {this.props.grades.map(function(name,index){
                                    return <li key={index}>Test {index}: {name}%</li>;
                                }
                                )}
                            </ul>
                            
                            {this.state.tags && this.state.tags.map(x => <ul className="tags"><li>{x}</li></ul>)}

                            <OnEvent space={(e) => this.addTag(e.target.value)}>
                                <form>
                                    <input value={this.state.tagsInput} onChange={(e)=>{
                                        this.updateTagValue(e.target.value);
                                    }} type="text" placeholder="Enter tag and hit space" />

                                </form>
                            </OnEvent>
                         </div>
                        }

                    </div>

                    <div className="buttons col-md-6 ">

                    {
                            this.state.showPlusButton &&
                            <button onClick={this.toggle}>+</button>
                        }

                        {
                            this.state.showMinusButton && 
                            <button onClick={this.toggle}>-</button>
                        }

                    </div>
                        
                </div>
            </div>
           
         );
    }
}
 
