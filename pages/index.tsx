import { Button, Group } from "@mantine/core";
import CardsCarousel from "./Components/CardsCarousel";
import classes from './index.module.css';

export default function IndexPage() {
  return (
    <div>
      <Group mt={50} justify="center">
        <Button color="#9775fa" size="xl">This is just the beginning!</Button>
        <CardsCarousel />
      </Group>
    </div>
  );
}
