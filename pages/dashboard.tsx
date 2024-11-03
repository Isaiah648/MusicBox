import { Button, Text, Container } from "@mantine/core";
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function dashboardPage() {

  const router = useRouter();

  const handleExternalLink = () => {
    window.location.href = 'https://open.spotify.com/';
  }

  const switchPage = () => {
    router.push('/');
  };

    return (
        <Container>
            <Button 
            color="#9775fa"
            size="xl"
            onClick={switchPage}
            variant="light"
            >
                This is just the beginning!
            </Button>

            <Button 
            color="#9775fa"
            size="xl"
            onClick={handleExternalLink}
            variant="light"
            >
                Spotify!
            </Button>

            <Text>
                Hey
            </Text>
        </Container>
    )
}