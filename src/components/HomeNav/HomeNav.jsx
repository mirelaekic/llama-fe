import React from 'react'
import { Card } from 'react-bootstrap'
import "../styles.css"
export default function HomeNav({title}) {
    return (
        <Card.Header className="sticky-top top-navbar">
            <h6 className="title">{title}</h6>
        </Card.Header>
    )
}
