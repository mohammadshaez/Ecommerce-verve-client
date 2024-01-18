import React from 'react'
import styled from "styled-components";

const Container = styled.div`
    height: 30px;
    max-width: 100%;
    background-color: gold;
    color: black;
    text-align: center;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Announcement = () => {
  return (
    <Container>
        Free Shipping Over $50!! Shipping Worldwide.
    </Container>
  )
}

export default Announcement