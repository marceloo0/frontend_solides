import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, getHours } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  Line,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Section,
  SectionAgenda,
  Button,
  Appointment,
  Calendar,
  Agendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
  };
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { addToast } = useToast();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedProvider] = useState<string>(user.id);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  // Busca na api agendamentos num mês especifico do usuario logado
  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  // Busca na api agendamentos do usuario logado na data selecionada
  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  // Faz o agendamento na base de dados
  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = format(new Date(selectedDate), 'yyyy-MM-dd HH:mm:00');

      await api.post('appointments', {
        user_id: selectedProvider,
        date,
      });

      addToast({
        type: 'success',
        title: 'Horário efetivado!',
        description: 'Você cadastrou um horário com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao criar horário',
        description:
          'Ocorreu um erro ao tentar criar um horário, tente novamente!',
      });
    }
  }, [addToast, selectedDate, selectedProvider]);

  // Desabilita dias passados
  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  // Converte data
  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  const inputHourAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return (
        parseISO(appointment.date).getHours() > 8 &&
        parseISO(appointment.date).getHours() < 11
      );
    });
  }, [appointments]);

  const lunchHourAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return (
        parseISO(appointment.date).getHours() >= 11 &&
        parseISO(appointment.date).getHours() < 13
      );
    });
  }, [appointments]);

  const exitHourAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return (
        parseISO(appointment.date).getHours() >= 13 &&
        parseISO(appointment.date).getHours() < 18
      );
    });
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
        <Line />
      </Header>

      <Content>
        <SectionAgenda>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
              modifiers={{
                available: { daysOfWeek: [1, 2, 3, 4, 5] },
              }}
              onMonthChange={handleMonthChange}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        </SectionAgenda>

        <Schedule>
          <h1>Horários</h1>
          {/* <h1>{selectedDate}</h1> */}
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <Section>
            <strong>Entrada</strong>

            {inputHourAppointments.length === 0 && (
              <Agendar>
                <p>Nenhum horário neste período</p>
                <Button onClick={handleCreateAppointment}>Agendar</Button>
              </Agendar>
            )}

            {inputHourAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <div>
                  <strong>{appointment.user.name}</strong>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Almoço</strong>
            <span>Saída para o almoço</span>
            {lunchHourAppointments.length === 0 && (
              <Agendar>
                <p>Nenhum horário neste período</p>
                <Button onClick={handleCreateAppointment}>Agendar</Button>
              </Agendar>
            )}

            {lunchHourAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <div>
                  <strong>{appointment.user.name}</strong>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                </div>
              </Appointment>
            ))}

            <span>Volta do almoço</span>
            {lunchHourAppointments.length === 0 && (
              <Agendar>
                <p>Nenhum horário neste período</p>
                <Button onClick={handleCreateAppointment}>Agendar</Button>
              </Agendar>
            )}

            {lunchHourAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <div>
                  <strong>{appointment.user.name}</strong>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Saída</strong>

            {exitHourAppointments.length === 0 && (
              <Agendar>
                <p>Nenhum horário neste período</p>
                <Button onClick={handleCreateAppointment}>Agendar</Button>
              </Agendar>
            )}

            {exitHourAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <div>
                  <strong>{appointment.user.name}</strong>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
      </Content>
    </Container>
  );
};

export default Dashboard;
