import { useEffect, useState } from "react";
import { Container, Text, Center, Image, Grid, rem, Button } from "@mantine/core";
import { useRouter } from 'next/router';
import * as dotenv from 'dotenv';

dotenv.config();
// Access the API key variable from dotenv
const clientId: string = process.env.SPOTIFY_API_KEY as string ?? 'error'; // Your client ID

export default function SpotifyProfile() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  const handleExternalLink = () => {
    window.location.href = 'https://open.spotify.com/';
  }

  const switchPageDash = () => {
    router.push('/dashboard');
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const accessToken = await getAccessToken(clientId, code);
        const userProfile = await fetchProfile(accessToken);
        setProfile(userProfile);
      }
    };

    fetchData();
  }, []);

  const redirectToAuthCodeFlow = async (clientId: string) => {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/spotifyProfile");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  const generateCodeVerifier = (length: number) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const generateCodeChallenge = async (codeVerifier: string) => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const getAccessToken = async (clientId: string, code: string): Promise<string> => {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/spotifyProfile");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const { access_token } = await result.json();
    return access_token;
  };

  const fetchProfile = async (token: string): Promise<any> => {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
  };

  return (
    <Container>
      <Center>
        <Text
          size="200%"
          fw={700}
          variant="gradient"
          gradient={{ from: 'yellow', to: 'gray', deg: 90 }}
        >
          Music App
        </Text>
      </Center>

      <Center>
      <div>
          <Button 
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          color="#9775fa"
          size="xl"
          onClick={switchPageDash}
          style={{marginRight: '10px'}}
          >
            Dashboard
          </Button>

          <Button 
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          color="#9775fa"
          size="xl"
          onClick={handleExternalLink}
          style={{marginRight: '10px'}}
          >
            Spotify!
          </Button>
        </div>
      </Center>

      {profile ? (
        <div>
          <Text>User ID: {profile.display_name}</Text>
          <Text>Email: {profile.email}</Text>
        </div>
      ) : (
        <Text>Loading...</Text>
      )}

      <div style={{marginTop: '30px'}}>
        <Grid justify="center" align="stretch" gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={5} style={{ minHeight: rem(80) }}>Your top artists</Grid.Col>
          <Grid.Col span={5} style={{ minHeight: rem(80) }}>Your top songs</Grid.Col>
          <Grid.Col span={5} style={{ minHeight: rem(80) }}>Some photos</Grid.Col>
          <Grid.Col span={5} style={{ minHeight: rem(80) }}>Song recs</Grid.Col>
        </Grid>
      </div>
    </Container>
  );
}