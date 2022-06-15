import React from 'react';
import { createStyles, Card, Group, Switch, Text , Button} from '@mantine/core';
import {Link} from 'wouter'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  item: {
    '& + &': {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },
  },

  switch: {
    '& *': {
      cursor: 'pointer',
    },
  },

  title: {
    lineHeight: 1,
  },
}));



export default function SwitchesCard({ title, description, data }) {
  const { classes } = useStyles();

  const items = data.map((item) => (
    <Group position="apart" className={classes.item} noWrap spacing="xl">
      <div>
        <Text>{item.title}</Text>
        <Text size="xs" color="dimmed">
          {item.description}
        </Text>
      </div>
      <Link href={`/editor/${item.id}`}>
      <Button>Open Project</Button>
      </Link>
    </Group>
  ));

  return (
    <Card withBorder  p="xl" className={classes.card} mt="xl">
      <Text size="lg" className={classes.title} weight={500}>
        {title}
      </Text>
      <Text size="xs" color="dimmed" mt={3} mb="xl">
        {description}
      </Text>
      {items}
    </Card>
  );
}