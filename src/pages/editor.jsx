import { useState, useEffect, useRef } from "react";
import {
  AppShell,
  Select,
  Header,
  TextInput,
  Textarea,
  Menu,
  Text,
} from "@mantine/core";

import {
  createStyles,
  Container,
  Kbd,
  Group,
  Button,
  Modal,
  Center,
} from "@mantine/core";
import {
  PlayerPlay,
  Upload,
  Settings,
  BrandHtml5,
  BrandCss3,
  BrandJavascript,
} from "tabler-icons-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { Tabs } from "@mantine/core";
import db from "../db/db";
import { Link } from "wouter";
import { User, Logout } from "tabler-icons-react";
import { Loader } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
    },
  },
}));

export default function Editor({ id }) {
  document.title = "InCode - Editor";
  const [opened, setOpened] = useState(false);
  const { classes, cx } = useStyles();
  const [htmls, setHtml] = useState("");
  const [jss, setJs] = useState("");
  const [csss, setCss] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [run, setRun] = useState(1);
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("dark");
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchProject() {
    try {
      setLoading(true);
      const { data, error } = await db.from("code").select().eq("id", id);
      if (error) {
        console.log(error.message);
      }
      if (data) {
        setHtml(data && data[0].html);
        setCss(data && data[0].css);
        setJs(data && data[0].js);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchProject();
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${htmls}</body>
          <style>${csss}</style>
          <script>${jss}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [run]);

  async function saveProject() {
    try {
      const { data, error } = await db
        .from("code")
        .insert([{ html: htmls, css: csss, js: jss }])
        .eq("id", id);
        if(error){
          toast(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            type: "error",
          });
        }
        if(data){
          toast("Project saved!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            type: "success",
          });
        }
    } catch (error) {
      toast(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        type: "error",
      });
    }
  }

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60}>
          <Container className={classes.header}>
            <Text size="xl" className="os" color={"white"}>
              InCode
            </Text>

            <Group spacing={5} className={classes.links}>
              <Button
                leftIcon={<PlayerPlay />}
                variant="subtle"
                onClick={() => {
                  setRun(run + 1);
                }}
              >
                Run
              </Button>
              <Button
                leftIcon={<Upload />}
                variant="subtle"
                onClick={saveProject}
              >
                Save
              </Button>
              <Button
                leftIcon={<Settings />}
                variant="subtle"
                onClick={() => setOpened(true)}
              >
                Settings
              </Button>
              {db.auth.user !== null && db.auth.user !== undefined ? (
                <Group>
                  <Menu
                    transition="rotate-right"
                    transitionDuration={100}
                    transitionTimingFunction="ease"
                  >
                    <Menu.Item icon={<User size={14} />}>Profile</Menu.Item>
                    <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>
                  </Menu>
                </Group>
              ) : (
                <Group spacing={5} className={classes.links}>
                  <Link
                    href={"/signin"}
                    className={cx(classes.link, {
                      [classes.linkActive]: "active" === null,
                    })}
                  >
                    SignIn
                  </Link>
                  <Link
                    href={"/signup"}
                    className={cx(classes.link, {
                      [classes.linkActive]: "active" === null,
                    })}
                  >
                    SignUp
                  </Link>
                </Group>
              )}
            </Group>
          </Container>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {loading ? (
        <Center>
          <Loader size="lg" />
        </Center>
      ) : (
        <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Text color="#fff" align="center">
            <Kbd>ctrl</Kbd> + <Kbd>s</Kbd> To Run The Code
          </Text>

          <Tabs variant="outline">
            <Tabs.Tab
              label="HTML"
              icon={<BrandHtml5 size={16} />}
              tabKey="html"
            >
              <CodeMirror
                value={htmls}
                height="200px"
                theme={theme}
                extensions={[html()]}
                onChange={(value, viewUpdate) => {
                  setHtml(value);
                }}
                placeholder="HTML"
                minHeight="300px"
                style={{ fontSize: value }}
              />
            </Tabs.Tab>
            <Tabs.Tab label="CSS" icon={<BrandCss3 size={16} />} tabKey="css">
              <CodeMirror
                value={csss}
                height="200px"
                theme={theme}
                extensions={[css()]}
                onChange={(value, viewUpdate) => {
                  setCss(value);
                }}
                placeholder="CSS"
                minHeight="300px"
                style={{ fontSize: value }}
              />
            </Tabs.Tab>
            <Tabs.Tab
              label="JAVASCRIPT"
              icon={<BrandJavascript size={16} />}
              tabKey="js"
            >
              <CodeMirror
                value={jss}
                height="200px"
                theme={theme}
                extensions={[javascript()]}
                onChange={(value, viewUpdate) => {
                  setJs(value);
                }}
                placeholder="JAVASCRIPT"
                minHeight="300px"
                style={{ fontSize: value }}
              />
            </Tabs.Tab>
          </Tabs>

          <div className="pane">
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>

          <>
            <Modal
              size={"lg"}
              opened={opened}
              onClose={() => setOpened(false)}
              title="Settings"
            >
              <Text>Meta Data</Text>
              <TextInput label="Title" mt="sm" />
              <Textarea label="Description" mt="sm" />
              <br />
              <Button variant="gradient">Save</Button>

              <Text mt="sm">Font Size</Text>

              <Select
                mt="sm"
                placeholder="Pick one"
                searchable
                nothingFound="No options"
                data={["12px", "15px", "18px", "22px"]}
                onChange={setValue}
              />

              <Text mt="sm">Theme</Text>

              <Select
                mt="sm"
                placeholder="Pick one"
                searchable
                nothingFound="No options"
                data={["dark", "light"]}
                onChange={setTheme}
              />
            </Modal>
          </>
        </>
      )}
    </AppShell>
  );
}
