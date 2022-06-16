import { Container, Title, Button } from "@mantine/core";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Status from "../components/status";
import { Plus } from "tabler-icons-react";
import Footer from "../components/footer";
import db from "../db/db";
import { Modal, TextInput, Textarea, Grid, Text, Select } from "@mantine/core";
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
    if (db.auth.user() == null && db.auth.user() == undefined) {
      setLocation("/signin");
    }
  }, []);
  React.useEffect(() => {
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
      const { error, data } = await db.from("code").insert([
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
        setLocation("/editor/" + data[0].id);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }
  const time = new Date().getHours();
  let greeting;
  if (time < 10) {
    greeting = "Good morning";
  } else if (time < 20) {
    greeting = "Good day";
  } else {
    greeting = "Good evening";
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
        <Grid>
          <Grid.Col span={10}>
            <Text
              mt="md"
              mb="xl"
              size="xl"
              weight="bold"
              color="white"
              style={{ color: "white" }}
            >
              {greeting} {db.auth.user()?.user_metadata?.username}
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Button
              mt="xl"
              variant="gradient"
              leftIcon={<Plus />}
              onClick={() => setOpened(true)}
            >
              New Project
            </Button>
          </Grid.Col>
        </Grid>
        <Title mt="xl" color="white" style={{ color: "white" }}>
          Recent Activity
        </Title>
        <Status
          title={
            project.length == 0
              ? "No Projects Found."
              : "Select a project to continue"
          }
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
          <Select
          mt="sm"
            label="Select a CSS library. If you want."
            placeholder="Pick one"
            data={[
              { value: "bootstrap", label: "Bootstrap" },
              { value: "bulma", label: "Bulma" },
              { value: "w3css", label: "W3.css" },
              { value: "foundation", label: "Foundation" },
              { value: "pure", label: "Pure" },
              { value: "semantic-ui", label: "Semantic UI" },
              { value: "ui-kit", label: "UI kit" },
              { value: "materialize", label: "Materialize CSS " },
              { value: "tailwind", label: "Tailwind CSS" },

            ]}
          />
           <Select
          mt="sm"
            label="Select a JavaScript library. If you want."
            placeholder="Pick one"
            data={[
              { value: "jquery", label: "jQuery" },
              { value: "d3-js", label: "D3.js" },
              { value: "Pixi-js", label: "Pixi.js" },
              { value: "three-js", label: "Three.js" },
              { value: "velocity.js", label: "Velocity.js" },
              { value: "anime-js", label: "Anime.js" },
              { value: "phaser", label: "Phaser" },
              { value: "jquery-ui", label: "JQuery UI" },
              { value: "stage-js", label: "Stage.js" },

            ]}
          />
          <Button variant="gradient" type="submit" mt="sm" loading={loading}>
            Create
          </Button>
        </form>
      </Modal>
    </>
  );
}
