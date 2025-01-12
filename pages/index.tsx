import { Button, Group, TextInput, Text, Container, Title, Stack, Center, Flex, Box } from "@mantine/core";
import CardsCarousel from "./Components/CardsCarousel";
import NavBarMinimal from "./Components/NavBarMinimal";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { InlineInputClasses } from "@mantine/core/lib/components/InlineInput";
import classes from './index.module.css';

{/* npm run dev --turbo */}

export default function IndexPage() {

  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); 

  const switchPage = () => {
    router.push('/dashboard');
  };

  const generateAnswer = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`http://127.0.0.1:8000/generate-content?prompt=${encodeURIComponent(question)}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
        },

      });

      if (!res.ok) {
        throw new Error(`Failed to fetch:  ${res.status}`);
      }

      const data = await res.json();
      if (data && data.generated_text) {
        setResponse(data.generated_text);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setResponse('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container 
      size="mid"
      className="body-background"
    >
      <Flex>

        <NavBarMinimal/>

        <Box style={{ flex: 1}}>

          <Stack mt={50} align="center">

            <Center><Text
              size="200%"
              fw={700}
              variant="gradient"
              gradient={{ from: 'yellow', to: 'gray', deg: 90 }}
            >
              Music App
            </Text></Center>

            <CardsCarousel />

            <TextInput 
            label = "Ask for song recommendations"
            description="Enter prompt:"
            placeholder="I love Billie's new album, what else can I try?"
            value={question}
            onChange={(event) => setQuestion(event.currentTarget.value)}
            disabled={isLoading}
            size="md"
            />

            <Button 
              onClick={generateAnswer}
              loading={isLoading}
              disabled={!question.trim()}
              size="xl"
            >
              Generate
            </Button>

            <Text
              className={classes.textArea}>
              {response}
            </Text>

            <Group justify="center">
              <Button 
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                color="#9775fa"
                size="xl"
                onClick={switchPage}
              >
                  Dashboard
              </Button>
            </Group>

          </Stack>
        
        </Box>
      
      </Flex>

    </Container>
  );
}
