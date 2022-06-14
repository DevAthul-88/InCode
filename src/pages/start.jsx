import { Container, Title  , Button } from "@mantine/core";
import React from "react";
import Navbar from "../components/navbar";
import Status from "../components/status";
import {Plus} from 'tabler-icons-react';
import Footer from "../components/footer";



export default function ActionsGrid() {
 

  return (
    <>
      <Navbar />
       <Container>
        <Button mt="xl" variant="gradient" leftIcon={<Plus />}>
          New Project
        </Button>
      <Title mt="xl" color="white" style={{"color":"white"}}>Recent Activity</Title>
       <Status title={"none"} description="Select" data={[]}/>
       </Container>
       <Footer />
    </>
  );
}
