import React from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "wouter";
import db from "../db/db";
import { useLocation } from "wouter";
import { Alert } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";

export default function AuthenticationTitle() {
  document.title = "InCode - SignIn";
  const [location, setLocation] = useLocation();
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { user, error } = await db.auth.signIn({
      email: email,
      password: password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
    if (user) {
      setError(null);
      setLoading(false);
      setLocation("/start");
    }
  };

  React.useEffect(() => {
    if(db.auth.user() !== null && db.auth.user() !== undefined){
      setLocation("/start")
    }
  },[])
  return (
    <>
      <Navbar />
      {error && (
        <Alert icon={<AlertCircle size={16} />} title="Alert" color="red">
          {error}
        </Alert>
      )}
      <Container size={420} my={40}>
        <Text
          align="center"
          color="white"
          size="xl"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Text>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Link href="/signup">
            <Anchor size="sm">Create account</Anchor>
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form action="" onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              placeholder="you@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button fullWidth mt="xl" type="submit" loading={loading}>
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}
