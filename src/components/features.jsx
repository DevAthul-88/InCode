import React from "react";
import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  Col,
} from "@mantine/core";
import { ReceiptOff, Flame, CircleDotted, FileCode ,  FileDollar} from "tabler-icons-react";
import { Link } from "wouter";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
    overflow: "hidden",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

const features = [
  {
    icon: ReceiptOff,
    title: "Free and open source",
    description:
      "InCode are published under MIT license.",
  },
  {
    icon: FileDollar,
    title: "Free",
    description:
      "InCode is totally free and open source.",
  },
  {
    icon: CircleDotted,
    title: "No annoying adds",
    description:
      "No ads, no spams",
  },
  {
    icon: Flame,
    title: "Flexible",
    description:
      "InCode is very flexible. Create a project, save it and you can reuse it anywhere.",
  },
];

export default function FeaturesTitle() {
  const { classes } = useStyles();

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "blue", to: "cyan" }}
      >
        <feature.icon size={26} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            A fully featured online code editor.
          </Title>
          <Text color="dimmed">
          With InCode, you can create your own static website faster and more efficiently. Export it or save it so you can use it anywhere, anytime you like.
          </Text>

          <Link href="/start">
            <Button
              variant="gradient"
              gradient={{ deg: 133, from: "blue", to: "cyan" }}
              size="lg"
              radius="md"
              mt="xl"
            >
              Get started
            </Button>
          </Link>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid
            cols={2}
            spacing={30}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            {items}
          </SimpleGrid>
        </Col>
      </Grid>
    </div>
  );
}
