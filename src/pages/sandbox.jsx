import { useState, useEffect, useRef } from "react";
import {
  AppShell,
  Select,
  Header,
  TextInput,
  Textarea,
  Menu,
  Stack,
  SimpleGrid,
  Text,
} from "@mantine/core";
import useKeypress from "react-use-keypress";
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
  LayoutBottombar,
  LayoutColumns,
  BrandCss3,
  BrandJavascript,
  DeviceMobile,
  PageBreak,
  Download,
  Home2,
} from "tabler-icons-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { Tabs } from "@mantine/core";
import { Link } from "wouter";
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
    padding: "2rem",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
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

export default function Sandbox({ id }) {
  document.title = "InCode - Sandbox";
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
  const [jsLib, setJsLib] = useState("");
  const [layout, setLayout] = useState("row");

  useKeypress("Enter", () => {
    setRun(run + 1);
  });

  useEffect(() => {
    localStorage.setItem("fontSizeCode", value);
  }, [value]);

 

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${htmls}</body>
          <style>${csss}</style>
           ${jsLib !== null ? jsLib : ""}
          <script>${jss}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [run]);

  var obj = { html: htmls, css: csss, js: jss };
  var data =
    "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

  return (
    <>
      <Header height={60} className={classes.header}>
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
          <Link href="/">
            <Button leftIcon={<Home2 />} variant="subtle">
              Home
            </Button>
          </Link>
          <Button
            leftIcon={<PlayerPlay />}
            variant="subtle"
            onClick={() => {
              setRun(run + 1);
            }}
          >
            Run
          </Button>
          <a href={`data:${data}`} download="data.json">
            <Button leftIcon={<Download />} variant="subtle">
              Download as JSON
            </Button>
          </a>

          <Button
            leftIcon={<Settings />}
            variant="subtle"
            onClick={() => setOpened(true)}
          >
            Settings
          </Button>
        </Group>
      </Header>
      <AppShell
        padding="md"
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
              <Kbd>Enter</Kbd> To Run The Code
            </Text>
            <Stack align="flex-end">
              <Group>
                <Button
                  variant="outline"
                  onClick={() => {
                    setLayout("row");
                  }}
                >
                  <LayoutBottombar />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setLayout("column");
                  }}
                >
                  <LayoutColumns />
                </Button>
              </Group>
            </Stack>

            <Tabs variant="outline" mt="sm">
              <Tabs.Tab
                label="HTML"
                icon={<BrandHtml5 size={16} />}
                tabKey="html"
              >
                <SimpleGrid cols={layout === "row" ? 1 : 2}>
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
                    style={{
                      fontSize: localStorage.getItem("fontSizeCode")
                        ? localStorage.getItem("fontSizeCode")
                        : value,
                    }}
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
                      style={
                        layout == "row"
                          ? { minHeight: "50vh" }
                          : { height: "100%" }
                      }
                    />
                  </div>
                </SimpleGrid>
              </Tabs.Tab>
              <Tabs.Tab label="CSS" icon={<BrandCss3 size={16} />} tabKey="css">
                <SimpleGrid cols={layout === "row" ? 1 : 2}>
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
                    style={{
                      fontSize: localStorage.getItem("fontSizeCode")
                        ? localStorage.getItem("fontSizeCode")
                        : value,
                    }}
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
                      style={
                        layout == "row"
                          ? { minHeight: "50vh" }
                          : { height: "100%" }
                      }
                    />
                  </div>
                </SimpleGrid>
              </Tabs.Tab>
              <Tabs.Tab
                label="JAVASCRIPT"
                icon={<BrandJavascript size={16} />}
                tabKey="js"
              >
                <SimpleGrid cols={layout === "row" ? 1 : 2}>
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
                    style={{
                      fontSize: localStorage.getItem("fontSizeCode")
                        ? localStorage.getItem("fontSizeCode")
                        : value,
                    }}
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
                      style={
                        layout == "row"
                          ? { minHeight: "50vh" }
                          : { height: "100%" }
                      }
                    />
                  </div>
                </SimpleGrid>
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
      <Footer />
    </>
  );
}
