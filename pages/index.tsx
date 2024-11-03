import { Button, Group, TextInput, Text, Container, Title } from "@mantine/core";
import CardsCarousel from "./Components/CardsCarousel";
import { useState } from 'react';
import { useRouter } from 'next/router';

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
    <Container size="mid">
      <Group mt={50} justify="center">

        <Text
          size="xl"
          fw={700}
          variant="gradient"
          gradient={{ from: 'yellow', to: 'gray', deg: 90 }}

        >
          Music App
        </Text>

        <CardsCarousel />
        
        <TextInput 
          label = "Enter"
          description="Enter prompt:"
          placeholder="Can you explain how songs are made?"
          value={question}
          onChange={(event) => setQuestion(event.currentTarget.value)}
          disabled={isLoading}
        />

        <Button 
          onClick={generateAnswer}
          loading={isLoading}
          disabled={!question.trim()}
        >
          Generate
        </Button>

        <Text>
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
              This is just the beginning!
          </Button>
        </Group>

      </Group>
    </Container>
  );
}
