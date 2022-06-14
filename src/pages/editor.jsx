import { useState, useEffect, useRef } from "react";
import {
  AppShell,
  Navbar,
  Header,
  TextInput,
  Textarea,
  Text,
} from "@mantine/core";

import {
  createStyles,
  Container,
  Grid,
  Group,
  Burger,
  Button,
  Modal,
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

export default function Editor() {
  const [opened, setOpened] = useState(false);
  const secondTabRef = useRef();
  const { classes, cx } = useStyles();
  const [htmls, setHtml] = useState("");
  const [jss, setJs] = useState("");
  const [csss, setCss] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [tabsState, setTabsState] = useState("html");
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
  }, [htmls, csss, jss]);
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
              <Button leftIcon={<Upload />} variant="subtle">
                Save
              </Button>
              <Button
                leftIcon={<Settings />}
                variant="subtle"
                onClick={() => setOpened(true)}
              >
                Settings
              </Button>
              <Button variant="subtle">SignIn</Button>
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
      <Tabs variant="outline">
        <Tabs.Tab label="Settings" icon={<BrandHtml5 size={16} />} />
        <Tabs.Tab label="Messages" icon={<BrandCss3 size={16} />} />
        <Tabs.Tab label="Gallery" icon={<BrandJavascript size={16} />} />
      </Tabs>

      <Grid gutter={"xs"}>
        <Grid.Col span={4}>
          <CodeMirror
            value=""
            height="200px"
            theme={"dark"}
            extensions={[html()]}
            onChange={(value, viewUpdate) => {
              setHtml(value);
            }}
            placeholder="HTML"
            minHeight="300px"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <CodeMirror
            value=""
            height="200px"
            theme={"dark"}
            extensions={[css()]}
            onChange={(value, viewUpdate) => {
              setCss(value);
            }}
            placeholder="CSS"
            minHeight="300px"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <CodeMirror
            value=""
            height="200px"
            theme={"dark"}
            extensions={[javascript()]}
            onChange={(value, viewUpdate) => {
              setJs(value);
            }}
            placeholder="JAVASCRIPT"
            minHeight="300px"
          />
        </Grid.Col>
      </Grid>
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
          <Text>Layout</Text>
          <br />
          <Group>
            <Button variant="gradient">Classic</Button>
            <Button variant="gradient">Columns</Button>
            <Button variant="gradient">Right Results</Button>
            <Button variant="gradient">Tabs</Button>
          </Group>
        </Modal>
      </>
    </AppShell>
  );
}
