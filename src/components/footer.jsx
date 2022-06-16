import React from 'react';
import { createStyles, Container, Group, ActionIcon , Text} from '@mantine/core';
import { BrandGithub, BrandGitlab } from 'tabler-icons-react';


const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export default function FooterSocial() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
      <Text className="os" color={"white"} size="xl">InCode 2022</Text>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <a href="https://github.com/DevAthul-88/InCode"><BrandGithub size={18} /></a>
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}