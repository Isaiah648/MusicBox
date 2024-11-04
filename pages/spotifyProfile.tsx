import { Button, Text, Container } from "@mantine/core";
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

            <Text
            size="xl"
            fw={700}
            variant="gradient"
            gradient={{ from: 'yellow', to: 'gray', deg: 90 }}

            >
              Music App
            </Text>

            <Button 
            color="#9775fa"
            size="xl"
            onClick={switchPageDash}
            variant="light"
            >
              Dashboard
            </Button>

            <Button 
            color="#9775fa"
            size="xl"
            onClick={handleExternalLink}
            variant="light"
            >
              Spotify!
            </Button>

        </Container>
    )
}