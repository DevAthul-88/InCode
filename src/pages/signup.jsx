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
import { Alert } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "wouter";
import db from "../db/db";
import {useLocation} from "wouter"

export default function AuthenticationTitle() {
  document.title = "InCode - SignUp";
  const [ location , setLocation ] = useLocation();
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const [loading , setLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { user, error } = await db.auth.signUp(
      {
        email: email,
        password: password,
      },
      { data: { username: username } }
    );
    if (error) {
      setError(error.message);
      setLoading(false)
    }
    if(user){
      setError(null);
      setLoading(false);
      setLocation("/signin");
    }
  };
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
          Hi!
        </Text>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <Link href="/signin">
            <Anchor size="sm">Login</Anchor>
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Username"
              placeholder="Your username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              mt="md"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              mt="md"
            />
            <Button fullWidth mt="xl" type="submit" loading={loading}>
              Sign Up
            </Button>
          </form>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}
