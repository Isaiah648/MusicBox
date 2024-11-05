import { Button, Text, Container, Center } from "@mantine/core";
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function dashboardPage() {

  const router = useRouter();

  const handleExternalLink = () => {
    window.open('https://open.spotify.com/',"_blank");
  }

  const switchPageHome = () => {
    router.push('/');
  };

  const switchPageSpotify = () => {
    router.push('/spotifyProfile');
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
            onClick={switchPageHome}
            
            >
                Home
            </Button>

            <Button 
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            color="#9775fa"
            size="xl"
            onClick={switchPageSpotify}
            >
                Spotify Profile
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

        </Container>
    )
}