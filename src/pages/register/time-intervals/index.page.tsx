import {
  Heading,
  MultiStep,
  Text,
  Checkbox,
  TextInput,
  Button,
} from '@ignite-ui/react';
import { Container, Header } from '../styles';
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles';
import { ArrowRight } from 'phosphor-react';

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form">
        <IntervalContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </IntervalDay>

            <IntervalInputs>
              <TextInput size="md" type="time" step={60} />
              <TextInput size="md" type="time" step={60} />
            </IntervalInputs>
          </IntervalItem>
        </IntervalContainer>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
