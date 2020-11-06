import React, { Component } from 'react'
import SingleMission from './SingleMission'
import AddMission from './AddMission'
import { keys } from 'idb-keyval';
import { get } from 'idb-keyval'; 

export class Missions extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        missions : [
      ]

    }
    }
    async componentDidMount(){
      var entries = [];
     var key = await keys()
       
       for (let i = 0; i < key.length; i++) {
         const element = key[i];
         var m =  await get(element)
         console.log(m)
         entries.push(m)
         
       }
     
     this.setState({missions:entries})

    }
   
  
  
    render() {
      
        return (
            <div className="container-fluid mt-5 missions ">
            <div className="row justify-content-center ">
              <div className = "col-5 text-center">
                {this.state.missions.map((x,i)=>{
                  
                  if(i%2 === 0){
                   return( <SingleMission  key ={i} mission = {x}/>)
                  }

                })
                }
{/*                {this.state.missions.length%2 === 0 ? <AddMission/> : 1>0}
 */}              </div>
              <div className = "col-2  justify-content-center text-center">
                  
                <div className = "v-devider mx-auto" />
                </div>
              <div className = "col-5 text-center right-col ">
              
              {this.state.missions.map((x,i)=>{
                  if(i%2 === 1){
                   return( <SingleMission key ={i} mission = {x}/>)
                  }
                })
                }
{/*                 {this.state.missions.length%2 === 1 ? <AddMission/> : 1>0}
 */}                
             
              </div>
              <AddMission/>
            </div>
          </div>
        )
    }
}

export default Missions

