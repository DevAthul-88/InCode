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
  DeviceMobile,
  PageBreak,
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
import Device from "../components/device";
import Footer from "../components/footer";
import { useLocation } from "wouter";

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
  const [openeds, setOpeneds] = useState(false);
  const { classes, cx } = useStyles();
  const [htmls, setHtml] = useState("");
  const [jss, setJs] = useState("");
  const [csss, setCss] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [run, setRun] = useState(1);
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("dark");
  const [device, setDevice] = useState("device-iphone-x");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [metaLoading, setMetaLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [location, setLocation] = useLocation();
  const [delLoading , setDelLoading] = useState(false);
  async function fetchProject() {
    try {
      setLoading(true);
      const { data, error } = await db.from("code").select().eq("id", id);
      if (error) {
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
      if (data) {
        setHtml(data && data[0].html);
        setCss(data && data[0].css);
        setJs(data && data[0].js);
        setTitle(data && data[0].title);
        setDescription(data && data[0].description);
        setLoading(false);
        if (data[0].userId !== db.auth?.user()?.id) {
          setLocation("/start");
        }
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
  useEffect(() => {
    fetchProject();
    if (!db.auth.user) {
      setLocation("/signin");
    }
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

  async function logout() {
    db.auth.signOut();
    window.location.href = "/signin";
  }

  async function saveProject() {
    try {
      setSaveLoading(true);
      const { data, error } = await db
        .from("code")
        .update({ html: htmls, css: csss, js: jss })
        .match({ id: id });
      if (error) {
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
        setSaveLoading(false);
      }
      if (data) {
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
        setSaveLoading(false);
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
      setSaveLoading(false);
    }
  }

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      setMetaLoading(true);
      const { data, error } = await db
        .from("code")
        .update({ title: title, description: description })
        .match({ id: id });
      if (error) {
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
        setMetaLoading(false);
      }
      if (data) {
        toast("Title and description are changed!", {
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
        setMetaLoading(false);
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
      setMetaLoading(false);
    }
  };

 async function deleteProject(){
    try {
      setDelLoading(true);
       const {data , error} = await db.from("code").delete().match({"id":id})
       if (error) {
        toast("Title and description are changed!", {
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
        setDelLoading(false);
        setMetaLoading(false);
      }
      if(data){
        setDelLoading(false);
        setLocation("/start")
      }
    } catch (error) {
      setDelLoading(false);
      toast("Title and description are changed!", {
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
    <>
      <AppShell
        padding="md"
        header={
          <Header height={60}>
            <Container className={classes.header}>
              <Link href="/start">
                <Text
                  size="xl"
                  className="os"
                  color={"white"}
                  style={{ cursor: "pointer" }}
                >
                  InCode
                </Text>
              </Link>

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
                  loading={saveLoading}
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
                      <Menu.Item icon={<Logout size={14} />} onClick={logout}>
                        Logout
                      </Menu.Item>
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

            <Tabs variant="outline" mt="sm">
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
                <div>
                  <iframe
                    className="pane"
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                  />
                </div>
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
                <div>
                  <iframe
                    className="pane"
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                  />
                </div>
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
                <div>
                  <iframe
                    srcDoc={srcDoc}
                    className="pane"
                    title="output"
                    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                  />
                </div>
              </Tabs.Tab>
              <Tabs.Tab
                label="FULL PREVIEW"
                icon={<PageBreak size={16} />}
                tabKey="full"
              >
                <div>
                  <iframe
                    className="panes"
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                  />
                </div>
              </Tabs.Tab>
              <Tabs.Tab
                label="DEVICE PREVIEW"
                icon={<DeviceMobile size={16} />}
                tabKey="device"
              >
                <Select
                  mt="md"
                  placeholder="Select a device"
                  searchable
                  nothingFound="No options"
                  data={[
                    "device-iphone-x",
                    "device-iphone-8",
                    "device-google-pixel-2-xl",
                    "device-google-pixel",
                    "device-galaxy-s8",
                    "device-ipad-pro",
                    "device-surface-pro",
                    "device-surface-book",
                    "device-macbook-pro",
                    "device-macbook",
                    "device-surface-studio",
                    "device-imac-pro",
                    "device-apple-watch",
                  ]}
                  onChange={setDevice}
                />
                <Device srcDoc={srcDoc} device={device} />
              </Tabs.Tab>
            </Tabs>

            <>
              <Modal
                size={"lg"}
                opened={opened}
                onClose={() => setOpened(false)}
                title="Settings"
              >
                <form onSubmit={handleChange}>
                  <Text>Meta Data</Text>
                  <TextInput
                    label="Title"
                    mt="sm"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    label="Description"
                    mt="sm"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <br />
                  <Button
                    variant="gradient"
                    type="submit"
                    loading={metaLoading}
                  >
                    Save
                  </Button>
                </form>
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

                <Button
                  variant="outline"
                  color="red"
                  mt="sm"
                  onClick={() => setOpeneds(true)}
                >
                  Delete Project
                </Button>
              </Modal>
            </>
            <Modal
              opened={openeds}
              onClose={() => setOpeneds(false)}
              title="Are you sure you want to delete this project?"
            >
              <Group>
                <Button color="red" onClick={deleteProject} loading={delLoading}>Yes Delete It!</Button>
              </Group>
            </Modal>
          </>
        )}
      </AppShell>
      <Footer />
    </>
  );
}
