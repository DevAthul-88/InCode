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
import { library } from "../data";

export default function ActionsGrid() {
  const [project, setProject] = React.useState([]);
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = React.useState();
  const [location, setLocation] = useLocation();
  const [css, setCss] = React.useState("");
  const [js, setJs] = React.useState("");
  const [cssLib, setCssLib] = React.useState(null);
  document.title = "InCode - Start Project";
  React.useEffect(() => {
    if (db.auth.user() == null) {
      setLocation("/signin");
    }
    console.log(db.auth.user());
  }, []);

  const d = library.filter((e) => e.key == css);

  React.useEffect(() => {
    setCssLib(d.length == 1 ? d[0].data : "");
  }, [css]);

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
          html: cssLib !== null ? cssLib : "",
          js_lib: js !== null ? js : "",
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
            value={css}
            onChange={setCss}
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
           value={js}
           onChange={setJs}
            mt="sm"
            label="Select a JavaScript library. If you want."
            placeholder="Pick one"
            data={[
              { value: `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`, label: "jQuery" },
              { value:`<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.4.4/d3.min.js" integrity="sha512-hnFpvCiJ8Fr1lYLqcw6wLgFUOEZ89kWCkO+cEekwcWPIPKyknKV1eZmSSG3UxXfsSuf+z/SgmiYB1zFOg3l2UQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`, label: "D3.js" },
              { value: `<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.4.2/cjs/pixi.min.js" integrity="sha512-YViHhjOMIfLUvkxdsaTMAqAfBVrBmovkuptmZan0suYtvIQylhK0ewfASS7LFpYZnRNh9GJ1s4qNLd9QLDrykA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`, label: "Pixi.js" },
              { value:`<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" integrity="sha512-334uBDwY0iZ2TklV1OtDtBW9vp7jjP7SWRzT7Ehu1fdtPIjTpCwTSFb8HI/YBau9L1/kRBEOALrS229Kry4yFQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`, label: "Three.js" },
              { value:`<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/2.0.6/velocity.min.js" integrity="sha512-+VS2+Nl1Qit71a/lbncmVsWOZ0BmPDkopw5sXAS2W+OfeceCEd9OGTQWjgVgP5QaMV4ddqOIW9XLW7UVFzkMAw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`, label: "Velocity.js" },
              { value: `<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" integrity="sha512-z4OUqw38qNLpn1libAN9BsoDx6nbNFio5lA6CuTp9NlK83b89hgyCVq+N5FdBJptINztxn1Z3SaKSKUS5UP60Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`, label: "Anime.js" },
              { value: `<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.60.0-beta.9/phaser.min.js" integrity="sha512-cRon/0QzfNiUMbB8zpYVZC/SnwAKu0grMFiQ8NhmhYeZcz4iu8uxXG/Z48ZcNYB9RHdaDNnmW4rN1XWfn2gYVg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`, label: "Phaser" },
              { value: `<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" integrity="sha512-uto9mlQzrs59VwILcLiRYeLKPPbS/bT71da/OEBYEwcdNUk8jYIy+D176RYoop1Da+f9mvkYrmj5MCLZWEtQuA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`, label: "JQuery UI" },
              { value: `<script src="https://cdnjs.cloudflare.com/ajax/libs/angular/12.2.16/core.umd.min.js" integrity="sha512-FF+Hgoenar/13JLINGu9aOgNyehtxKf9pP4VUmYC1DwZ3aTY1O/l0nTELpvin4CS8LikmTjEasjszlEapnN2+g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`, label: "Angular" },
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
