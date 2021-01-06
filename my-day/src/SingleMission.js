import React, { Component } from 'react'


export class SingleMission extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            < a href ={"/mission/" + this.props.mission.id}>
                <div className="card text-center mission-card" >
                    <div className="card-body">
        <h5 className="mission-title">{this.props.mission.title}</h5>
                        <p >{this.props.mission.desciption}</p>
                       

                    </div>
                   
                </div>

            </a>
        )
    }
}

export default SingleMission
