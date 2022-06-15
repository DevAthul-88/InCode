import { Container, Title, Button } from "@mantine/core";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Status from "../components/status";
import { Plus } from "tabler-icons-react";
import Footer from "../components/footer";
import db from "../db/db";
import { Modal, TextInput, Textarea } from "@mantine/core";
import { Alert } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { useLocation } from "wouter";


export default function ActionsGrid() {
  const [project, setProject] = React.useState([]);
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = React.useState();
  const [location, setLocation] = useLocation();
  document.title = "InCode - Start Project";
  React.useEffect(() => {
    if(!db.auth?.user()){
      setLocation("/login")
    }
    async function fetchProject() {
      try {
        const { error, data } = await db
          .from("code")
          .select()
          .eq("userId", db.auth.user()?.id);
        if (error) {
          console.log(error.message);
        }
        if (data) {
          setProject(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProject();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { error, data } = await db
        .from("code")
        .insert([
          {
            title: title,
            description: description,
            userId: db.auth.user()?.id,
          },
        ]);

      if (error) {
        setError(error.message);
        setLoading(false);
      }
      if (data) {
       setLocation("/editor/"+data[0].id)
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      {error && (
        <Alert icon={<AlertCircle size={16} />} title="Alert" color="red">
          {error}
        </Alert>
      )}
      <Container>
        <Button
          mt="xl"
          variant="gradient"
          leftIcon={<Plus />}
          onClick={() => setOpened(true)}
        >
          New Project
        </Button>
        <Title mt="xl" color="white" style={{ color: "white" }}>
          Recent Activity
        </Title>
        <Status
          title={project.length == 0 ? "No Projects Found." : "Select a project to continue"}
          description={null}
          data={project}
        />
      </Container>
      <Footer />

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="New Project"
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <br />
          <Textarea
            label="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></Textarea>
          <Button variant="gradient" type="submit" mt="sm" loading={loading}>
            Create
          </Button>
        </form>
      </Modal>
    </>
  );
}
