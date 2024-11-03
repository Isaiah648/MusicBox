import { Carousel } from '@mantine/carousel';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Text, Title, Button, useMantineTheme, rem } from '@mantine/core';
import classes from './CardsCarousel.module.css';

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

const data = [
  {
    image:
      'https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2020/07/03/84f0a15a-a570-11ea-8ea0-d7434be00753_image_hires_172942.jpeg',
    title: 'Billie Eilish',
    category: 'Pop',
  },
  {
    image:
      'https://m.media-amazon.com/images/I/61RTtaOvbbL._AC_UF894,1000_QL80_.jpg',
    title: 'The Backseat Lovers',
    category: 'Indie',
  },
  {
    image:
      'https://assets0.dostuffmedia.com/uploads/aws_asset/aws_asset/20217954/aaaaf2eb-34e1-4ae7-b4d1-a7b9de8c4ff4.jpg',
    title: 'Hotel Fiction',
    category: 'Indie/Pop',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Aurora in Norway: when to visit for best experience',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best places to visit this winter',
    category: 'tourism',
  },
  {
    image:
      'https://i0.wp.com/countrycentral.com/wp-content/uploads/2024/08/456434379_1068290887997793_368778514291395318_n.jpg?resize=1400%2C789&ssl=1',
    title: 'Noah Kahan',
    category: 'Indie/Folk',
  },
];

export default function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      classNames={classes}
      withIndicators
      dragFree
      slideSize="33.33%"
      slideGap="md"
      align="center"
      slidesToScroll={mobile ? 1 : 1}
      loop
      //orientation="vertical"
    >
      {slides}
    </Carousel>
  );
}