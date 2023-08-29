const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: 'jodatabase.cprrsh0pkv17.ap-northeast-2.rds.amazonaws.com',
  user: 'jo213',
  password: 'jo2131755',
  database: 'jodata'
});

// POST 요청 처리를 위한 미들웨어 설정
app.use(express.json());

// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

// POST /submit 요청 핸들러
app.post('/submit', (req, res) => {
  const answers = req.body.answers;
  const accessTime = req.body.accessTime;
  const responseTimesFromClient = req.body.responseTimes;
  const responseTimes = responseTimesFromClient.map(time => time.toFixed(2));
  const personal = req.body.personal;
  const sex = req.body.sex;
  const yymmdd = req.body.yymmdd;
  const criteria = req.body.criteria; // criteria를 받아옴
  const elapsedTime = parseFloat(req.body.elapsedTime).toFixed(2); // elapsedTime를 소수점 두 자리까지 표시
  const newAnswers = answers.slice(2);

  const dataToInsert = [personal, sex, yymmdd, ...newAnswers, ...responseTimes.slice(1), ...criteria, accessTime, elapsedTime]; // criteria 추가


  const columns = [
    'personal', 'sex', 'yymmdd',
    'answer1', 'answer2', 'answer3', 'answer4', 'answer5',
    'answer6', 'answer7', 'answer8', 'answer9', 'answer10',
    'answer11', 'answer12', 'answer13', 'answer14', 'answer15',
    'answer16', 'answer17', 'answer18', 'answer19', 'answer20',
    'answer21', 'answer22', 'answer23', 'answer24', 'answer25',
    'answer26', 'answer27', 'answer28', 'answer29', 'answer30',
    'answer31', 'answer32', 'answer33', 'answer34', 'answer35',
    'answer36', 'answer37', 'answer38', 'answer39', 'answer40',
    'answer41', 'answer42', 'answer43', 'answer44', 'answer45',
    'answer46', 'answer47', 'answer48', 'answer49', 'answer50', 'answer51',
    'criteria1', 'criteria2', 'criteria3', 'criteria4', 'criteria5',
    'criteria6', 'criteria7', 'criteria8', 'criteria9', 'criteria10',
    'responsetime1', 'responsetime2', 'responsetime3', 'responsetime4',
    'responsetime5', 'responsetime6', 'responsetime7', 'responsetime8',
    'responsetime9', 'responsetime10', 'responsetime11', 'responsetime12',
    'responsetime13', 'responsetime14', 'responsetime15', 'responsetime16',
    'responsetime17', 'responsetime18', 'responsetime19', 'responsetime20',
    'responsetime21', 'responsetime22', 'responsetime23', 'responsetime24',
    'responsetime25', 'responsetime26', 'responsetime27', 'responsetime28',
    'responsetime29', 'responsetime30', 'responsetime31', 'responsetime32',
    'responsetime33', 'responsetime34', 'responsetime35', 'responsetime36',
    'responsetime37', 'responsetime38', 'responsetime39', 'responsetime40',
    'responsetime41', 'responsetime42', 'responsetime43', 'responsetime44',
    'responsetime45', 'responsetime46', 'responsetime47', 'responsetime48',
    'responsetime49', 'responsetime50', 'responsetime51', 'responsetime52',
    'accessTime', 'elapsedTime'
  ];

  const columnNames = columns.join(', ');
  const placeholders = dataToInsert.map(() => '?').join(', ');

  const query = `INSERT INTO answers3 (${columnNames}) VALUES (${placeholders})`;

  connection.query(query, dataToInsert, (error, results) => {
    if (error) {
      console.error('답변과 접속 시간 저장 중 오류:', error);
      res.status(500).send('답변과 접속 시간 저장 중 오류가 발생했습니다.');
    } else {
      console.log('답변과 접속 시간이 저장되었습니다.');
      res.status(200).send('답변과 접속 시간이 저장되었습니다.');
    }
  });
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}/ 에서 실행 중입니다.`);
});

