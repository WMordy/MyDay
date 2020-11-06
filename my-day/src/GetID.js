import React from 'react'
import { useParams } from 'react-router-dom'
import SingleMissionDetails from './SingleMissionDetails'

export default function GetID() {
    return (
        <div>
            <SingleMissionDetails id = {useParams()}/>
        </div>
    )
}
