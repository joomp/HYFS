import React from 'react'


const Header = (props) => {
    return (
        <h2>{props.course.name}</h2>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header course = {course}/>
            <Content course = {course} />
            <Total course = {course} />
        </>
    )
}

const Content = (props) => {
    return props.course.parts.map(part => 
        <Part part = {part} key = {part.id}/>
    )
}

const Part = (props) => {
    return (
        <p key = {props.part.id}>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = (props) => {
    let total = props.course.parts.reduce((accumulator, part) =>{
        return accumulator + part.exercises
    }, 0)
    return (
    <p> <b>Number of exercises {total}</b></p>
    )
}

export default Course