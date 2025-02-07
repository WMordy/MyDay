import React, { Component } from 'react'
import { set } from "idb-keyval";
import { get } from 'idb-keyval'; 
import { del } from 'idb-keyval';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

export class SingleMissionDetails extends Component {
    constructor(props) {
        super(props)
        
        
        this.state = {
            id : this.props.id.id === "new" ? Date.now() : this.props.id.id,
            title:"",
            description:"",
            hour: this.props.id.id === "new" ? "00:00" : "",
            ToNotify: false,
            isDone:false,
            date:  ""
           

        }
     
        
        this.handleDate = this.handleDate.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleNotify = this.handleNotify.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
       
    }
    handleTitle(e){
        this.setState({title:e.target.value})
    }

    handleDescription(e){
        this.setState({description:e.target.value})
    }

    handleTime(e){
        this.setState({hour:e.target.value})
        
       
    }
    handleDate(e){
        this.setState({date:e.target.value})
     
    }
    async handleNotify(e){
        this.setState({ToNotify:e.target.checked})
        await this.addNotif(this.state.id)
    }
     async addNotif(id){
        let hours = (Number(this.state.hour.split(":")[0]) -1)*60*60*1000 + Number(this.state.hour.split(":")[1])*60*1000;
        let timeDate =  new Date(this.state.date ).valueOf();
        timeDate += hours
        console.log(timeDate);
        console.log( Date.now())
        await LocalNotifications.requestPermission()
        await LocalNotifications.schedule({
            notifications: [
              {
                title: this.state.title,
                body: this.state.description,
                id: this.state.id,
                schedule: { at: new Date(timeDate) },
                sound: null,
                attachments: null,
                actionTypeId: "",
                extra: null
              }
            ]
          })
          console.log('scheduled notifications')
       
      
    }

    async componentDidMount(){
        if (this.props.id.id !== "new"){
            var myid = Number(this.state.id);
            var m = await get(myid) 
            this.setState({
                id : Number(this.props.id.id),
                title:m.title,
                description:m.description,
                hour: m.hour,
                ToNotify: m.ToNotify,
                isDone:m.isDone,
                date: m.date
               

            })
            console.log(this.state)
           
           
        }
      


    
    }
   
  
    render() {
        return (
            <div>
                <div className="App2">
                    <h1 className="display-2 title mt-3">My Day</h1>
                    <div className="container mission mx-auto py-3 mt-5">
                        <div className="row justify-content-center">
                            <div className="col-12 text-center ">
                                <form >
                                    <div className="form-group align-elements-center">
                                        <input className="form-control" type="text" placeholder="Title"   defaultValue = {this.state.title}  onChange = {this.handleTitle}/>

                                        <textarea className="form-control" rows={3}  
                                         defaultValue = {this.state.description} placeholder="Descrip"  onChange = {this.handleDescription}/>



                                        <input type="time" id="appt" name="appt" defaultValue = {this.state.hour} onChange = {this.handleTime}/>
                                        <input type="date" name="bday" defaultValue = {this.state.date}  onChange = {this.handleDate}/>
                                        <div className="form-check">
                                            
                                            <input className="form-check-input" type="checkbox"  id="defaultCheck1" checked = {this.state.ToNotify} onChange = {this.handleNotify}/>
                                            <label className="form-check-label" htmlFor="defaultCheck1">
                                               Notify Me
                                            </label>
                                        </div>
                                    </div>
                                </form>



                            </div>
                            <div className="col text-center btn-box">
                            {this.props.id.id === "new" ? 1 > 0 :
                            <button type="button" className="btn btn-lg " onClick={
                               e=>{
                                e.preventDefault();
                                del(this.state.id)
                                 window.location.href = "/home"
                                
                                
                               }
                            }><FontAwesomeIcon icon={faCheckCircle} className = "green" /></button>}
                            <button type="button" className="btn btn-lg" onClick={
                                e=>{
                                 e.preventDefault();
                                 this.handleNotify() ;

                                 let msg = this.state;
                                 set(this.state.id,msg)
                                 window.location.href = "/home"

                               
                                 
                                 
                                }}
                                ><FontAwesomeIcon icon={faSave} className = "" /></button>
                            <button type="button" className="btn btn-lg" onClick={
                                e=>{
                                 e.preventDefault();
                                 //TODO Delete notification
                             /*     LocalNotifications.getPending().then( res => {
                                    var index = res.notifications.map(x => {
                                      return x["id"];
                                    }).indexOf(this.state.id);
                                    res.notifications.splice(index, 1);
                                    LocalNotifications.cancel(res);
                                  }, err => {
                                    console.log(err);
                                  }) */
                                  del(this.state.id)
                                
                                 window.location.href = "/home"
                                 
                                 
                                }}
                                
                                > <FontAwesomeIcon icon={faTrashAlt} className = "red" /></button>
                                     

                                

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SingleMissionDetails




