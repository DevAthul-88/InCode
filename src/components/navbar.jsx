import React, { useState } from "react";
import { createStyles, Header, Container, Text , Group, Burger } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import {Link} from 'wouter'

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
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

export default function HeaderSimple() {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes, cx } = useStyles();

  return (
    <Header height={60}>
      <Container className={classes.header} >
        <Link href="/">
        <Text className="os" color={"white"} size="xl" style={{"cursor":"pointer"}}>InCode</Text>
        </Link>
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
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  );
}
