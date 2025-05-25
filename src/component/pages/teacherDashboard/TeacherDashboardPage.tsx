import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Select, Statistic, Typography } from 'antd';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { MainLayout } from '../../templates';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const { Title: AntTitle } = Typography;
const { Option } = Select;

const TeacherDashboardPage: React.FC = () => {
  const userDetailsStr = localStorage.getItem("userDetails");

  let teacherId = null;
  if (userDetailsStr) {
    try {
      const userDetails = JSON.parse(userDetailsStr);
      teacherId = userDetails.id || userDetails.userId;
    } catch (e) {
      console.error("Failed to parse user details:", e);
    }
  }

  const [activityScores, setActivityScores] = useState({
    numbers: 5,
    objects: 15,
    drawing: 6,
    letters: 8,
  });
  const [regStudent, setRegStudent] = useState(10);
  const [lastDayActivityUsage, setLastDayActivityUsage] = useState({
    numbers: 10,
    objects: 4,
    drawing: 2,
    letters: 6,
  });
  const [todayActivityUsage, setTodayActivityUsage] = useState({
    numbers: 8,
    objects: 6,
    drawing: 3,
    letters: 5,
  });

  // New state for students and selected student
  const [students, setStudents] = useState<{ studentId: number; studentName: string }[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/children/" + teacherId);
      const data = await response.json();
      // If the response is an array of students, set students
      if (Array.isArray(data)) {
        setStudents(data);
        if (data.length > 0) setSelectedStudentId(data[0].studentId);
      }

    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    }
  };

  const handleStudentChange = (value: number) => {
    setSelectedStudentId(value);
  };

  const chartData = {
    labels: ['Numbers', 'Objects', 'Drawing', 'Letters'],
    datasets: [
      {
        label: 'Average Marks',
        data: [
          activityScores.numbers,
          activityScores.objects,
          activityScores.drawing,
          activityScores.letters,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  const pieDataLastDay = {
    labels: ['Numbers', 'Objects', 'Drawing', 'Letters'],
    datasets: [
      {
        data: [
          lastDayActivityUsage.numbers,
          lastDayActivityUsage.objects,
          lastDayActivityUsage.drawing,
          lastDayActivityUsage.letters,
        ],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
        hoverOffset: 4,
      },
    ],
  };

  const pieDataToday = {
    labels: ['Numbers', 'Objects', 'Drawing', 'Letters'],
    datasets: [
      {
        data: [
          todayActivityUsage.numbers,
          todayActivityUsage.objects,
          todayActivityUsage.drawing,
          todayActivityUsage.letters,
        ],
        backgroundColor: ['#8e44ad', '#2ecc71', '#f39c12', '#3498db'],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Activity Marks Overview' },
    },
  };

  const pieOptionsLastDay = {
    responsive: true,
    plugins: {
      legend: { position: 'right' as const },
      title: { display: true, text: 'Last Day Activity Usage' },
    },
  };

  const pieOptionsToday = {
    responsive: true,
    plugins: {
      legend: { position: 'right' as const },
      title: { display: true, text: "Today's Activity Usage" },
    },
  };

  return (
    <MainLayout>
      <div style={{ padding: '24px' }}>
        <AntTitle level={1}>Teacher Dashboard</AntTitle>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Card>
              <Statistic
                title="Registered Students"
                value={students.length}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Card>
              <div>
                <span style={{ fontWeight: 500 }}>Select Student: </span>
                <Select
                  style={{ width: "100%", marginLeft: 8 , marginTop: 8 }}
                  value={selectedStudentId ?? undefined}
                  onChange={handleStudentChange}
                  placeholder="Select a student"
                >
                  {students.map((student) => (
                    <Option key={student.studentId} value={student.studentId}>
                      {student.studentName}
                    </Option>
                  ))}
                </Select>
              </div>
            </Card>
          </Col>
        </Row>

        <AntTitle level={4} style={{ marginTop: '40px' }}>
          Activity Usage Overview
        </AntTitle>
        <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
          <Col xs={24} sm={24} md={12}>
            <Card><Pie data={pieDataLastDay} options={pieOptionsLastDay} /></Card>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Card><Pie data={pieDataToday} options={pieOptionsToday} /></Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card><Statistic title="Numbers Activity" value={todayActivityUsage.numbers}/></Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card><Statistic title="Objects Activity" value={todayActivityUsage.objects}/></Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card><Statistic title="Drawing Activity" value={todayActivityUsage.drawing}/></Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card><Statistic title="Letters Activity" value={todayActivityUsage.letters}/></Card>
          </Col>
        </Row>

        <div style={{ marginTop: '40px' }}>
          <AntTitle level={4}>Activity Marks Overview</AntTitle>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </MainLayout>
  );
};

export default TeacherDashboardPage;
