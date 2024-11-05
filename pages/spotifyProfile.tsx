import { Button, Text, Container, Center, Grid, rem } from "@mantine/core";
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SpotifyProfilePage() {

  const router = useRouter();

  const handleExternalLink = () => {
    window.location.href = 'https://open.spotify.com/';
  }

  const switchPageDash = () => {
    router.push('/dashboard');
  };

    return (
        <Container>

            <Center><Text
            size="200%"
            fw={700}
            variant="gradient"
            gradient={{ from: 'yellow', to: 'gray', deg: 90 }}

            >
              Music App
            </Text></Center>

            <Button 
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            color="#9775fa"
            size="xl"
            onClick={switchPageDash}
            >
              Dashboard
            </Button>

            <Button 
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            color="#9775fa"
            size="xl"
            onClick={handleExternalLink}
            >
              Spotify!
            </Button>

            <Grid justify="center" align="stretch" gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
              <Grid.Col span={5} style={{ minHeight: rem(80) }}>1</Grid.Col>
              <Grid.Col span={5} style={{ minHeight: rem(80) }}>2</Grid.Col>
              <Grid.Col span={5} style={{ minHeight: rem(80) }}>3</Grid.Col>
              <Grid.Col span={5} style={{ minHeight: rem(80) }}>4</Grid.Col>
            </Grid>

        </Container>
    )
}