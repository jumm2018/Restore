import { Button, ButtonGroup, Container, Typography } from '@mui/material'
import React from 'react'
import agent from '../../api/agent'

const AboutPage = () => {
  return (
    <Container>
      <Typography gutterBottom variant='h2'>Error for testing purposes</Typography>
      <ButtonGroup fullWidth>
      <Button variant='contained' onClick={()=>agent.testErrors.get400Error()}> Test 400 error</Button>
      <Button variant='contained' onClick={()=>agent.testErrors.get401Error()}> Test 401 error</Button>
      <Button variant='contained' onClick={()=>agent.testErrors.get404Error()}> Test 404 error</Button>
      <Button variant='contained' onClick={()=>agent.testErrors.get500Error()}> Test 500 error</Button>
      <Button variant='contained' onClick={()=>agent.testErrors.getValidationError()}> Validation error</Button>
      </ButtonGroup>
    </Container>
  )
}

export default AboutPage